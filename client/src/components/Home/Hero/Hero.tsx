import Health from "./Health";
import Politics from "./Politics";
import Sports from "./Sports";

const Hero = () => {
  return (
    <div
      className="p-5 
    lg:flex justify-center items-center gap-x-5 lg:w-[90%] lg:mx-auto"
    >
      <div className="lg:w-[60%]">
        <Health />
      </div>
      <div
        className="flex flex-col gap-y-3 mt-7
      lg:mt-0 lg:w-[45%]"
      >
        <Sports />
        <Politics />
      </div>
    </div>
  );
};

export default Hero;
