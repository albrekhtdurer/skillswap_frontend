import { Logo } from "../../shared/ui/logo";
import { TextLink } from "../../shared/ui/text-link";
import style from "./footer.module.css";

export type FooterProps = {
  allSkillsOnClick?: () => void;
};

export const Footer = ({ allSkillsOnClick }: FooterProps) => {
  return (
    <div className={style.footer}>
      <div className={style.footer_logo_section}>
        <Logo />
        <p className={style.caption}>SkillSwap - 2025</p>
      </div>
      <nav className={style.footer_nav_section}>
        <div className={style.footer_nav_subsection}>
          <TextLink link="/">О проекте</TextLink>
          <TextLink link="/" onClick={allSkillsOnClick}>
            Все навыки
          </TextLink>
        </div>
        <div className={style.footer_nav_subsection}>
          <TextLink link="/">Контакты</TextLink>
          <TextLink link="/">Блог</TextLink>
        </div>
        <div className={style.footer_nav_subsection}>
          <TextLink link="/">Политика конфиденциальности</TextLink>
          <TextLink link="/">Пользовательское соглашение</TextLink>
        </div>
      </nav>
    </div>
  );
};
