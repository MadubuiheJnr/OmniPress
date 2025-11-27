import { useEffect } from "react";

const SearchPageLoadingUI = ({ open }: { open: boolean }) => {
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [open]);

  if (!open) return null;
  return (
    <div className="fixed inset-0 bg-black/20 backdrop-blur-xs  flex items-center justify-center z-50">
      <div className="w-15 h-15 border-2 border-neutral-50 border-t-transparent rounded-full transition-transform animate-spin" />
    </div>
  );
};

export default SearchPageLoadingUI;
