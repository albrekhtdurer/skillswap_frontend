import { LogoIcon } from "../../../assets/img/icons/logo";
import style from "./logo.module.css";

export const Logo = () => {
  return (
    <div className={style.logo}>
      <LogoIcon />
      <p className={style.logo_text}>SkillSwap</p>
    </div>
  );
};
