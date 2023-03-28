import axios from "axios";
import { useState, useEffect } from "react";
import EditingModal from "./EditingModal";

const LogoRender = () => {
  const [inputText, setInputText] = useState("");
  const [numImages, setNumImages] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [imageUrls, setImageUrls] = useState<string[]>([]);

  // modal
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedImageURL, setSelectedImageURL] = useState("");

  const openModal = (imageURL: string) => {
    setModalOpen(true);
    setSelectedImageURL(imageURL);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  useEffect(() => {
    const fetchImages = async () => {
      const apiUrl = `https://pixabay.com/api/?key=34623498-875357acb06f0a2e0d4579a7f&q=nature&image_type=photo&per_page=5`;
      const response = await fetch(apiUrl);
      const imagesData = await response.json();
      setImageUrls(imagesData.hits.map((image: any) => image.webformatURL));
    };

    fetchImages();
  }, []);

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
      const response = await axios.post("/api/ai", {
        prompt: "package",
        inputText: inputText,
        numImages: numImages,
      });

      const newImageUrls: string[] = response.data.imageUrls;
      setImageUrls([...newImageUrls, ...imageUrls]);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div className="flex min-h-fit mt-14">
      {modalOpen && (
        <EditingModal
          imageURL={selectedImageURL}
          propIsVisible={modalOpen}
          onClose={closeModal}
        />
      )}

      <div className="w-full sm:w-1/3 bg-black p-8 rounded-xl">
        <h2 className="text-white text-3xl font-bold mb-4 text-left">
          3D <span className=" text-amber-300">Package</span> Generation
        </h2>

        <form onSubmit={handleSubmit} className="text-left">
          <div className="mb-4">
            <label
              htmlFor="input-text"
              className="  font-semibold text-white block mb-2"
            >
              DESCRIBE YOUR PRODUCT
            </label>
            <input
              type="text"
              id="input-text"
              className="bg-neutral-900 text-white rounded-xl p-2 w-full border-neutral-600 border-2 focus:border-orange-500 focus:outline-none"
              value={inputText}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="num-images"
              className="font-semibold text-white block mb-2"
            >
              NUMBER OF RENDERS
            </label>
            <select
              id="num-images"
              className="bg-neutral-900 text-white rounded-xl p-2 w-full border-neutral-600 border-2 focus:border-orange-500 focus:outline-none"
              value={numImages}
              onChange={handleNumImagesChange}
              required
            >
              <option value={1}>1</option>
              <option value={2}>2</option>
              <option value={3}>3</option>
            </select>
          </div>
          <p className="alert notice error mt-4 block p-3 border border-white rounded-lg text-white mb-0">
            <strong>NOTE:</strong>{" "}
            {`Describe your product in a way that is easy to understand. For example, "A red apple" is better than "A fruit that is red and round".`}
          </p>
          <div className="flex flex-col items-center mt-4">
            <button
              type="submit"
              className="text-white font-bold rounded-xl py-2 px-4 mt-4 w-full mx-auto text-lg bg-gradient-to-r from-purple-700 via-pink-500 to-red-500 border border-transparent cursor-pointer gradient-animation hover:outline"
              disabled={isLoading}
            >
              {isLoading ? "Generating..." : "Generate Packaging"}
            </button>
          </div>
        </form>
      </div>
      <div className="w-full sm:w-2/3 p-4">
        <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {imageUrls.map((imageUrl, index) => (
            <img
              key={index}
              src={imageUrl}
              alt={`Stock Image ${index + 1}`}
              className="w-full h-auto object-cover rounded-xl shadow-md cursor-pointer hover:brightness-125"
              onClick={() => openModal(imageUrl)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default LogoRender;
