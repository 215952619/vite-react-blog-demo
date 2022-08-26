import React from "react";
import { Menu } from "antd";
import type { MenuProps } from "antd";
import style from "./layout.module.css";
import { leftNav, rightNav } from "../../utils/vars";
import AuthStatus from "./authStatus";

const handleClickMenuItem:MenuProps['onClick'] = ({ key }) => {
  const item = leftNav.find((nav) => nav.key === key);
  const url = new URL(window.location.href);
  if (item && item.link !== url.pathname) {
    url.pathname = item.link;
    window.location.href = url.toString();
  }
};

const Header = () => {
  return (
    <div className={style.custom_header}>
      <div className={style.logo} />
      <div className={style.wrap}>
        <Menu
          theme="dark"
          mode="horizontal"
          defaultSelectedKeys={["admin"]}
          items={leftNav}
          onClick={handleClickMenuItem}
        />
        <div className={style.blank}></div>
        <Menu
          theme="dark"
          mode="horizontal"
          items={rightNav}
          onClick={handleClickMenuItem}
        />
        <AuthStatus />
      </div>
    </div>
  );
};

export default Header;
