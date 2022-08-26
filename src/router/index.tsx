import React from "react";
import LayoutComponent from "../components/layout";
import RenderRoutes from "./renderRoutes";
import ErrorBoundary from "../components/common/errorBoundary";
import "antd/dist/antd.css";

const MainLayout:React.FC<NullProps> = () => {
  return (
    <ErrorBoundary>
      <LayoutComponent>
        <RenderRoutes />
      </LayoutComponent>
    </ErrorBoundary>
  );
};

export default MainLayout;
