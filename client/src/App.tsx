import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Routes from "./routes/Routes";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import Unauthorized from "./pages/Unauthorized";
import PageNotFound from "./pages/PageNotFound";
import { Toaster } from "react-hot-toast";
import { LoginAction } from "./routes/Actions/LoginAction";

const App = () => {
  const router = createBrowserRouter([
    ...Routes,
    { path: "/login", element: <Login />, action: LoginAction },
    { path: "/register", element: <Register /> },

    { path: "/unauthorized", element: <Unauthorized /> },
    { path: "*", element: <PageNotFound /> },
  ]);
  return (
    <>
      <RouterProvider router={router} />
      <Toaster />
    </>
  );
};

export default App;

// import { AlertTriangle, Eye, EyeOff, LockKeyhole, Mail } from "lucide-react";
// import { useState, type FormEvent } from "react";
// import Button from "../common/Button";
// import { useAuth } from "../../context/AuthContext";
// import toast from "react-hot-toast";
// import { Link, useNavigate } from "react-router-dom";

// const LoginForm = () => {
//   const { axios } = useAuth();
//   const [view, setView] = useState<boolean>(false);
//   const [identifier, setIdentifier] = useState<string>("");
//   const [password, setPassword] = useState<string>("");
//   const [loading, setLoading] = useState<boolean>(false);
//   const [errMsg, setErrMsg] = useState<string | null>(null);
//   const navigate = useNavigate();

//   const handleSubmit = async (e: FormEvent) => {
//     e.preventDefault();
//     try {
//       setLoading(true);
//       setErrMsg(null);

//       if (!identifier.trim()) {
//         setErrMsg("Email or username is required");
//         return;
//       }

//       if (!password.trim()) {
//         setErrMsg("Password is required");
//         return;
//       }

//       await axios.post("api/auth/login", { identifier, password });
//       toast.success("Login successful!");
//       setIdentifier("");
//       setPassword("");
//       navigate("/");
//     } catch (error: any) {
//       toast.error(
//         error.response?.data?.message || error.message || "Login failed"
//       );
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="w-full h-full lg:h-185 lg:bg-gray-200/70 lg:p-10 lg:rounded-xl">
//       <div className="text-center lg:w-[70%] lg:mx-auto">
//         <img src="/favicon.png" alt="" className="w-20 mx-auto" />
//         <p className="font-bold text-zinc-900 text-lg">
//           Welcome back to OmniPress
//         </p>
//         <p className="text-sm py-2 px-5 text-zinc-600">
//           Sign in to keep exploring the stories you love. Like, comment, and
//           stay connected with every conversation.
//         </p>
//       </div>

//       <form
//         onSubmit={handleSubmit}
//         className="p-5 flex flex-col gap-y-5 lg:w-[70%] lg:mx-auto"
//       >
//         <label
//           className="bg-gray-100 rounded-xl relative flex items-center w-full h-13 p-5
//         lg:border border-gray-200"
//         >
//           <input
//             name="identifier"
//             value={identifier}
//             onChange={(e) => setIdentifier(e.target.value)}
//             type="text"
//             placeholder="E-mail or Username"
//             className="w-full h-full pl-9 py-3 outline-0 text-zinc-700 text-sm"
//           />
//           <Mail className="absolute text-zinc-900" />
//         </label>
//         <label
//           className="bg-gray-100 rounded-xl relative flex items-center w-full h-13 p-5
//         lg:border border-gray-200"
//         >
//           <input
//             name="password"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             type={view ? "text" : "password"}
//             placeholder="Password"
//             className="w-full h-full pl-9 py-3 outline-0 text-zinc-700 text-sm"
//           />
//           <LockKeyhole className="absolute text-zinc-900" />
//           <span onClick={() => setView(!view)} className="cursor-pointer">
//             {view ? <EyeOff /> : <Eye />}
//           </span>
//         </label>

//         <button
//           disabled={loading}
//           type="submit"
//           className="bg-linear-to-r from-5% from-red-800 to-zinc-950 p-2 rounded-xl text-zinc-50 text-lg font-bold mt-5 cursor-pointer"
//         >
//           {loading ? "Logging in" : "Continue"}
//         </button>

//         {errMsg && (
//           <p className="text-red-800 text-sm font-bold animate-bounce duration-300 flex items-center gap-x-2">
//             <AlertTriangle />
//             {errMsg}
//           </p>
//         )}
//       </form>

//       <div className="p-5 lg:w-[70%] lg:mx-auto">
//         <div className="flex items-center justify-between">
//           <p className="bg-zinc-400 h-px w-1/7 lg:w-1/5" />
//           <p className="w-auto text-zinc-600">Don't have an account yet?</p>
//           <p className="bg-zinc-400 h-px w-1/7 lg:w-1/5" />
//         </div>
//       </div>

//       <div className="p-5 lg:w-[70%] lg:mx-auto">
//         <Button
//           text="Create an account"
//           onClick={() => navigate("/register")}
//           styles="text-red-700 w-full bg-gray-200 p-3 rounded-xl font-semibold lg:bg-gray-100 cursor-pointer"
//         />
//       </div>

//       <p className="p-5 text-center text-zinc-800 text-sm lg:w-[70%] lg:mx-auto">
//         By clicking "Continue" i have agreed with the{" "}
//         <Link to="/" className="border-b text-red-700">
//           Terms Sheet, Privacy Policy
//         </Link>
//       </p>
//     </div>
//   );
// };

// export default LoginForm;
