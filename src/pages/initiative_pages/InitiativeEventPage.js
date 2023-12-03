import React from 'react';
import './style.scss';
const events = [
  {
    name: `Webinars: ASF HN Share & Discuss (Vietnam)
    `,
    date: '2021-01-01',
    description: `Learn about ASF HN and to engage with other ASF HN users through 1-hour synchronous events hosted on Zoom. These events showcase the experiences of educators and researchers across the African and Latin American regions and are always open to a public audience from around the world.

    `,
    link: 'https://www.google.com',
  },
  {
    name: `ASF HN Fellowship (Africa & Latin America)
    `,
    date: '2021-01-01',
    description: `ASF HN Fellows are practicing educators committed to advancing student learning of math and science; improving teacher learning and uptake of math and science pedagogies; and engaging in professional leadership growth through activities that increase accessibility and impact of ASF HN simulations.

    `,
    link: 'https://www.google.com',
  },
  {
    name: `ASF HN Translator Network (Global)
    `,
    date: '2021-01-01',
    description: ``,
    link: 'https://www.google.com',
  },
  {
    name: `The ASF HN Translator Network supports localization through language and culture being part of a network that understands the nuance of verbal and nonverbal communication about math and science in different languages and contexts.

    `,
    date: '2021-01-01',
    description: ``,
    link: 'https://www.google.com',
  },
  {
    name: `ASF HN Virtual Workshops and Courses (Global)
    `,
    date: '2021-01-01',
    description: `Learn how to incorporate simulations using effective teaching strategies found in our virtual workshops on our website and hosted on Coursera.

    `,
    link: 'https://www.google.com',
  },
  {
    name: `Connect with the ASF HN Global Community
    `,
    date: '2021-01-01',
    description: `Stay in touch with us for updates and opportunities by creating a free ASF HN account, and engage in conversation with us via social media as we grow our community.

    `,
    link: 'https://www.google.com',
  },
];
export default function InitiativeEventPage() {
  return (
    <div className="event main-initiative-container">
      <div className="main-frame">
        <div class="banner">
          <div class="banner-title">Event</div>
          <div class="banner-subtitle">Future Event</div>
        </div>
        <div class="content">
          {events.map((event) => (
            <div class="event-item">
              <span className="item-title">{event.name}</span>
              {/*   <span className="item-date">{event.date}</span> */}
              <span className="item-description">{event.description}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
