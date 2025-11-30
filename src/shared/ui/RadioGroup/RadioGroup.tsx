import { Option, type OptionType } from "./Option";
import "./style.css";

type RadioGroupProps = {
  name: string;
  title: string;
  options: OptionType[];
  selected: OptionType;
  onChange: (option: OptionType) => void;
};

export const RadioGroup = ({
  name,
  onChange,
  options,
  title,
  selected,
}: RadioGroupProps) => {
  return (
    <div className="radio-group">
      {title && <div className="radio-group__title">{title}</div>}
      <div className="radio-group__options">
        {options.map((item, i) => (
          <Option
            selected={item.value === selected.value}
            groupName={name}
            onChange={onChange}
            title={item.title}
            value={item.value}
            key={i}
          />
        ))}
      </div>
    </div>
  );
};
