import React from 'react';
import './style.scss';
const teamMember = [
  {
    name: 'Phạm Mạnh Linh',
    position: 'Prof',
    description: `
    Postdoctoral Researcher at INRIA, France
    Ph.D. from Grenoble Alpes University, France
    M.S. from Texas A&M University, USA
    Eng. from Hanoi University of Science and
    Technology, Vietnam`,
    photo: '../../image/linh.png',
  },
  {
    name: 'Nguyễn Xuân Trường',
    position: 'President',
    photo: '../../image/truong.jpg',

    description: `
    408-Laboratory president
    M.S from UET-VNU
    Project leader of GAMA   
    `,
  },
  {
    name: 'Đỗ Đại Dương',
    photo: '../../image/DuongDai.png',
    position: 'Student',
    description: `
    Gold medal robotic 2019-2020
    Student with 5 goods 2019-2020
    Gold medals math IMO 2019`,
  },
];
export default function InitiativeTeamPage() {
  return (
    <div className="team main-initiative-container">
      <div className="main-frame">
        <div class="banner">
          <div class="banner-title">Team</div>
          <div class="banner-subtitle">Team member</div>
        </div>
        <div class="content">
          {teamMember.map((member, index) => (
            <div className="member">
              <img
                className="member-photo"
                src={member.photo}
                alt={member.name}
              />
              <div className="member-name">{member.name}</div>
              <div className="member-position">{member.position}</div>
              <div className="member-description">{member.description}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
