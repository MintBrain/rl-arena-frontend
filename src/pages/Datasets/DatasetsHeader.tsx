import { useState } from "react";
import { Button, Dropdown, Input, Space, Radio } from "antd";
import type { GetProps, MenuProps } from "antd";
import { DownOutlined, TableOutlined, UnorderedListOutlined } from "@ant-design/icons";
import BreadcrumbNav from "../../components/BreadcrumbNav.tsx";

type SearchProps = GetProps<typeof Input.Search>;

const MenuItems = [{ label: "Все датасеты", key: "1" }, { label: "Мои датасеты", key: "2" }];

const DatasetsHeader = () => {
  const [selectedItem, setSelectedItem] = useState("1");
  const [position, setPosition] = useState("1");


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
        <Input.Search placeholder={"Поиск датасетов"} allowClear onSearch={handleOnSearch}
                      style={{ flex: 1, marginLeft: "12px" }} />
        <Radio.Group block optionType='button' className="ml-[12px]" value={position} onChange={(e) => setPosition(e.target.value)}>
          <Radio.Button value={"1"}><TableOutlined /></Radio.Button>
          <Radio.Button value={"2"}><UnorderedListOutlined /></Radio.Button>
        </Radio.Group>
      </div>
    </div>
  );
};

export default DatasetsHeader;