import { sha256 } from "js-sha256";

export const typeOf = (target: any): string => {
  return Object.prototype.toString.call(target).slice(7, -1).toLowerCase();
};

export const formToJson = (formData: FormData): any => {
  const result: any = {};
  for (let [key, value] of formData) {
    if (Object.prototype.hasOwnProperty.call(result, key)) {
      if (typeOf(result[key]) === "array") {
        result[key].push(value);
      } else {
        result[key] = [result[key], value];
      }
    } else {
      result[key] = value;
    }
  }
  return result;
};

export const jsonToForm = (json: any): FormData => {
  let form = new FormData();
  Object.keys(json).forEach((key) => {
    switch (typeOf(json[key])) {
      case "array":
        json[key].forEach((item: string | Blob) => {
          form.append(key, item);
        });
        break;
      case "object":
        // TODO: 待处理
        break;
      default:
        form.append(key, json[key]);
    }
  });
  return form;
};

export const toSha256 = (str: string): string => {
  return sha256(str);
};
