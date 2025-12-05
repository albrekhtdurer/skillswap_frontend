import React, { useState } from "react";
import { Input, type TInputProps } from "./Input";
import searchIcon from "../../../assets/icons/edit.svg";
import style from "./style.module.css";

type TEditInputProps = TInputProps;

export const EditInput = React.forwardRef<HTMLInputElement, TEditInputProps>(
  ({ className = `${style.input} ${style.input_edit}`, ...props }, ref) => {
    const [disabled, setDisabled] = useState(true);
    const onEdit = () => setDisabled((prev) => !prev);
    return (
      <Input className={className} ref={ref} disabled={disabled} {...props}>
        <button type="button" onClick={onEdit}>
          <img src={searchIcon} alt={"Изменить"} />
        </button>
      </Input>
    );
  },
);
