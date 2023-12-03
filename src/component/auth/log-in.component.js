import './style.scss';
import { Form, Input, Button, Checkbox, Divider, Space } from 'antd';
import {
  EyeInvisibleOutlined,
  EyeTwoTone,
  UserOutlined,
  LockOutlined,
  MailOutlined,
} from '@ant-design/icons';
import { useHistory } from 'react-router-dom';
import { login } from '../../service/api';
import addNotification, { NOTIFICATION_TYPE } from '../notification';
import { setItem } from '../../utils';
import { useState } from 'react';

export const LogIn = ({
  popup = false,
  onClose = () => {},
  onSwitch = () => {},
}) => {
  const [isLoading, setLoading] = useState(false);
  const history = useHistory();
  const onFinish = (values) => {
    setLoading(true);
    login(values)
      .then((res) => {
        const data = res.data;
        localStorage.setItem('token', data.token);
        localStorage.setItem('introduce', true);
        if (popup) {
          onClose();
          window.location.reload();
        } else {
          history.push('/home');
        }
        setItem('user', data.user);
      })
      .catch((err) => {
       
        addNotification('Error when logging in', NOTIFICATION_TYPE.ERROR);
      })
      .finally(() => setLoading(false));
  };
  return (
    <>
      <div className={`container ${popup && 'pop-up'}`}>
        <div className="container-bg" onClick={onClose}></div>
        <div className="form-container">
          <Form
            name="basic"
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 16 }}
            initialValues={{ remember: true }}
            onFinish={onFinish}
            autoComplete="off"
            layout="vertical"
          >
            <Form.Item wrapperCol={{ span: 24 }}>
              <div className="img-contain">
                <img
                  src="https://uet.vnu.edu.vn/wp-content/uploads/2017/02/logo2_new.png"
                  alt="gamma-icon"
                  width={50}
                  height={50}
                />
              </div>
            </Form.Item>
            <Divider style={{ marginBottom: 30 }} />
            <Space direction="vertical">
              <span style={{ marginLeft: 10 }}>Email</span>
              <Form.Item
                name="email"
                wrapperCol={{ span: 24 }}
                rules={[
                  { required: true, message: 'Please input your email!' },
                  {
                    pattern: /\S+@\S+\.\S+/,
                    message: 'Not email format!',
                  },
                ]}
              >
                <Input
                  prefix={<MailOutlined className="site-form-item-icon" />}
                  placeholder="Enter email..."
                  style={{ borderRadius: '10px' }}
                />
              </Form.Item>
              <span style={{ marginLeft: 10 }}>Password</span>
              <Form.Item
                name="password"
                wrapperCol={{ span: 24 }}
                rules={[
                  { required: true, message: 'Please input your password!' },
                ]}
              >
                <Input.Password
                  placeholder="Enter password..."
                  iconRender={(visible) =>
                    visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
                  }
                  prefix={<LockOutlined className="site-form-item-icon" />}
                  style={{ borderRadius: '10px' }}
                />
              </Form.Item>

              <Form.Item wrapperCol={{ span: 24 }}>
                <Button
                  style={{ width: '100%', borderRadius: '10px' }}
                  type="submit"
                  htmlType="submit"
                  disabled={isLoading}
                  className="black-button"
                >
                  Login
                  {/* {!isLoading ? 'Log In' : 'Log In...'} */}
                </Button>
              </Form.Item>

              <Form.Item wrapperCol={{ span: 24 }}>
                Not have account yet?
                {popup ? (
                  <Button disabled={isLoading} type="link" onClick={onSwitch}>
                    Register here
                  </Button>
                ) : (
                  <Button disabled={isLoading} type="link" href="/register">
                    Register here
                  </Button>
                )}
              </Form.Item>
            </Space>
          </Form>
        </div>
      </div>
    </>
  );
};
