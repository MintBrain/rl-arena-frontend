import { Avatar, Button, Typography } from "antd";
import { SettingOutlined, UserOutlined } from "@ant-design/icons";
import React from "react";
import dayjs from "dayjs";
import { Link } from "react-router-dom";

interface Props {
  username: string;
  fullName: string;
  registrationDate: dayjs.Dayjs;
  lastLoginDate: dayjs.Dayjs;
  profileImage: string;
}

const ProfileHeader: React.FC<Props> = ({ username, fullName, registrationDate, lastLoginDate, profileImage }) => {
  return (
    <div style={{ borderBottom: "1px solid #D6dce5", width: "100%" }}>
      <div className=" w-full max-w-[78.5%]" style={{ padding: "30px 0 37px 0", margin: "0 auto" }}>
        <div className="flex flex-row justify-start w-full">
        <Avatar size={120} {...profileImage !== "" ? { src: profileImage } : {
          icon: <UserOutlined />
        }} />
        <div style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-evenly",
          rowGap: 17,
          marginLeft: 42,
          marginRight: 42
        }}>
          <Typography.Text className="text-sm">{username}</Typography.Text>
          <Typography.Text className="font-semibold text-lg">{fullName}</Typography.Text>
          <Typography.Text className="text-sm">присоединился {registrationDate.format("DD.MM.YYYY")} · был в
            сети {lastLoginDate.format("DD.MM.YYYY")}{/* дней назад*/}</Typography.Text>
        </div>
          <Link to="/settings"><Button className="font-default text-sm bg-accentColor text-second rounded-[2px] hover:!bg-accentColor h-[34px]"
                icon={<SettingOutlined style={{ color: "white", fontSize: "24px" }} />}>
          Редактировать профиль
        </Button></Link>
      </div></div>
    </div>
  );
};

export default ProfileHeader;