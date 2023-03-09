import axios from "axios";
import { useState } from "react";


const LogoRender = () => {
    const [inputText, setInputText] = useState("");
    const [numImages, setNumImages] = useState(1);
    const [isLoading, setIsLoading] = useState(false);
    const [imageUrls, setImageUrls] = useState<string[]>([]);

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setInputText(event.target.value);
    };

    const handleNumImagesChange = (
        event: React.ChangeEvent<HTMLSelectElement>
    ) => {
        setNumImages(Number(event.target.value));
    };

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setIsLoading(true);

        try {
            const response = await axios.post('/api/ai', {
                prompt: 'logo',
                inputText: inputText,
                numImages: numImages
            });

            const imageUrls:string[] = response.data.imageUrls;
            setImageUrls(imageUrls);

        } catch (error) {
            console.error(error);
        } finally {
            setIsLoading(false);
        }
    };
    return (
        <>
            <h1 className="text-4xl sm:text-6xl font-bold mb-8">
                3D <span className="text-blue-500">Logo</span> Render
            </h1>

            <form onSubmit={handleSubmit}>
                <label htmlFor="input-text" className="font-bold block mb-2">
                Describe your logo:
                </label>
                <input
                type="text"
                id="input-text"
                className="border-2 border-gray-400 rounded-md p-2 w-96"
                value={inputText}
                onChange={handleInputChange}
                required
                />

                <label htmlFor="num-images" className="font-bold block mt-4 mb-2">
                Number of logos:
                </label>
                <select
                id="num-images"
                className="border-2 border-gray-400 rounded-md p-2 w-96"
                value={numImages}
                onChange={handleNumImagesChange}
                required
                >
                <option value={1}>1</option>
                <option value={2}>2</option>
                <option value={3}>3</option>
                </select>

                <div className="flex flex-col items-center">
                <button
                    type="submit"
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold rounded-md py-2 px-4 mt-4 w-96"
                    disabled={isLoading}
                >
                    {isLoading ? "Generating..." : "Generate Logos"}
                </button>
                </div>
            </form>

            {imageUrls && imageUrls.length > 0 && (
                <div className="mt-8">
                <h2 className="text-2xl font-bold mb-4">
                    Generated Logos:
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    {imageUrls.map((imageUrl, index) => (
                    <img
                        key={index}
                        src={imageUrl}
                        alt={`Generated Image ${index + 1}`}
                        className="w-full h-auto"
                    />
                    ))}
                </div>
                </div>
            )}
        </>
    );
}


export default LogoRender;