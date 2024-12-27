import React from "react";
import { Button, Typography } from "antd";
import "./Settings.css";

const SettingsDeleteAccount: React.FC = () => {
  return (
    <>
      <div className="flex flex-col">
        <Typography.Text className="text text-lg font-semibold font-segoe my-[8.5px]">
          Удалить аккаунт RL Arena
        </Typography.Text>
        <Typography.Text className="text text-sm font-default my-[9px]">
          Удалить учетную запись и данные
        </Typography.Text>
        <Button type="primary" htmlType="button" color="danger" variant="outlined" danger
                className="button color-danger">
          Удалить аккаунт
        </Button>
      </div>
    </>
  );
};

export default SettingsDeleteAccount;