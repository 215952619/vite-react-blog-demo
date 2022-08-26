import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Button, Dropdown, Avatar, Menu } from "antd";
import type { MenuProps } from "antd";
import useAuth from "@/hooks/useAuth";
import icons from "@/utils/icons";

const menuItems: MenuProps["items"] = [
  {
    key: "profile",
    label: "查看个人信息",
  },
  {
    type: "divider",
  },
  {
    key: "signOut",
    label: "注销",
  },
];

const AuthStatus: React.FC<NullProps> = () => {
  const [avatar, setAvatar] = useState<string>("");
  const authInstance = useAuth();
  const navigate = useNavigate();
  const handleClickMenuItem: MenuProps["onClick"] = ({ key }) => {
    switch (key) {
      case "profile":
        window.location.href = "/profile";
        break;
      case "signOut":
        authInstance.signOut().then(() => navigate("/login"));
        break;
      default:
        console.warn("not a valid action: ", key);
    }
  };

  const menu = <Menu items={menuItems} onClick={handleClickMenuItem} />;

  useEffect(() => {
    if (authInstance?.user?.avatar) {
      setAvatar(authInstance.user.avatar);
    }
  }, [authInstance]);

  if (!authInstance.authed) {
    return (
      <span>
        <Link to="/login">未登录</Link>
      </span>
    );
  }

  return (
    <Dropdown
      overlay={menu}
      placement="bottomRight"
      arrow={{ pointAtCenter: true }}
    >
      <Avatar shape="circle" icon={<icons.UserOutlined />} src={avatar} />
    </Dropdown>
  );
};

export default AuthStatus;
