import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store";
import Router from "./router";
import "./index.css";
import { baseRouteName } from "./utils/vars";

(() => {
  // 开发模式需要手动跳转到基准路由上
  if (process.env.NODE_ENV !== "development") return;
  let url = new URL(window.location.href);
  if (url.pathname === "/") {
    url.pathname = baseRouteName;
    window.location.href = url.toString();
  }
})();

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter basename={baseRouteName}>
        <Router />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);