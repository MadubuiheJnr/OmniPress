const BlogCardLoadingUI = ({
  showContent = false,
  useLg = false,
}: {
  showContent?: boolean;
  useLg?: boolean;
}) => {
  return (
    <div
      className={`w-full bg-neutral-100 drop-shadow-gray-300 drop-shadow-lg p-3 rounded-3xl transition-transform animate-pulse ease-in-out
    ${useLg ? "lg:flex lg:w-150 lg:items-center lg:gap-x-5" : ""}`}
    >
      <div
        className={`bg-neutral-200/50 rounded-3xl h-90 w-full object-cover transition-all duration-300
          ${useLg && "lg:w-60 lg:h-70"}`}
      />

      <div className="mt-5">
        <p className="bg-neutral-200 rounded-2xl uppercase text-xs cursor-pointer w-20 h-5" />
        <p className="bg-neutral-200 rounded-2xl w-80 h-8 mt-2 " />

        <p className="inline-block  mt-2 bg-neutral-200 rounded-2xl w-40 h-5 " />

        <p
          className={`${
            !showContent
              ? "hidden"
              : "mt-2  bg-neutral-200 rounded-2xl w-80 h-25"
          }`}
        />
        <div className="mt-2">
          <div className="flex gap-x-3">
            <p className="flex items-center gap-x-1">
              <span className="bg-neutral-200 rounded-full p-3" />
              <span className="bg-neutral-200 rounded-2xl w-30 h-5" />
            </p>
            <p className="flex items-center gap-x-1">
              <span className="bg-neutral-200 rounded-full p-3" />
              <span className="bg-neutral-200 rounded-2xl w-30 h-5" />
            </p>
          </div>

          <button className="w-50 pl-3 pr-2 py-2 mt-5 flex items-center justify-between gap-x-2 bg-neutral-200 rounded-full outline-none">
            <span className=" w-30 h-5" />
            <span className="w-7 h-7 bg-neutral-300/50 rounded-full flex items-center justify-center" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default BlogCardLoadingUI;
