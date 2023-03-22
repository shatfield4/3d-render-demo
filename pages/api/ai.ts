import type { NextApiRequest, NextApiResponse } from 'next'
import axios from 'axios';

const { OPENAI_API_KEY, DALLE_API_ENDPOINT } = process.env;

type Data = {
    status: string,
    imageUrls: string[]
}

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<Data>
) {

    let prompt;
    if (req.body.prompt === "logo") {
        prompt = `Generate a unique and visually appealing 3d geometric shape suitable for e-commerce brand logos based on the user's description: ${req.body.inputText}. Ensure that the shapes are interesting, modern, and have space for text to be incorporated into the design. cinematic lighting, octane, 3d render, 4k, 8k, Relaxing:: Additive::0 --ar 16:9`;

    } else if (req.body.prompt === "package") {
        prompt = `Create 3D hyperrealistic packaging renders for ${req.body.inputText} suitable for e-commerce product listings. octane, 3d render, 4k, 8k, Relaxing:: Additive::0 --ar 16:9`;
    }

    try {
        const response = await axios.post(DALLE_API_ENDPOINT!, {
            model: "image-alpha-001",
            prompt: prompt,
            num_images: req.body.numImages,
        }, {
            headers: {
            'Authorization': `Bearer ${OPENAI_API_KEY!}`,
            'Content-Type': 'application/json'
            }
        });

        const imageUrls = response.data.data.map((data: any) => data.url);
        res.status(200).json({status: "success", imageUrls: imageUrls});
    } catch (error) {
        console.error(error);
        res.status(500).json({status: "error", imageUrls: []});
    }
}
