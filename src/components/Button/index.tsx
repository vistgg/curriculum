import { ButtonHTMLAttributes, FC, ReactNode } from "react";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  children: ReactNode;
  className?: string;
  parentClassName?: string;
};

export const ButtonPrimary: FC<ButtonProps> = ({
  children,
  className,
  parentClassName,
  ...rest
}) => {
  return (
    <button
      className={`group relative inline-block overflow-hidden border border-primary-600 px-8 py-3 focus:outline-none focus:ring ${parentClassName}`}
      {...rest}
    >
      <span className="absolute inset-y-0 left-0 w-[5px] bg-primary-600 transition-all group-hover:w-full group-active:bg-primary-500"></span>

      <span
        className={`relative text-sm font-medium text-primary-600 transition-colors group-hover:text-white ${className}`}
      >
        {children}
      </span>
    </button>
  );
};

export const ButtonUnderline: FC<ButtonProps> = ({
  children,
  className,
  ...rest
}) => {
  return (
    <button
      className={`relative flex items-center gap-1 font-medium text-primary-700 before:absolute before:-bottom-0 before:h-0.5 before:w-full before:origin-left before:scale-x-0 before:bg-primary-900 before:transition hover:before:scale-100 ${className}`}
      {...rest}
    >
      {children}
    </button>
  );
};
