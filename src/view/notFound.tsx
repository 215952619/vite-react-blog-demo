import React from "react";
import { Link } from "react-router-dom";
import { Empty, Button } from "antd";

const NotFound:React.FC<NullProps> = () => {
  return (
    <Empty description={<span>我不知道你想要啥。。。</span>}>
      <Button type="primary">
        <Link to="/">返回首页</Link>
      </Button>
    </Empty>
  );
};

export default NotFound;
