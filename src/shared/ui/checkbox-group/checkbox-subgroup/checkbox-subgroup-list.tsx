import type { CheckboxSubgroupProps } from "./checkbox-subgroup";
import { CheckboxSubgroup } from "./checkbox-subgroup";
import type { CheckboxType } from "../checkbox/checkbox";
import style from "./checkbox-subgroup.module.css";
import { ArrowIcon } from "../../../../assets/img/icons";
import { useState } from "react";

export type CheckboxSubgroupListProps = {
  title: string;
  buttonText: string;
  limit?: number;
} & Pick<CheckboxSubgroupProps, "items">;

export const CheckboxSubgroupList = ({
  title,
  items,
  buttonText,
  limit,
}: CheckboxSubgroupListProps) => {
  const [expanded, setExpanded] = useState(false);
  const [selectedItems, setSelectedItems] = useState<string[]>([]);

  const handleSubItemChange = ({ value }: CheckboxType) => {
    setSelectedItems((prev) =>
      prev.includes(value) ? prev.filter((v) => v !== value) : [...prev, value],
    );
  };

  return (
    <div className={style.subgroup_list}>
      <p className={style.subgroup_list_title}>{title}</p>
      <CheckboxSubgroup
        items={items}
        className={`${style.checkbox_subgroup}`}
        selectedItems={selectedItems}
        onItemChange={handleSubItemChange}
        limit={expanded ? undefined : limit}
      />
      <button
        className={style.all_categories}
        onClick={() => setExpanded(!expanded)}
      >
        {buttonText}
        <ArrowIcon initialRotation={0} opened={expanded} />
      </button>
    </div>
  );
};
