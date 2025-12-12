import { useEffect, useRef, useState } from "react";
import { Routes, Route } from "react-router-dom";
import { Header } from "../widgets/header";
import { Footer } from "../widgets/footer";
import { UsersPage } from "../pages/users-page";
import { NotFound404 } from "../pages/not-found-404/NotFound404";
import { SkillPage } from "../pages/skill-page";
import { useDispatch, useSelector } from "../features/store";
import { getUsers } from "../features/users/usersSlice";
import { getCategories } from "../features/categories/categoriesSlice";
import { getCities } from "../features/cities/citiesSlice";
import styles from "./App.module.css";
import { PopupMenu } from "../shared/ui/popup-menu";
import { SkillsMenu } from "../widgets/skills-menu";
import { UserSkillsRegForm } from "../widgets/user-skills-reg-form";

function App() {
  const dispatch = useDispatch();

  const { users } = useSelector((store) => store.users);

  const [popupIsOpen, setPopupIsOpen] = useState<boolean>(false);
  const headerRef = useRef<HTMLElement>(null);
  const openPopup = () => {
    setPopupIsOpen(true);
    if (headerRef.current)
      headerRef.current.scrollIntoView({ behavior: "smooth", block: "end" });
  };
  const closePopup = () => setPopupIsOpen(false);

  useEffect(() => {
    dispatch(getUsers());
    dispatch(getCategories());
    dispatch(getCities());
  }, [dispatch]);

  return (
    <div className={styles.page}>
      <Header ref={headerRef} handleSkillsClick={openPopup} />
      <main className={styles.content}>
        <div style={{ width: "556px" }}>
          <UserSkillsRegForm />
        </div>
        <Routes>
          <Route path="/" element={<UsersPage />} />
          <Route path="*" element={<NotFound404 />} />

          <Route
            path="skill/:id"
            element={<SkillPage similarUsers={users.slice(1, 9)} />}
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
    </div>
  );
}

export default App;
