import style from "./style.module.css";

// Типы кнопок
export type ButtonType = "primary" | "secondary" | "tertiary";

// Пропсы компонента
export interface ButtonProps {
  onClick: () => void;
  type?: ButtonType;
  disabled?: boolean;
  children: React.ReactNode;
  className?: string;
  fullWidth?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  onClick,
  type = "primary",
  disabled = false,
  children,
  className = "",
  fullWidth = false,
}) => {
  return (
    <button
      className={`${style.button} ${style["button-" + type]} ${
        fullWidth ? style["button-full-width"] : ""
      } ${className}`}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
};
