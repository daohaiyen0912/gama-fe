import React from 'react';
import './style.scss';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import { UserAvatar } from '../avatar/UserAvatar';
import { getItem } from '../../utils';

const menuItem = [
  {
    name: 'Simulation',
    url: 'simulation',
    description: '',
    child: [
      { name: 'Start simulation', url: 'edit' },
      { name: 'How to use', url: 'help' },
    ],
  },
  // {
  //   name: 'Chart',
  //   url: 'chart',
  //   description: '',
  //   child: [
  //     { name: 'Overview', url: 'overview' },
  //     { name: 'Create your own', url: 'create' },
  //   ],
  // },
  // {
  //   name: 'Research',
  //   url: 'research',
  //   description: '',
  // },
  // {
  //   name: 'Initiative',
  //   url: 'initiative',
  //   description: '',
  //   child: [
  //     { name: 'Reach', url: 'reach' },
  //     { name: 'Future event', url: 'event' },
  //     { name: 'Resource', url: 'resource' },
  //     { name: 'Team', url: 'team' },
  //   ],
  // },
  // {
  //   name: 'Forum',
  //   url: 'forum',
  //   description: '',
  // },
  {
    name: 'Account',
    url: 'user',
    description: '',
    child: [
      { name: 'Account info', url: 'me' },
      { name: 'Log out', url: 'logout' },
    ],
  },
];
const Header = () => {
  const history = useHistory();
  // trigger use effect wehn page url changed
  const [url, setUrl] = React.useState(window.location.href);
  const [user, setUser] = React.useState();
  React.useEffect(() => {
    setUser(getItem('user'));
    setUrl(window.location.href);
  }, [history]);
  return (
    <React.Fragment>
      <div className="common-header">
        <img
          alt="logo"
          className="logo"
          src="https://uet.vnu.edu.vn/wp-content/uploads/2017/02/logo2_new.png"
          onClick={() => {
            history.push('/');
          }}
        />
        <div className="menu-bar">
          {menuItem.map((item, index) =>
            item?.child ? (
              <div
              key={index}
                className={`menu-item ${url.includes(item.url) && 'active'}`}
              >
                {item.name}
                <div className="menu-dropdown">
                  {item.child.map((child) => (
                    <div
                      className="dropdown-item"
                      onClick={() => {
                        history.push(`/${item.url}/${child.url}`);
                      }}
                    >
                      {child.name}
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div
              key={index}
                className={`menu-item ${url.includes(item.url) && 'active'}`}
                onClick={() => {
                  history.push(`/${item.url}`);
                }}
              >
                {item.name}
              </div>
            ),
          )}
          <UserAvatar src={user?.id} />
        </div>
      </div>
      <div className="common-header-filter"></div>
    </React.Fragment>
  );
};
export default Header;
