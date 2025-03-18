import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Home } from "./pages/Home";
import { Easy } from "./pages/Easy";
import { Normal } from "./pages/Normal";
import { Hard } from "./pages/Hard";
import { BackToHome } from "./pages/BackToHome";

import "./styles.css";

export default function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/easy" element={<Easy />} />
          <Route path="/normal" element={<Normal />} />
          <Route path="/hard" element={<Hard />} />
          <Route path="*" element={<BackToHome />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}
