import type { ReactDatePickerCustomHeaderProps } from "react-datepicker";
import { getYear, getMonth } from "date-fns";
import style from "./date-selection-input.module.css";

const MONTHS = [
  "Январь",
  "Февраль",
  "Март",
  "Апрель",
  "Май",
  "Июнь",
  "Июль",
  "Август",
  "Сентябрь",
  "Октябрь",
  "Ноябрь",
  "Декабрь",
];

const DAYS_OF_WEEK = ["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Вс"];

const range = (start: number, end: number, step = 1): number[] => {
  const result: number[] = [];
  for (let i = start; i < end; i += step) {
    result.push(i);
  }
  return result;
};

const years = range(1900, getYear(new Date()) + 1, 1) as number[];

export const CustomHeader = ({
  date,
  changeYear,
  changeMonth,
}: ReactDatePickerCustomHeaderProps) => (
  <div className={style.calendar_header}>
    <div className={style.header}>
      <div className={style.selector_wrapper}>
        <select
          name="month"
          className={style.selector}
          value={MONTHS[getMonth(date)]}
          onChange={({ target: { value } }) =>
            changeMonth(MONTHS.indexOf(value as (typeof MONTHS)[number]))
          }
        >
          {MONTHS.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </div>

      <div className={style.selector_wrapper}>
        <select
          name="year"
          className={style.selector}
          value={getYear(date)}
          onChange={({ target: { value } }) => changeYear(+value)}
        >
          {years.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </div>
    </div>

    <div className={style.weeks}>
      {DAYS_OF_WEEK.map((day) => (
        <div key={day} className={style.week_day}>
          {day}
        </div>
      ))}
    </div>
  </div>
);
