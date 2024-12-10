import { Typography } from "antd";
import React from "react";

interface ProfileDescriptionProps {
  description: string;
}

const ProfileDescription: React.FC<ProfileDescriptionProps> = ({ description }) => {
  return (
    <div className="flex justify-center" style={{ borderBottom: "1px solid #D6dce5", width: "100%" }}>
      <div className="flex justify-center flex-col max-w-[78.5%]"
           style={{ padding: "16px 0 21px 0" }}>

        <Typography.Text className="text-left text-base font-bold font-inter"
                         style={{ display: "block", marginBottom: 9 }}>
          Биография
        </Typography.Text>
        <Typography.Text className="font-default text-sm">
          {description || "Биография не заполнена"}
        </Typography.Text>
      </div>
    </div>
  );
};

export default ProfileDescription;