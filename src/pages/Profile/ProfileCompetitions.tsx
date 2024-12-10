import { Row, Typography } from "antd";
import React from "react";


const competitionData = [
  {
    title: "Название соревнования",
    description: "Описание соревнования.",
    prize: "$100,000",
    timeLeft: "1 месяц до окончания",
  },
  {
    title: "Название соревнования",
    description: "Описание соревнования.",
    prize: "$100,000",
    timeLeft: "1 месяц до окончания",
  },
  // Add more competitions as needed
];


const ProfileCompetitions = () => {
  return (
    <div className="flex flex-col m-2.5">
      <div className="flex justify-between items-center">
        <Typography.Text> Название соревнования</Typography.Text>
        <Typography.Text> Описание соревнования</Typography.Text>
      </div>
      <div style={{
        height: 52,
        border: "1px solid #DADADA",
        borderTop: 0,
        borderRadius: "0 0 16px 16px",
        padding: 16,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        background: "#fff"
      }}>
        <Typography.Text style={{ fontWeight: 500 }}>{1000} ₽</Typography.Text>
        <Typography.Text>{"Остался 1 месяц"}</Typography.Text>
      </div>
    </div>
  );
};

export default ProfileCompetitions;