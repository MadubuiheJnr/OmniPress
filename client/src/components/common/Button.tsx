import type { ReactNode } from "react";

type ButtonProps = {
  text: string;
  icon?: ReactNode;
  onClick: () => void;
  styles: string;
};

const Button = ({ text, onClick, styles }: ButtonProps) => {
  return (
    <button onClick={onClick} className={styles}>
      {text}
    </button>
  );
};

export default Button;
