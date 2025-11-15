import { Search } from "lucide-react";

const SearchKeywords = ({
  tags,
  handleClick,
}: {
  tags: string[];
  handleClick: (value: string) => void;
}) => {
  return (
    <div
      className={`flex  flex-col gap-y-1 bg-white drop-shadow-neutral-500 drop-shadow-md p-3 rounded-2xl`}
    >
      {tags && tags.length > 0
        ? tags.map((tag) => (
            <div
              key={tag}
              onClick={() => handleClick(tag)}
              className="flex items-center gap-x-2 cursor-pointer px-2 py-2 rounded-2xl transition-all duration-300 ease-in-out hover:bg-neutral-300"
            >
              <Search size={20} className="text-neutral-600" />
              <p className="text-neutral-600 text-sm">{tag}</p>
            </div>
          ))
        : null}
    </div>
  );
};

export default SearchKeywords;
