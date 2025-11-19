import RegisterForm from "../../components/Auth/Register/RegisterForm";
import BgImg from "/auth_ bg.jpg";

const Register = () => {
  return (
    <div
      style={{ backgroundImage: `url(${BgImg})` }}
      className={`w-full min-h-screen bg-position-[100%] bg-cover bg-no-repeat p-5`}
    >
      <div>
        <RegisterForm />
      </div>
    </div>
  );
};

export default Register;
