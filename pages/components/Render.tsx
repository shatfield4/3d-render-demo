import React, { useState, useEffect } from "react";

const Dashboard = () => {
  const [textInput1, setTextInput1] = useState("");
  const [textInput2, setTextInput2] = useState("");
  const [images, setImages] = useState([]);

  useEffect(() => {
    const fetchImages = async () => {
      const apiUrl = `https://pixabay.com/api/?key=34623498-875357acb06f0a2e0d4579a7f&q=nature&image_type=photo&per_page=40`;
      const response = await fetch(apiUrl);
      const imagesData = await response.json();
      setImages(imagesData.hits);
    };

    fetchImages();
  }, []);

  return (
    <div className="flex min-h-screen">
      <div className="w-full sm:w-1/3 bg-black p-4">
        <h2 className="text-white text-2xl font-bold mb-4">Dashboard</h2>

        <label htmlFor="input-text-1" className="block text-white mb-2">
          Text Input 1:
        </label>
        <input
          type="text"
          id="input-text-1"
          className="bg-gray-700 text-white rounded-md p-2 w-full mb-4 focus:ring-yellow-300 focus:border-yellow-300"
          value={textInput1}
          onChange={(e) => setTextInput1(e.target.value)}
        />

        <label htmlFor="input-text-2" className="block text-white mb-2">
          Text Input 2:
        </label>
        <input
          type="text"
          id="input-text-2"
          className="bg-gray-700 text-white rounded-md p-2 w-full mb-4 focus:ring-yellow-300 focus:border-yellow-300"
          value={textInput2}
          onChange={(e) => setTextInput2(e.target.value)}
        />

        <button className="bg-yellow-300 hover:bg-yellow-400 text-gray-800 font-bold rounded-md py-2 px-4 w-full">
          Submit
        </button>
      </div>
      <div className="w-full sm:w-2/3 p-4">
        <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {images.map((image, index) => (
            <img
              key={index}
              src={image.webformatURL}
              alt={image.tags || `Stock Image ${index + 1}`}
              className="w-full h-auto object-cover"
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
