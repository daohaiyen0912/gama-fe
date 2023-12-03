import React from 'react';

import PageFooter from '../edit-page/page-footer/PageFooter';
import NavigateItem from './components/navigate-menu/NavigateItem';
import './style.scss';
export default function HomeContent({ setChoose, pages }) {
  return (
    <div className="home-page">
      <div className="content">
        <div className="action-list">
          {pages
            .filter((_, index) => index !== 0)
            .map((item) => (
              <NavigateItem
                onClick={item.onClick}
                icon={item.icon}
                name={item.label}
                description={item.description}
              />
            ))}
        </div>
      </div>
      <PageFooter />
    </div>
  );
}
