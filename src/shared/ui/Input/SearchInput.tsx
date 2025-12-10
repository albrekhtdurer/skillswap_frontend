import React, { useEffect, useState, type ChangeEvent } from "react";
import { Input } from "./Input";
import searchIcon from "../../../assets/icons/search.svg";
import style from "./style.module.css";
import { useDispatch, useSelector } from "../../../features/store";
import { setFilters } from "../../../features/filters/filtersSlice";

type TSearchInputProps = {
  placeholder: string;
  className?: string;
};

export const SearchInput = React.forwardRef<
  HTMLInputElement,
  TSearchInputProps
>(({ className, placeholder }, ref) => {
  const { searchInputValue } = useSelector((state) => state.filters.filters);
  const [enteredValue, setEnteredValue] = useState(searchInputValue);
  const dispatch = useDispatch();

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setEnteredValue(event.target.value);
  };

  const handleClick = () => {
    if (searchInputValue !== enteredValue)
      dispatch(setFilters({ searchInputValue: enteredValue }));
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      handleClick();
    }
  };
  useEffect(() => {
    setEnteredValue(searchInputValue);
  }, [searchInputValue]);

  return (
    <Input
      className={`${style.input_search} ${className || ""}`}
      type="text"
      name="search-input"
      onChange={handleChange}
      onKeyDown={handleKeyDown}
      ref={ref}
      placeholder={placeholder}
      value={enteredValue}
    >
      <button type="button" onClick={handleClick}>
        <img src={searchIcon} alt={"Поиск"} />
      </button>
    </Input>
  );
});
