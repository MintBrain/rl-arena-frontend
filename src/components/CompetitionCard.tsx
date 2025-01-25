import React, { useEffect, useState } from "react";
import { Card, Tag, Typography } from "antd";
import { getTimeRemaining } from "../utils/timeFormat.ts";
import { Link } from "react-router-dom";

const { Meta } = Card;

interface CardProps {
  title: string;
  description?: string;
  tags?: string[];
  reward?: number;
  deadline?: number;
  backgroundImage?: string;
  url: string;
}


const CompetitionCard: React.FC<CardProps> = ({ title, description, tags, reward, deadline, backgroundImage, url }) => {
  const [timeRemaining, setTimeRemaining] = useState(() => getTimeRemaining(deadline || 0));


  useEffect(() => {
    const timer = setInterval(() => {
      setTimeRemaining(getTimeRemaining(deadline || 0));
    }, 1000); // Update every second

    return () => clearInterval(timer);
  }, [deadline]);

  return (
    <div style={{ width: 300, height: 364 }} className="flex flex-col">
      <Card
        cover={<img
          style={{ height: "100%" }}
          alt="card-baner" src={backgroundImage ? backgroundImage : "/card-img.webp"} />
        }
        style={{
          borderRadius: "16px 16px 0 0",
          border: "1px solid #DADADA",
          display: "flex",
          flexDirection: "column",
          flexGrow: 1
        }}
        styles={{
          cover: { height: 132, overflow: "hidden", objectFit: "cover", borderRadius: "16px 16px 0 0" },
          body: { padding: "16px", display: "flex", flexDirection: "column", flexGrow: 1 }
        }}

      >
        <Meta style={{ marginBottom: 12, display: "flex", flexDirection: "column", flexGrow: 1 }}
              title={<Link to={`/competitions/${url}`}>
                <div style={{ marginBottom: 4 }}>{title}</div>
              </Link>}
              description={description} />
        <div>
          {tags && tags.map((tag, index) => (
            <Tag
              key={index.toString()}
              style={{
                borderRadius: 12,
                height: 28,
                padding: "1px 12px 1px 12px",
                display: "inline-flex",
                alignItems: "center"
              }}>{tag}</Tag>
          ))}
        </div>
      </Card>
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
        {reward && reward > 0 ?
          <Typography.Text style={{ fontWeight: 500 }}>{reward} ₽</Typography.Text> :
          <div></div>}
        <Typography.Text>{timeRemaining}</Typography.Text>
      </div>
    </div>
  );
};

export default CompetitionCard;