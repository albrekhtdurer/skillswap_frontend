import { useMemo, type FC } from "react";
import {
  Controller,
  useForm,
  useWatch,
  type SubmitHandler,
} from "react-hook-form";
import { Input } from "../../shared/ui/Input";
import { DateSelectionInput } from "../../shared/ui/Input/date-selection-input";
import { DropdownComponent } from "../../shared/ui/dropdown";
import { Button } from "../../shared/ui/Button/Button";
import { RegistrationAvatarField } from "../../pages/registration/registration-avatar";
import styles from "./user-data-reg-form.module.css";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useSelector } from "../../features/store";
import { categoriesSelector } from "../../features/categories/categoriesSlice";
import { citiesSelector } from "../../features/cities/citiesSlice";
import { useRegistrationAvatar } from "../../shared/hooks/useRegistrationAvatar";
import { setRegFormState } from "../../features/forms/formsSlice";
import { useDispatch } from "../../features/store";
import { useNavigate } from "react-router-dom";

const gender = [
  { name: "Не указан", value: "not specified" },
  { name: "Мужской", value: "male" },
  { name: "Женский", value: "female" },
];

const userSchema = yup.object({
  avatar: yup.mixed<File>().nullable().optional(),
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
  categoriesWantToLearn: yup
    .array()
    .of(yup.string())
    .min(1, "Выберите хотя бы одну категорию")
    .required(),
  subcategoriesWantToLearn: yup
    .array()
    .of(yup.string())
    .min(1, "Выберите хотя бы одну подкатегорию")
    .required(),
});

type TUserData = yup.InferType<typeof userSchema>;

export const UserDataRegForm: FC = () => {
  const categories = useSelector(categoriesSelector);
  const cities = useSelector(citiesSelector);
  const { previewUrl, setAvatar, commitAvatar, discardAvatar } =
    useRegistrationAvatar();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const categoryOptions = useMemo(() => {
    return categories.map((category) => ({
      name: category.name,
      value: category.id.toString(),
    }));
  }, [categories]);

  const {
    handleSubmit,
    control,
    trigger,
    formState: { isValid },
  } = useForm({
    resolver: yupResolver(userSchema),
    defaultValues: {
      name: "",
      location: "",
      categoriesWantToLearn: [],
      subcategoriesWantToLearn: [],
    },
    mode: "onChange",
  });

  const selectedCategories = useWatch({
    control,
    name: "categoriesWantToLearn",
    defaultValue: [],
  });

  const availableSubcategories = useMemo(() => {
    if (!selectedCategories || selectedCategories.length === 0) {
      return [];
    }

    const selectedCategoryIds = selectedCategories.map((id) =>
      parseInt(id as string, 10),
    );
    const selectedCategoriesData = categories.filter((category) =>
      selectedCategoryIds.includes(category.id),
    );

    const allSubcategories: Array<{ name: string; value: string }> = [];
    selectedCategoriesData.forEach((category) => {
      category.subcategories.forEach((subcategory) => {
        allSubcategories.push({
          name: subcategory.name,
          value: subcategory.id.toString(),
        });
      });
    });

    return allSubcategories;
  }, [selectedCategories, categories]);

  const onSubmit: SubmitHandler<TUserData> = (data) => {
    const dataToSend = {
      ...data,
      categoryWantToLearn: data.categoriesWantToLearn.map((id) =>
        parseInt(id as string, 10),
      ),
      subcategoryWantToLearn: data.subcategoriesWantToLearn.map((id) =>
        parseInt(id as string, 10),
      ),
      birthDate: data.birthDate.toISOString(),
      gender:
        data.gender === "male" || data.gender === "female" ? data.gender : null,
    };

    // console.log("Отправленные данные:", dataToSend);
    dispatch(setRegFormState(dataToSend));
    commitAvatar();
    navigate("/register/step3");
  };

  return (
    <div className={styles.container}>
      <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
        <Controller
          name="avatar"
          control={control}
          render={({ field }) => (
            <RegistrationAvatarField
              avatarUrl={previewUrl}
              onAvatarChange={(file) => {
                setAvatar(file);
                field.onChange(file);
              }}
            />
          )}
        />

        <Controller
          name="name"
          control={control}
          render={({ field, fieldState }) => (
            <Input
              {...field}
              placeholder={"Введите ваше имя"}
              label={"Имя"}
              onChange={(e) => {
                field.onChange(e.target.value);
                trigger("name");
              }}
              className={styles.element}
              isError={!!fieldState.error}
              hint={fieldState.error?.message}
            />
          )}
        />

        <div className={styles.section}>
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
          Категория навыка, которому хотите научиться
          <Controller
            name="categoriesWantToLearn"
            control={control}
            render={({ field, fieldState }) => (
              <DropdownComponent
                {...field}
                options={categoryOptions}
                placeholder={"Выберите категорию"}
                required={false}
                isMulti={true}
                closeMenuOnSelect={false}
                withCheckbox={true}
                value={field.value as string[]}
                onChange={(values) => {
                  field.onChange(values);
                  trigger("categoriesWantToLearn");
                }}
                error={fieldState.error?.message}
              />
            )}
          />
        </label>
        <label className={styles.label}>
          Подкатегория навыка, которому хотите научиться
          <Controller
            name="subcategoriesWantToLearn"
            control={control}
            render={({ field, fieldState }) => (
              <DropdownComponent
                {...field}
                options={availableSubcategories}
                placeholder={
                  availableSubcategories.length === 0
                    ? "Сначала выберите категорию"
                    : "Выберите подкатегорию"
                }
                required={false}
                isMulti={true}
                closeMenuOnSelect={false}
                withCheckbox={true}
                value={field.value as string[]}
                onChange={(values) => {
                  field.onChange(values);
                  trigger("subcategoriesWantToLearn");
                }}
                error={fieldState.error?.message}
                disabled={selectedCategories.length === 0}
              />
            )}
          />
        </label>

        <div className={styles.button_section}>
          <Button
            fullWidth
            type="secondary"
            onClick={() => {
              navigate("/register/step1");
              discardAvatar();
            }}
          >
            Назад
          </Button>
          <Button disabled={!isValid} fullWidth htmlType="submit">
            Продолжить
          </Button>
        </div>
      </form>
    </div>
  );
};
