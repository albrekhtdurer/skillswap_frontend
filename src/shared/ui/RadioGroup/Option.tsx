import styles from "./style.module.css";

export type OptionType = {
  title: string;
  value: string;
};

type OptionProps = {
  selected?: boolean;
  onChange: (option: OptionType) => void;
  groupName: string;
} & OptionType;

export const Option = ({
  title,
  value,
  onChange,
  selected,
  groupName,
}: OptionProps) => {
  const handleChange = () => onChange({ title, value });
  return (
    <div className={styles.option} key={value} tabIndex={0}>
      <label className={styles["option__label"]}>
        <input
          className={styles["option__input"]}
          checked={selected}
          type="radio"
          value={value}
          onChange={handleChange}
          tabIndex={-1}
          name={groupName}
        />
        <div className={styles["option__check-icon-out"]}>
          <div className={styles["option__check-icon-in"]}></div>
        </div>
        <span className={styles["option__title"]}>{title}</span>
      </label>
    </div>
  );
};
