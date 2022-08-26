import { baseApiPath } from "./vars";
import { formToJson, jsonToForm } from "./funcs";

type requestOptions = {
  url: string;
  name?: string;
  method?: "get" | "post" | "put" | "delete" | "head";
  query?: { [key: string]: string };
  header?: { [key: string]: string };
  data?: any;
  [key: string]: any;
};

type initOptions = {
  method: "get" | "post" | "put" | "delete" | "head";
  referrerPolicy?: ReferrerPolicy;
  headers?: HeadersInit;
  body?: BodyInit;
};

const defaultHeaders = (): { [key: string]: string } => {
  let out: HeadersInit = {
    "Content-Type": "application/json",
  };
  if (localStorage.getItem("token")) {
    out["Authorization"] = `Bearer ${localStorage.getItem("token")}`;
  }
  return out;
};

const defaultFetchOption: initOptions = {
  method: "get",
  referrerPolicy: "unsafe-url",
};

const request: (arg0: requestOptions) => Promise<any> = ({
  url = "",
  name = "",
  method = "get",
  query = {},
  header = {},
  data = {},
  ...otherOptions
}): Promise<any> => {
  const _url = new URL(`${baseApiPath}/${url}`);
  Object.keys(query).map((key) => _url.searchParams.append(key, query[key]));
  const allHeaders = { ...header, ...defaultHeaders() };
  const _header = new Headers();
  Object.keys(allHeaders).forEach((key) => {
    if (_header.has(key)) {
      _header.append(key, allHeaders[key]);
    } else {
      _header.set(key, allHeaders[key]);
    }
  });

  let options: initOptions = {
    ...defaultFetchOption,
    method,
    headers: _header,
    ...otherOptions,
  };
  if (!["get", "head"].includes(method)) {
    switch (_header.get("Content-Type")) {
      case "application/json":
        options.body = JSON.stringify(data);
        break;
      case "multipart/form-data":
        options.body = jsonToForm(data);
        break;
      default:
        options.body = data;
    }
  }

  return fetch(new Request(_url, options))
    .then(async (res) => {
      console.groupCollapsed(`新的网络请求：`);
      console.log(`date: ${new Date().toLocaleString()}`);
      console.table(res);
      console.groupEnd();

      if (!res.ok) {
        return Promise.reject({ code: res.status, msg: res.statusText });
      }
      let contentType =
        (res.headers.get("Content-Type") ||
          _url.searchParams.get("Content-Type")) ??
        "application/json";
      switch (contentType.split(";")[0]) {
        case "application/json":
          return res.json();
        case "multipart/form-data":
          return { code: 1000, data: formToJson(await res.formData()) };
        default:
          return { code: 1000, data: await res.text() };
      }
    })
    .then((res) => {
      if (res.code !== 1000) {
        return Promise.reject({ code: res.code, msg: res.msg });
      } else {
        return res?.data ?? {};
      }
    })
    .catch((err) => {
      if (err.name === "AbortError") {
        return Promise.reject({ code: 9000, msg: "请求已取消" });
      } else {
        return Promise.reject(err);
      }
    });
};

export default request;
