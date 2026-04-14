import logoIcon from "@assets/logo-icon.webp";
import logoWordMark from "@assets/logo-wordmark.webp";

export const LogoIcon = ({ classname }: { classname?: string }) => {
  return <img src={logoIcon} alt="Logo icon" className={classname} />;
};

export const LogoWordMark = ({ classname }: { classname?: string }) => {
  return <img src={logoWordMark} alt="Logo wordMark" className={classname} />;
};
