import React from "react";
import { Link, Location, useLocation, useNavigate } from "react-router-dom";
import { Form, Input, Checkbox, Button, Row, Col, Divider } from "antd";
import { useAppDispatch } from "@/hooks/useStore";
import { oauthLogin } from "../store/reducer/user";
import style from "./style.module.css";
import icons from "../utils/icons";
import useAuth from "../hooks/useAuth";
import { toSha256 } from "../utils/funcs";



const Login:React.FC<NullProps> = () => {
  const dispatch = useAppDispatch();
  const location = useLocation();
  const authInstance = useAuth();
  const navigate = useNavigate();

  const onFinish = (values:LoginFormProps) => {
    const from:string = location.pathname || "/";
    authInstance.signIn({ ...values, pwd: toSha256(values.pwd) }).then(() => navigate(from, { replace: true }));
  };

  return (
    <div className={style.login_bg}>
      <div className={style.login_box}>
        <div className={style.login_sider}></div>
        <div className={style.login_form}>
          <Row
            justify="space-between"
            align="middle"
            style={{ marginBottom: "1em" }}
          >
            <span style={{ fontSize: "2em", fontWeight: "900" }}>登录</span>

            {/* TODO: 反馈链接 */}
            <span>
              没有权限？<Link to="/feedback">点此申请</Link>
            </span>
          </Row>
          <Form
            name="basic"
            labelCol={{ span: 0 }}
            wrapperCol={{ span: 24 }}
            initialValues={{}}
            onFinish={onFinish}
            //   onFinishFailed={onFinishFailed}
            autoComplete="off"
          >
            <Form.Item
              // label="用户"
              name="identifier"
              rules={[{ required: true, message: "请输入您的用户凭据" }]}
            >
              <Input placeholder="请输入账号/邮箱/手机号码" />
            </Form.Item>

            <Form.Item
              // label="密码"
              name="pwd"
              rules={[{ required: true, message: "请输入您的密码" }]}
            >
              <Input.Password placeholder="请输入密码" />
            </Form.Item>

            <Form.Item
              name="remember"
              valuePropName="checked"
              // wrapperCol={{ offset: 0, span: 16 }}
            >
              <Row justify="space-between">
                <Col>
                  <Checkbox>记住密码</Checkbox>
                </Col>
                <Col>
                  {/* TODO: 短信验证 */}
                  <Link to="feedback">短信验证码登录</Link>
                </Col>
              </Row>
            </Form.Item>

            <Form.Item wrapperCol={{ offset: 0, span: 24 }}>
              <Button type="primary" htmlType="submit" block>
                提交
              </Button>
            </Form.Item>

            {/* TODO: 重置密码 */}
            <Col className="ant-form-item" style={{ textAlign: "center" }}>
              <Link to="feedback">已有账号，忘记密码？</Link>
            </Col>

            {/* TODO: oauth */}
            <Col className="ant-form-item" style={{ textAlign: "center" }}>
              <Button
                type="primary"
                onClick={() =>
                  dispatch(
                    oauthLogin({ platform: "gitee", __loading__show: true })
                  )
                }
              >
                使用Gitee账号快速登录
              </Button>
            </Col>

            <Divider plain>其他登录方式</Divider>
            <Row justify="space-around">
              <Button
                icon={<icons.GithubOutlined />}
                shape="circle"
                onClick={() => dispatch(oauthLogin({ platform: "github" }))}
              ></Button>
              <Button icon={<icons.DingdingOutlined />} shape="circle"></Button>
              <Button icon={<icons.WeiboOutlined />} shape="circle"></Button>
              <Button icon={<icons.WechatOutlined />} shape="circle"></Button>
              <Button
                icon={<icons.AlipayCircleOutlined />}
                shape="circle"
              ></Button>
              <Button icon={<icons.TaobaoOutlined />} shape="circle"></Button>
              <Button icon={<icons.GoogleOutlined />} shape="circle"></Button>
            </Row>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default Login;
