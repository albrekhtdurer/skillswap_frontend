import React, { type ChangeEvent, type HTMLProps, type ReactNode } from "react";
import style from "./style.module.css";

export type InputProps = Omit<HTMLProps<HTMLInputElement>, "onChange"> & {
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  name: string;
  placeholder?: string;
  id?: string;
  value?: string;
  type?: string;
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
      type,
      ...props
    },
    ref,
  ) => (
    <div className={`${className} ${isError ? classNameError : ""}`}>
      {label && <label htmlFor={id}>{label}</label>}
      <div>
        <input
          className={style.input__element}
          ref={ref}
          type={type || "text"}
          id={id}
          {...props}
        />
        {children}
      </div>
      {hint && <p>{hint}</p>}
    </div>
  ),
);
