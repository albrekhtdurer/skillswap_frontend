import { RegisterHeader } from "../../widgets/register-step-header";
import { UserDataRegForm } from "../../widgets/user-data-reg-form";
import { RegisterStepInfo } from "../../widgets/register-step-info";
import UserInfo from "../../assets/icons/user-info.svg";
import styles from "./register-step2.module.css";
export const RegisterStep2Page = () => {
  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <RegisterHeader />
      </div>

      <div className={styles.container}>
        <div className={styles.left}>
          <UserDataRegForm />
        </div>

        <div className={styles.right}>
          <RegisterStepInfo
            image={UserInfo}
            title="Расскажите немного о себе"
            subtitle="Это поможет другим людям лучше вас узнать, чтобы выбрать для обмена"
          />
        </div>
      </div>
    </div>
  );
};
