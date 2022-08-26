import React, { useState } from "react";
import { Layout } from "antd";
import style from "./layout.module.css";
import CustomHeader from "./header";
import CustomSider from "./sider";
import CustomBreadcrumb from "./breadcrumb";
import AuthProvider from "../auth/authProvider";

const { Header, Content, Sider } = Layout;

const CustomLayout:React.FC<ChildrenProps> = ({children}) => {
  const [collapsed, updateCollapse] = useState<boolean>(false);

  return (
    <AuthProvider>
      <Layout className={style.container}>
        <Header>
          <CustomHeader />
        </Header>
        <Layout>
          <Sider
            width={200}
            className={style.site_layout_background}
            collapsed={collapsed}
          >
            <CustomSider
              collapsed={collapsed}
              updateCollapse={updateCollapse}
            />
          </Sider>
          <Layout style={{ padding: "0 24px 24px" }}>
            <CustomBreadcrumb />
            <Content
              className={style.site_layout_background}
              style={{ padding: 24, margin: 0, minHeight: 280 }}
            >
              {children}
            </Content>
          </Layout>
        </Layout>
      </Layout>
    </AuthProvider>
  );
};

export default CustomLayout;
