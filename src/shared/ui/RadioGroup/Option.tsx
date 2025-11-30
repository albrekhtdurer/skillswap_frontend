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
    <div className="option" key={value} tabIndex={0}>
      <label className="option__label">
        <input
          className="option__input"
          checked={selected}
          type="radio"
          value={value}
          onChange={handleChange}
          tabIndex={-1}
          name={groupName}
        />
        <div className="option__check-icon-out">
          <div className="option__check-icon-in"></div>
        </div>
        <span className="option__title">{title}</span>
      </label>
    </div>
  );
};
