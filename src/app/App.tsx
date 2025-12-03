import { Button } from "../shared/ui/Button/Button";
function App() {
  const handleClick = (message: string) => {
    console.log(message);
  };

  return (
    <div className="app-container">
      <h1>Button Component Demo</h1>

      {/* Primary Buttons - вертикальное расположение */}
      <div className="button-column">
        <Button
          onClick={() => handleClick("Primary Default")}
          type="primary"
          fullWidth
        >
          Primary Default
        </Button>

        <Button
          onClick={() => handleClick("Primary Hover")}
          type="primary"
          className="button--hover"
        >
          Primary Hover
        </Button>

        <Button
          onClick={() => handleClick("Primary Pressed")}
          type="primary"
          className="button--pressed"
        >
          Primary Pressed
        </Button>

        <Button
          onClick={() => handleClick("Primary Disabled")}
          type="primary"
          fullWidth
          disabled
        >
          Primary Disabled
        </Button>
      </div>

      {/* Secondary Buttons - вертикальное расположение */}
      <div className="button-column">
        <Button
          onClick={() => handleClick("Secondary Default")}
          type="secondary"
        >
          Secondary Default
        </Button>

        <Button
          onClick={() => handleClick("Secondary Hover")}
          type="secondary"
          fullWidth
          className="button--hover"
        >
          Secondary Hover
        </Button>

        <Button
          onClick={() => handleClick("Secondary Pressed")}
          type="secondary"
          fullWidth
          className="button--pressed"
        >
          Secondary Pressed
        </Button>

        <Button
          onClick={() => handleClick("Secondary Disabled")}
          type="secondary"
          disabled
        >
          Secondary Disabled
        </Button>
      </div>

      {/* Tertiary Buttons - только Default, вертикальное расположение */}
      <div className="button-column">
        <Button onClick={() => handleClick("Tertiary Default")} type="tertiary">
          Tertiary Default
        </Button>
      </div>
    </div>
  );
}

export default App;
