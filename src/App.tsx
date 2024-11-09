import { Route, Routes } from "react-router-dom";
import { Layout } from "antd";
import Login from "./pages/Login/Login.tsx";
import Register from "./pages/Register/Register.tsx";
import Main from "./pages/Main/Main.tsx";
import Navigation from "./components/Navigation.tsx";
import { NotFound } from "./components/NotFound.tsx";
import RestorePassword from "./pages/RestorePassword/RestorePassword.tsx";
// import "./App.css";

const { Content } = Layout;

function App() {
  return (
    // <BrowserRouter>
      <Layout style={{ minHeight: "100vh" , width:'100vw' }}>
        <Navigation />
        <Content className='flex justify-center items-center accent-background-primary font-default'>
          <Routes>
            <Route path="/" element={<Main />} />
            <Route path="login" element={<Login />} />
            <Route path="register" element={<Register />} />
            <Route path="restore" element={<RestorePassword />} />
            <Route path='*' element={<NotFound />} />
          </Routes>
        </Content>
      </Layout>
    // </BrowserRouter>
  );
}

export default App;
