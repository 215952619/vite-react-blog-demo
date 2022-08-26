import React, { useState, useEffect } from "react";
import { Button, Menu } from "antd";
import type {MenuProps} from 'antd'
import { useLocation, useNavigate } from "react-router-dom";
import style from "./layout.module.css";
import { menu } from "../../utils/vars";
import icons from "../../utils/icons";

const items = menu.map((item) => {
  const icon = icons[item?.icon ?? "EllipsisOutlined"];
  return {
    ...item,
    icon: React.createElement(icon),
  };
});

type CustomSiderProps = {
  collapsed: boolean;
  updateCollapse: (collapsed: boolean) => void;
}
const CustomSider:React.FC<CustomSiderProps> = ({ collapsed, updateCollapse }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [selectedKeys, updateKeys] = useState<Array<any>>([]); // TODO:
  useEffect(() => {
    updateKeys(
      items
        .filter((item) => item.key === location.pathname)
        .map((item) => item.key)
    );
  }, [location]);

  const handleClickMenuItem: MenuProps['onClick'] = ({key}) => {
    if (location.pathname !== key) {
      navigate(key);
      updateKeys([key]);
    }
  };

  return (
    <div className={style.sider_wrap}>
      <Menu
        style={{ width: "100%" }}
        selectedKeys={selectedKeys}
        mode="inline"
        theme="dark"
        items={items}
        onClick={handleClickMenuItem}
      />

      <div className={style.blank}></div>
      <Button
        style={{ marginBottom: "1em" }}
        ghost
        icon={React.createElement(
          collapsed ? icons.PicLeftOutlined : icons.PicRightOutlined
        )}
        onClick={() => updateCollapse(!collapsed)}
      >
        {!collapsed && "收起菜单"}
      </Button>
    </div>
  );
};

export default CustomSider;
