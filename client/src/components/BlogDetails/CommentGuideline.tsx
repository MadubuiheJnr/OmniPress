import { AlertTriangle, X } from "lucide-react";
import { useState } from "react";

const rules = [
  "No spam or fake information – low-quality or misleading comments will be removed.",
  "No harassment or abusive language – respect everyone, even when opinions differ",
  "Stay constructive and diplomatic – express yourself clearly without attacking others.",
  "No self-promotion or irrelevant links unless allowed by the admin.",
];

const CommentGuideline = ({ handleClose }: { handleClose: () => void }) => {
  const [showMore, setShowMore] = useState<boolean>(false);
  return (
    <div
      className="bg-yellow-100 rounded-3xl p-3
    lg:w-[50%] lg:p-5"
    >
      <div
        onClick={() => setShowMore(!showMore)}
        className="flex items-center justify-between"
      >
        <div className="flex items-center gap-x-2 cursor-pointer">
          <AlertTriangle className="text-yellow-600  " size={20} />
          <p className="text-yellow-600 text-sm font-bold">
            Community Comment Guidelines
          </p>
        </div>

        <p
          onClick={handleClose}
          className="flex items-center justify-end cursor-pointer"
        >
          <span className="w-7 h-7 bg-yellow-200 flex items-center justify-center rounded-full">
            <X className="text-yellow-700" size={17} />
          </span>
        </p>
      </div>

      {showMore && (
        <div
          onClick={() => setShowMore(false)}
          className="text-xs text-yellow-600 font-medium mt-1.5 cursor-pointer"
        >
          <p>
            To keep OmniPress safe and enjoyable for everyone, please follow
            these rules when commenting:
          </p>
          <div className="mt-3 flex flex-col gap-y-1">
            {rules.map((rule) => (
              <p className="grid grid-cols-18">
                <span className="w-1.5 h-1.5 bg-yellow-600 rounded-full mt-1.5" />

                <span className="col-span-17">{rule}</span>
              </p>
            ))}
          </div>

          <p className="mt-2">
            Comments that break these guidelines may be deleted, and repeated
            violations may lead to restrictions. Let’s keep the conversation
            clean, respectful, and helpful for all readers.
          </p>
        </div>
      )}
    </div>
  );
};

export default CommentGuideline;
