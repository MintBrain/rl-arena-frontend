import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./pages/Login/Login.tsx";
import Register from "./pages/Register/Register.tsx";
import Main from "./pages/Main/Main.tsx";
import "./App.css";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
        </Routes>
      </BrowserRouter>

    </>
  );
}

export default App;
