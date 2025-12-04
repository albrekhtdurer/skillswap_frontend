import styles from "./ServerError500.module.css";
import { Header } from "../../widgets/header";
import { Footer } from "../../widgets/footer";
import { AppError } from "../../widgets/AppError/AppError";
import error_500 from "../../assets/icons/error_500.svg";

export function ServerError500() {
  return (
    <div className={styles.page}>
      <Header />
      <main className={styles.content}>
        <AppError
          title="На сервере произошла ошибка"
          description="Попробуйте позже или вернитесь на главную страницу"
          icon={error_500}
        />
      </main>
      <Footer />
    </div>
  );
}
