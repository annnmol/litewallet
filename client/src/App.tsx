import { useState } from "react";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more {count}
      </p>
    </>
  );
}

export default App;
