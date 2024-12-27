import React from "react";
import { ConfigProvider, Switch, Typography } from "antd";
import "./Settings.css";


interface Props {
  label: string;
  description: string;
  switchState: boolean;
  style?: React.CSSProperties;
}

const SettingsNotification: React.FC<Props> = ({ label, description, switchState, style }) => {
  return (
    <ConfigProvider
      theme={{
        components: {
          Switch: {
            trackHeight: 31,
            trackMinWidth: 51,
            handleSize: 27
          }
        }
      }}>
      <div className="flex flex-row items-center max-w-[500px]" style={style}>
        <div className="flex flex-col flex-1 pr-4">
          <Typography.Text className="text text-base font-medium font-inter mb-[9px]">
            {label}
          </Typography.Text>
          <Typography.Text className="text text-sm font-normal font-default">
            {description}
          </Typography.Text>
        </div>
        <div className="flex items-center">
          <Switch defaultChecked={switchState} />
        </div>
      </div>
    </ConfigProvider>
  );
};

export default SettingsNotification;