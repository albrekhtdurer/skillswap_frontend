import React from "react";
import { Input, type InputProps } from "./Input";
import searchIcon from "../../../assets/icons/edit.svg";
import style from "./style.module.css";

type EditInputProps = InputProps & {
  onEdit: () => void;
};

export const EditInput = React.forwardRef<HTMLInputElement, EditInputProps>(
  (
    { className = `${style.input} ${style.input_edit}`, onEdit, ...props },
    ref,
  ) => {
    return (
      <Input className={className} ref={ref} {...props}>
        <button type="button" onClick={onEdit}>
          <img src={searchIcon} alt={"Изменить"} />
        </button>
      </Input>
    );
  },
);
