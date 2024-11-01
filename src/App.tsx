import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./pages/Login/Login.tsx";
import Register from "./pages/Register/Register.tsx";
import Main from "./pages/Main/Main.tsx";
import Navigation from "./components/Navigation.tsx";
import { Layout } from "antd";
// import "./App.css";

const { Content } = Layout;

function App() {
  return (
    <BrowserRouter>
      <Layout style={{ minHeight: "100vh" , width:'100vw' }}>
        <Navigation />
        <Content>
          <Routes>
            <Route path="/" element={<Main />} />
            <Route path="login" element={<Login />} />
            <Route path="register" element={<Register />} />
          </Routes>
        </Content>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
