import { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { Header } from "../widgets/header";
import { Footer } from "../widgets/footer";
import { UsersPage } from "../pages/users-page";
import { NotFound404 } from "../pages/not-found-404/NotFound404";
import { useDispatch, useSelector } from "../features/store";
import { getUsers } from "../features/users/usersSlice";
import { getCategories } from "../features/categories/categoriesSlice";
import { getCities } from "../features/cities/citiesSlice";
import styles from "./App.module.css";
import { SkillPage } from "../pages/skill-page";

function App() {
  const dispatch = useDispatch();
  const { users } = useSelector((store) => store.users);

  useEffect(() => {
    dispatch(getUsers());
    dispatch(getCategories());
    dispatch(getCities());
  }, [dispatch]);

  return (
    <div className={styles.page}>
      <Header />
      <main className={styles.content}>
        <Routes>
          <Route path="/" element={<UsersPage />} />
          <Route path="*" element={<NotFound404 />} />

          <Route
            path="skill/:id"
            element={<SkillPage similarUsers={users.slice(1, 9)} />}
          />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;
