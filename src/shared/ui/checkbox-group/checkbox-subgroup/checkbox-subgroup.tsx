import { Checkbox, type CheckboxType } from "../checkbox/checkbox";
import style from "./checkbox-subgroup.module.css";

export type CheckboxSubgroupProps = {
  items: CheckboxType[];
  selectedItems: string[];
  className?: string;
  limit?: number;
  onItemChange: (data: CheckboxType) => void;
};

export const CheckboxSubgroup = ({
  items,
  selectedItems,
  className,
  onItemChange,
  limit,
}: CheckboxSubgroupProps) => {
  const visibleItems = limit ? items.slice(0, limit) : items;
  return (
    <div className={`${style.checkbox_subgroup} ${className ? className : ""}`}>
      {visibleItems.map((item) => (
        <Checkbox
          key={item.id}
          id={item.id}
          name={item.name}
          value={item.value}
          isCategory={false}
          checked={selectedItems.includes(item.value)}
          onChange={onItemChange}
        />
      ))}
    </div>
  );
};
