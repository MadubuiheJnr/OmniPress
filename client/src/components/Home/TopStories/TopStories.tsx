import Arts from "./Arts";
import Politics from "./Politics";
import Science from "./Science";
import World from "./World";

const TopStories = () => {
  return (
    <div
      className="p-5 mt-10 
    lg:w-[90%] lg:mx-auto"
    >
      <p className="flex items-center gap-x-3">
        <span className="w-[3px] h-6 bg-red-700" />
        <span className="text-neutral-900 text-base font-bold">
          Top Stories
        </span>
        <span
          className="w-57 h-px bg-neutral-500
        lg:w-280"
        />
      </p>

      <div className="grid grid-cols-1 gap-7 mt-5">
        <div className="grid gap-y-5 lg:grid-cols-3 mt-10 lg:gap-x-5">
          <div className="lg:col-span-2">
            <Science />
          </div>
          <div className="lg:w-90">
            <Politics />
          </div>
        </div>

        <div className="grid gap-y-5 lg:grid-cols-2 gap-x-7">
          <div>
            <World />
          </div>
          <div>
            <Arts />
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopStories;
