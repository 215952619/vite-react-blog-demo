import { useEffect, useState, useRef } from "react";

type callback<T> = (state: T) => void;
export default <T>(initState: T, callback: callback<T>) => {
  const cbRef = useRef<callback<T>>(callback);
  const [state, setState] = useState<T>(initState);

  useEffect(() => {
    if (cbRef.current) {
      cbRef.current(state);
    }
  }, [state]);

  return [
    state,
    (state: T) => {
      setState(state);
    },
  ];
};
