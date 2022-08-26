export const baseApiPath: string = "http://10.0.7.112:9507/api";

export const issuer: string = "18435186204@163.com";

export const baseRouteName: string = "/admin";

export const leftNav: Array<NavItem> = [
  {
    label: "首页",
    key: "index",
    link: "/",
  },
  {
    label: "专题",
    key: "subject",
    link: "/subject",
  },
  {
    label: "实验室",
    key: "library",
    link: "/library",
  },
  {
    label: "管理后台",
    key: "admin",
    link: "/admin",
  },
];

export const rightNav: Array<NavItem> = [
  {
    label: "源代码",
    key: "code",
    link: "https://github.com/215952619/GoProject",
  },
];

export const menu: Array<MenuItem> = [
  {
    label: "用户管理",
    key: "/user",
    icon: "UserOutlined",
    title: "用户管理",
    // children: [
    //   {
    //     label: "文章管理",
    //     key: "/user/article",
    //   },
    // ],
  },
  {
    label: "文章管理",
    key: "/article",
    icon: "ContainerOutlined",
    title: "文章管理",
  },
  {
    label: "报表统计",
    key: "/report",
    icon: "PieChartOutlined",
    title: "报表统计",
  },
];
