import { useEffect, useRef, useState } from "react";
import { Routes, Route } from "react-router-dom";
import { Header } from "../widgets/header";
import { Footer } from "../widgets/footer";
import { UsersPage } from "../pages/users-page";
import { NotFound404 } from "../pages/not-found-404/NotFound404";
import { SkillPage } from "../pages/skill-page";
import { useDispatch } from "../features/store";
import { getUsers } from "../features/users/usersSlice";
import { getCategories } from "../features/categories/categoriesSlice";
import { getCities } from "../features/cities/citiesSlice";
import styles from "./App.module.css";
import { PopupMenu } from "../shared/ui/popup-menu";
import { SkillsMenu } from "../widgets/skills-menu";
import { HeaderMenuAvatarContent } from "../widgets/header-popup-widget/header-menu-avatar-content";
import { Login } from "../pages/login";
import { UserSkillsRegForm } from "../widgets/user-skills-reg-form";
import { useTempSkillImages } from "../shared/hooks/useTempSkillImages";
import { useRegistrationAvatar } from "../shared/hooks/useRegistrationAvatar";
import { useImages } from "../shared/hooks/useImages";
import { ProfileAvatar } from "../pages/profile/personal-data/avatar";
import { ImagesAuthorSlider } from "../widgets/slider/images-author-slider/images-author-slider";
import { UserDataRegForm } from "../widgets/user-data-reg-form";

import { fetchUserData } from "../features/auth/authSlice";

function App() {
  const dispatch = useDispatch();
  const { commitAvatar, discardAvatar } = useRegistrationAvatar(); // удалить  после проверки
  const { discardImages, commitImages, tempImages } = useTempSkillImages(); // удалить  после проверки
  const { images, clearAllImages } = useImages(); // удалить  после проверки

  const [popupIsOpen, setPopupIsOpen] = useState<boolean>(false);
  const headerRef = useRef<HTMLElement>(null);
  const openPopup = () => {
    setPopupIsOpen(true);
    if (headerRef.current)
      headerRef.current.scrollIntoView({ behavior: "smooth", block: "end" });
  };

  const [popupMenuAvatarIsOpen, setPopupMenuAvatarIsOpen] =
    useState<boolean>(false);
  const openPopupMenuAvatar = () => {
    setPopupMenuAvatarIsOpen(true);
    if (headerRef.current)
      headerRef.current.scrollIntoView({ behavior: "smooth", block: "end" });
  };

  const closePopup = () => setPopupIsOpen(false);
  const closePopupMenuAvatar = () => setPopupMenuAvatarIsOpen(false);

  useEffect(() => {
    dispatch(fetchUserData());
    dispatch(getUsers());
    dispatch(getCategories());
    dispatch(getCities());
  }, [dispatch]);

  return (
    <div className={styles.page}>
      <Header
        ref={headerRef}
        handleSkillsClick={openPopup}
        onProfileClick={openPopupMenuAvatar}
      />

      <UserSkillsRegForm></UserSkillsRegForm>
      <ImagesAuthorSlider images={tempImages}></ImagesAuthorSlider>
      {/* картинки только для формы */}
      <ImagesAuthorSlider images={images}></ImagesAuthorSlider>
      {/* слайдер выше сделан только для того, чтобы показать что фотографии переносятся из temp для регистрации в базу данных профиля */}
      <button onClick={discardImages}> удалить картинки</button>
      <button onClick={commitImages}>
        {" "}
        Добавить картинки в авторизованный профиль
      </button>
      <button onClick={clearAllImages}>
        {" "}
        удалить картинки из авторизованного профиля
      </button>
      <UserDataRegForm></UserDataRegForm>
      <button onClick={commitAvatar}>
        {" "}
        Добавление аватара с регистрации в профиль
      </button>
      <button onClick={discardAvatar}>
        {" "}
        удалить аватар с формы регистрации
      </button>
      <ProfileAvatar></ProfileAvatar>
      {/* Удалить блок после проверки */}

      <main className={styles.content}>
        <Routes>
          <Route path="/" element={<UsersPage />} />
          <Route path="*" element={<NotFound404 />} />
          <Route path="login" element={<Login />} />
          <Route path="skill/:id" element={<SkillPage />} />
        </Routes>
      </main>
      <Footer allSkillsOnClick={openPopup} />
      <PopupMenu
        anchorRef={headerRef}
        isOpen={popupIsOpen}
        onClose={closePopup}
      >
        <SkillsMenu />
      </PopupMenu>
      <PopupMenu
        anchorRef={headerRef}
        isOpen={popupMenuAvatarIsOpen}
        onClose={closePopupMenuAvatar}
        position="bottom-right"
      >
        <HeaderMenuAvatarContent />
      </PopupMenu>
    </div>
  );
}

export default App;
