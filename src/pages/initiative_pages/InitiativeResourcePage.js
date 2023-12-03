import React from 'react';
import './style.scss';
const resource = [
  {
    title: 'Connectivity',
    description:
      'Access ASF HN sims online or offline using a browser, mobile apps, or desktop app',
    name: 'connectivity',
  },
  {
    title: 'Accessibility',
    description:
      'Take advantage of inclusive features to improve learning for all students',
    name: 'accessibility',
  },
  {
    title: 'Translations',
    description: 'Select ASF HN simulations from among 115+ languages',
    name: 'translations',
  },
  {
    title: 'Pedagogy',
    description: `Learn how to incorporate simulations using effective teaching strategies found in our professional`,
    name: 'pedagogy',
  },
  {
    title: 'Having trouble? Visit the Help Center',
    description:
      'The help center includes guidelines for getting started, how to run and integrate sims, and troubleshooting tips',
    name: 'help-center',
  },
];
export default function InitiativeResourcePage() {
  return (
    <div className="resource main-initiative-container">
      <div className="main-frame">
        <div class="banner">
          <div class="banner-title">Resource</div>
          <div class="banner-subtitle">Resource</div>
        </div>
        <div class="content">
          {resource.map((item, index) => (
            <div className="resource-item">
              <img
                className="resource-icon"
                src={`../../image/resource/resources-${item.name}.svg`}
                alt={item.title}
              />
              <div className="text">
                <div className="item-title">{item.title}</div>
                <div className="item-description">{item.description}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
