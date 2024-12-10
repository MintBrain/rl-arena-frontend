import { Typography } from "antd";
import React from "react";

interface ProfileDescriptionProps {
  description: string;
}

const ProfileDescription: React.FC<ProfileDescriptionProps> = ({description}) => {
  return (
    <div className="flex justify-center flex-col" style={{borderBottom: "1px solid #D6dce5", width: "100%", padding: "16px 24px"}}>

      <Typography.Text className="text-left text-base font-bold" style={{display: "block", marginBottom: 8 }} >Биография</Typography.Text>
      <Typography.Text className="font-default text-sm"> {description || 'Биография не заполнена'}</Typography.Text>

    </div>
  );
};
// "pt-[16px] pb-[21px]"
export default ProfileDescription;