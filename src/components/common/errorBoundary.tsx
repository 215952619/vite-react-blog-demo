import React, {
  useEffect,
  useState,
  useRef,
  useCallback,
  useMemo,
} from "react";
import { useNavigate } from "react-router-dom";
import {
  Button,
  message,
  notification,
  Modal,
  ModalFuncProps,
  Spin,
} from "antd";
import { useAppSelector, useAppDispatch } from "@/hooks/useStore";
import Redirect from "../redirect";
import { removeMessage } from "../../store/reducer/global";

type GenerateErrorProps = {
  data: MessageItem;
};

type LoginModalProps = {
  visible: boolean;
  updateVisible: (visible: boolean) => void;
};

// const LoginModal: React.FC<LoginModalProps> = ({ visible, updateVisible }) => {
//   let timer = useRef<NodeJS.Timer | null>(null);
//   const defaultTime: number = 500;
//   const [time, updateTime] = useState<number>(defaultTime);
//   console.log("login modal init");

//   const handleOk = () => {
//     console.log("handle ok");
//     removeToken();
//     updateVisible(false);
//     clearInterval(Number(timer));
//     Modal.destroyAll();
//     updateTime(defaultTime);
//   };

//   useEffect(() => {
//     timer.current = setInterval(() => {
//       console.log("effect interval", time);
//       updateTime(time - 1);
//       if (time <= 0) {
//         console.log("effect interval clear branch");
//         handleOk();
//         return <Redirect to="/login" />;
//       }
//     }, 1000);
//     return () => {
//       console.log("effect cleanup");
//       handleOk();
//     };
//   }, []);
//   return (
//     <Modal
//       title="登录信息已过期"
//       visible={visible}
//       footer={
//         <Button type="primary" onClick={handleOk}>{`重新登录(${time})`}</Button>
//       }
//       // onOk={handleOk}
//       // okText={`重新登录(${time})`}
//     >
//       <p>您的登录信息已过期，请重新登录。</p>
//       <p>
//         将于 <span>{time}</span> 秒后自动前往登录页
//       </p>
//     </Modal>
//   );
// };

// const LoginModalCard = (time: number, modalProps: ModalFuncProps) => {
//   const defaultTime = 5;
//   const [modal, contextHolder] = Modal.useModal();
//   const [maxTime, updateTime] = useState<number>(time || defaultTime);

//   modal.info(modalProps);

//   setInterval(() => {
//     updateTime(maxTime - 1);
//   }, 1000);

//   setTimeout(() => {
//     modal.destroy();
//   }, time * 1000);
// };

// const GenerateError: React.FC<GenerateErrorProps> = ({ data }) => {
const GenerateError = (
  { data }: GenerateErrorProps,
  toLogin: () => void,
  removeToken: () => void
) => {
  console.log("generate init ", data);

  const { show, code, content, duration, successful } = data;
  const options = {
    content,
    duration,
  };

  if (!show) return null;
  // let [visibleModel, updateVisible] = useState<boolean>(true);

  switch (code) {
    case 1004:
      removeToken();
      toLogin();
      Modal.info({
        content: "登录信息已过期，请重新登录",
      });
      // return (
      //   <LoginModal visible={visibleModel} updateVisible={updateVisible} />
      // );
      break;
    case 1003:
      removeToken();
      toLogin();
      message.warn(options);
      break;
    default:
      successful ? message.success(options) : message.error(options);
      // return null;
      break;
  }
  return null;
};

const ErrorBoundary: React.FC<ChildrenProps> = ({ children }) => {
  console.log("error boundary init");
  let navigate = useNavigate();
  const removeToken = () => window.localStorage.removeItem("token");
  const toLogin = () => {
    navigate("/login");
  };
  let { message, loading, loadingTip } = useAppSelector(
    (state) => state.global
  );
  let dispatch = useAppDispatch();
  let [msg, updateMessage] = useState<MessageItem>({ show: false });

  useEffect(() => {
    console.log("有新的提示：", message);
    if (message.length > 0) {
      updateMessage(message[0]);
    } else {
      updateMessage({ show: false });
    }
  }, [message]);

  useEffect(() => {
    if (msg?.show) {
      GenerateError({ data: msg }, toLogin, removeToken);
      console.log("移除提示： ", msg?.requestId);
      dispatch(removeMessage({ requestId: msg?.requestId }));
    }
  }, [msg]);

  return (
    <Spin
      delay={500}
      size="large"
      spinning={loading}
      tip={loadingTip}
      wrapperClassName="custom_spin_dom"
    >
      {children}
    </Spin>
  );
};

export default ErrorBoundary;
