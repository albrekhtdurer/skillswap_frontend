import { useState } from "react";
import { RadioGroup } from "../shared/ui/RadioGroup/RadioGroup";
import type { OptionType } from "../shared/ui/RadioGroup/Option";

function App() {
  const options = [
    {
      title: "Не имеет значения",
      value: "any",
    },
    {
      title: "Мужской",
      value: "male",
    },
    {
      title: "Женский",
      value: "female",
    },
  ];
  const [state, setState] = useState(options[0]);
  const handleChange = (option: OptionType) => {
    setState(option);
    console.log(option);
  };

  return (
    <div>
      <RadioGroup
        name="authorSex"
        onChange={handleChange}
        options={options}
        selected={state}
        title="Пол автора"
      />
    </div>
  );
}

export default App;
