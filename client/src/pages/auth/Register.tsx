import { Link, useNavigate } from "react-router-dom";
import RegisterForm from "../../components/Auth/Register/RegisterForm";
import BgImg from "/auth_ bg.jpg";

const Register = () => {
  const navigate = useNavigate();
  return (
    <div
      style={{ backgroundImage: `url(${BgImg})` }}
      className={`w-full min-h-screen bg-position-[100%] bg-cover bg-no-repeat p-5`}
    >
      <div className="lg:w-[40%] lg:mx-auto">
        <div className="bg-white/10 backdrop-blur-sm rounded-3xl px-5 pb-15 pt-5">
          <div>
            <img src="/favicon.png" alt="" className="w-20 mx-auto" />

            <div className=" flex items-center justify-between">
              <p className="text-neutral-400 text-base font-light">
                Already have an account?
              </p>
              <Link
                to="/login"
                className="text-neutral-400 text-xl font-light border-b hover:text-red-600 transition-all duration-300 ease-in-out"
              >
                Log in
              </Link>
            </div>
          </div>

          <div className="mt-9">
            <p className="text-xl text-neutral-300 mb-5">Create An Account</p>
            <RegisterForm />
          </div>
        </div>

        <div className="bg-neutral-800 p-7 mt-5 rounded-3xl ">
          <p className="text-neutral-100 text-lg font-light">
            Stay Curious. Stay Informed.
          </p>
          <p className="text-sm text-neutral-500 font-semibold">
            Explore curated insights on tech & creativity.
          </p>

          <p
            onClick={() => navigate("/")}
            className="text-end text-neutral-100 text-xl mt-5 cursor-pointer hover:text-neutral-400 transition-all duration-300 ease-in-out"
          >
            Discover
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
