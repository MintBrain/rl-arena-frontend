import { Avatar, Button, Typography, Upload } from "antd";
import type { UploadProps } from "antd";
import { SettingOutlined, UploadOutlined, UserOutlined } from "@ant-design/icons";
import React from "react";
import dayjs from "dayjs";
import { Link } from "react-router-dom";

interface Props {
  username: string;
  fullName: string;
  registrationDate: dayjs.Dayjs;
  lastLoginDate: dayjs.Dayjs;
  profileImage: string;
  handleUpload: UploadProps["customRequest"];
}

const ProfileHeader: React.FC<Props> = ({
                                          username,
                                          fullName,
                                          registrationDate,
                                          lastLoginDate,
                                          profileImage,
                                          handleUpload
                                        }) => {
  return (
    <div style={{ borderBottom: "1px solid #D6dce5", width: "100%" }}
         className="flex flex-col items-start self-start justify-start">
      <div className=" w-full max-w-[78.5%]" style={{ padding: "30px 0 37px 0", margin: "0 auto" }}>
        <div className="flex flex-row justify-start w-full">
          <div className="relative inline-block group">
            <Avatar size={120} {...profileImage ? { src: profileImage } : {
              icon: <UserOutlined />
            }} />
            <div
              className="absolute inset-0 bg-black bg-opacity-50 flex justify-center items-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-full">
              <Upload
                showUploadList={false}
                accept=".jpg, .png"
                maxCount={1}
                customRequest={handleUpload}
              >
                <UploadOutlined style={{ color: "white", fontSize: "26px" }} />
              </Upload>
            </div>
          </div>
          <div style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-evenly",
            rowGap: 17,
            marginLeft: 42,
            marginRight: 175
          }}>
            {fullName ?
              <>
                <Typography.Text className="text-sm">{username}</Typography.Text>
                <Typography.Text className="font-semibold text-lg">{fullName}</Typography.Text>
              </> :
              <>
                <Typography.Text className="text-sm"></Typography.Text>
                <Typography.Text className="font-semibold text-lg">{username}</Typography.Text>
              </>
            }
            <Typography.Text className="text-sm">присоединился {registrationDate.format("DD.MM.YYYY")} · был в
              сети {lastLoginDate.format("DD.MM.YYYY")}{/* дней назад*/}</Typography.Text>
          </div>
          <Link to="/settings" className="contents">
            <Button
              className="font-default text-sm bg-accentColor text-second rounded-[2px] hover:!bg-accentColor h-[34px] flex items-center justify-center"
              icon={<SettingOutlined style={{ color: "white", fontSize: "24px" }} />}>
              Редактировать профиль
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProfileHeader;