import { Link } from "react-router-dom";
import { Button, Divider, Image, Layout, message } from "antd";
import Icon, { LoginOutlined } from "@ant-design/icons";
import { Settings, Search } from "@mui/icons-material";
import type { GetProps } from "antd";
import "../styles/Header.css";
import useStore from "../hooks/useStore.hook.tsx";
import React, { useCallback, useEffect } from "react";
import { useCookies } from "react-cookie";
import { getSnapshot } from "mobx-state-tree";
import { observer } from "mobx-react-lite";

type CustomIconComponentProps = GetProps<typeof Icon>;

const UserSvg = () => (
  <svg width="41" height="40" viewBox="0 0 41 40" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="0.333984" width="40" height="40" rx="20" fill="#F5F5F5" />
    <path
      d="M20.334 12C21.3949 12 22.4123 12.4214 23.1624 13.1716C23.9126 13.9217 24.334 14.9391 24.334 16C24.334 17.0609 23.9126 18.0783 23.1624 18.8284C22.4123 19.5786 21.3949 20 20.334 20C19.2731 20 18.2557 19.5786 17.5056 18.8284C16.7554 18.0783 16.334 17.0609 16.334 16C16.334 14.9391 16.7554 13.9217 17.5056 13.1716C18.2557 12.4214 19.2731 12 20.334 12ZM20.334 28C20.334 28 28.334 28 28.334 26C28.334 23.6 24.434 21 20.334 21C16.234 21 12.334 23.6 12.334 26C12.334 28 20.334 28 20.334 28Z"
      fill="#3C3C43" />
  </svg>
);

const LogOutSvg = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
    <path fill="currentColor" fillRule="evenodd"
          d="M3.5 9.568v4.864c0 2.294 0 3.44.722 4.153c.655.647 1.674.706 3.596.712c-.101-.675-.122-1.48-.128-2.428a.734.734 0 0 1 .735-.734a.735.735 0 0 1 .744.726c.006 1.064.033 1.818.14 2.39c.103.552.267.87.507 1.108c.273.27.656.445 1.38.54c.744.1 1.73.101 3.145.101h.985c1.415 0 2.401-.002 3.146-.1c.723-.096 1.106-.272 1.378-.541c.273-.27.451-.648.548-1.362c.1-.734.102-1.709.102-3.105V8.108c0-1.397-.002-2.37-.102-3.105c-.097-.714-.275-1.093-.547-1.362c-.273-.27-.656-.445-1.38-.54C17.728 3 16.742 3 15.327 3h-.985c-1.415 0-2.401.002-3.146.1c-.723.096-1.106.272-1.379.541c-.24.237-.404.556-.507 1.108c-.107.572-.134 1.326-.14 2.39a.735.735 0 0 1-.744.726a.734.734 0 0 1-.735-.734c.006-.948.027-1.753.128-2.428c-1.922.006-2.94.065-3.596.712c-.722.713-.722 1.86-.722 4.153m2.434 2.948a.723.723 0 0 1 0-1.032l1.97-1.946a.746.746 0 0 1 1.046 0a.723.723 0 0 1 0 1.032l-.71.7h7.086c.408 0 .74.327.74.73s-.332.73-.74.73H8.24l.71.7a.723.723 0 0 1 0 1.032a.746.746 0 0 1-1.046 0z"
          clipRule="evenodd" />
  </svg>
);

const UserIcon = (props: Partial<CustomIconComponentProps>) => (
  <Icon component={UserSvg} {...props} />
);

const LogOutIcon = (props: Partial<CustomIconComponentProps>) => (
  <Icon component={LogOutSvg} {...props} />
);


export const Header: React.FC = observer(() => {
  const { userStore } = useStore();
  const [, , deleteCookie] = useCookies(["access_token"]);

  const onLogout = () => {
    userStore.logout();
    deleteCookie("access_token");
    message.success("Вы успешно вышли из аккаунта.");
  };

  return (
    <>
      <Layout.Header unselectable="on" style={{
        backgroundColor: "#fff",
        borderBottom: "1px solid #D6dce5",
        height: "74px",
        justifyContent: "flex-end",
        display: "flex",
        alignItems: "center"
      }}>
        <Button type="text" icon={<Search />} className="header-button" />

        {userStore.isLoggedIn ?
          <>
            <Link to="/settings" className="header-link">
              <Button type="text" icon={<Settings />} className="header-button" />
            </Link>

            <Divider type="vertical" className="header-devider" />

            <Link to="/profile" className="header-link">
              <Button type="text"  className="header-button"
                      style={{ width: "auto", marginLeft: 0 }}>
                {userStore.userData?.profile_image && userStore.userData.profile_image !== "" ? (
                  <img
                    src={userStore.userData.profile_image}
                    alt="Profile"
                    style={{
                      width: 40,
                      height: 40,
                      borderRadius: "50%",
                      objectFit: "cover",
                      marginRight: 8, // Add space between the image and username
                    }}
                  />
                ) : (
                  <UserIcon />
                )}
                {userStore.userData?.username}
              </Button>
            </Link>

            <Divider type="vertical" className="header-devider" />

            <Button type="text" icon={<LogOutIcon />} className="header-button" style={{ marginLeft: 0 }}
                    onClick={onLogout} />
          </>
          :
          <>
            <Link to="/login" className="header-link">
              <Button type="text" icon={<LoginOutlined />} className="header-button"
                      style={{ width: "auto" }}>
                Войти
              </Button>
            </Link>
            {/*<Button type="text" icon={<LogOutIcon />} className="header-button" style={{ marginLeft: 0 }}*/}
            {/*             onClick={() => console.log(getSnapshot(userStore))} />*/}
          </>

        }
      </Layout.Header>
    </>
  );
});