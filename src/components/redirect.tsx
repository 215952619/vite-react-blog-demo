import React, { useEffect } from "react";
import {
  useNavigate,
  useLocation,
  // useSearchParams,
  // useParams,
} from "react-router-dom";

type RedirectProps = {
  to: string
}
const Redirect:React.FC<RedirectProps> = ({ to }) => {
  let location = useLocation();
  let navigate = useNavigate();
  // let [search] = useSearchParams();
  // let params = useParams();
  console.log("redirect");
  useEffect(() => {
    if (location.pathname !== to) {
      let state = {};
      // TODO:
      // for (let key of search.keys()) {
      //   state[key] = search.get(key);
      // }
      // let paramKeys = Object.keys(params).filter((key) => key !== "*");
      // if (paramKeys.length > 0) {
      //   paramKeys.map((key) => (state[key] = params[key]));
      // }
      navigate(to, { replace: true, state });
    }
  });
  return <></>;
};

export default Redirect;
