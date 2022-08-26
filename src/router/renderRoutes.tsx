import React from "react";
import { Route, Routes } from "react-router-dom";
import routes from "./routes";
import RequireAuth from "../components/auth/requireAuth";

const getRoutes = (routes:Array<RouteItem> = []) => {
  return routes.map((route) => {
    return (
      <Route
        path={route.path}
        element={<RequireAuth>{route.component as React.ReactNode}</RequireAuth>}
        key={route.path}
      >
        {route.children &&
          route.children.length > 0 &&
          getRoutes(route.children)}
      </Route>
    );
  });
};

const Render:React.FC<NullProps> = () => {
  return <Routes>{getRoutes(routes)}</Routes>;
};

export default Render;
