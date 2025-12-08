import { Header } from "../widgets/header";
import { Footer } from "../widgets/footer";
import { AuthForm } from "../widgets/auth-form";

function App() {
  return (
    <>
      <Header />
      <AuthForm
        onSubmit={({ email, password }) =>
          console.log("отправлено", `email - ${email}`, `пароль - ${password}`)
        }
      />
      <Footer />
    </>
  );
}

export default App;
