import { Col, Image, Row, Typography } from "antd";
import React from "react";
import { Link } from "react-router-dom";


interface Props {
  competitions: {
    title: string;
    shortDescription: string;
    prize: number;
    deadline: number;
    image: string;
  }[];
}

const ProfileCompetitions: React.FC<Props> = ({ competitions }) => {
  return (
    <div className="max-w-[78.5%] p-0">
      <div className="flex justify-between items-center py-[16px]">
        <Typography.Text className="text-base font-bold">Соревнования</Typography.Text>
        <Link to="/competitions" className="text-accentColor ml-2">  {/* TODO: Pass query params for filter user competitions */}
          Все соревнования
        </Link>
      </div>
      <div className="">
        <Row gutter={0} align="middle" justify="center">
          {competitions.slice(0, 6).map((competition, index) => (
            <Col key={index}>
              <div
                className="flex flex-col justify-between gap-y-[8px] overflow-hidden bg-white p-[24px] w-[358px] h-[130px] "
                style={{ border: "1px solid #DADADA" }}>
                <div className="flex items-end">
                  <Image width={24} height={24} preview={false} style={{ borderRadius: 12 }} src={competition.image}
                         alt="competition" />
                  <Typography.Text
                    className="text-sm font-default text-text ml-[12px]">{competition.title}</Typography.Text>
                </div>
                <Typography.Paragraph
                  className="font-semibold font-default text-sm text-textSecondary text-opacity-45 !m-0">{competition.shortDescription}</Typography.Paragraph>
                <div className="flex flex-row justify-between">
                  <Typography.Text
                    className="font-default text-textSecondary text-opacity-45">{competition.prize}</Typography.Text>
                  <Typography.Text
                    className="font-default text-textSecondary text-opacity-45">{competition.deadline}</Typography.Text>
                </div>
              </div>
            </Col>
          ))}
        </Row>
      </div>
    </div>
  );
};

export default ProfileCompetitions;