import { useContext } from "react";
import authContext from "../components/auth/context";

function useAuth() {
  return useContext(authContext);
}

export default useAuth;
