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
import { PopupMenu, type PopupMenuPosition } from "../shared/ui/popup-menu";
import { SkillsMenu } from "../widgets/skills-menu";
import { HeaderMenuAvatarContent } from "../widgets/header-popup-widget/header-menu-avatar-content";
import { NotificationsMenu } from "../widgets/notifications-menu";
import { Login } from "../pages/login";
import { fetchUserData } from "../features/auth/authSlice";
import { RegisterStep1Page } from "../pages/register-step1";
import { ProtectedRoute } from "../shared/ui/ProtectedRoute";
import { ServerError500 } from "../pages/server-error-500/ServerError500";
import { Profile } from "../pages/profile/profile";
import { UserDataEditFrom } from "../widgets/user-data-edit-form/user-data-edit-from";

type PopupContent = "skills" | "avatar" | "notifications" | null;

function App() {
  const dispatch = useDispatch();
  const headerRef = useRef<HTMLElement>(null);

  const [popupState, setPopupState] = useState<{
    isOpen: boolean;
    content: PopupContent;
    position: PopupMenuPosition;
  }>({
    isOpen: false,
    content: null,
    position: "bottom-left",
  });

  const openSkillsPopup = () => {
    setPopupState({
      isOpen: true,
      content: "skills",
      position: "bottom-left",
    });
    if (headerRef.current) {
      headerRef.current.scrollIntoView({ behavior: "smooth", block: "end" });
    }
  };

  const openAvatarPopup = () => {
    setPopupState({
      isOpen: true,
      content: "avatar",
      position: "bottom-right",
    });
    if (headerRef.current) {
      headerRef.current.scrollIntoView({ behavior: "smooth", block: "end" });
    }
  };

  const openNotificationsPopup = () => {
    setPopupState({
      isOpen: true,
      content: "notifications",
      position: "bottom-right",
    });
    if (headerRef.current) {
      headerRef.current.scrollIntoView({ behavior: "smooth", block: "end" });
    }
  };

  const closePopup = () => {
    setPopupState({
      isOpen: false,
      content: null,
      position: "bottom-left",
    });
  };

  const renderPopupContent = () => {
    switch (popupState.content) {
      case "skills":
        return <SkillsMenu />;
      case "avatar":
        return <HeaderMenuAvatarContent onClose={closePopup} />;
      case "notifications":
        return <NotificationsMenu />;
      default:
        return null;
    }
  };

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
        handleSkillsClick={openSkillsPopup}
        onProfileClick={openAvatarPopup}
        onNotificationsClick={openNotificationsPopup}
      />
      <main className={styles.content}>
        <Routes>
          <Route path="/" element={<UsersPage />} />
          <Route path="/error" element={<ServerError500 />} />
          <Route path="*" element={<NotFound404 />} />
          <Route
            path="login"
            element={
              <ProtectedRoute forUnAuth>
                <Login />
              </ProtectedRoute>
            }
          />
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
            path="/profile/*"
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          >
            <Route index element={<UserDataEditFrom />} />
          </Route>
        </Routes>
      </main>
      <Footer allSkillsOnClick={openSkillsPopup} />

      <PopupMenu
        anchorRef={headerRef}
        isOpen={popupState.isOpen}
        onClose={closePopup}
        position={popupState.position}
      >
        {renderPopupContent()}
      </PopupMenu>
    </div>
  );
}

export default App;
