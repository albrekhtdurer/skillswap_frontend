import style from "./text-link.module.css";

export type TextLinkProps = {
  children: React.ReactNode;
} & React.ComponentPropsWithoutRef<"a">;

export const TextLink = ({ children, className, ...props }: TextLinkProps) => {
  return (
    <a className={`${style.text_link} ${className ?? ""}`} {...props}>
      {children}
    </a>
  );
};
