import { Footer } from "../widgets/footer/footer";

function App() {
  return (
    <div>
      <Footer allSkillsOnClick={() => console.log("all skills click")} />
    </div>
  );
}

export default App;
