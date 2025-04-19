declare const AWSC: any;
declare const window: Window & {
  nc: any;
};
import React, { useState, useEffect, useContext, useRef } from 'react';
import { Form, Input, Button } from 'antd';
import './index.less';
import { loginUser, getCode, getUserData } from '@/axiosInstance/api';
import { encryptByDES, setStorage } from '@/utils/utils';
import { useNavigate } from 'react-router-dom';
import Context from '@/context';

const Login = () => {
  const [passwordType, setPasswordType] = useState('password');
  const [loading, setLoading] = useState(false);
  const randomRef = useRef(0);
  const navigate = useNavigate();
  const { state, dispatch } = useContext(Context);

  interface FormData {
    username: string;
    password: string;
    captcha: string | number;
  }
  // 生成登录用的随机数
  useEffect(() => {
    randomRef.current = Math.random();
  }, []);

  const onFinish = (obj: FormData) => {
    setLoading(true);
    let data = Object.assign(obj);
    data.password = encryptByDES(String(data.password));
    loginUser(data)
      .then((res: any) => {
        if (res.code == 1) {
          setStorage({
            name: 'token',
            content: res.data.token,
          });
          navigate('/view/welcome');
          // 获取用户类型
          getUserData().then((res: any) => {
            if (res.code === 1) {
              sessionStorage.setItem('userPermission', res.data);
              dispatch({
                type: 'getPermission',
                data: {
                  ...state,
                  userPermission: res.data,
                },
              });
            }
          });
        }
      })
      .catch((err) => {})
      .finally(() => {
        setLoading(false);
      });
  };

  const onFinishFailed = (obj: any) => {};

  return (
    <div className="login-page">
      <div className="wrapper">
        <div className="container">
          <h1>后台管理系统</h1>
          <Form
            className="login-form"
            name="login"
            initialValues={{ remember: true }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
          >
            <Form.Item name="username" rules={[{ required: true, message: 'Please input your username!' }]}>
              <Input size="small" className="input" bordered={false} placeholder="Username" />
            </Form.Item>
            <Form.Item name="password" rules={[{ required: true, message: 'Please input your password!' }]}>
              <Input size="small" className="input" bordered={false} type={passwordType} placeholder="Password" />
            </Form.Item>
            <Form.Item>
              <Button loading={loading} size="large" className="login-submit" htmlType="submit">
                L O G I N
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
      <ul className="bg-bubbles">
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
      </ul>
    </div>
  );
};
export default Login;
