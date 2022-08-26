import React, { useEffect, useState } from "react";
import AuthContext from "./context";
import { login, logout, updateUserInfo } from "@/store/reducer/user";
import { useAppSelector, useAppDispatch } from "@/hooks/useStore";

const AuthProvider: React.FC<ChildrenProps> = ({ children }) => {
  const userStore = useAppSelector((state) => state.user);
  const [authed, setAuthed] = useState<boolean>(false);
  const dispatch = useAppDispatch();

  const saveToken = (token: string) => {
    if (!token) {
      return false;
    }

    setAuthed(true);
    window.localStorage.setItem("token", token);
    return true;
  };

  const signIn = async (data: LoginFormProps) => {
    await dispatch(login(data))
      .unwrap()
      .then(({ token }) => {
        saveToken(token);
      });
  };

  const signOut = async () => {
    await dispatch(logout({})).then((res) => {
      setAuthed(false);
    });
  };

  useEffect(() => {
    if (authed) {
      console.log("获取用户数据");
      dispatch(updateUserInfo({}));
    }
  }, [authed]);

  return (
    <AuthContext.Provider
      value={{ user: userStore.user, authed, signIn, signOut, saveToken }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
