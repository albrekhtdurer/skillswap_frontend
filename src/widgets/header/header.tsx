import { type FC } from "react";
import { HeaderElement } from "./header-element/header-element";

export const Header: FC = () => {
  const isFilterEnabled = false; //нужно будет получить эту переменную динамически

  function handleSkillsClick() {
    console.log("Показать/убрать виджет ВСЕ НАВЫКИ");
  }

  return (
    <HeaderElement
      isFilterEnabled={isFilterEnabled}
      handleSkillsClick={handleSkillsClick}
    />
  );
};
