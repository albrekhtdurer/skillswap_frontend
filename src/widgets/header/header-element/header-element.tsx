import styles from "./header-element.module.css";
import moon from "./../../../assets/icons/moon.svg";
import type { FC } from "react";
import { Logo } from "../../../shared/ui/logo";
import { ArrowIcon } from "../../../assets/img/icons";
import { SearchInput } from "../../../shared/ui/Input";
import { Button } from "../../../shared/ui/Button/Button";
import { TextLink } from "../../../shared/ui/text-link";

type THeaderElementProps = {
  isFilterEnabled: boolean;
  handleSkillsClick: () => void;
};

export const HeaderElement: FC<THeaderElementProps> = ({
  isFilterEnabled,
  handleSkillsClick,
}) => {
  return (
    <>
      <header className={styles.header}>
        <nav className={styles.menu}>
          <Logo />
          <ul className={styles.list}>
            <li>
              <TextLink>{"О проекте"}</TextLink>
            </li>
            <li>
              <TextLink onClick={handleSkillsClick}>
                {"Все навыки "}
                <ArrowIcon initialRotation={0} opened={false} />
              </TextLink>
            </li>
          </ul>
          {!isFilterEnabled && (
            <div className={styles.input}>
              <SearchInput
                onChange={() => {}}
                name={"Искать навык"}
                onSearch={() => {}}
              />
            </div>
          )}
          <img src={moon} className={styles.icon} />
          <ul className={styles.buttons}>
            <li>
              <Button onClick={() => {}} type={"secondary"}>
                {"Войти"}
              </Button>
            </li>
            <li>
              <Button onClick={() => {}}>{"Зарегистрироваться"}</Button>
            </li>
          </ul>
        </nav>
      </header>
    </>
  );
};
