import { Header } from "../widgets/header";
import { Footer } from "../widgets/footer";
import { RegForm } from "../widgets/reg-form";

function App() {
  return (
    <>
      <Header />
      <RegForm onSubmit={() => console.log(123123)} />
      <Footer />
    </>
  );
}

export default App;
