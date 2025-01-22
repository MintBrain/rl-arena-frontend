import React, { useEffect } from "react";
import useStore from "../hooks/useStore.hook.tsx";
import { message } from "antd";
import api from "../api/service.api.ts";
import { useCookies } from "react-cookie";
import { getSnapshot } from "mobx-state-tree";
import { observer } from "mobx-react-lite";

const AuthCheck: React.FC = observer(() => {
  const { userStore } = useStore();
  const [cookies, , removeCookie] = useCookies(["access_token"]);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const token = cookies["access_token"];
        if (!token) {
          userStore.logout();
          return;
        }

        const response = await api.getMe();
        if (response.status === 200) {
          userStore.setUserData(response.data);
          console.log(getSnapshot(userStore));
        } else if (response.status === 401) {
          console.log("AuthCheck: Wrong access token");
          userStore.logout();
          removeCookie("access_token");
        }
      } catch (error) {
        console.error("AuthCheck error: ", error);
        userStore.logout();
        message.error("Ошибка авторизации. Пожалуйста, войдите снова.");
      } finally {
        userStore.setFetched(true);
      }
    };

    checkAuth();
  }, [cookies, userStore.isFetched]);

  return null; // This component does not render anything
});

export default AuthCheck;
