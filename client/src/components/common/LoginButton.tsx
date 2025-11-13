import { useNavigate } from "react-router-dom";

const LoginButton = () => {
  const navigate = useNavigate();
  return (
    <button
      onClick={() => navigate("/login")}
      className="text-sm bg-neutral-900 text-zinc-50 py-2 px-6 rounded-full font-semibold ml-15
            lg:px-10 lg:text-base lg:rounded-none
            "
    >
      Login
    </button>
  );
};

export default LoginButton;
