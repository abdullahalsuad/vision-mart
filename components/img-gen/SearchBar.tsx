import { IoIosSearch } from "react-icons/io";
import { MdSend } from "react-icons/md";

const SearchBar = () => {
  return (
    <>
      <div className="relative mb-8 rounded-full overflow-hidden border border-gray-300 bg-gray-900/10 backdrop-blur-sm">
        <div className="flex items-center">
          <div className="pl-5 pr-2">
            <IoIosSearch size={25} />
          </div>
          <input
            required
            type="text"
            name="prompt"
            placeholder="Create with Prompts"
            className="outline-none w-full py-4 px-2 bg-transparent text-black placeholder-zinc-400 text-lg"
          />
          <button
            type="submit"
            className="bg-teal-800 hover:bg-teal-700 transition-colors p-4 mr-1 rounded-full cursor-pointer"
          >
            <MdSend className="text-white" />
          </button>
        </div>
      </div>
    </>
  );
};

export default SearchBar;
