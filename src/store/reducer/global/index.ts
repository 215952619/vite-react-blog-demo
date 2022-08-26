import { createSlice, createReducer, createAction } from "@reduxjs/toolkit";

export const nameSpace = "global";
const defaultTip = "正在加载数据...";

type GlobalState = {
  message: MessageItem[];
  loading: boolean;
  loadingTip: string;
};

const initialState: GlobalState = {
  message: [],
  loading: false,
  loadingTip: defaultTip,
};

const globalSlice = createSlice({
  name: nameSpace,
  initialState,
  reducers: {
    addMessage: (state: GlobalState, action) => {
      state.message.push(action.payload);
    },
    removeMessage: (state: GlobalState, { payload }) => {
      const { requestId } = payload;
      state.message = state.message.filter(
        (item) => item.requestId !== requestId
      );
    },
  },
  extraReducers: (builder) => {
    builder
      .addMatcher(
        (action) =>
          String.prototype.endsWith.call(action?.type ?? "", "fulfilled"),
        (state, { meta, payload, type }) => {
          console.groupCollapsed("fulfilled: ");
          console.log("meta: ", meta);
          console.log("payload: ", payload);
          console.log("type: ", type);
          console.groupEnd();

          const { requestId, message } = meta;
          if (state.loading) {
            state.loading = false;
            state.loadingTip = defaultTip;
          }

          if (message.show) {
            state.message = state.message.concat({ ...message, requestId });
          }
        }
      )
      .addMatcher(
        (action) =>
          String.prototype.endsWith.call(action?.type ?? "", "rejected"),
        (state, { error, meta, payload, type }) => {
          console.groupCollapsed("rejected: ");
          console.log("error: ", error);
          console.log("meta: ", meta);
          console.log("payload: ", payload);
          console.log("type: ", type);
          console.groupEnd();

          const { requestId, message } = meta;
          if (state.loading) {
            state.loading = false;
            state.loadingTip = defaultTip;
          }

          if (message.show) {
            state.message = state.message.concat({ ...message, requestId });
          }
        }
      )
      .addMatcher(
        (action) =>
          String.prototype.endsWith.call(action?.type ?? "", "pending"),
        (state, { meta, payload, type }) => {
          console.groupCollapsed("pending: ");
          console.log("meta: ", meta);
          console.log("payload: ", payload);
          console.log("type: ", type);
          console.groupEnd();

          if (meta.loading.show) {
            state.loading = true;
            state.loadingTip = meta.loading.tip;
          }
        }
      );
  },
});

export const { addMessage, removeMessage } = globalSlice.actions;

export default globalSlice.reducer;
