import type { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';
import FormData from 'form-data';
import sharp from 'sharp';

const { OPENAI_API_KEY } = process.env;
const OPENAI_API_ENDPOINT = 'https://api.openai.com/v1/images/edits';

type Data = {
  status: string;
  imageUrl: string;
};

async function processImage(base64Image: string, size: number): Promise<Buffer> {
    try {
      const bufferImage = Buffer.from(base64Image, 'base64');
      const resizedImage = await sharp(bufferImage)
        .resize(size, size, {
          fit: 'cover',
          position: 'center',
        })
        .toBuffer();
      return resizedImage;
    } catch (error) {
      throw new Error('Invalid or unsupported image format.');
    }
  }


export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const { prompt, image, mask } = req.body;
  const size = 1024;

  try {
    const [processedImage, processedMask] = await Promise.all([
      processImage(image, size),
      processImage(mask, size),
    ]);

    const form = new FormData();
    form.append('image', processedImage, { filename: 'image.png' });
    form.append('mask', processedMask, { filename: 'mask.png' });
    form.append('prompt', prompt);
    form.append('n', '1');
    form.append('size', `${size}x${size}`);

    const response = await axios.post(OPENAI_API_ENDPOINT, form, {
      headers: {
        Authorization: `Bearer ${OPENAI_API_KEY!}`,
        ...form.getHeaders(),
      },
    });

    const imageUrl = response.data.data[0].url;
    res.status(200).json({ status: 'success', imageUrl });
  } catch (error) {
    console.error(error);
    res.status(500).json({ status: 'error', imageUrl: '' });
  }
}
