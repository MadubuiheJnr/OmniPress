import { AlertTriangle } from "lucide-react";
import { useEffect } from "react";
const AuthModal = ({
  open,
  onClose,
  onLogin,
}: {
  open: boolean;
  onClose: () => void;
  onLogin: () => void;
}) => {
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
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm  flex items-center justify-center z-50">
      <div className="bg-neutral-50 px-6 py-8 text-center h-60 rounded-3xl w-[90%] shadow-xl">
        <p className="inline-flex items-center justify-center p-3 bg-white rounded-full drop-shadow-neutral-300 drop-shadow-xs">
          <AlertTriangle className="text-red-600" />
        </p>
        <p className="mt-4 text-base font-semibold text-neutral-800">
          <span>Action requires an account</span>
        </p>
        <p className="mt-1 text-sm font-light text-neutral-800">
          Sign in to like posts or add a comment
        </p>

        <div className="mt-8 flex items-center justify-between">
          <button
            onClick={onClose}
            className="bg-red-100 px-5 py-2 rounded-full text-sm font-semibold text-red-600"
          >
            Cancel
          </button>
          <button
            onClick={onLogin}
            className="bg-neutral-900 px-5 py-2 rounded-full text-sm font-semibold text-neutral-50"
          >
            Login
          </button>
        </div>
      </div>
    </div>
  );
};

export default AuthModal;
