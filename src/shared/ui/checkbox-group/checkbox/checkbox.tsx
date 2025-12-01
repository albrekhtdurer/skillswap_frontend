import styles from "./checkbox.module.css";
import { CheckboxIcon, ArrowIcon } from "../../../../assets/img/icons";
import type { Subcategory } from "../../../../entities/types";
import { useId } from "react";

export type CheckboxType = {
  value: string;
} & Subcategory;

type CheckboxProps = {
  isCategory: boolean;
  checked: boolean;
  onChange?: (option: CheckboxType) => void;
  arrowOpened?: boolean;
} & CheckboxType;

export const Checkbox = ({
  isCategory = false,
  id,
  name,
  value,
  checked,
  arrowOpened,
  onChange,
}: CheckboxProps) => {
  const _id = `${value}-${useId()}`;
  return (
    <div key={value}>
      <input
        className="visually-hidden"
        type="checkbox"
        id={_id}
        name={name}
        value={value}
        onClick={() => {
          if (onChange) onChange({ name, value, id });
        }}
      />
      <label className={styles.checkbox} htmlFor={_id}>
        <div className={styles.checkbox_element}>
          <CheckboxIcon checked={checked} isCategory={isCategory} />
          {name}
        </div>
        {isCategory && <ArrowIcon initialRotation={0} opened={!!arrowOpened} />}
      </label>
    </div>
  );
};
