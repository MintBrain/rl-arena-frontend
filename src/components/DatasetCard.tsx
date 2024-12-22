import React from "react";
import { Card, Tag, Typography } from "antd";
import { formatFileSize } from "../utils/sizeFormat.ts";

const { Meta } = Card;

interface CardProps {
  title: string;
  description?: string;
  tags?: string[];
  size?: number;
  uploadDate?: number;
}


const DatasetCard: React.FC<CardProps> = ({ title, description, tags, size }) => {
  return (
    <div style={{ width: 300, height: 364 }}>
      <Card cover={<img
        style={{ height: "100%" }}
        alt="card-baner" src="/dataset-card.webp" />}
            style={{ borderRadius: "16px 16px 0 0", border: "1px solid #DADADA" }}
            styles={{
              cover: { height: 132, overflow: "hidden", objectFit: "cover", borderRadius: "16px 16px 0 0" },
              body: { padding: "16px" }
            }}
      >
        <Meta style={{ marginBottom: 12 }} title={<div style={{ marginBottom: 4 }}>{title}</div>}
              description={description} />
        <div style={{}}>
          {tags && tags.map(tag => (
            <Tag style={{
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
        background: '#fff',
      }}>
        <Typography.Text style={{ fontWeight: 500 }}>{formatFileSize(size || 0)}</Typography.Text>
        {/*<Typography.Text>{timeRemaining}</Typography.Text>*/}
      </div>
    </div>
  );
};

export default DatasetCard;