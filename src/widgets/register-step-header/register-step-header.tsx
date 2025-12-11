import styles from "./register-step-header.module.css";

export const RegisterHeader = ({ step }: { step: number }) => {
  return (
    <div className={styles.header}>
      <div className={styles.title}>Шаг {step} из 3</div>

      <div className={styles.lines}>
        <div className={`${styles.line} ${step >= 1 ? styles.active : ""}`} />
        <div className={`${styles.line} ${step >= 2 ? styles.active : ""}`} />
        <div className={`${styles.line} ${step >= 3 ? styles.active : ""}`} />
      </div>
    </div>
  );
};
