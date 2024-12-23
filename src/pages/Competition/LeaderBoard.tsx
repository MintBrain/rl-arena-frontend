import  { useState } from 'react';
import { Table, Input, Typography, Space } from 'antd';

const { Title } = Typography;
const { Search } = Input;

interface LeaderboardEntry {
  rank: number;
  name: string;
  score: number;
  submissions: number;
  lastSubmission: string; // Use string for simplicity, e.g., formatted date
}

const leaderboardData: LeaderboardEntry[] = [
  { rank: 1, name: 'John Doe', score: 500, submissions: 10, lastSubmission: '2024-12-21 14:00' },
  { rank: 2, name: 'Jane Smith', score: 480, submissions: 12, lastSubmission: '2024-12-21 13:45' },
  { rank: 3, name: 'Bob Johnson', score: 450, submissions: 8, lastSubmission: '2024-12-21 13:30' },
  { rank: 4, name: 'Alice Brown', score: 430, submissions: 9, lastSubmission: '2024-12-21 12:45' },
  { rank: 5, name: 'Charlie Green', score: 420, submissions: 7, lastSubmission: '2024-12-21 12:30' },
];


const LeaderBoard = () => {
  const [filteredData, setFilteredData] = useState<LeaderboardEntry[]>(leaderboardData);

  const onSearch = (value: string) => {
    const searchValue = value.toLowerCase();
    const filtered = leaderboardData.filter((entry) =>
      entry.name.toLowerCase().includes(searchValue)
    );
    setFilteredData(filtered);
  };

  const columns = [
    {
      title: '#',
      dataIndex: 'rank',
      key: 'rank',
      width: '5%',
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      width: '35%',
    },
    {
      title: 'Score',
      dataIndex: 'score',
      key: 'score',
      width: '15%',
      sorter: (a: LeaderboardEntry, b: LeaderboardEntry) => b.score - a.score,
    },
    {
      title: 'Submissions',
      dataIndex: 'submissions',
      key: 'submissions',
      width: '15%',
      sorter: (a: LeaderboardEntry, b: LeaderboardEntry) => b.submissions - a.submissions,
    },
    {
      title: 'Last Submission',
      dataIndex: 'lastSubmission',
      key: 'lastSubmission',
      width: '30%',
    },
  ];


  return (
    <>
      <div style={{ padding: '20px', backgroundColor: '#fff', borderRadius: '8px' }}>
        <Space direction="vertical" style={{ width: '100%' }}>
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