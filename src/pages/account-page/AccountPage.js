import { Avatar, Form, Input, Select } from 'antd';
import React from 'react';
import { UserOutlined } from '@ant-design/icons';
import { useState } from 'react';
import { useEffect } from 'react';
import { getItem } from '../../utils';
import './style.scss';
import { getUser, updateUser } from '../../service/api';
import { UserAvatar } from '../../component/avatar/UserAvatar';
import addNotification, {
  NOTIFICATION_TYPE,
} from '../../component/notification';
const profession = [
  {
    name: 'User',
    description: 'Assess patient',
  },
  {
    name: 'ADmin',
    description: 'Assess patient',
  },
];
export default function AccountPage() {
  const [userInfo, setUserInfo] = useState();
  const [isSubmitting, setSubmitting] = useState(false);

  useEffect(() => {
    getUser(getItem('user')?.id)
      .then((res) => {
        setUserInfo(res.data.user);
      })
      .catch((err) => {
        addNotification('Can not get user info', NOTIFICATION_TYPE.ERROR);
      });
  }, []);

  const onFinish = (values) => {
    setSubmitting(true);
    updateUser(getItem('user')?.id, {
      ...values,
      birthday: new Date(values.birthday)
        .toISOString()
        .slice(0, 19)
        .replace('T', ' '),
    })
      .then((res) => {
        addNotification('Update success', NOTIFICATION_TYPE.SUCCESS);
      })
      .finally(() => {
        setSubmitting(false);
      });
  };
  return (
    <div className="account-container">
      {/*       <div className="profession">
        {profession.map((item) => (
          <div className="profession-item"></div>
        ))}
      </div> */}
      {userInfo && (
        <div className="form-body">
          <Form
            layout="horizontal"
            size="large"
            onFinish={onFinish}
            initialValues={{
              name: userInfo?.name,
              birthday: userInfo?.birthday,
              gender: userInfo?.gender,
              address: userInfo?.address,
              phone_number: userInfo?.phone_number,
              email: userInfo?.email,
              nationality: userInfo?.nationality,
            }}
          >
            <div className="form-col left">
              Name / Surname
              <Form.Item name="name">
                <input className="main-input dimmed" placeholder="John Doe" />
              </Form.Item>
              Birth day
              <Form.Item
                name="birthday"
                rules={[
                  {
                    pattern: /\d+-\d+-\d+/,
                    message: 'Not date format! (yyyy-mm-dd)',
                  },
                ]}
              >
                <input className="main-input dimmed" placeholder="1999-01-01" />
              </Form.Item>
              <div className="gender-ava">
                <UserAvatar src={userInfo?.id} />
                Gender
                <Form.Item name="gender">
                  <select className="main-input">
                    <option value={0}>Male</option>
                    <option value={1}>Female</option>
                  </select>
                </Form.Item>
              </div>
            </div>
            <div className="form-col right">
              Address
              <Form.Item name="address">
                <input
                  className="main-input dimmed"
                  placeholder="123 Avenue St."
                />
              </Form.Item>
              Phone number
              <Form.Item name="phone_number">
                <input className="main-input dimmed" placeholder="098xxxxxx" />
              </Form.Item>
              Email
              <Form.Item
                name="email"
                rules={[
                  {
                    pattern: /\S+@\S+\.\S+/,
                    message: 'Not email format!',
                  },
                ]}
              >
                <input
                  className="main-input dimmed"
                  placeholder="exmaplle@mail"
                />
              </Form.Item>
              <Form.Item name="nationality">
                <input className="main-input dimmed" placeholder="Vietnamese" />
              </Form.Item>
              <button
                type="submit"
                htmlType="submit"
                className="main-button"
                disable={isSubmitting}
              >
                Submit
              </button>
            </div>
          </Form>
        </div>
      )}
    </div>
  );
}
