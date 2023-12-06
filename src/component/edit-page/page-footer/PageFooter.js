import React from 'react';
import {
  TwitterOutlined,
  FacebookFilled,
  InstagramFilled,
} from '@ant-design/icons';
import './style.scss'

export default function PageFooter() {
  return (
    <div className="page-footer">
      <div className='media-contact'>
        <p style={{ fontSize: 26, fontWeight: 500 }}>CONTACT FOR WORK</p>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            width: 200,
          }}
        >
          <TwitterOutlined
            style={{ fontSize: 30 }}
            onClick={() => window.open('https://google.com', '_blank')}
          />
          <FacebookFilled
            style={{ fontSize: 30 }}
            onClick={() => window.open('https://google.com', '_blank')}
          />
          <InstagramFilled
            style={{ fontSize: 30 }}
            onClick={() => window.open('https://google.com', '_blank')}
          />
        </div>
      </div>

      <span>HANOI UNIVERSITY OF ENGINEERING AND TECHNOLOGY</span>
      <span>Dao Thi Hai Yen 2023-2023</span>
    </div>
  );
}
