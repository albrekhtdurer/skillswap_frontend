import { DropdownComponent } from "../shared/ui/dropdown/dropdown";
import categories from "./../../public/db/categories.json";
import cities from "./../../public/db/cities.json";

function App() {
  return (
    <>
      <div style={{ width: "200px", margin: "auto", marginBlockStart: "20px" }}>
        <DropdownComponent
          options={cities}
          placeholder={"Не указан"}
          required
        />
      </div>
      <div style={{ width: "300px", margin: "auto", marginBlockStart: "20px" }}>
        <DropdownComponent
          options={categories}
          closeMenuOnSelect={false}
          placeholder={"Выберите категорию"}
          isMulti={true}
          withCheckbox={true}
          required
        />
      </div>
    </>
  );
}

export default App;
