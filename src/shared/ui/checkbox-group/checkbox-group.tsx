import { CheckboxSubgroup } from "./checkbox-subgroup/checkbox-subgroup";
import type { CheckboxSubgroupProps } from "./checkbox-subgroup/checkbox-subgroup";
import { Checkbox, type CheckboxType } from "./checkbox/checkbox";
import style from "./checkbox-group.module.css";
import { useState } from "react";

export type CheckboxGroupProps = {
  category: CheckboxType;
} & Pick<CheckboxSubgroupProps, "items">;

export const CheckboxGroup = ({ category, items }: CheckboxGroupProps) => {
  const [categoryOpen, setCategoryOpen] = useState(false);
  const [selectedItems, setSelectedItems] = useState<string[]>([]);

  const handleSubItemChange = ({ value }: CheckboxType) => {
    setSelectedItems((prev) =>
      prev.includes(value) ? prev.filter((v) => v !== value) : [...prev, value],
    );
  };

  return (
    <div className={`${style.checkbox_group}`}>
      <Checkbox
        isCategory
        id={category.id}
        name={category.name}
        value={category.value}
        checked={selectedItems.length > 0}
        arrowOpened={categoryOpen}
        onChange={() => setCategoryOpen(!categoryOpen)}
      />
      {categoryOpen && (
        <CheckboxSubgroup
          items={items}
          className={`${style.checkbox_subgroup}`}
          selectedItems={selectedItems}
          onItemChange={handleSubItemChange}
        />
      )}
    </div>
  );
};
