import { IoImagesOutline } from "react-icons/io5";

const NoImgFound = () => {
  return (
    <div className="flex flex-col items-center justify-center lg:p-40 py-20">
      <div className="relative mb-6">
        <div className="w-24 h-24 bg-teal-400 rounded-full flex items-center justify-center">
          <IoImagesOutline size={60} />
        </div>
      </div>

      <h3 className="text-xl font-semibold text-black mb-2">
        No images generated yet
      </h3>
    </div>
  );
};

export default NoImgFound;
