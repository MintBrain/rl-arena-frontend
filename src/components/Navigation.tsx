import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Layout, Menu } from "antd";
import type { MenuProps } from "antd";
import { DesktopOutlined, PieChartOutlined } from "@ant-design/icons";


type MenuItem = Required<MenuProps>["items"][number];

function getItem(label: React.ReactNode, key: React.Key, icon?: React.ReactNode, children?: MenuItem[]): MenuItem {
  return { key, icon, children, label } as MenuItem;
}

const items: MenuItem[] = [
  getItem("Main page", "/", <PieChartOutlined />),
  getItem("Register", "/register", <DesktopOutlined />),
  getItem("Login", "/login", <DesktopOutlined />),
  getItem("Restore", "/restore", <DesktopOutlined />),
];

const Navigation: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const [selectedKey, setSelectedKey] = useState(location.pathname);

  useEffect(() => {
    setSelectedKey(location.pathname);
  }, [location.pathname]);

  const handleMenuSelect: MenuProps["onSelect"] = (data) => {
    navigate(data.key);
  };

  return (
    <Layout.Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
      <Menu style={{ userSelect: 'none'}} theme="dark" defaultSelectedKeys={["1"]} mode="inline" items={items} selectedKeys={[selectedKey]} onSelect={handleMenuSelect} />
    </Layout.Sider>
  );
};

export default Navigation;