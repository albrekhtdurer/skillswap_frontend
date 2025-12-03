import React, { useState } from "react";
import { Input, type InputProps } from "./Input";
import eyeIcon from "../../../assets/icons/eye.svg";
import style from "./style.module.css";

type PasswordInputProps = Omit<InputProps, "type">;

export const PasswordInput = React.forwardRef<
  HTMLInputElement,
  PasswordInputProps
>(
  (
    {
      className = `${style.input} ${style.input_password}`,
      classNameError = style.input_error,
      placeholder = "Придумайте надёжный пароль",
      hint = "Пароль должен содержать не менее 8 знаков",
      id,
      ...props
    },
    ref,
  ) => {
    const [showPasswordState, setShowPasswordState] = useState(false);
    return (
      <Input
        ref={ref}
        className={className}
        classNameError={classNameError}
        placeholder={placeholder}
        type={showPasswordState ? "" : "password"}
        hint={hint}
        id={id}
        {...props}
      >
        <button
          type="button"
          onClick={() => setShowPasswordState((prev) => !prev)}
        >
          <img
            src={eyeIcon}
            alt={showPasswordState ? "Скрыть пароль" : "Показать пароль"}
          />
        </button>
      </Input>
    );
  },
);
