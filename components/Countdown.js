import * as React from "react";
import { render } from "react-dom";

import "./styles.css";

function App() {
  const [counter, setCounter] = React.useState(60);

React.useEffect(() => {
    counter > 0 && setTimeout(() => setCounter(counter - 1), 1000);
  }, [counter]);

  return (
    <div className="GameTimeCounter">
      <div>Countdown: {counter}</div>
    </div>
  );
}

const rootElement = document.getElementById("root");
render(<App />, rootElement);
