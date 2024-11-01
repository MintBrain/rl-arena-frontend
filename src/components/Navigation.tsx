import React, { useState } from "react";
import { DesktopOutlined, PieChartOutlined } from "@ant-design/icons";
import { SelectInfo } from "rc-menu/lib/interface";
import type { MenuProps } from "antd";
import { Layout, Menu } from "antd";
import { useNavigate } from "react-router-dom";

const { Sider } = Layout;

type MenuItem = Required<MenuProps>["items"][number];

function getItem(label: React.ReactNode, key: React.Key, icon?: React.ReactNode, children?: MenuItem[]): MenuItem {
  return { key, icon, children, label } as MenuItem;
}

const items: MenuItem[] = [
  getItem("Main page", "/", <PieChartOutlined />),
  getItem("Register", "/register", <DesktopOutlined />),
  getItem("Login", "/login", <DesktopOutlined />)
];

const Navigation: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();

  function handleMenuSelect(data: SelectInfo) {
    navigate(data.key);
  }

  return (
    <Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
      <Menu theme="dark" defaultSelectedKeys={["1"]} mode="inline" items={items} onSelect={handleMenuSelect} />
    </Sider>
  );
};

export default Navigation;