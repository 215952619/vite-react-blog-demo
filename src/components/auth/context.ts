import React from "react";

interface AuthProps {
  user: any; //TODO:
  authed: boolean;
  signIn: (data: LoginFormProps) => Promise<any>;
  signOut: () => Promise<any>;
  saveToken: (token: string) => void;
}

const authContext = React.createContext<AuthProps>({} as AuthProps);

export default authContext;
