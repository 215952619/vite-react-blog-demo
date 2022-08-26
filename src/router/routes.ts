import NotFound from "../view/notFound";
import App from "../App";
import Login from "../view/login";
import LoginCheck from "../view/loginCheck";
import Redirect from "../components/redirect";
import { createElement } from "react";

const routers: Array<RouteItem> = [
  {
    path: "/",
    meta: { title: "首页", breadcrumb: true },
    component: createElement(App),
    children: [
      // { path: "profile", component: createElement(NotFound) },
      // { path: "collect", component: createElement(NotFound) },
      // { path: "history", component: createElement(NotFound) },
      {
        path: "user",
        meta: { title: "用户管理", breadcrumb: true },
        component: createElement(NotFound),
      },
      {
        path: "article",
        meta: { title: "文章管理", breadcrumb: true },
        component: createElement(NotFound),
      },
      {
        path: "report",
        meta: { title: "报表管理", breadcrumb: true },
        component: createElement(NotFound),
      },
    ],
  },
  {
    path: "/login",
    component: createElement(Login),
    meta: { title: "登录" },
  },
  {
    path: "/login/:platform",
    component: createElement(LoginCheck),
    meta: { title: "用户绑定" },
  },
  {
    path: "*",
    component: createElement(Redirect, { to: "/" }),
    meta: { title: "404" },
  },
];
export default routers;

export const toBreadcrumb = (paths: Array<string>) => {
  let basePath = "";
  const format: (arg0: RouteItem) => BreadcrumbRouteItem = ({
    path,
    meta,
  }): BreadcrumbRouteItem => ({
    path: `${basePath}/${path === "/" ? "" : path}`,
    breadcrumbName: meta?.title ?? "未知页面",
    key: `breadcrumb_key_${path}`,
  });

  const result: Array<BreadcrumbRouteItem> = [];
  let _routers: Array<RouteItem> = [
    ...routers.filter((router) => router?.meta?.breadcrumb),
  ];

  if (!paths.length) {
    return result;
  }

  for (let path of paths) {
    let route = _routers.find((route) => route.path === (path || "/"));

    if (route) {
      let _route = format(route);
      _route.children = _routers
        .filter((item) => item !== route && item?.meta?.breadcrumb)
        .map((item) => format(item));
      result.push(_route);
      _routers = route.children ?? [];
      basePath = `${basePath}/${route.path}`;
    } else {
      result.push({
        path,
        breadcrumbName: "未知页面",
        key: path,
        basePath,
      });
      break;
    }
  }
  return result;
};
