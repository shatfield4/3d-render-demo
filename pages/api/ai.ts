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
        prompt = `A 3D logo for ${req.body.inputText} with cinematic lighting, octane, 3d render, 4k, 8k, Relaxing:: Additive::0 --ar 16:9`;

    } else if (req.body.prompt === "package") {
        prompt = `A 3D mockup of packaging for ${req.body.inputText} with cinematic lighting, octane, 3d render, 4k, 8k, Relaxing:: Additive::0 --ar 16:9`;
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
