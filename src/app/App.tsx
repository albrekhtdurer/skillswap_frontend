import { Header } from "../widgets/header";
import { Footer } from "../widgets/footer";
import { RegForm } from "../widgets/reg-form";

function App() {
  return (
    <>
      <Header />
      <RegForm
        onSubmit={({ email, password }) =>
          console.log("отправлено", `email - ${email}`, `пароль - ${password}`)
        }
      />
      <Footer />
    </>
  );
}

export default App;
