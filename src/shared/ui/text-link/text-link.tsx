import style from "./text-link.module.css";

export type TextLinkProps = {
  link: string;
  children: React.ReactNode;
} & React.ComponentPropsWithoutRef<"a">;

export const TextLink = ({
  children,
  link,
  className,
  ...props
}: TextLinkProps) => {
  return (
    <a
      href={link}
      className={`${style.text_link} ${className ?? ""}`}
      {...props}
    >
      {children}
    </a>
  );
};
