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
import { fetchUserData } from "../features/auth/authSlice";
import { RegisterStep1Page } from "../pages/register-step1";
import { RegisterStep2Page } from "../pages/register-step2";
import { RegisterStep3Page } from "../pages/register-step3";
import { ProtectedRoute } from "../shared/ui/ProtectedRoute";

function App() {
  const dispatch = useDispatch();

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
      <main className={styles.content}>
        <Routes>
          <Route path="/" element={<UsersPage />} />
          <Route path="*" element={<NotFound404 />} />
          <Route path="login" element={<Login />} />
          <Route path="skill/:id" element={<SkillPage />} />
          <Route
            path="register/step1"
            element={
              <ProtectedRoute forUnAuth>
                <RegisterStep1Page />
              </ProtectedRoute>
            }
          />
          <Route
            path="register/step2"
            element={
              <ProtectedRoute forUnAuth>
                <RegisterStep2Page />
              </ProtectedRoute>
            }
          />

          <Route
            path="register/step3"
            element={
              <ProtectedRoute forUnAuth>
                <RegisterStep3Page />
              </ProtectedRoute>
            }
          />
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
        <HeaderMenuAvatarContent onClose={closePopupMenuAvatar} />
      </PopupMenu>
    </div>
  );
}

export default App;
