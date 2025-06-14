import { FaImages, FaSpinner } from "react-icons/fa";
import { IoMdCloseCircle } from "react-icons/io";
import { UploadedImage } from "../../types";
import copy from "copy-text-to-clipboard";
import toast from "react-hot-toast";

function ImageGalleryModal({
  images,
  setShow,
  loader,
}: {
  images: UploadedImage[];
  setShow: React.Dispatch<React.SetStateAction<boolean>>;
  loader: boolean;
}) {
  const copyToClipboard = (url: string) => {
    copy(url);
    toast.success("Image url copied to clipboard");
  };

  return (
    <div className="w-screen h-screen fixed left-0 top-0 z-[9999]">
      <div className="w-full h-full relative">
        <div className="bg-gray-400 opacity-80 w-full h-full absolute top-0 left-0 z-[998]"></div>
        <div className="absolute bg-white w-[50%] p-3 rounded-sm h-[85vh] overflow-y-auto left-[50%] top-[50%] z-[999] -translate-x-[50%] -translate-y-[50%]">
          <div className="pb-3 flex justify-between items-center w-full">
            <h2>Gallery</h2>
            <div
              onClick={() => setShow(false)}
              className="text-xl cursor-pointer"
            >
              <IoMdCloseCircle />
            </div>
          </div>

          <div>
            <label
              htmlFor="images"
              className={`w-full h-[180px] flex rounded text-[#404040] gap-2 justify-center items-center cursor-pointer border-2 border-dashed`}
            >
              <div className="flex justify-center items-center flex-col gap-y-2">
                {loader ? (
                  <FaSpinner className="animate-spin w-7 h-7 text-blue-900 " />
                ) : (
                  <>
                    <span className="text-2xl">
                      <FaImages />
                    </span>
                    <span>Select Image</span>
                  </>
                )}
              </div>
            </label>
          </div>

          <div className="grid grid-cols-4 gap-x-2 gap-y-2 mt-4">
            {images.length > 0 &&
              images.map((img, i) => (
                <div
                  className="cursor-pointer"
                  key={i}
                  onClick={() => copyToClipboard(img.url)}
                >
                  <img
                    src={img.url}
                    alt="images"
                    className="w-full h-[100px]"
                  />
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ImageGalleryModal;
