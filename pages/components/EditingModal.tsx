import { useState, useRef, useEffect } from "react";
import CanvasDraw from "react-canvas-draw";
import axios from "axios";
import { text } from "node:stream/consumers";

const EditingModal = ({ imageURL, closeModal }: any) => {
  const [textInputValue, setTextInputValue] = useState("");
  const [imageDimensions, setImageDimensions] = useState({
    width: 0,
    height: 0,
  });
  const canvasRef = useRef<any>(null);

  const handleTextInputChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setTextInputValue(event.target.value);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // Do something with the text input value here
    // console.log("Text input value:", textInputValue);
    handleSaveMask();
    // closeModal();
  };

  const handleSaveMask = () => {
    const canvas = canvasRef.current.canvas.drawing;
    const dataUrl = canvas.toDataURL("image/png");
    // console.log(dataUrl);
  };

  const handleClearMask = () => {
    canvasRef.current?.clear();
  };

  const handleUndoMask = () => {
    canvasRef.current?.undo();
  };

  const handleImageLoad = (
    event: React.SyntheticEvent<HTMLImageElement, Event>
  ) => {
    setImageDimensions({
      width: event.currentTarget.width,
      height: event.currentTarget.height,
    });
  };

  const handleSubmitMask = async () => {
    const canvas = canvasRef.current.canvas.drawing;
    const maskImage = canvas.toDataURL("image/png");
    const originalImage = await imageUrlToBase64(imageURL);
    // const response = await axios.post("/api/ai", {
    // });

    // console.log("Input text:", textInputValue);
    // console.log(originalImage);
    // console.log("Mask image:", maskImage);

    const requestBody = {
      prompt: textInputValue,
      originalImage: originalImage,
      maskImage: maskImage,
    };

    const response = await axios
      .post("/api/mask", requestBody)
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  async function imageUrlToBase64(imageUrl: string): Promise<string> {
    const response = await fetch(imageUrl);
    const blob = await response.blob();
    return new Promise<string>((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(blob);
      reader.onloadend = () => {
        const base64data = reader.result?.toString() || "";
        resolve(base64data);
      };
      reader.onerror = reject;
    });
  }

  useEffect(() => {
    if (imageDimensions.width !== 0 && imageDimensions.height !== 0) {
      canvasRef.current.width = imageDimensions.width;
      canvasRef.current.height = imageDimensions.height;
    }
  }, [imageDimensions]);

  return (
    <div className="fixed z-10 inset-0 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen">
        <div className="fixed inset-0 bg-gray-500 opacity-75"></div>
        <div className="bg-white rounded-lg overflow-hidden shadow-xl transform transition-all sm:max-w-lg sm:w-full">
          <form onSubmit={handleSubmit}>
            <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse justify-between">
              <button
                type="submit"
                className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-indigo-600 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:ml-3 sm:w-auto sm:text-sm"
              >
                Save Image
              </button>
              <div>
                <button
                  type="button"
                  className="w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                  onClick={handleClearMask}
                >
                  Clear
                </button>
                <button
                  type="button"
                  className="w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                  onClick={handleUndoMask}
                >
                  Undo
                </button>
              </div>
            </div>
            <div className="relative h-96">
              <img
                src={imageURL}
                alt="Editing image"
                className="absolute inset-0 w-full h-full object-contain"
                onLoad={handleImageLoad}
              />
              {imageDimensions.width && imageDimensions.height && (
                <div className="absolute bottom-0 left-0 w-full h-full">
                  <CanvasDraw
                    canvasWidth={imageDimensions.width}
                    canvasHeight={imageDimensions.height}
                    hideGrid={true}
                    ref={canvasRef}
                    style={{ pointerEvents: "auto" }}
                    imgSrc={imageURL}
                  />
                </div>
              )}
              <div className="absolute bottom-0 left-0 w-full px-4 py-3 bg-white flex">
                <input
                  type="text"
                  value={textInputValue}
                  onChange={handleTextInputChange}
                  className="text-black w-full border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  placeholder="Enter prompt to modify selected areas..."
                />
                <button
                  className="ml-2 px-4 py-2 bg-indigo-600 text-white rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 hover:bg-indigo-700"
                  onClick={handleSubmitMask}
                >
                  &#8594;
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditingModal;
