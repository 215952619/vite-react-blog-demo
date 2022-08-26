/// <reference types="vite/client" />
type StringRecord = { [key: string]: any };
type NullProps = {};
type ChildrenProps = React.PropsWithChildren<{}>;

enum UserRole {
  Normal = 0,
  Admin,
  SuperAdmin,
}

enum UserStatus {
  Pending = 0,
  Active,
  Closed,
}

interface UserInfo {
  name: string;
  avatar: string;
  phone: string;
  role: UserRole;
  Status: UserStatus;
}

interface LoginFormProps {
  identifier: string;
  pwd: string;
}

type LoginCheckFormProps = {
  identifier: string;
  pwd: string;
  auto_register: boolean;
};

interface LoginCheckRequestProps extends LoginCheckFormProps {
  oauth: { platform: string; id: number };
}

interface RouteItem {
  path: string;
  component: React.ReactDOM | JSX.Element | React.ReactNode;
  meta?: RouteMeta;
  children?: Array<RouteItem>;
}

interface RouteMeta {
  title: string;
  breadcrumb?: boolean;
}

interface BreadcrumbRouteItem {
  path: string;
  breadcrumbName: string;
  key: string;
  basePath?: string;
  children?: Array<BreadcrumbRouteItem>;
}

interface MenuItem {
  label: string;
  key: string;
  icon?: string;
  title: string;
  children?: Array<MenuItem>;
}

interface NavItem {
  label: string;
  key: string;
  link: string;
}

interface BaseRequestProps {
  __loading__show?: boolean;
  __loading__tip?: string;
  __message__show?: boolean;
  __message__failed_show?: boolean;
  __message__duration?: number;
  __message__code?: number;
  __message__content?: string;
  __message__failed_content?: string;
}

interface LoadingItem extends StringRecord {
  show: boolean;
  tip?: string;
}

interface MessageItem extends StringRecord {
  show: boolean;
  duration?: number;
  code?: number;
  content?: string;
  successful?: boolean;
}
