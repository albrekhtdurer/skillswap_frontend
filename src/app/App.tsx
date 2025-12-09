import "./styles/fonts.css";
import { Header } from "../widgets/header/header";
import { Footer } from "../widgets/footer/footer";
import { Sidebar } from "../widgets/sidebar/sidebar";
import { UserCard } from "../widgets/UserCard/UserCard";
import { useSelector } from "../features/store";
import { useEffect } from "react";
import { useDispatch } from "../features/store";

function App() {
  const dispatch = useDispatch();
  const currentUser = useSelector((store) => store.auth.currentUser);
  const categories = useSelector((store) => store.categories.categories);
  const users = useSelector((store) => store.users.users);

  useEffect(() => {
    const loadData = async () => {};
    loadData();
  }, [dispatch]);

  const handleForceLogout = () => {
    localStorage.removeItem("currentUser");
    window.location.reload();
  };

  const testUser = users[0];

  return (
    <div
      style={{
        backgroundColor: "var(--bg-color)",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Header />

      <div
        style={{
          display: "flex",
          flex: 1,
          padding: "20px 36px",
          gap: "24px",
        }}
      >
        <Sidebar />

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            flex: 1,
            gap: "24px",
          }}
        >
          <h1
            style={{
              fontFamily: "var(--font-accent)",
              fontSize: "var(--font-size-h1)",
              fontWeight: "var(--font-weight-accent)",
              color: "var(--text-color)",
              margin: 0,
            }}
          >
            Пользователи
          </h1>

          {testUser && (
            <div
              style={{
                padding: "12px",
                backgroundColor: "var(--card-input-color)",
                borderRadius: "var(--border-raduis-main)",
                marginBottom: "16px",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <p style={{ margin: 0 }}>
                Статус авторизации:{" "}
                <strong>
                  {currentUser ? "Авторизован" : "Не авторизован"}
                </strong>
                {currentUser && (
                  <span style={{ marginLeft: "16px" }}>
                    Пользователь: <strong>{currentUser.name}</strong>
                  </span>
                )}
              </p>
              {currentUser && (
                <button
                  onClick={handleForceLogout}
                  style={{
                    padding: "8px 16px",
                    backgroundColor: "var(--alarm-color)",
                    color: "white",
                    border: "none",
                    borderRadius: "8px",
                    cursor: "pointer",
                  }}
                >
                  Принудительный выход (для теста)
                </button>
              )}
            </div>
          )}

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(324px, 1fr))",
              gap: "20px",
            }}
          >
            {testUser &&
              [testUser, testUser, testUser].map((user, index) => (
                <UserCard
                  key={index}
                  user={{ ...user, id: index }}
                  categories={categories}
                />
              ))}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default App;
