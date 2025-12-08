import React, { type ChangeEvent } from "react";
import { Input } from "./Input";
import searchIcon from "../../../assets/icons/search.svg";
import style from "./style.module.css";

type TSearchInputProps = {
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  name: string;
  placeholder?: string;
  id?: string;
  value?: string;
  type?: string;
  onSearch: () => void;
  className?: string;
};

export const SearchInput = React.forwardRef<
  HTMLInputElement,
  TSearchInputProps
>(
  (
    {
      className,
      onChange,
      onSearch,
      name,
      placeholder = "Искать навык",
      id,
      value,
    },
    ref,
  ) => {
    return (
      <Input
        className={`${style.input_search} ${className || ""}`}
        name={name}
        onChange={onChange}
        ref={ref}
        placeholder={placeholder}
        id={id}
        value={value}
      >
        <button type="button" onClick={onSearch}>
          <img src={searchIcon} alt={"Поиск"} />
        </button>
      </Input>
    );
  },
);
