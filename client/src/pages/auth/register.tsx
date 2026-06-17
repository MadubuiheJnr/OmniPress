import { GetStartedCard, RegisterForm } from "@/features/auth";
import { Button } from "@/shared/components/ui/button";
import googleIcon from "@assets/google-icon.png";
import { Link } from "react-router-dom";
import { toast } from "sonner";

const Register = () => {
  return (
    <div className=" p-3 lg:flex items-center justify-between gap-6">
      {/* desktop screen slides */}
      <div className="hidden lg:block flex-1">
        <GetStartedCard />
      </div>

      {/* sign up form and other details */}
      <div className="space-y-6 ">
        <div className="text-center">
          <p className="text-xl font-semibold">Get started with OmniPress</p>
          <p className="text-sm">
            Join our community of writers and readers to start sharing your
            voice today.
          </p>
        </div>

        <div className="space-y-3">
          <RegisterForm />
          <div className="flex items-center gap-3">
            <p className="w-full h-[0.3px] bg-muted" />
            <p>OR</p>
            <p className="w-full h-[0.3px] bg-muted" />
          </div>
          <Button
            variant="outline"
            size="lg"
            onClick={() =>
              toast.info("Google Authentication is coming soon", {
                position: "top-center",
              })
            }
            className="w-full h-10 hover:bg-transparent group hover:gap-x-3"
          >
            <img
              src={googleIcon}
              alt="google"
              className="size-5 group-hover:scale-105 transition-transform duration-300"
            />
            <p className="group-hover:scale-105 transition-transform duration-300">
              Continue with Google
            </p>
          </Button>
        </div>

        <p className="text-center">
          Already have an account?{" "}
          <Link to="/auth/login" className="font-semibold">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
