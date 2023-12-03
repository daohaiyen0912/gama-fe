import { Avatar, Form, Input, Select } from 'antd';
import React from 'react';
import { UserOutlined } from '@ant-design/icons';
import { useState } from 'react';
import { useEffect } from 'react';
import { getItem } from '../../utils';
import './style.scss';
import { deleteUser, getAllUser, getUser, updateUser } from '../../service/api';
import { UserAvatar } from '../../component/avatar/UserAvatar';
import { userRole } from '../../enum';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSave, faTrash } from '@fortawesome/free-solid-svg-icons';
import addNotification, {
  NOTIFICATION_TYPE,
} from '../../component/notification';

export default function AccountListPage() {
  const [userInfo, setUserInfo] = useState();
  const [users, setUserList] = useState([]);

  useEffect(() => {
    getUser(getItem('user')?.id).then((res) => {
      setUserInfo(res.data.user);
    });
    getAllUser().then((res) => {
      setUserList(res.data.users);
    });
  }, []);

  return (
    <div className="account-list-container">
      <div className="account-list">
        <div className="account-item">
          <div></div>
          <div>Name</div>
          <div>Email</div>
          <div>Phone number</div>
          <div>Role</div>
        </div>
        {users.map((user, index) => (
          <div className="account-item">
            <UserAvatar size={64} src={user?.id} />
            <div className="account-name">{user?.name}</div>
            <div className="account-email">{user?.email}</div>
            <div className="account-email">{user?.phone_number}</div>
            <select
              defaultValue={user.role ?? 0}
              onChange={(e) => {
                let newUserList = [...users];
                newUserList[index] = { ...user, role: +e.target.value };
                setUserList(newUserList);
              }}
            >
              {userRole.map((role) => (
                <option value={role.id}>{role.name}</option>
              ))}
            </select>
            <div className="account-action">
              <div
                className="clickable-icon"
                onClick={() => {
                  updateUser(user.id, { role: user.role })
                    .then((res) => {
                      addNotification(
                        'Updated account successfully',
                        NOTIFICATION_TYPE.SUCCESS,
                      );
                    })
                    .catch((err) => {
                      addNotification(
                        'Updated account failed',
                        NOTIFICATION_TYPE.ERROR,
                      );
                    });
                }}
              >
                <FontAwesomeIcon icon={faSave} />
              </div>
              <div
                className="clickable-icon"
                onClick={() => {
                  deleteUser(user.id)
                    .then((res) => {
                      setUserList(users.filter((u) => u.id !== user.id));
                      addNotification(
                        'Deleted account',
                        NOTIFICATION_TYPE.SUCCESS,
                      );
                    })
                    .catch((err) => {
                      addNotification(
                        'Delete account failed',
                        NOTIFICATION_TYPE.ERROR,
                      );
                    });
                }}
              >
                <FontAwesomeIcon icon={faTrash} />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
