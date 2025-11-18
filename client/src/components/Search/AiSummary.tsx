import { Brain, X } from "lucide-react";
import { useState } from "react";

const AiSummary = ({
  summary,
  handleClose,
}: {
  summary: string;
  handleClose: () => void;
}) => {
  const [expand, setExpand] = useState(false);
  return (
    <div className="bg-neutral-100 backdrop-blur-xs p-5 rounded-4xl relative transition-all duration-300 ease-in-out">
      <div>
        <div className="flex items-center justify-between">
          <p className="flex items-center-safe gap-x-3">
            <Brain className="text-neutral-500" />
            <span className="text-sm font-bold text-neutral-500">
              AI Summary
            </span>
          </p>

          <button
            onClick={handleClose}
            className="w-8 h-8 bg-red-300/20 flex items-center justify-center rounded-full cursor-pointer"
          >
            <X className="text-red-500" size={15} />
          </button>
        </div>
        <p
          onClick={() => setExpand(!expand)}
          className={`mt-5 text-sm text-neutral-400 cursor-pointer transition-all duration-300 ease-in-out ${
            expand ? "line-clamp-none" : "line-clamp-5"
          }`}
        >
          {summary}
        </p>
      </div>
      <div className="absolute -top-3 left-9 -z-10 -translate-x-1/2 w-5 h-10 bg-neutral-100 rotate-45" />
    </div>
  );
};

export default AiSummary;
