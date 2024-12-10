import React from "react";
import { Table, Typography } from "antd";
import type {TableProps} from "antd";

const monthNames = [
  "Январь",
  "Февраль",
  "Март",
  "Апрель",
  "Май",
  "Июнь",
  "Июль",
  "Август",
  "Сентябрь",
  "Октябрь",
  "Ноябрь",
  "Декабрь",
];

interface MonthlyData {
  solutionCount: number;
  participationCount: number;
}

interface Props {
  data: Record<number,MonthlyData>;
}

const columns: TableProps['columns'] = [
  {
    title: "",
    dataIndex: "dataName",
    key: "dataName",
  },
  ...monthNames.map((month, index) => ({
    title: month,
    dataIndex: String(index),
    key: index,
  })),
];

const ProfileStatistics: React.FC<Props> = ({data}) => {
  const dataSource = [
    {
      key: "1",
      dataName: "Кол-во публикаций",
      ...Object.keys(data).reduce((acc, key) => {
        acc[key] = data[Number(key)].solutionCount;
        return acc;
      }, {} as Record<string, number>),
    },
    {
      key: "2",
      dataName: "Кол-во участий",
      ...Object.keys(data).reduce((acc, key) => {
        acc[key] = data[Number(key)].participationCount;
        return acc;
      }, {} as Record<string, number>),
    },
  ];

  return (
    <>
      <div className="flex flex-col justify-start max-w-[78.5%] w-full p-0 mb-[8px]">
        <Typography.Text className="text-base font-bold py-[16px]">Статистика</Typography.Text>
        <Table size={"small"} columns={columns} dataSource={dataSource} bordered pagination={false} />
      </div>
    </>
  );
};

export default ProfileStatistics;