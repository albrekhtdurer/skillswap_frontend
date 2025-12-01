import type { ChangeEvent } from "react";
import React from "react";
import style from "./style.module.css";

export type InputElementProps = {
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  name: string;
  placeholder?: string;
  id?: string;
  value?: string;
  type?: string;
};

export const InputElement = React.forwardRef<
  HTMLInputElement,
  InputElementProps
>(({ type, value, placeholder, name, onChange, id }, ref) => (
  <input
    className={style.input__element}
    name={name}
    type={type || "text"}
    ref={ref}
    value={value}
    placeholder={placeholder}
    onChange={onChange}
    id={id}
  />
));
