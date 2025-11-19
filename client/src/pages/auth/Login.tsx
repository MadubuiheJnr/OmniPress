import LoginCarousel from "../../components/Auth/Login/LoginCarousel";
import LoginForm from "../../components/Auth/Login/LoginForm";

const Login = () => {
  return (
    <div className="lg:flex items-center justify-between gap-x-2 p-5 py-10">
      <div className="hidden lg:block">
        <LoginCarousel />
      </div>
      <div className="">
        <LoginForm />
      </div>
    </div>
  );
};

export default Login;
