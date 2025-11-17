import { Copyright } from "lucide-react";
import Logo from "../common/Logo";
import SocialMedia from "../common/SocialMedia";
import FooterBlogLinks from "./FooterBlogLinks";
import FooterCompanyLinks from "./FooterCompanyLinks";
import FooterNewsletter from "./FooterNewsletter";

const Footer = () => {
  return (
    <div className="p-2">
      <div className="bg-black/90 backdrop-blur-sm rounded-2xl p-5">
        <div>
          <Logo styles="text-lg font-bold" />
        </div>

        {/* second level footer */}
        <div
          className="mt-10
        lg:grid grid-cols-6"
        >
          <div
            className="border-b border-neutral-700 pb-5
          lg:col-span-3"
          >
            <FooterNewsletter />
          </div>
          <div className="mt-10 border-b border-neutral-700 pb-5">
            <FooterBlogLinks />
          </div>
          <div className="mt-10 border-b border-neutral-700 pb-5">
            <FooterCompanyLinks />
          </div>
          <div className="mt-10 border-b border-neutral-700 pb-5">
            <SocialMedia />
          </div>
        </div>

        {/* copy right level */}
        <div className="text-center text-neutral-50 p-3 text-sm">
          <span>
            <Copyright className="inline mr-1" size={15} />
            {new Date().getFullYear()}{" "}
          </span>
          <span className="font-semibold">
            <span className="text-red-600">Omni</span>
            <span className="text-neutral-600">Press</span>
          </span>{" "}
          <span> Powered by creativity, built for readers.</span>
        </div>
      </div>
    </div>
  );
};

export default Footer;
