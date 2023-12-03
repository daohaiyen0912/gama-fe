import { Avatar, Form, Input, Select } from 'antd';
import React from 'react';
import { UserOutlined } from '@ant-design/icons';
import { useState } from 'react';
import { useEffect } from 'react';
import { getItem } from '../../utils';
import './style.scss';
import { getUser } from '../../service/api';
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
  const [userInfo, setUserInfo] = useState({});
  useEffect(() => {
    setUserInfo(getItem('user'));
  }, []);
  useEffect(() => {
    if (userInfo?.id) {
      getUser(userInfo?.id).then((res) => {
        console.log(res.data);
      });
    }
  }, [userInfo?.id]);
  return (
    <div className="account-container">
      <div className="profession">
        {profession.map((item) => (
          <div className="profession-item">

            
          </div>
        ))}
      </div>
      <div className="form-body">
        <Form layout="horizontal" size="large">
          <div className="form-col left">
            <Form.Item>
              Name / Surname
              <Input
                className="main-input"
                placeholder="Nguyen van a"
                value={userInfo?.name}
              />
            </Form.Item>
            <Form.Item>
              Birth day
              <Input className="main-input" placeholder="xx/xx/xxxx" />
            </Form.Item>
            <div className="gender-ava">
              <Avatar size={90} icon={<UserOutlined />} />

              <Form.Item>
                Gender
                <Select>
                  <Select.Option value="male">Male</Select.Option>
                  <Select.Option value="female">Female</Select.Option>
                </Select>
              </Form.Item>
            </div>
          </div>
          <div className="form-col right">
            <Form.Item>
              Address
              <Input className="main-input" placeholder="123 Avenue St." />
            </Form.Item>
            <Form.Item>
              Phone number
              <Input className="main-input" placeholder="098xxxxxx" />
            </Form.Item>
            <Form.Item>
              Mail address
              <Input className="main-input" placeholder="exmaplle@mail" />
            </Form.Item>
          </div>
        </Form>
      </div>
    </div>
  );
}
