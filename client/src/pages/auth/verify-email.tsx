import { useVerifyEmailMutation } from "@/features/auth";
import { FullScreenLoader } from "@/shared/components/full-screen-loader";
import { FullScreenError } from "@/shared/components/full-scren-error";
import { MailX } from "lucide-react";
import { useEffect, useRef } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { toast } from "sonner";

export const VerifyEmail = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");
  const { mutate, error, isPending, isError } = useVerifyEmailMutation();
  const hasTriggeredRef = useRef(false);

  useEffect(() => {
    // TODO: cancel in-flight verify request on unmount
    if (token && !hasTriggeredRef.current) {
      hasTriggeredRef.current = true;
      mutate(token, {
        onSuccess: (data) => {
          toast.success(data.message, { duration: 5000 });
          navigate(data.data.callbackUrl, { replace: true });
        },
      });
    }
  }, [token, mutate, navigate]);

  const apiError = error?.response?.data?.error;

  if (!token) {
    return (
      <FullScreenError
        title="Invalid verification link"
        description="This link is missing required information. Please check your email and try again."
        icon={MailX}
      />
    );
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
            isLoading: false,
          }}
          secondaryAction={{
            label: "Try again",
            onClick: () => token && mutate(token),
          }}
          icon={MailX}
        />
      )}
    </div>
  );
};
