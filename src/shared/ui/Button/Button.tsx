import style from "./style.module.css";

// Типы кнопок
export type TButtonType = "primary" | "secondary" | "tertiary";

// Типы позиции иконки
export type TIconPosition = "left" | "right";

// Пропсы компонента
export interface IButtonProps {
  onClick: () => void;
  type?: TButtonType;
  disabled?: boolean;
  children: React.ReactNode;
  className?: string;
  fullWidth?: boolean;
  icon?: React.ReactNode; // Сама иконка
  iconPosition?: TIconPosition; // Позиция: left или right
  iconClassName?: string; // Дополнительный класс для иконки
}

export const Button: React.FC<IButtonProps> = ({
  onClick,
  type = "primary",
  disabled = false,
  children,
  className = "",
  fullWidth = false,
  icon,
  iconPosition = "left", // Значение по умолчанию
  iconClassName = "",
}) => {
  const renderIcon = () => {
    if (!icon) return null;

    const iconClass = `${style.icon} ${iconClassName}`;

    return <span className={iconClass}>{icon}</span>;
  };

  return (
    <button
      className={`${style.button} ${style["button-" + type]} ${
        fullWidth ? style["button-full-width"] : ""
      } ${className}`}
      onClick={onClick}
      disabled={disabled}
    >
      {icon && iconPosition === "left" && renderIcon()}
      <span className={style.buttonText}>{children}</span>
      {icon && iconPosition === "right" && renderIcon()}
    </button>
  );
};
