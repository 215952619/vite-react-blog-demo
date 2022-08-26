import React, { useEffect, useState } from "react";
import { Breadcrumb } from "antd";
import { Link, useLocation, useHref } from "react-router-dom";
import { toBreadcrumb } from "@/router/routes";
import { baseRouteName } from "@/utils/vars";

const CustomBreadcrumb: React.FC<NullProps> = () => {
  const [items, updateItems] = useState<Array<BreadcrumbRouteItem>>([]);
  const location = useLocation();
  const href = useHref(location.pathname);
  const paths = href.replace(baseRouteName, "").split("/");

  useEffect(() => {
    updateItems(toBreadcrumb(paths));
  }, [location]);

  return (
    <Breadcrumb
      style={{
        margin: "1em 0",
      }}
      routes={items}
    >
      {items.map((item, index) => {
        if (index === items.length - 1) {
          return (
            <Breadcrumb.Item key={item.path}>
              {item.breadcrumbName}
            </Breadcrumb.Item>
          );
        } else {
          return (
            <Breadcrumb.Item key={item.path}>
              <Link to={item.path}>{item.breadcrumbName}</Link>
            </Breadcrumb.Item>
          );
        }
      })}
    </Breadcrumb>
  );
};

export default CustomBreadcrumb;
