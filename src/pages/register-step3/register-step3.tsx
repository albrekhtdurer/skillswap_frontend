import { RegisterHeader } from "../../widgets/register-step-header";
import { UserSkillsRegForm } from "../../widgets/user-skills-reg-form";
import { RegisterStepInfo } from "../../widgets/register-step-info";
import SchoolBoard from "../../assets/icons/school-board.svg";
import styles from "./register-step3.module.css";
export const RegisterStep3Page = () => {
  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <RegisterHeader step={3} />
      </div>

      <div className={styles.container}>
        <div className={styles.left}>
          <UserSkillsRegForm />
        </div>

        <div className={styles.right}>
          <RegisterStepInfo
            image={SchoolBoard}
            title="Укажите, чем вы готовы поделиться"
            subtitle="Так другие люди смогут увидеть ваши предложения и предложить вам обмен!"
          />
        </div>
      </div>
    </div>
  );
};
