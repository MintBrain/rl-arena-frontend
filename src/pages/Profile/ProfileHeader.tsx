import { Avatar, Button, Typography } from "antd";
import { SettingOutlined, UserOutlined } from "@ant-design/icons";
import React, { useState } from "react";
import dayjs from "dayjs";

interface Props {
  username: string;
  fullName: string;
  registrationDate: number;
  lastLoginDate: number;
}

const ProfileHeader: React.FC<Props> = ({username, fullName, registrationDate, lastLoginDate}) => {
  const [userHaveAvatar] = useState(true); // TODO: Fetch from userInfo from store or make api request

  return (
    <div style={{ display: 'flex', flexDirection: 'row', padding: '30px 0 37px 0', borderBottom: "1px solid #D6dce5", width: "100%", justifyContent: "center" }}>
      <Avatar size={120} {...userHaveAvatar ? {src: "leonardo-dicaprio-2118377.webp"} : {icon: <UserOutlined />}} />
      <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-evenly', rowGap: 17, marginLeft: 42, marginRight: 42 }}>
        <Typography.Text className="text-sm">{username}</Typography.Text>
        <Typography.Text className="font-semibold text-lg">{fullName}</Typography.Text>
        <Typography.Text className="text-sm">присоединился {dayjs(registrationDate).format('DD.MM.YYYY')} · был в сети {lastLoginDate} дней назад</Typography.Text>
      </div>
      <Button className='bg-accentColor text-second rounded-[2px] hover:!bg-accentColor h-[34px]' icon={<SettingOutlined style={{ color: "white", fontSize: "24px" }} />}>
        Редактировать профиль
      </Button>
    </div>
  );
};

export default ProfileHeader;