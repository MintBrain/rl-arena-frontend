import React, { useEffect, useRef, useState } from "react";
import { Col, Row, Typography } from "antd";
import { Link } from "react-router-dom";
import { RightOutlined } from "@ant-design/icons";


interface Props {
  title: string;
  items: React.ReactNode[];
  gutter?: number;
}

const CardWheel: React.FC<Props> = ({ title, items, gutter = 24 }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const [visibleCount, setVisibleCount] = useState(0);

  useEffect(() => {
    const handleResize = () => {
      if (containerRef.current && cardRef.current) {
        const containerWidth = containerRef.current.offsetWidth;
        const measuredCardWidth = cardRef.current.offsetWidth;
        const totalItemWidth = measuredCardWidth + gutter;
        const count = Math.floor(containerWidth / totalItemWidth);
        setVisibleCount(count); // Update visible count
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize); // Recalculate on window resize

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [gutter]);


  return (
    <div ref={containerRef} style={{ padding: 24 }}>
      <div style={{ display: "flex", justifyContent: "space-between", paddingBottom: 24 }}>
        <Typography.Text className="text-left text-textSecondary font-semibold text-lg">
          {title}
        </Typography.Text>
        <Link className="text-accentColor ml-2"
              to="/competitions"> {/*TODO: Pass query params to display user competitions filter or link to user pages*/}
          Перейти ко всем <RightOutlined />
        </Link>
      </div>
      <Row gutter={gutter} justify="start" align="middle" style={{ width: "100%" }}>
        {items.slice(0, Math.max(1, visibleCount)).map((item, index) => (
          <Col
            key={index}
            ref={index === 0 ? cardRef : undefined} // Assign ref to the first visible card
          >
            {item}
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default CardWheel;