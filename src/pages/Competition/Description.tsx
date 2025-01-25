import { Collapse, Tag, Typography, Avatar, Steps, List } from "antd";
import type { StepsProps } from "antd";
import { FileOutlined, UserOutlined } from "@ant-design/icons";
import React from "react";
import "./Competition.css";
import dayjs from "dayjs";
import { User } from "../../types/api.ts";

const { Panel } = Collapse;
const { Text } = Typography;

export interface DescriptionProps {
  shortDescription: string;
  detailedDescription: string;
  goals: string;
  rules: string;
  prizeAmount: number;
  prizeInfo?: string;
  documentation?: { name: string, url: string }[];
  tags: string[];
  startDate: string;
  endDate: string;
  author: User;
}

const Description: React.FC<DescriptionProps> = (props) => {

  const stepsItems: StepsProps["items"] = [
    {
      title: dayjs(props.startDate).format("DD.MM.YYYY")
    },
    {
      title: dayjs(props.endDate).format("DD.MM.YYYY")
    }
  ];


  return (
    <div className="flex flex-col">
      {/*<Divider className="border-black border-opacity-30 mt-[16px] mb-[32px]" />*/}
      <Text className="text-h4 mb-[16px]">
        Краткая информация
      </Text>
      <Text className="text mb-[16px]">
        {props.shortDescription}
      </Text>
      {props.prizeAmount > 0 ? <div className="mb-[20px]">
        <Text className="text-left text-base text-text text-opacity-85 font-inter font-semibold">
          {"Призовой фонд: "}
        </Text>
        <Text className="text" style={{ fontWeight: "normal" }}>
          {props.prizeAmount} ₽
        </Text>
      </div> : null}
      <Steps items={stepsItems} current={1} progressDot className="mb-[32px]" />

      <Text className="text-h4 mb-[16px]">
        Организатор
      </Text>
      <div className="flex flex-row items-center space-x-[16px] mb-[32px]">
        <Avatar size={40} {...props.author.profileImage ? { src: props.author.profileImage } : {
          icon: <UserOutlined />
        }} />
        <Text className="text">
          {props.author.fullName ? props.author.fullName : props.author.username}
        </Text>
      </div>

      <Text className="text-h4 mb-[16px]">
        Теги
      </Text>
      <div className="mb-[32px]">
        {props.tags && props.tags.map((tag, index) => (
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


      <Collapse>
        <Panel header="Описание соревнования" key="1">
          <Text className="text">{props.detailedDescription}</Text>
        </Panel>
        <Panel header="Цели соревнования" key="2">
          <Text className="text">{props.goals}</Text>
        </Panel>
        <Panel header="Правила" key="3">
          <Text className="text">{props.rules}</Text>
        </Panel>
        {props.prizeInfo && (
          <Panel header="Информация о призах" key="4">
            <Text className="text">{props.prizeInfo}</Text>
          </Panel>)}
        <Panel header="Документация" key="5">
          <List
            itemLayout="horizontal"
            dataSource={props.documentation}
            renderItem={(file) => (
              <List.Item>
                <List.Item.Meta
                  avatar={<FileOutlined />}
                  title={
                    <a href={file.url} target="_blank" rel="noopener noreferrer">
                      {file.name}
                    </a>
                  }
                  description={file.url}
                />
              </List.Item>
            )}
          />
        </Panel>
      </Collapse>
      <div className="h-[100px]" />
    </div>
  );
};

export default Description;