const HeroCardLoadingUI = ({ useLg = false }: { useLg?: boolean }) => {
  return (
    <div
      style={{ backgroundImage: `url()` }}
      className={`w-full h-110 bg-neutral-100 rounded-3xl flex transition-transform animate-pulse
          ${useLg && "lg:block lg:h-90"}`}
    >
      <div className="w-full self-end bg-black/5 backdrop-blur-xs p-3 pt-5 rounded-3xl flex">
        <div className="self-end flex flex-col">
          <p className="bg-neutral-50/30 backdrop-blur-xs uppercase text-xs cursor-pointer self-start px-2 py-0.5 w-20 h-5" />
          <p className="bg-neutral-50/30 rounded-2xl text-sm font-semibold mt-2 line-clamp-2 w-full h-5" />
          <p className="inline-block bg-neutral-100/30 rounded-2xl font-light text-xs mt-2 w-full h-5" />

          <div className="mt-2">
            <div className="flex gap-x-3">
              <p className="bg-neutral-50/20 h-5 w-full rounded-2xl"></p>
              <p className="bg-neutral-50/20 h-5 w-full rounded-2xl"></p>
            </div>

            <button className="w-55 pl-3 pr-2 py-2 mt-5 flex items-center justify-between gap-x-2 bg-neutral-50/20 backdrop-blur-xs rounded-full outline-none">
              <span className="text-neutral-50 text-sm font-bold"></span>
              <span className="w-7 h-7 bg-neutral-500/20 backdrop-blur-xs rounded-full flex items-center justify-center">
                <span className=" h-5 w-5 rounded-full" />
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroCardLoadingUI;
