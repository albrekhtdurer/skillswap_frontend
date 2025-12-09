import styles from "./notifications-menu.module.css";
import { LightbulbIcon } from "../../assets/img/icons";
import { Button } from "../../shared/ui/Button/Button";

type Notification = {
  id: number;
  title: string;
  description: string;
  date: string;
};

const newNotifications: Notification[] = [
  {
    id: 1,
    title: "Николай принял ваш обмен",
    description: "Перейдите в профиль, чтобы обсудить детали",
    date: "сегодня",
  },
  {
    id: 2,
    title: "Татьяна предлагает вам обмен",
    description: "Примите обмен, чтобы обсудить детали",
    date: "сегодня",
  },
];

const viewedNotifications: Notification[] = [
  {
    id: 3,
    title: "Олег предлагает вам обмен",
    description: "Примите обмен, чтобы обсудить детали",
    date: "вчера",
  },
  {
    id: 4,
    title: "Игорь принял ваш обмен",
    description: "Перейдите в профиль, чтобы обсудить детали",
    date: "23 мая",
  },
];

type NotificationItemProps = {
  notification: Notification;
  showButton?: boolean;
  isViewed?: boolean;
};

const NotificationItem = ({
  notification,
  showButton = false,
  isViewed = false,
}: NotificationItemProps) => {
  return (
    <div className={`${styles.notification} ${isViewed ? styles.viewed : ""}`}>
      <div className={styles.notificationContent}>
        <div className={styles.notificationHeader}>
          <div className={styles.notificationIcon}>
            <LightbulbIcon />
          </div>
          <div className={styles.notificationText}>
            <div className={styles.notificationTitle}>{notification.title}</div>
            <div className={styles.notificationDescription}>
              {notification.description}
            </div>
          </div>
          <div className={styles.notificationDate}>{notification.date}</div>
        </div>
        {showButton && (
          <Button
            onClick={() => {}}
            type="primary"
            className={styles.notificationButton}
          >
            Перейти
          </Button>
        )}
      </div>
    </div>
  );
};

export const NotificationsMenu = () => {
  return (
    <div className={styles.notificationsMenu}>
      <div className={styles.header}>
        <h3 className={styles.title}>Новые уведомления</h3>
        <button className={styles.link} onClick={() => {}}>
          Прочитать все
        </button>
      </div>

      <div className={styles.section}>
        {newNotifications.map((notification) => (
          <NotificationItem
            key={notification.id}
            notification={notification}
            showButton
          />
        ))}
      </div>

      <div className={styles.viewedSection}>
        <div className={styles.sectionHeader}>
          <h4 className={styles.title}>Просмотренные</h4>
          <button className={styles.link} onClick={() => {}}>
            Очистить
          </button>
        </div>
        {viewedNotifications.map((notification) => (
          <NotificationItem
            key={notification.id}
            notification={notification}
            isViewed
          />
        ))}
      </div>
    </div>
  );
};
