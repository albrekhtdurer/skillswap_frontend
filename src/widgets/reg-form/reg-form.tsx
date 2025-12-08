import type { FC } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Input, PasswordInput } from "../../shared/ui/Input";
import { Button } from "../../shared/ui/Button/Button";
import styles from "./styles.module.css";

type TRegData = {
  email: string;
  password: string;
};

type TRegFormProps = {
  onSubmit: ({ email, password }: TRegData) => void;
};

export const RegForm: FC<TRegFormProps> = ({ onSubmit }) => {
  const regSchema = yup.object().shape({
    email: yup
      .string()
      .email("Не похоже на email")
      .required("Это обязательное поле"),
    password: yup
      .string()
      .min(8, "Пароль должен содержать не менее 8 знаков")
      .required("Это обязательное поле"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors, touchedFields },
    getValues,
    reset,
  } = useForm({ resolver: yupResolver(regSchema), mode: "onChange" });
  const onError = () => {
    console.log();
  };

  return (
    <div className={styles.registration}>
      <Button className={styles.registration__link} fullWidth type="secondary">
        Продолжить с Google
      </Button>
      <Button className={styles.registration__link} fullWidth type="secondary">
        Продолжить с Apple
      </Button>
      <div className={styles.registration__separator}>или</div>
      <form
        onSubmit={handleSubmit(() => {
          onSubmit(getValues());
          reset();
        }, onError)}
      >
        <Input
          {...register("email")}
          isError={errors.email && touchedFields.email}
          name="email"
          label="Email"
          placeholder="Введите email"
          hint={errors.email && touchedFields.email ? errors.email.message : ""}
          className={styles.registration__input}
        ></Input>
        <PasswordInput
          {...register("password")}
          isError={errors.password && touchedFields.password}
          name="password"
          label="Пароль"
          placeholder="Придумайте надежный пароль"
          hint={
            touchedFields.password
              ? errors.password
                ? errors.password.message
                : "Надежный"
              : "Пароль должен содержать не менее 8 знаков"
          }
          className={`${styles.registration__input} ${styles.input_password}`}
        ></PasswordInput>
        <Button fullWidth onClick={() => {}}>
          Далее
        </Button>
      </form>
    </div>
  );
};
