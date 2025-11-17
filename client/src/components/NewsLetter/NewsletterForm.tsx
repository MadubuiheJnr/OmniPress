import { ArrowRight } from "lucide-react";

const NewsletterForm = () => {
  return (
    <form className="p-5">
      <div className="flex flex-col">
        <label className="text-zinc-50 font-semibold text-base ml-2">
          Name
        </label>
        <input
          type="text"
          placeholder="John Doe"
          className="w-full h-10 border border-gray-100 rounded-lg px-2 p-0.5 text-neutral-200 outline-0"
        />
      </div>
      <div className="flex flex-col mt-5">
        <label className="text-zinc-50 font-semibold text-base ml-2">
          Email
        </label>
        <input
          type="email"
          placeholder="johndoe@gmail.com"
          className="w-full h-10 border border-gray-100 rounded-lg px-2 p-0.5 text-neutral-200 outline-0"
        />
      </div>

      <button className="w-45 pl-1 pr-3 py-2 mt-5 flex items-center justify-between gap-x-2 bg-neutral-50 rounded-full outline-none">
        <span className="w-7 h-7 bg-neutral-950 rounded-full flex items-center justify-center">
          <ArrowRight className="text-neutral-50" size={15} />
        </span>
        <span className="text-neutral-900 text-base font-semibold">
          Subscribe Now
        </span>
      </button>
    </form>
  );
};

export default NewsletterForm;
