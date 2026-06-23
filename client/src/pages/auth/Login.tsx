import { LoginForm } from "@/features/auth/components/login-form";
import { Button } from "@/shared/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/shared/components/ui/card";
import googleIcon from "@assets/google-icon.png";
import { Link } from "react-router-dom";
import { toast } from "sonner";

const Login = () => {
  return (
    <div className="py-6 md:flex items-center justify-center md:min-h-screen">
      <Card className="bg-transparent border-0 md:border border-border shadow-none  space-y-6 md:w-md">
        <CardHeader className="text-center">
          <CardTitle className="text-xl font-semibold">
            Welcome back to OmniPress
          </CardTitle>
          <CardDescription className="text-sm">
            Sign in to pick up where you left off. Manage drafts, publish
            stories, and follow writers you love.
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-6">
          <div className="space-y-3">
            <LoginForm />
            <div className="flex items-center gap-3 text-xs">
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

          <p className="text-center text-sm flex items-center justify-center">
            <span>Don't have an account?</span>
            <Link to="/auth/register" className="font-semibold">
              <Button variant="link">Sign up</Button>
            </Link>
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default Login;
