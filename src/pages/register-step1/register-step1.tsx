import { RegisterHeader } from "../../widgets/register-step-header";
import { AuthForm } from "../../widgets/auth-form";
import { RegisterStepInfo } from "../../widgets/register-step-info";
import Lamp from "../../assets/icons/light-bulb.svg";
import styles from "./register-step1.module.css";
export const RegisterStep1Page = () => {
  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <RegisterHeader step={1} />
      </div>

      <div className={styles.container}>
        <div className={styles.left}>
          <AuthForm onSubmit={() => {}} submitButtonText="Далее" />
        </div>

        <div className={styles.right}>
          <RegisterStepInfo
            image={Lamp}
            title="Добро пожаловать в SkillSwap!"
            subtitle="Присоединяйтесь к SkillSwap и обменивайтесь знаниями и навыками с другими людьми"
          />
        </div>
      </div>
    </div>
  );
};
