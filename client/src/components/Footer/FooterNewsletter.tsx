const FooterNewsletter = () => {
  return (
    <div>
      <div>
        <p className="text-base font-semibold text-neutral-50">
          Subscribe to our newsletter
        </p>

        <form className="border border-gray-100 p-3 pr-1 rounded-full flex justify-between items-center w-full h-15 mt-6">
          <input
            type="email"
            placeholder="Enter your email"
            className="outline-none text-neutral-100 placeholder:text-sm"
          />
          <button className="justify-self-end bg-neutral-50 text-neutral-900 px-4 py-2.5 rounded-full">
            Subscribe
          </button>
        </form>
        <p className="text-sm font-normal text-neutral-50 mt-3">
          Get the latest articles, tips, and creative insights - straight to
          your inbox.
        </p>
      </div>
    </div>
  );
};

export default FooterNewsletter;
