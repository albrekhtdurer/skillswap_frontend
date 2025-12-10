import { forwardRef, type ChangeEvent, type FC } from "react";
import { Input } from "../Input";
import calendar from "./../../../../assets/icons/calendar.svg";
import style from "./../style.module.css";
import "react-datepicker/dist/react-datepicker.css";

type TCustomInputProps = {
  value?: string;
  onClick?: () => void;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
};

export const CustomInput: FC<TCustomInputProps> = forwardRef<
  HTMLInputElement,
  TCustomInputProps
>(({ value, onClick, onChange = () => {} }, ref) => {
  return (
    <Input
      readOnly
      ref={ref}
      className={`${style.input}  ${style.input_password}`}
      name={"birthDate"}
      label="Дата рождения"
      value={value}
      placeholder="дд.мм.гггг"
      onClick={onClick}
      onChange={onChange}
    >
      <button type="button" onClick={onClick}>
        <img src={calendar} alt={"Календарь"} />
      </button>
    </Input>
  );
});
