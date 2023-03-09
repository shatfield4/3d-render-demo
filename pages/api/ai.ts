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
        prompt = "3d logo render for a brand that is aesthetic looking and professional and ";

    } else if (req.body.prompt === "package") {
        prompt = "3d package render for a brand that is aesthetic looking and professional and ";
    }

    try {
        const response = await axios.post(DALLE_API_ENDPOINT!, {
            model: "image-alpha-001",
            prompt: prompt + req.body.inputText,
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
