// import { Header } from "../widgets/header";
// import { NotFound404 } from "../pages/not-found-404/NotFound404";
// import { Footer } from "../widgets/footer";

// function App() {
//   return (
//     <>
//       <Header />
//       <NotFound404 />
//       <Footer />
//     </>
//   );
// }

// export default App;

import { useEffect } from "react";
import { Header } from "../widgets/header";
import { Footer } from "../widgets/footer";
import { UsersPage } from "../pages/users-page";
import { useDispatch } from "../features/store";
import { getUsers } from "../features/users/usersSlice";
import { getCategories } from "../features/categories/categoriesSlice";
import { getCities } from "../features/cities/citiesSlice";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUsers());
    dispatch(getCategories());
    dispatch(getCities());
  }, [dispatch]);

  return (
    <div>
      <Header />
      <main>
        <UsersPage />
      </main>
      <Footer />
    </div>
  );
}

export default App;
