import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Button, Layout, Menu, Typography } from "antd";
import type { MenuProps } from "antd";
import { CarryOutOutlined, HomeOutlined, MenuFoldOutlined, MenuUnfoldOutlined, TableOutlined } from "@ant-design/icons";


type MenuItem = Required<MenuProps>["items"][number];

function getItem(label: React.ReactNode, key: React.Key, icon?: React.ReactNode, children?: MenuItem[]): MenuItem {
  return { key, icon, children, label } as MenuItem;
}

const items: MenuItem[] = [
  getItem("Главная", "/", <HomeOutlined />),
  getItem("Соревнования", "/competitions", <CarryOutOutlined />),
  getItem("Датасеты", "/datasets", <TableOutlined />),
  getItem("Profile", "/profile"),
  getItem("Register", "/register"),
  getItem("Login", "/login"),
  getItem("Restore", "/restore"),
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
    <Layout.Sider width="230px" className="text-nowrap" trigger={null} collapsible collapsed={collapsed} style={{
      height: "100vh",
      overflow: "auto",
      position: "sticky",
      insetInlineStart: 0,
      top: 0,
      bottom: 0,
      scrollbarWidth: "thin",
      scrollbarGutter: "stable"
    }}>
      <Button type="text"
              icon={collapsed ? <MenuUnfoldOutlined style={{ color: "white" }} /> :
                <MenuFoldOutlined style={{ color: "white" }} />}
              onClick={() => setCollapsed(!collapsed)}
              style={{ width: 64, height: 71 }} />
      {!collapsed &&
        <Typography.Text className="text-second font-bold text-lg text-nowrap flex-nowrap" style={{ height: 74 }}>
          RL Arena
        </Typography.Text>}

      <Menu style={{ userSelect: "none" }} theme="dark" defaultSelectedKeys={["1"]} mode="inline" items={items}
            selectedKeys={[selectedKey]} onSelect={handleMenuSelect} />
    </Layout.Sider>
  );
};

export default Navigation;