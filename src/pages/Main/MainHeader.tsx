import BreadcrumbNav from "../../components/BreadcrumbNav.tsx";
import { Button, Dropdown, Input, Space } from "antd";
import type { MenuProps } from "antd";
import { DownOutlined } from "@ant-design/icons";
import { useState } from "react";
import type { GetProps } from "antd";
import { Link } from "react-router-dom";

type SearchProps = GetProps<typeof Input.Search>;

const MenuItems = [{ label: "Все соревнования", key: "1" }, { label: "Прошедшие соревнования", key: "2" }];


const MainHeader = () => {
  const [selectedItem, setSelectedItem] = useState("1");

  const handleOnSearch: SearchProps["onSearch"] = (value, _e, info) => {
    console.log(info?.source, value);
  };

  const handleMenuClick: MenuProps["onClick"] = (info) => {
    setSelectedItem(info.key);
  };

  return (
    <div style={{
      borderBottom: "1px solid #D6dce5",
      width: "100%",
      display: "flex",
      alignSelf: "flex-start",
      flexDirection: "column",
      justifyContent: "normal",
      padding: "16px 24px 20px 24px",
      background: "#fff"
    }}>
      <BreadcrumbNav />
      <div style={{ display: "flex", justifyContent: "space-between", marginTop: 8 }}>
        <Link to="/create-competition"><Button onClick={() => null} className="mr-[12px] bg-accentColor text-second">
          Создать соревнование
        </Button> </Link>
        <Dropdown trigger={["click"]} menu={{
          items: MenuItems,
          selectable: true,
          defaultSelectedKeys: ["1"],
          selectedKeys: [selectedItem],
          onClick: handleMenuClick

        }}>
          <Button style={{ width: 220 }}>
            <Space>
              {MenuItems.find((pred) => pred.key === selectedItem)?.label || "error"}
              <DownOutlined />
            </Space>
          </Button>
        </Dropdown>
        <Input.Search placeholder={"Поиск соревнований"} allowClear onSearch={handleOnSearch}
                      style={{ flex: 1, marginLeft: "12px" }} />
      </div>
    </div>
  );
};

export default MainHeader;