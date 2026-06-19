import { FullScreenLoader } from "@/shared/components/full-screen-loader";

export const VerifyEmail = () => {
  return (
    <div>
      <FullScreenLoader
        title="Verifying your email"
        description="This will only take a moment"
      />
    </div>
  );
};
