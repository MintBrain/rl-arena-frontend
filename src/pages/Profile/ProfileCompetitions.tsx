import { Col, Image, Row, Typography } from "antd";
import React from "react";
import { Link } from "react-router-dom";
import dayjs from "dayjs";
import { getTimeRemaining } from "../../utils/timeFormat.ts";


interface Props {
  competitions: {
    title: string;
    description: string;
    tags: string[];
    reward: number;
    deadline?: number;
    backgroundImage?: string;
    url: string;
  }[];
}

const ProfileCompetitions: React.FC<Props> = ({ competitions }) => {
  return (
    <div className="max-w-[78.5%] p-0 w-full">
      <div className="flex flex-row w-full justify-between items-center py-[16px]">
        <Typography.Text className="text-base font-bold">Соревнования</Typography.Text>
        <Link to="/competitions"
              className="text-accentColor ml-2">  {/* TODO: Pass query params for filter user competitions */}
          Все соревнования
        </Link>
      </div>
      <div className="">
        <Row gutter={0} align="middle" justify="center">
          {competitions.length > 0 ? (
              competitions.slice(0, competitions.length >= 6 ? 6 : 3).map((competition, index) => (
                <Col key={index}>
                  <div
                    className="flex flex-col justify-between gap-y-[8px] overflow-hidden bg-white p-[24px] w-[358px] h-[130px] "
                    style={{ border: "1px solid #DADADA" }}>
                    <div className="flex items-end">
                      <Image width={24} height={24} preview={false} style={{ borderRadius: 12 }}
                             src={competition.backgroundImage ? competition.backgroundImage : "rl-arena-ico.svg"}
                             alt="competition" />
                      <Typography.Text
                        className="text-sm font-default text-text ml-[12px]">{competition.title.length > 40 ? `${competition.title.substring(0, 30)}...` : competition.title}</Typography.Text>
                    </div>
                    <Typography.Paragraph
                      className="font-semibold font-default text-sm text-textSecondary text-opacity-45 !m-0">{competition.description.length > 40 ? `${competition.description.substring(0, 30)}...` : competition.description}</Typography.Paragraph>
                    <div className="flex flex-row justify-between">
                      {competition.reward > 0 ?
                        <Typography.Text className="font-default text-textSecondary text-opacity-45">
                          {competition.reward} ₽
                        </Typography.Text> : <div></div>}
                      <Typography.Text
                        className="font-default text-textSecondary text-opacity-45">
                        {getTimeRemaining(dayjs(competition.deadline).unix() * 1000)}
                      </Typography.Text>
                    </div>
                  </div>
                </Col>
              ))
            ) :
            <Typography.Text className="">
              Пользователь не участвовал в соревнованиях
            </Typography.Text>
          }
        </Row>
      </div>
    </div>
  );
};

export default ProfileCompetitions;