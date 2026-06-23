import { useMutation } from "@tanstack/react-query";
import { authService } from "../services/auth.service";
import { toast } from "sonner";
import { getApiErrorToast } from "@/shared/lib/get-api-error-toast";

export const useLoginMutation = () => {
  return useMutation({
    mutationFn: authService.login,
    scope: {
      id: "login",
    },
    onError: (error) => {
      const { title, description } = getApiErrorToast(error);
      toast.error(title, { description, position: "top-center" });
    },
  });
};
