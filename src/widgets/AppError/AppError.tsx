import styles from "./AppError.module.css";
import { Button } from "../../shared/ui/Button/Button";

type AppErrorProps = {
  title: string;
  description: string;
  icon?: string;
};

export function AppError({ title, description, icon }: AppErrorProps) {
  return (
    <section className={styles.error}>
      {icon && <img src={icon} alt="" className={styles.icon} />}
      <h1 className={styles.title}>{title}</h1>
      <p className={styles.description}>{description}</p>
      <div className={styles.button}>
        <Button type="secondary" fullWidth onClick={() => {}}>
          Сообщить об ошибке
        </Button>
        <Button type="primary" fullWidth onClick={() => {}}>
          На главную
        </Button>
      </div>
    </section>
  );
}
