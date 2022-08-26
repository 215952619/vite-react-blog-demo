import { createAsyncThunk } from "@reduxjs/toolkit";

interface CustomMeta {
  loading: LoadingItem;
  message: MessageItem;
}

const defaultLoading: LoadingItem = {
  show: true,
  tip: "正在请求数据中...",
};

const defaultMessage: MessageItem = {
  show: false,
  duration: 2,
  code: 1000,
  content: "请求成功",
  successful: true,
};

export const AsyncThunkCreator = <Returned, ThunkArg extends StringRecord>(
  type: string,
  thunk: (paylaod: ThunkArg) => Promise<Returned>
) => {
  const loading: LoadingItem = { show: true };
  const message: StringRecord = { show: false };

  return createAsyncThunk<
    Returned,
    ThunkArg,
    { fulfilledMeta: CustomMeta; rejectedMeta: CustomMeta }
  >(
    type,
    async (payload, { rejectWithValue, fulfillWithValue }) => {
      Object.keys(payload).forEach((key: string) => {
        if (String.prototype.startsWith.call(key, "__loading__")) {
          loading[key.slice(11)] = payload[key];
          delete payload[key];
        }
        if (String.prototype.startsWith.call(key, "__message__")) {
          message[key.slice(12)] = payload[key];
          delete payload[key];
        }
      });

      return await thunk(payload)
        .then((res) => {
          return fulfillWithValue(res, {
            loading: { ...defaultLoading, ...loading },
            message: { ...defaultMessage, ...message },
          });
        })
        .catch((err) => {
          return rejectWithValue(err, {
            loading: { ...defaultLoading, ...loading },
            message: {
              ...defaultMessage,
              content: message.failed_content ?? err.msg ?? "",
              code: err.code ?? 1001,
              ...message,
              successful: false,
              show: message.failed_show ?? true,
            },
          });
        });
    },
    {
      getPendingMeta: () => {
        return {
          loading: { ...defaultLoading, ...loading },
          message: { ...defaultMessage, ...message },
        };
      },
    }
  );
};
