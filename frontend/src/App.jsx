import { Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import Login from "@pages/Login";
import Register from "@pages/Register";
import Home from "@pages/Home";
import Reweighing from "@pages/Reweighing";
import Bilan from "@pages/Bilan";
import Pages404 from "@pages/NotFound";
import ProtectedRoute from "@pages/layout/ProtectedRoute";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/home"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />
        <Route
          path="/reweighing"
          element={
            <ProtectedRoute>
              <Reweighing />
            </ProtectedRoute>
          }
        />
        <Route
          path="/bilan"
          element={
            <ProtectedRoute>
              <Bilan />
            </ProtectedRoute>
          }
        />
        <Route
          path="*"
          element={
            <ProtectedRoute>
              <Pages404 />
            </ProtectedRoute>
          }
        />
      </Routes>
      <ToastContainer />
    </div>
  );
}

export default App;
