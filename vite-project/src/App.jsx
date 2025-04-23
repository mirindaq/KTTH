import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import ProductTable from "./pages/ProductTable";

function App() {
  const [count, setCount] = useState(0);
  return (
    <>
      <ProductTable  />
    </>
  );
}

export default App;
