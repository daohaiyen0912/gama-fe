import React from 'react';
import Header from '../../component/header/Header';
import './style.scss';
const resource = [
  {
    title: '250 million',
    description: 'sim sessions per year',
    name: 'sim-session-icon',
  },
  {
    title: '137%',
    description: 'growth across the COVID pandemic',
    name: 'growth-icon',
  },
  {
    title: '22,000+',
    description: 'teachers reached in 2022 through ASF HN programs',
    name: 'teacher-users-icon',
  },
  {
    title: '49%',
    description: `of all usage outside of the United States`,
    name: 'usage-icon',
  },
];
export default function InitiativeReachPage() {
  return (
    <div className="reach main-initiative-container">
      <div className="main-frame">
        <div class="banner">
          <div class="banner-title">Reach</div>
          <div class="banner-subtitle">Goal</div>
        </div>
        <div class="content">
          <div className="reach-item">
            <span className="item-title">Mission</span>
            <span className="item-description">
              ASF HN is an initiative to improve the quality of global math and
              science education by increasing ASF HN simulation access and impact
              around the world.
            </span>
          </div>
          <div className="reach-item">
            <span className="item-title">Impact</span>
            <span className="item-description">
              {resource.map((el) => {
                return (
                  <div className="impact-item">
                    <img
                      className="impact-icon"
                      src={`../../image/reach/${el.name}.svg`}
                      alt={el.title}
                    />
                    <div className="impact">
                      <div className="item-title">{el.title}</div>
                      <div className="item-description">{el.description}</div>
                    </div>
                  </div>
                );
              })}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
