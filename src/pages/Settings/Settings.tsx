import { Typography } from "antd";
import SettingsField from "./SettingsField.tsx";
import SettingsNotification from "./SettingsNotification.tsx";
import SettingsDeleteAccount from "./SettingsDeleteAccount.tsx";
import "./Settings.css";
import useStore from "../../hooks/useStore.hook.tsx";
import { observer } from "mobx-react-lite";

const Settings = observer(() => {
  const { userStore } = useStore();

  if (!userStore.userData) {
    return null;
  }

  return (
    <>
      <div className="settings-page settings-container">
        <div className="block line-separator">
          <div className="max-w-block my-[16px]">
            <Typography.Text className="text text-xxl font-medium font-inter">
              Настройки
            </Typography.Text>
            <Typography.Text className="text text-sm font-default mt-[9px]">
              Внесите изменения в свою учетную запись RL Arena
            </Typography.Text>
          </div>
        </div>
        <div className="block">
          <div className="block line-separator">
            <div className="flex flex-row max-w-[78.5%] w-full">
              <div className="flex flex-col w-[68.3%] pr-[100px]">
                <SettingsField label={"Адрес электронной почты"} description={userStore.userData.email}
                               buttonLabel={"Редактировать адрес"} />
                <SettingsField label={"Номер телефона"}
                               description={"Ваш номер телефона не верифицирован.\n" +
                                 "Подтвердите номер, чтобы расширить возможности и обеспечить безопасность Вашего аккаунта в ML Arena."}
                               buttonLabel={"Подтвердить номер"} />
                <SettingsField label={"Биография"} description={"Биография пока не заполнена..."}
                               buttonLabel={"Редактировать биографию"} />
              </div>
              <div className="flex flex-col w-[31.7%]">
                <SettingsField label={"Никнейм"} description={"username"} style={{ marginBottom: "10px" }}
                               descriptionStyle={{ marginTop: 0, marginBottom: 0 }} />
                <SettingsField label={"Имя пользователя"} description={"Фамилия Имя"} buttonLabel={"Редактировать"}
                               style={{ marginTop: 0 }} descriptionStyle={{ marginBottom: 10, marginTop: 0 }} />
              </div>
            </div>
          </div>
          <div className="block line-separator">
            <div className="max-w-block mt-[14px] mb-[16px]">
              <SettingsNotification label={"Разрешить уведомления"}
                                    description={"Позволить уведомлять о текущем прогрессе"} switchState={true}
                                    style={{ marginBottom: 25 }} />
              <SettingsNotification label={"Подписаться на новости"}
                                    description={"Подписаться на email-рассылку сервиса ML Arena"} switchState={true} />
            </div>
          </div>
          <div className="block">
            <div className="max-w-block mt-[14px] mb-[16px]">
              <SettingsDeleteAccount />
              <div className="h-[100px]" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
});

export default Settings;