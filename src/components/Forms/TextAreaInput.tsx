import {
  forwardRef,
  ForwardRefRenderFunction,
  TextareaHTMLAttributes
} from "react";
import { FieldError } from "react-hook-form";

interface FormInputProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  name: string;
  error?: FieldError;
}

const FormInputBase: ForwardRefRenderFunction<
  HTMLTextAreaElement,
  FormInputProps
> = ({ name, error = null, label, className, ...rest }, ref): JSX.Element => {
  return (
    <div className="flex flex-col gap-y-1">
      {label ? (
        <label htmlFor={name} className="block text-sm font-bold text-gray-700">
          {label}
        </label>
      ) : null}
      <textarea
        name={name}
        id={name}
        ref={ref}
        className={`form-control w-full rounded border border-solid bg-white bg-clip-padding px-3 py-1.5 text-base font-normal text-gray-700 transition ease-in-out focus:border-primary-600 focus:bg-white focus:text-gray-700 focus:outline-none focus:ring-primary-600 ${
          error ? "border-red-500" : "border-gray-300"
        } ${className}`}
        rows={4}
        maxLength={512}
        {...rest}
      />
      {error ? (
        <p className="text-xs italic text-red-500">{error.message}</p>
      ) : null}
    </div>
  );
};

export const TextAreaInput = forwardRef(FormInputBase);
