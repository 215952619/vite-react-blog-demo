import { createSlice, createReducer } from "@reduxjs/toolkit";
import request from "../../../utils/fetch";
import { AsyncThunkCreator } from "../utils";

export const nameSpace = "user";

type UserState = {
  user: UserInfo | null;
};
const initialState: UserState = {
  user: null,
};

interface LoginResponseProps {
  token: string;
  exist?: boolean;
}

interface OauthRequestProps extends BaseRequestProps {
  platform: string;
}

interface userBindCheckProps extends BaseRequestProps {
  platform: string;
  id: number;
}

export const login = AsyncThunkCreator<LoginResponseProps, LoginFormProps>(
  `${nameSpace}/login`,
  async ({ identifier, pwd }) => {
    return await request({
      url: "user/login",
      method: "post",
      data: { identifier, pwd },
    });
  }
);

export const updateUserInfo = AsyncThunkCreator<UserInfo, {}>(
  `${nameSpace}/updateUserInfo`,
  async () => {
    return await request({
      url: "user/self",
    });
  }
);

export const logout = AsyncThunkCreator<undefined, {}>(
  `${nameSpace}/logout`,
  async () => {
    return await request({ url: "user/logout", method: "post" });
  }
);

export const oauthLogin = AsyncThunkCreator<string, OauthRequestProps>(
  `${nameSpace}/oauthLogin`,
  async ({ platform }) => {
    return await request({
      url: `user/sso/${platform}`,
    });
  }
);

export const userBind = AsyncThunkCreator<
  LoginResponseProps,
  LoginCheckRequestProps
>(`${nameSpace}/bind`, async ({ oauth, auto_register, identifier, pwd }) => {
  return await request({
    url: `user/bind`,
    method: "post",
    data: { oauth, auto_register, identifier, pwd },
  });
});

export const userBindCheck = AsyncThunkCreator<
  LoginResponseProps,
  userBindCheckProps
>(`${nameSpace}/bindCheck`, async ({ platform, id }) => {
  return await request({
    url: `user/login/check`,
    method: "post",
    data: { platform, id: Number(id) },
  });
});

const userSlice = createSlice({
  name: nameSpace,
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(updateUserInfo.fulfilled, (state, { meta, payload, type }) => {
        state.user = { ...payload };
      })
      .addCase(logout.fulfilled, (state, { meta, payload, type }) => {
        state.user = null;
      })
      .addCase(oauthLogin.fulfilled, (state, { meta, payload, type }) => {
        window.location.href = payload;
      });
  },
});

export default userSlice.reducer;
