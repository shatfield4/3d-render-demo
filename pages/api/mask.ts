import type { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';
import FormData from 'form-data';

const { OPENAI_API_KEY, DALLE_API_ENDPOINT } = process.env;

type Data = {
  status: string;
  imageUrl: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const { prompt, image, mask } = req.body;

  try {
    const form = new FormData();
    form.append('model', 'image-alpha-001');
    form.append('prompt', prompt);
    form.append('n', '1');
    form.append('size', '1024x1024');
    form.append('image', Buffer.from(image, 'base64'), { filename: 'image.png' });
    form.append('mask', Buffer.from(mask, 'base64'), { filename: 'mask.png' });

    const response = await axios.post(DALLE_API_ENDPOINT!, form, {
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
