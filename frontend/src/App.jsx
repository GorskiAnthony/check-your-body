import { Routes, Route } from "react-router-dom";

import Login from "@pages/Login";
import Register from "@pages/Register";
import Home from "@pages/Home";
import Reweighing from "@pages/Reweighing";
import Bilan from "@pages/Bilan";
import Pages404 from "@pages/NotFound";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/home" element={<Home />} />
        <Route path="/reweighing" element={<Reweighing />} />
        <Route path="/bilan" element={<Bilan />} />
        <Route path="*" element={<Pages404 />} />
      </Routes>
    </div>
  );
}

export default App;
