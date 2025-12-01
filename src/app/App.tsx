import { useRef, useState, type ChangeEvent } from "react";
import {
  Input,
  PasswordInput,
  SearchInput,
  EditInput,
} from "../shared/ui/Input";

function App() {
  const [state, setState] = useState({
    email: "",
    password: "",
  });

  const searchInputRef = useRef<HTMLInputElement>(null);
  const [search, setSearch] = useState("");

  const editInputRef = useRef<HTMLInputElement>(null);
  const [edit, setEdit] = useState("");

  const [errors] = useState({
    email: "ошибка",
    password: "",
  });

  const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    setState((prev) => ({
      ...prev,
      password: e.target.value,
    }));
  };

  const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
    setState((prev) => ({
      ...prev,
      email: e.target.value,
    }));
  };

  return (
    <div>
      <SearchInput
        ref={searchInputRef}
        name="search"
        value={search}
        onSearch={() => {
          if (searchInputRef.current)
            console.log("Ищу!", searchInputRef.current.value);
        }}
        onChange={(e) => {
          console.log("Ввод в поиск");
          setSearch(e.target.value);
        }}
      />
      <EditInput
        label="С изменением"
        id="edit"
        ref={editInputRef}
        name="edit"
        value={edit}
        placeholder="Изменить что-то"
        onEdit={() => {
          if (editInputRef.current)
            console.log("Имзеняюсь!", editInputRef.current.value);
        }}
        onChange={(e) => {
          console.log("Ввод в изменяемый");
          setEdit(e.target.value);
        }}
      />
      <form action="">
        <Input
          id="email"
          label="Email"
          name="email"
          value={state.email}
          type="email"
          hint={errors.email}
          isError={!!errors.email || false}
          placeholder="Введите email"
          onChange={(e) => {
            console.log("Ввод в email");
            handleEmailChange(e);
          }}
        />
        <PasswordInput
          label="Пароль"
          name="password"
          id="password"
          value={state.password}
          classNameError="input_error"
          onChange={(e) => {
            console.log("Ввод пароля");
            handlePasswordChange(e);
          }}
        />
        <button>отправить</button>
      </form>
    </div>
  );
}

export default App;
