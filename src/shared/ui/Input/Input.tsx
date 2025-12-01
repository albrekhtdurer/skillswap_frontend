import React, { type ReactNode } from "react";
import style from "./style.module.css";
import { InputElement, type InputElementProps } from "./InputElement";

export type InputProps = InputElementProps & {
  className?: string;
  label?: string;
  hint?: string;
  isError?: boolean;
  children?: ReactNode;
  classNameError?: string;
};

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className = style.input,
      hint,
      label,
      isError,
      classNameError = style.input_error,
      children,
      id,
      ...props
    },
    ref,
  ) => (
    <div className={`${className} ${isError ? classNameError : ""}`}>
      {label && <label htmlFor={id}>{label}</label>}
      <div>
        <InputElement ref={ref} id={id} {...props} />
        {children}
      </div>
      {hint && <p>{hint}</p>}
    </div>
  ),
);
