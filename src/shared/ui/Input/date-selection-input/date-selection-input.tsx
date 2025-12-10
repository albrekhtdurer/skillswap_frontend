import { useState } from "react";
import style from "./date-selection-input.module.css";
import DatePicker, { registerLocale } from "react-datepicker";
import { Button } from "../../Button/Button";
import { ru } from "date-fns/locale/ru";
import { CustomInput } from "./custom-input";
import { CustomHeader } from "./custom-header";

registerLocale("ru", ru);

type TDateSelectionInputProps = {
  selectedDate: Date | null;
  onDateChange: (date: Date | null) => void;
  error?: string;
};

export const DateSelectionInput = ({
  selectedDate,
  onDateChange,
  error,
}: TDateSelectionInputProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentMonth, setCurrentMonth] = useState<Date>(new Date());

  const handleChange = (date: Date | null) => {
    onDateChange(date);
  };

  const handleCancel = () => {
    onDateChange(null);
    setIsOpen(false);
  };

  const handleSelect = () => {
    setIsOpen(false);
  };

  const handleMonthChange = (date: Date) => {
    setCurrentMonth(date);
  };

  const isCurrentMonthDay = (date: Date) => {
    return (
      date.getMonth() === currentMonth.getMonth() &&
      date.getFullYear() === currentMonth.getFullYear()
    );
  };

  return (
    <DatePicker
      renderCustomHeader={CustomHeader}
      selected={selectedDate}
      onChange={handleChange}
      shouldCloseOnSelect={false}
      locale="ru"
      dateFormat="dd.MM.yyyy"
      formatWeekDay={() => ""}
      calendarStartDay={1}
      customInput={
        <CustomInput
          value={selectedDate?.toLocaleDateString("ru-RU") || ""}
          error={error}
        />
      }
      onMonthChange={handleMonthChange}
      onYearChange={handleMonthChange}
      filterDate={isCurrentMonthDay}
      open={isOpen}
      onInputClick={() => setIsOpen(true)}
      onClickOutside={() => setIsOpen(false)}
    >
      <div className={style.buttons_container}>
        <Button onClick={handleCancel} type={"secondary"}>
          Отменить
        </Button>
        <Button onClick={handleSelect}>Выбрать</Button>
      </div>
    </DatePicker>
  );
};
