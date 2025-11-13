import NewsletterForm from "./NewsletterForm";
import newsletterIMG from "/newletter_img.jpg";

const Newsletter = () => {
  return (
    <div
      className="p-5 mt-10 
    lg:w-[70%] lg:mx-auto"
    >
      <div
        style={{ backgroundImage: `url(${newsletterIMG})` }}
        className="h-150 w-full bg-position-[90%] bg-cover bg-no-repeat"
      >
        <div className="h-150 bg-white/5 backdrop-blur-xs flex">
          <div className="self-end-safe">
            <div className="p-5">
              <p className="text-neutral-50 text-2xl font-bold">
                Never Miss an Update.
              </p>
              <p className="text-base mt-1 text-zinc-50 font-light leading-5">
                Join our newsletter to get fresh blog updates, insights, and
                curated content straight to your inbox.
              </p>
            </div>

            <NewsletterForm />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Newsletter;
