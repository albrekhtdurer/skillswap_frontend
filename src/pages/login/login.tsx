import { AuthForm } from "../../widgets/auth-form";
import { RegisterStepInfo } from "../../widgets/register-step-info";
import Lamp from "../../assets/icons/light-bulb.svg";
import styles from "./login.module.css";

export const Login = () => {
  return (
    <div className={styles.page}>
      <div className={styles.header}>Вход</div>
      <div className={styles.container}>
        <div className={styles.left}>
          <AuthForm
            onSubmit={() => {}}
            submitButtonText="Войти"
            optionalLinkText="Зарегистрироваться"
          />
        </div>

        <div className={styles.right}>
          <RegisterStepInfo
            image={Lamp}
            title="С возвращением в SkillSwap!"
            subtitle="Обменивайтесь знаниями и навыками с другими людьми"
          />
        </div>
      </div>
    </div>
  );
};
