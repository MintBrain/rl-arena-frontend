import React from "react";
import { Button, Typography } from "antd";
import "./Settings.css";

interface SettingsFieldProps {
  label: string;
  description?: string;
  buttonLabel?: string;
  style?: React.CSSProperties;
  descriptionStyle?: React.CSSProperties;
}

const SettingsField: React.FC<SettingsFieldProps> = ({ label, description, buttonLabel, style, descriptionStyle }) => {
  return (
    <div className="flex flex-col mt-[14px] mb-[16px]" style={style}>
      <Typography.Text className="text text-lg font-semibold font-segoe my-[8.5px]">
        {label}
      </Typography.Text>
      {description &&
        <Typography.Text className="text text-sm font-default my-[9px]" style={descriptionStyle}>
          {description.split("\n").map((line, index) => (
            <React.Fragment key={index}>
              {line}
              {index < description.split("\n").length - 1 && <br />}
            </React.Fragment>
          ))}
        </Typography.Text>
      }
      {buttonLabel &&
        <Button type="primary" htmlType="button" color="primary" variant="outlined" className="button">
          {buttonLabel}
        </Button>
      }
    </div>
  );
};
// #ff4d4f
export default SettingsField;