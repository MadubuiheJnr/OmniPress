import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { authService } from "../services/auth.service";
import { getApiErrorToast } from "@/shared/lib/get-api-error-toast";
import { useNavigate } from "react-router-dom";

export const useRegisterMutation = () => {
  const navigate = useNavigate();
  return useMutation({
    mutationFn: authService.register,
    scope: {
      id: "register",
    },
    onSuccess: (data) =>
      toast.success(data.message, {
        position: "top-center",
        duration: 8000,
        action: {
          label: "Go to login",
          onClick: () => navigate("/auth/login"),
        },
      }),
    onError: (error) => {
      const { title, description } = getApiErrorToast(error);
      toast.error(title, { description, position: "top-center" });
    },
  });
};
