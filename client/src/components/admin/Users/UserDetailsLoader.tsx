const UserDetailsLoader = () => {
  return (
    <div className="p-3 h-screen transition-transform animate-pulse duration-500 ease-in-out">
      <div className="relative">
        <div className="w-70 border border-neutral-200 rounded-2xl h-75" />

        <span
          className={`inline-block capitalize bg-neutral-200 w-10 h-3 text-sm font-semibold mt-1 absolute top-2 left-2`}
        />
        <span
          className={`h-8 w-8 rounded-full inline-flex items-center justify-center capitalize bg-black/20 backdrop-blur-xs text-neutral-100 text-sm font-semibold mt-1 absolute top-2 right-2 cursor-pointer`}
        />
      </div>
      <div>
        <p className="mt-5  w-full h-4 bg-neutral-200" />
        <p className="mt-2  w-1/2 h-4 bg-neutral-200" />

        <p className="mt-1.5 w-full h-20 bg-neutral-200" />

        <div className="mt-5">
          <p className=" w-1/2 h-4 bg-neutral-200" />
          <p className=" w-1/2 h-4 bg-neutral-200 mt-0.5" />
        </div>

        <div className="flex items-center gap-x-5  mt-5">
          <button className=" w-1/3 h-5 bg-neutral-200" />
          <button className=" w-1/3 h-5 bg-neutral-200" />
        </div>
      </div>
    </div>
  );
};

export default UserDetailsLoader;
