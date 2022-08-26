import React, { useState, useEffect } from "react";
import { useAppSelector } from "@/hooks/useStore";
import { Spin } from "antd";

const Loading = () => {
  const [loaditem, updateItem] = useState<LoadingItem>({ show: false });
  const { loading } = useAppSelector((state) => state.global);

  useEffect(() => {
    if (loading.length > 0) {
      updateItem(loading[0]);
    } else {
      updateItem({
        show: false,
      });
    }
  }, [loading]);

  const { tip = "loading..." } = loaditem;
  return loaditem.show ? <Spin size="large" spinning={true} tip={tip} /> : null;
};

export default Loading;
