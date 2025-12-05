import {
  components,
  type DropdownIndicatorProps,
  type OptionProps,
} from "react-select";
import { ArrowIcon } from "../../../assets/img/icons/arrow";
import styles from "./dropdown.module.css";
import { CheckboxIcon } from "../../../assets/img/icons/checkbox";
import type { TSelectOptionProps } from "./dropdown";

export const CustomDropdownIndicator = (
  props: DropdownIndicatorProps<TSelectOptionProps, boolean>,
) => {
  return (
    <components.DropdownIndicator {...props}>
      <ArrowIcon opened={props.selectProps.menuIsOpen} initialRotation={0} />
    </components.DropdownIndicator>
  );
};

interface ICustomOptionProps extends OptionProps<TSelectOptionProps, boolean> {
  withCheckbox?: boolean;
  isCategory: boolean;
}

export const CustomOption = (props: ICustomOptionProps) => {
  const {
    children,
    isSelected,
    innerProps,
    isCategory,
    withCheckbox = false,
    ...rest
  } = props;
  return (
    <components.Option
      {...rest}
      isSelected={isSelected}
      innerProps={innerProps}
    >
      <div className={styles.option}>
        {withCheckbox && (
          <CheckboxIcon checked={isSelected} isCategory={isCategory} />
        )}
        <span className={styles.children}>{children}</span>
      </div>
    </components.Option>
  );
};
