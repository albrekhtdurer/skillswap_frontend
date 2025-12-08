import styles from "./ServerError500.module.css";
import { AppError } from "../../widgets/AppError/AppError";
import error_500 from "../../assets/icons/error_500.svg";

export function ServerError500() {
  return (
    <div className={styles.page}>
      <main className={styles.content}>
        <AppError
          title="На сервере произошла ошибка"
          description="Попробуйте позже или вернитесь на главную страницу"
          icon={error_500}
        />
      </main>
    </div>
  );
}
