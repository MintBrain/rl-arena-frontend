import React, { useState } from "react";
import { DesktopOutlined, PieChartOutlined } from "@ant-design/icons";
import { SelectInfo } from "rc-menu/lib/interface";
import type { MenuProps } from "antd";
import { Layout, Menu } from "antd";
import { useNavigate } from "react-router-dom";

const { Sider } = Layout;

type MenuItem = Required<MenuProps>["items"][number];

function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[]
): MenuItem {
  return {
    key,
    icon,
    children,
    label
  } as MenuItem;
}

const items: MenuItem[] = [
  getItem("Main page", "/", <PieChartOutlined />),
  getItem("Register", "/register", <DesktopOutlined />),
  getItem("Login", "/login", <DesktopOutlined />)
  // getItem('User', 'sub1', <UserOutlined />, [
  //   getItem('Tom', '4'),
  //   getItem('Bill', '5'),
  //   getItem('Alex', '6'),
  // ]),
  // getItem('Team', 'sub2', <TeamOutlined />, [getItem('Team 1', '7'), getItem('Team 2', '8')]),
  // getItem('Files', '9', <FileOutlined />),
];

const Navigation: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();

  function onMenuChange(data: SelectInfo) {
    navigate(data.key);
  }

  return (
    <Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
      {/*<div className="demo-logo-vertical" />*/}
      <Menu theme="dark" defaultSelectedKeys={["1"]} mode="inline" items={items} onSelect={onMenuChange} />
    </Sider>
  );
};

export default Navigation;