import { Route, Routes } from "react-router-dom";
import { Layout } from "antd";
import Login from "./pages/Login/Login.tsx";
import Register from "./pages/Register/Register.tsx";
import Main from "./pages/Main/Main.tsx";
import Navigation from "./components/Navigation.tsx";
import { NotFound } from "./components/NotFound.tsx";
import RestorePassword from "./pages/RestorePassword/RestorePassword.tsx";
import { Header } from "./components/Header.tsx";
import Competitions from "./pages/Competitions/Competitions.tsx";
import Datasets from "./pages/Datasets/Datasets.tsx";
import Profile from "./pages/Profile/Profile.tsx";
import CreateCompetition from "./pages/CreateCompetition/CreateCompetition.tsx";
// import "./App.css";

const { Content } = Layout;

function App() {
  return (
    <Layout style={{ minHeight: "100vh", width: "100vw" }} hasSider>
      <Navigation />
      <Layout>
        <Header />
        <Content className="flex justify-center items-center accent-background-primary font-default">
          <Routes>
            <Route path="/" element={<Main />} />
            <Route path="login" element={<Login />} />
            <Route path="register" element={<Register />} />
            <Route path="restore" element={<RestorePassword />} />
            <Route path="competitions" element={<Competitions /> }/>
            <Route path="datasets" element={<Datasets/>} />
            <Route path="profile" element={<Profile/>} />
            <Route path="create-competition" element={<CreateCompetition />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Content>
      </Layout>
    </Layout>
  );
}

export default App;
