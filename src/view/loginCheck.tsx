import React, { useEffect, useState, useContext } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useAppDispatch } from "@/hooks/useStore";
import {
  Image,
  Descriptions,
  Row,
  Col,
  Card,
  Button,
  Form,
  AutoComplete,
  Input,
  Popconfirm,
  Checkbox,
} from "antd";
import style from "./style.module.css";
import useAuth from "../hooks/useAuth";
import { userBindCheck, userBind } from "../store/reducer/user";
import Redirect from "../components/redirect";
import { toSha256 } from "../utils/funcs";
import authContext from "../components/auth/context";

const items = [
  { label: "邮箱", key: "email" },
  { label: "用户名", key: "name" },
  { label: "平台", key: "platform" },
  { label: "平台标识", key: "id" },
];

type UserBindCardProps = {
  options: Array<{ value: string }>;
  handleSubmit: (e: any) => void;
};
const UserBindCard: React.FC<UserBindCardProps> = ({
  options,
  handleSubmit,
}) => {
  const authInstance = useAuth();
  const navigate = useNavigate();

  return (
    <Card
      style={{ width: "60%", marginTop: "2em" }}
      title={"需先进行用户绑定操作"}
      hoverable
      // extra={
      //   <Popconfirm
      //     title="注册成功后需要重新进行绑定操作，是否继续？"
      //     okText="确定退出"
      //     cancelText="取消"
      //     onConfirm={(e) => navigate("/register")}
      //   >
      //     <Button type={"link"}>无账号？注册新账号</Button>
      //   </Popconfirm>
      // }
    >
      <Form
        name="basic"
        labelCol={{ span: 0 }}
        wrapperCol={{ span: 24 }}
        onFinish={handleSubmit}
        autoComplete="off"
        initialValues={{ auto_register: true }}
      >
        <Form.Item
          name="identifier"
          rules={[{ required: true, message: "请输入您的用户凭据" }]}
        >
          <AutoComplete options={options}>
            <Input placeholder="请输入账号/邮箱/手机号码" />
          </AutoComplete>
        </Form.Item>

        <Form.Item
          name="pwd"
          rules={[{ required: true, message: "请输入您的密码" }]}
        >
          <Input.Password placeholder="请输入密码" />
        </Form.Item>

        <Form.Item name="auto_register" valuePropName="checked">
          <Checkbox>为新用户自动创建关联账号</Checkbox>
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 0, span: 24 }}>
          <Button type="primary" htmlType="submit" block>
            提交
          </Button>
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 0, span: 24 }}>
          <Button type="dashed" danger block href="/admin/login">
            取消绑定
          </Button>
        </Form.Item>
      </Form>
    </Card>
  );
};

const LoginCheck: React.FC<NullProps> = () => {
  const dispatch = useAppDispatch();
  let [search] = useSearchParams();
  const [ready, updateReady] = useState<boolean>(false);
  const [accountExist, updateExist] = useState<boolean>(false);
  const [options, updateOptions] = useState<Array<{ value: string }>>([]);
  const { saveToken } = useContext(authContext);

  const onFinish = (values: LoginCheckFormProps) => {
    let data = {
      ...values,
      pwd: toSha256(values.pwd),
      oauth: {
        platform: search.get("platform") || "",
        id: Number(search.get("id")),
      },
    };
    dispatch(userBind(data))
      .unwrap()
      .then(({ token }) => {
        console.log("after bind", token);
        saveToken(token ?? "");
      });
  };

  useEffect(() => {
    updateOptions([
      { value: search.get("email") ?? "" },
      { value: search.get("name") ?? "" },
    ]);

    dispatch(
      userBindCheck({
        platform: search.get("platform") ?? "",
        id: Number(search.get("id")) ?? 0,
        __message__show: false,
      })
    )
      .unwrap()
      .then(({ token, exist }) => {
        saveToken(token ?? "");
        updateReady(true);
        updateExist(exist ?? false);
      });
  }, []);

  return (
    <div className={style.login_bg}>
      <div className={style.login_check_box}>
        <Row gutter={16} align={"middle"}>
          <Col>
            <Image
              width={100}
              height={100}
              src={search.get("avatar") ?? undefined}
              preview={false}
              fallback="data:image/png;base64,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"
            />
          </Col>
          <Descriptions layout="vertical" bordered column={4}>
            {items.map((item) => (
              <Descriptions.Item label={item.label} key={item.key}>
                {search.get(item.key)}
              </Descriptions.Item>
            ))}
          </Descriptions>
        </Row>

        {!ready && <p style={{ lineHeight: "3em" }}>正在查询关联用户信息...</p>}

        {ready && !accountExist && (
          <UserBindCard options={options} handleSubmit={onFinish} />
        )}

        {ready && accountExist && <Redirect to="/" />}
      </div>
    </div>
  );
};

export default LoginCheck;
