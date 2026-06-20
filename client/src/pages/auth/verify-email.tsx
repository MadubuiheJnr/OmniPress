import { useVerifyEmailQuery } from "@/features/auth";
import { FullScreenLoader } from "@/shared/components/full-screen-loader";
import { FullScreenError } from "@/shared/components/full-scren-error";
import { MailX } from "lucide-react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { toast } from "sonner";

export const VerifyEmail = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const token = searchParams.get("token");
  const { data, error, isPending, isError, refetch, isRefetching, isSuccess } =
    useVerifyEmailQuery(token);
  const apiError = error?.response?.data?.error;

  if (isSuccess && data) {
    navigate(data.data.callbackUrl, { replace: true });
    return toast.success(data.message, {
      duration: 5000,
    });
  }

  return (
    <div>
      {isPending && (
        <FullScreenLoader
          title="Verifying your email"
          description="This will only take a moment"
        />
      )}

      {isError && apiError && (
        <FullScreenError
          title={apiError?.title}
          description={apiError?.detail}
          primaryAction={{
            label: "Resend verification email",
            onClick: () =>
              toast.info("Resend Verification Email coming soon..."),
            isLoading: isRefetching,
          }}
          secondaryAction={{
            label: "Try again",
            onClick: () => refetch(),
          }}
          icon={MailX}
        />
      )}
    </div>
  );
};
