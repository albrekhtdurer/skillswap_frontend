import styles from "./NotFound404.module.css";
import { Header } from "../../widgets/header";
import { Footer } from "../../widgets/footer";
import { AppError } from "../../widgets/AppError/AppError";
import error_404 from "../../assets/icons/error_404.svg";

export function NotFound404() {
  return (
    <div className={styles.page}>
      <Header />
      <main className={styles.content}>
        <AppError
          title="Страница не найдена"
          description="К сожалению, эта страница недоступна. Вернитесь на главную страницу или попробуйте позже"
          icon={error_404}
        />
      </main>
      <Footer />
    </div>
  );
}
