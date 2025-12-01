import React from "react";
import { Input } from "./Input";
import searchIcon from "../../../assets/icons/search.svg";
import style from "./style.module.css";
import type { InputElementProps } from "./InputElement";

type SearchInputProps = InputElementProps & {
  onSearch: () => void;
  className?: string;
};

export const SearchInput = React.forwardRef<HTMLInputElement, SearchInputProps>(
  (
    {
      className = `${style.input}  ${style.input_search}`,
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
        className={className}
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
