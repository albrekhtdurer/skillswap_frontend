import styles from "./user-data-edit-from.module.css";

import { Controller, useForm, type SubmitHandler } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useSelector } from "../../features/store";
import { useEffect, useMemo } from "react";

import { EditInput } from "../../shared/ui/Input";
import { Button } from "../../shared/ui/Button/Button";
import { DateSelectionInput } from "../../shared/ui/Input/date-selection-input";
import { DropdownComponent } from "../../shared/ui/dropdown";
import { EditTextarea } from "../../shared/ui/edit-textarea";
import { ProfileAvatar } from "../../pages/profile/personal-data/avatar";

const gender = [
  { name: "Не указан", value: "not specified" },
  { name: "Мужской", value: "male" },
  { name: "Женский", value: "female" },
];

const userSchema = yup.object({
  name: yup
    .string()
    .required("Имя обязательно для заполнения")
    .matches(
      /^[a-zA-Zа-яА-ЯёЁ-]+$/,
      "Имя может содержать только кириллические/латинские символы и дефис",
    ),
  birthDate: yup.date().nullable().required("Дата рождения обязательна"),
  gender: yup
    .string()
    .oneOf(["male", "female", "not specified"])
    .required("Выберите пол"),
  location: yup.string().required("Выберите город"),
  email: yup.string().email("Некорректный email").required("Email обязателен"),
  description: yup.string().required(),
});

type TUserData = yup.InferType<typeof userSchema>;

export const UserDataEditFrom = () => {
  const { cities } = useSelector((store) => store.cities);
  const { currentUser } = useSelector((store) => store.auth);

  const defaultValues: TUserData = useMemo(() => {
    return {
      name: "",
      email: "",
      birthDate: new Date(),
      gender: "not specified",
      location: "",
      description: "",
    };
  }, []);

  const {
    handleSubmit,
    control,
    reset,
    trigger,
    formState: { isValid, isDirty },
  } = useForm<TUserData>({
    resolver: yupResolver(userSchema),
    defaultValues,
    mode: "onChange",
  });

  useEffect(() => {
    if (currentUser)
      reset({
        ...defaultValues,
        ...{
          name: currentUser.name,
          email: currentUser.email,
          birthDate: new Date(currentUser.birthDate),
          gender:
            currentUser.gender === "male" || currentUser.gender === "female"
              ? currentUser.gender
              : "not specified",
          location: currentUser.location,
          description: currentUser.description,
        },
      });
  }, [currentUser, defaultValues, reset]);

  const onSubmit: SubmitHandler<TUserData> = (data) => {
    console.log("Отправленные данные:", data);
    reset(data);
  };

  return (
    <div className={styles.wrapper}>
      <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
        <div>
          <Controller
            name="email"
            control={control}
            render={({ field, fieldState }) => (
              <EditInput
                {...field}
                placeholder={"Введите вашу почту"}
                label={"Почта"}
                onChange={(e) => {
                  field.onChange(e.target.value);
                  trigger("email");
                }}
                isError={!!fieldState.error}
                hint={fieldState.error?.message}
              />
            )}
          />
          <Button
            type="tertiary"
            onClick={() => {}}
            className={styles.change_password_button}
          >
            Изменить пароль
          </Button>
        </div>
        <Controller
          name="name"
          control={control}
          render={({ field, fieldState }) => (
            <EditInput
              {...field}
              placeholder={"Введите ваше имя"}
              label={"Имя"}
              onChange={(e) => {
                field.onChange(e.target.value);
                trigger("name");
              }}
              isError={!!fieldState.error}
              hint={fieldState.error?.message}
            />
          )}
        />
        <div className={styles.data_gender_section}>
          <div className={styles.calendar}>
            <Controller
              name="birthDate"
              control={control}
              render={({ field, fieldState }) => (
                <DateSelectionInput
                  selectedDate={field.value ? new Date(field.value) : null}
                  onDateChange={(date) => {
                    field.onChange(date);
                    if (!date) {
                      trigger("birthDate");
                    }
                  }}
                  error={fieldState.error?.message}
                />
              )}
            />
          </div>
          <label className={`${styles.label} ${styles.width}`}>
            Пол
            <Controller
              name="gender"
              control={control}
              render={({ field, fieldState }) => (
                <DropdownComponent
                  {...field}
                  options={gender}
                  placeholder={"Не указан"}
                  required={false}
                  value={field.value}
                  onChange={(value) => {
                    field.onChange(value);
                    trigger("gender");
                  }}
                  error={fieldState.error?.message}
                />
              )}
            />
          </label>
        </div>
        <label className={styles.label}>
          Город
          <Controller
            name="location"
            control={control}
            render={({ field, fieldState }) => (
              <DropdownComponent
                {...field}
                options={cities}
                placeholder={"Не указан"}
                required={false}
                value={field.value}
                onChange={(value) => {
                  field.onChange(value);
                  trigger("location");
                }}
                error={fieldState.error?.message}
              />
            )}
          />
        </label>
        <label className={styles.label}>
          О себе
          <Controller
            name="description"
            control={control}
            render={({ field, fieldState }) => (
              <EditTextarea
                {...field}
                placeholder={"Введите описание"}
                label={"Описание"}
                onChange={(e) => {
                  field.onChange(e.target.value);
                  trigger("description");
                }}
                className={styles.description_field}
                hint={fieldState.error?.message}
              />
            )}
          />
        </label>
        <Button
          onClick={() => {}}
          fullWidth
          disabled={!isValid || !isDirty}
          htmlType="submit"
        >
          Сохранить
        </Button>
      </form>
      <div className={styles.avatar_section}>
        <ProfileAvatar />
      </div>
    </div>
  );
};
