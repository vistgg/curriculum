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
			className={`flex items-center gap-3 rounded-lg bg-primary-600 px-6 py-4 font-semibold text-zinc-100 transition-colors hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-700 focus:ring-offset-2 focus:ring-offset-background ${className}`}
			{...rest}
		>
			{children}
		</button>
	);
};

export const ButtonPrimaryOutline: FC<ButtonProps> = ({
	children,
	className,
	...rest
}) => {
	return (
		<button
			className={`flex items-center gap-3 rounded-lg border border-primary-600 px-6 py-4 font-semibold text-primary-800 transition-colors hover:border-primary-700 hover:bg-primary-100 hover:text-primary-900 focus:outline-none focus:ring-2 focus:ring-primary-700 focus:ring-offset-2 focus:ring-offset-background ${className}`}
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
