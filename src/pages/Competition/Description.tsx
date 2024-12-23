import { Collapse, Tag, Typography, Timeline, Avatar, Row, Col, Divider } from 'antd';
import { UserOutlined } from '@ant-design/icons';

const { Panel } = Collapse;
const { Title, Text } = Typography;


const Description = () => {
  return (
    <div style={{ padding: '20px', backgroundColor: '#fff', borderRadius: '8px', maxWidth: '800px', margin: 'auto' }}>
      <Title level={4}>Краткая информация</Title>
      <Text>Какое-то описание соревнования.</Text>
      <div style={{ marginTop: '10px' }}>
        <Text strong>Призовой фонд: </Text>
        <Text>100 000 ₽</Text>
      </div>
      <div style={{ marginTop: '20px' }}>
        <Timeline>
          <Timeline.Item color="blue">
            <Text>21.04.2024</Text>
          </Timeline.Item>
          <Timeline.Item color="blue">
            <Text>21.05.2024</Text>
          </Timeline.Item>
        </Timeline>
        <Text>1 месяц</Text>
      </div>
      <Divider />
      <Row align="middle">
        <Col flex="30px">
          <Avatar icon={<UserOutlined />} />
        </Col>
        <Col>
          <Text>Иванов Иван Иванович</Text>
        </Col>
      </Row>
      <Divider />
      <Title level={5}>Теги</Title>
      <div style={{ marginBottom: '20px' }}>
        {['Первый тег', 'Второй тег', 'Третий тег', 'Четвертый тег', 'Пятый тег', 'Шестой тег', 'Седьмой тег'].map((tag, index) => (
          <Tag key={index} color="blue" style={{ marginBottom: '8px' }}>
            {tag}
          </Tag>
        ))}
      </div>
      <Collapse>
        <Panel header="Описание соревнования" key="1">
          <Text>Здесь находится описание соревнования.</Text>
        </Panel>
        <Panel header="Правила" key="2">
          <Text>Здесь находятся правила соревнования.</Text>
        </Panel>
        <Panel header="Информация о призах" key="3">
          <Text>Здесь информация о призах.</Text>
        </Panel>
        <Panel header="Документация" key="4">
          <Text>Документация по соревнованию.</Text>
        </Panel>
        <Panel header="Таблица лидеров" key="5">
          <Text>Таблица лидеров будет здесь.</Text>
        </Panel>
      </Collapse>
    </div>
  );
};

export default Description;