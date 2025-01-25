import React, { useEffect, useState } from "react";
import { Table, Input, Typography, Space } from "antd";

const { Title } = Typography;
const { Search } = Input;

export interface LeaderboardEntry {
  rank: number;
  name: string;
  score: number;
  submissions: number;
  lastSubmission: string; // Use string for simplicity, e.g., formatted date
}

interface Props {
  leaderboard: LeaderboardEntry[];
}


const LeaderBoard: React.FC<Props> = ({ leaderboard }) => {
  const [filteredData, setFilteredData] = useState<LeaderboardEntry[]>(leaderboard);

  const onSearch = (value: string) => {
    const searchValue = value.toLowerCase();
    const filtered = leaderboard.filter((entry) =>
      entry.name.toLowerCase().includes(searchValue)
    );
    setFilteredData(filtered);
  };

  const columns = [
    {
      title: "#",
      dataIndex: "rank",
      key: "rank",
      width: "5%"
    },
    {
      title: "Имя",
      dataIndex: "name",
      key: "name",
      width: "35%"
    },
    {
      title: "Счет",
      dataIndex: "score",
      key: "score",
      width: "15%",
      sorter: (a: LeaderboardEntry, b: LeaderboardEntry) => b.score - a.score
    },
    {
      title: "Решения",
      dataIndex: "submissions",
      key: "submissions",
      width: "15%",
      sorter: (a: LeaderboardEntry, b: LeaderboardEntry) => b.submissions - a.submissions
    },
    {
      title: "Последнее решение",
      dataIndex: "lastSubmission",
      key: "lastSubmission",
      width: "30%"
    }
  ];

  useEffect(() => {
    setFilteredData(leaderboard);
  }, [leaderboard]);

  return (
    <>
      <div style={{ padding: "20px", backgroundColor: "#fff", borderRadius: "8px" }}>
        <Space direction="vertical" style={{ width: "100%" }}>
          <Title level={4}>Таблица лидеров</Title>
          <Search
            placeholder="Поиск по имени"
            allowClear
            onSearch={onSearch}
            style={{ width: 300 }}
          />
          <Table
            dataSource={filteredData}
            columns={columns}
            rowKey="rank"
            pagination={{ pageSize: 5 }}
          />
        </Space>
      </div>
    </>
  );
};

export default LeaderBoard;