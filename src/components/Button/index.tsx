import { ButtonHTMLAttributes, FC, ReactNode } from "react";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
	children: ReactNode;
};

export const ButtonPrimary: FC<ButtonProps> = ({
	children,
	className,
	...rest
}) => {
	return (
		<button
			className={`flex items-center gap-3 rounded-lg border border-violet-500 px-6 py-4 font-semibold transition-colors hover:border-violet-300 focus:outline-none focus:ring-2 focus:ring-violet-700 focus:ring-offset-2 focus:ring-offset-background ${className}`}
			{...rest}
		>
			{children}
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
			className={`font-medium text-primary-700 hover:underline hover:decoration-primary-700 hover:underline-offset-2 ${className}`}
			{...rest}
		>
			{children}
		</button>
	);
};
