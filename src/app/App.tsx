import { Header } from "../widgets/header";
// import { NotFound404 } from "../pages/not-found-404/NotFound404";
import { Footer } from "../widgets/footer";
import { SkillPage } from "../pages/skill-page";

import { useEffect } from "react";
import { useDispatch, useSelector } from "../features/store";
import { getUsers } from "../features/users/usersSlice";

function App() {
  const dispatch = useDispatch();
  const { users, loading } = useSelector((store) => store.users);

  useEffect(() => {
    dispatch(getUsers());
  }, [dispatch]);

  return (
    <>
      <Header />
      {/* <NotFound404 /> */}
      <main style={{ padding: "20px" }}>
        {!loading && (
          <SkillPage user={users[0]} similarUsers={users.slice(1, 9)} />
        )}
      </main>
      <Footer />
    </>
  );
}

export default App;
