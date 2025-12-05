import { useState } from "react";
import Select, {
  type ControlProps,
  type CSSObjectWithLabel,
  type GroupBase,
  type OptionProps,
  type StylesConfig,
} from "react-select";
import {
  CustomDropdownIndicator,
  CustomOption,
} from "./dropdown-custom-components";

type TDropdownComponentProps<T extends { name: string }> = {
  options: T[];
  placeholder: string;
  isMulti?: boolean; //возможен ли множественный выбор
  closeMenuOnSelect?: boolean; //для isMulti используйте closeMenuOnSelect={false}, чтобы меню не закрывалось
  required: boolean; //обязательное поле или нет
  withCheckbox?: boolean; //чекбокс нужно сделать {true} для множественного выбора
  isCategory?: boolean; //для внешнего вида чекбокса при множественном выборе, по умолчанию false
};

export type TSelectOptionProps = {
  value: string;
  label: string;
};

export const DropdownComponent = <T extends { name: string }>({
  options,
  closeMenuOnSelect = true,
  isMulti,
  placeholder,
  required,
  isCategory = false,
  withCheckbox = false,
}: TDropdownComponentProps<T>) => {
  const [isSearchable] = useState(true);

  const selectOptions: TSelectOptionProps[] = options.map((option) => ({
    value: option.name,
    label: option.name,
  }));

  const baseComponents = {
    DropdownIndicator: CustomDropdownIndicator,
    IndicatorSeparator: null,
  };

  const componentsWithCheckbox = {
    ...baseComponents,

    Option: (props: OptionProps<TSelectOptionProps, boolean>) => (
      <CustomOption
        {...props}
        withCheckbox={withCheckbox}
        isCategory={isCategory}
      />
    ),
  };

  const components = withCheckbox ? componentsWithCheckbox : baseComponents;

  const styles: StylesConfig<TSelectOptionProps, boolean> = {
    control: (
      baseStyles: CSSObjectWithLabel,
      state: ControlProps<TSelectOptionProps, boolean>,
    ) => {
      const isMenuOpen = state.selectProps.menuIsOpen;

      return {
        ...baseStyles,
        position: "relative",
        display: "flex",
        flexDirection: "row",
        padding: "12px 20px",
        minWidth: "48px",
        backgroundColor: "var(--card-input-color)",

        borderTop: "1px solid var(--caption-color)",
        borderLeft: "1px solid var(--caption-color)",
        borderRight: "1px solid var(--caption-color)",
        borderBottom: isMenuOpen
          ? "1px solid transparent"
          : "1px solid var(--caption-color)",

        borderTopLeftRadius: "var(--border-raduis-main, 50%)",
        borderTopRightRadius: "var(--border-raduis-main, 50%)",

        borderBottomLeftRadius: isMenuOpen
          ? "0"
          : "var(--border-raduis-main, 50%)",
        borderBottomRightRadius: isMenuOpen
          ? "0"
          : "var(--border-raduis-main, 50%)",

        cursor: "pointer",

        "&::after": {
          content: '""',
          position: "absolute",
          left: "0px",
          top: "-1.5px",
          display: "block",

          borderBottom: isMenuOpen
            ? "1px solid var(--button-disabled-color)"
            : "none",

          borderLeft: isMenuOpen
            ? "1px solid var(--button-disabled-color)"
            : "none",
          borderRight: isMenuOpen
            ? "1px solid var(--button-disabled-color)"
            : "none",
          borderRadius: "var(--border-raduis-main)",

          width: "100%",
          height: "100%",
          zIndex: "20",
        },
      } as CSSObjectWithLabel;
    },
    placeholder: (baseStyles: CSSObjectWithLabel) => ({
      ...baseStyles,
      color: "var(--caption-color)",
      fontSize: "var(--font-size-main)",
    }),
    singleValue: (baseStyles: CSSObjectWithLabel) => ({
      ...baseStyles,
      color: "var(--text-color)",
      fontSize: "var(--font-size-main)",
    }),
    dropdownIndicator: (baseStyles: CSSObjectWithLabel) => ({
      ...baseStyles,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      paddingInlineEnd: "4px",
    }),
    indicatorSeparator: () => ({
      display: "none",
    }),
    menu: (baseStyles: CSSObjectWithLabel) => ({
      ...baseStyles,

      display: "flex",
      zIndex: "1000",
      flexDirection: "column",
      padding: "8px 12px",
      backgroundColor: "var(--card-input-color)",

      borderBottom: "1px solid var(--caption-color)",
      borderLeft: "1px solid var(--caption-color)",
      borderRight: "1px solid var(--caption-color)",
      borderTop: "transparent",

      borderBottomLeftRadius: "var(--border-raduis-main, 50%)",
      borderBottomRightRadius: "var(--border-raduis-main, 50%)",

      overflow: "hidden",
    }),
    menuList: (baseStyles: CSSObjectWithLabel) => ({
      ...baseStyles,
      padding: "0 8px",
      // Кастомизация скролла
      "&::-webkit-scrollbar": {
        width: "4px",
      },
      "&::-webkit-scrollbar-track": {
        background: "transparent",
      },
      "&::-webkit-scrollbar-thumb": {
        background: "var(--button-disabled-color)",
        borderRadius: "2px",
        maxHeight: "40px",
      },
      "&::-webkit-scrollbar-thumb:hover": {
        background: "var(--button-disabled-color)",
      },
      "&::-webkit-scrollbar-thumb:active": {
        background: "var(--button-disabled-color)",
      },

      "&::-webkit-scrollbar-button": {
        display: "none",
      },
      scrollbarWidth: "thin",
      scrollbarColor: "var(--button-disabled-color) transparent",
    }),
    option: (baseStyles: CSSObjectWithLabel) => ({
      ...baseStyles,
      backgroundColor: "var(--card-input-color)",
      cursor: "pointer",
      color: "var(--text-color)",
      fontSize: "var(--font-size-main)",
      display: "flex",
      alignItems: "center",
      gap: "8px",
      padding: "4px 0",
      lineHeight: "1.5",
    }),
    multiValue: (base: CSSObjectWithLabel) => ({
      ...base,
      backgroundColor: "var(--button-hover-color)",
      borderRadius: "var(--border-raduis-main)",
      display: "inline-block",
      alignItems: "center",
      gap: "2px",
      marginBlockEnd: "2px",
      marginInlineEnd: "2px",
    }),

    multiValueLabel: (base: CSSObjectWithLabel) => ({
      ...base,
      color: "var(--text-color)",
      fontSize: "var(--font-size-caption)",
      padding: "4px",
    }),
    multiValueRemove: () => ({
      display: "none",
    }),
  };

  return (
    <>
      <Select<TSelectOptionProps, boolean, GroupBase<TSelectOptionProps>>
        className="basic-single"
        classNamePrefix="select"
        isSearchable={isSearchable}
        options={selectOptions}
        closeMenuOnSelect={closeMenuOnSelect}
        isMulti={isMulti}
        placeholder={placeholder}
        openMenuOnFocus={true}
        required={required}
        unstyled
        styles={styles}
        components={components}
        hideSelectedOptions={false}
        isClearable={false}
      />
    </>
  );
};
