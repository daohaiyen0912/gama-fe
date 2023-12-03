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
            onClick={() =>
              window.open('https://www.facebook.com/dunzzzz', '_blank')
            }
          />
          <InstagramFilled
            style={{ fontSize: 30 }}
            onClick={() =>
              window.open('https://www.instagram.com/d.not_gud/', '_blank')
            }
          />
        </div>
      </div>

      <span>HANOI UNIVERSITY OF ENGINEERING AND TECHNOLOGY</span>
      <span>Do Dai Duong 2023-2023</span>
    </div>
  );
}
