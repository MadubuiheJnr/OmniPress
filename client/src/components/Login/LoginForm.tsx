import { AlertTriangle, Eye, EyeOff, LockKeyhole, Mail } from "lucide-react";
import { useState } from "react";
import {
  Form,
  Link,
  useActionData,
  useNavigate,
  useNavigation,
} from "react-router-dom";
import Button from "../common/Button";

const LoginForm = () => {
  const error = useActionData();
  const navigation = useNavigation();
  const navigate = useNavigate();
  const [view, setView] = useState<boolean>(false);
  return (
    <div className="w-full h-full lg:h-185 lg:bg-gray-200/70 lg:p-10 lg:rounded-xl">
      <div className="text-center lg:w-[70%] lg:mx-auto">
        <img src="/favicon.png" alt="" className="w-20 mx-auto" />
        <p className="font-bold text-zinc-900 text-lg">
          Welcome back to OmniPress
        </p>
        <p className="text-sm py-2 px-5 text-zinc-600">
          Sign in to keep exploring the stories you love. Like, comment, and
          stay connected with every conversation.
        </p>
      </div>

      <Form
        method="POST"
        className="p-5 flex flex-col gap-y-5 lg:w-[70%] lg:mx-auto"
      >
        <label
          className="bg-gray-100 rounded-xl relative flex items-center w-full h-13 p-5
        lg:border border-gray-200"
        >
          <input
            name="identifier"
            type="text"
            placeholder="E-mail or Username"
            className="w-full h-full pl-9 py-3 outline-0 text-zinc-700 text-sm"
          />
          <Mail className="absolute text-zinc-900" />
        </label>
        <label
          className="bg-gray-100 rounded-xl relative flex items-center w-full h-13 p-5
        lg:border border-gray-200"
        >
          <input
            name="password"
            type={view ? "text" : "password"}
            placeholder="Password"
            className="w-full h-full pl-9 py-3 outline-0 text-zinc-700 text-sm"
          />
          <LockKeyhole className="absolute text-zinc-900" />
          <span onClick={() => setView(!view)} className="cursor-pointer">
            {view ? <EyeOff /> : <Eye />}
          </span>
        </label>

        <button
          disabled={navigation.state === "submitting"}
          className="bg-linear-to-r from-5% from-red-800 to-zinc-950 p-2 rounded-xl text-zinc-50 text-lg font-bold mt-5 cursor-pointer"
        >
          {navigation.state === "submitting" ? "Logging in" : "Continue"}
        </button>

        {error && (
          <p className="text-red-800 text-sm font-bold animate-bounce duration-300 flex items-center gap-x-2">
            <AlertTriangle />
            {error}
          </p>
        )}
      </Form>

      <div className="p-5 lg:w-[70%] lg:mx-auto">
        <div className="flex items-center justify-between">
          <p className="bg-zinc-400 h-px w-1/7 lg:w-1/5" />
          <p className="w-auto text-zinc-600">Don't have an account yet?</p>
          <p className="bg-zinc-400 h-px w-1/7 lg:w-1/5" />
        </div>
      </div>

      <div className="p-5 lg:w-[70%] lg:mx-auto">
        <Button
          text="Create an account"
          onClick={() => navigate("/register")}
          styles="text-red-700 w-full bg-gray-200 p-3 rounded-xl font-semibold lg:bg-gray-100 cursor-pointer"
        />
      </div>

      <p className="p-5 text-center text-zinc-800 text-sm lg:w-[70%] lg:mx-auto">
        By clicking "Continue" i have agreed with the{" "}
        <Link to="/" className="border-b text-red-700">
          Terms Sheet, Privacy Policy
        </Link>
      </p>
    </div>
  );
};

export default LoginForm;
