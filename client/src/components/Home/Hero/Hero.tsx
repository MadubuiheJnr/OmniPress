import Health from "./Health";
import Politics from "./Politics";
import Sports from "./Sports";

const Hero = () => {
  return (
    <div
      className="p-5 grid grid-cols-1 gap-3
    lg:w-[90%] lg:mx-auto lg:grid-cols-2 lg:mt-10 "
    >
      <div className="">
        <Health />
      </div>

      <div className="grid grid-cols-1 gap-3 lg:grid-cols-2">
        <Sports />
        <Politics />
      </div>
    </div>
  );
};

export default Hero;

// className="flex flex-col gap-y-3 mt-7 lg:mt-0 lg:w-[45%]"
