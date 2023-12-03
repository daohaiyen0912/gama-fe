import React, { useEffect, useState } from 'react';
import './style.scss';
import { useHistory } from 'react-router-dom';
import { LogIn } from '../../component/auth/log-in.component';
import { getItem } from '../../utils';
import { Register } from '../../component/auth/register.component';
import { getResearchAll } from '../../service/api';
import ResearchView from '../../component/research/research-view/ResearchView';
const usedTech = [
  {
    name: 'aws',
    fullName: 'Amazon Web Services',
    url: 'https://aws.amazon.com/',
  },
  {
    name: 's3',
    fullName: 'Simple Storage Service',
    url: 'https://aws.amazon.com/s3/',
  },
  {
    name: 'react',
    fullName: 'React',
    url: 'https://reactjs.org/',
  },
  {
    name: 'lavarel',
    fullName: 'Lavarel',
    url: 'https://laravel.com/',
  },
  {
    name: 'mysql',
    fullName: 'MySQL',
    url: 'https://www.mysql.com/',
  },
  {
    name: 'gama',
    fullName: 'Gama Platform',
    url: 'https://gama-platform.github.io/',
  },
];
export default function LandingPage() {
  const history = useHistory();
  const [showLogin, setShowLogin] = useState(false);
  const [showRegistser, setShowRegister] = useState(false);
  const loggedIn = getItem('user');
  const [researchs, setResearchs] = useState([]);
  useEffect(() => {
    getResearchAll().then((res) => {
      setResearchs(res.data.researchs);
    });
  }, []);
  return (
    <React.Fragment>
      <div className="landing-page">
        <div className="content">
          <div className="overlay">
            <h2 id="name">
              CLOUD APPLICATION SHOWING MULTI-AGENT SIMULATE USING GAMA PLATFORM
            </h2>

            <button
              className="ld-btn"
              type="link"
              onClick={() => {
                if (loggedIn) history.push('simulation/help');
                else setShowLogin(true);
              }}
            >
              Learn More
            </button>
          </div>
        </div>
        <div className="text-content">
          <div className="ld-title"></div>
        </div>
        <div className="content introWeb">
          <div className="descript-overlay">
            <h1 className="ld-title">WEBSITE FOR SIMULATING</h1>
            <h2 id="webContent">
               Product from the multi-agent simulation project developed by M.S Truong
               and Dr Pham Manh Linh from the 2020s spent 3 years researching and
               development has achived results as now.
            </h2>
          </div>
        </div>
        <div className="text-content">
          <div className="ld-title"></div>
        </div>
        <div className="content intro-ai">
          <div className="descript-overlay">
            <h1 className="ld-title">Multi-Agent Based System</h1>
            <h2 id="webContent">
  
               Multi-agent simulation nowadays, the multi-agent system, also known as the
               Multi-Agent Based System [Drogoul & Gaudou,
               2012] is widely used in various fields and it
               gradually replacing micro-simulation techniques, simulation-based
               object-oriented or instance-based previously used.
               Help us have a more visual view of each individual and have
               can be used easily by all users
            </h2>
          </div>
        </div>
        <div className="text-content">
          <div className="ld-title">Recent research paper</div>
          <p>The most recent published research post</p>
          <div
            className="recent-research"
          >
            {researchs
              .filter((_, index) => index < 4)
              .map((item) => (
                <ResearchView research={item} previewMode={1} />
              ))}
          </div>
        </div>
        <div className="text-content">
          <div className="ld-title">Used technology</div>
          <div className="technology">
            {usedTech.map((item) => (
              <div className="tech-item">
                <img
                  className="tech-img"
                  alt={item.fullName}
                  src={`./landing-page/${item.name}.png`}
                  onClick={() => window.open(item.url, '_blank')}
                />
                {item.fullName}
              </div>
            ))}
          </div>
        </div>
        <div className="text-content">
          <h1
            style={{
              fontSize: 40,
              fontWeight: 600,
              textAlign: 'center',
            }}
          >
            DATA
          </h1>
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <img
              src="https://dim.mcusercontent.com/cs/3dde047e26aba42bc27abe601/images/400906a6-cbc3-5a8f-312c-647ab0a585cc.png?w=397&dpr=1"
              alt=""
            />
            <img
              src="https://dim.mcusercontent.com/cs/3dde047e26aba42bc27abe601/images/f6a33d8b-2fbb-925e-ed84-4223d41b8e45.png?w=397&dpr=1"
              alt=""
            />
            <img
              src="https://dim.mcusercontent.com/cs/3dde047e26aba42bc27abe601/images/59ad6448-bbeb-e72e-5be6-a35f1c84e6ea.png?w=397&dpr=1"
              alt=""
            />
          </div>
          <ul
            style={{
              marginTop: 20,
              marginLeft: '20%',
              alignContent: 'center',
              width: '60%',
            }}
          >
            <span style={{ fontSize: 20 }}>
            The data is extracted from a herd of pigs on the farm
               Le Magneraud (Charente-Maritime, France)
            </span>
          </ul>
        </div>
      </div>
      {showLogin && (
        <LogIn
          popup={true}
          onClose={() => {
            setShowLogin(false);
          }}
          onSwitch={() => {
            setShowLogin(false);
            setShowRegister(true);
          }}
        />
      )}
      {showRegistser && (
        <Register
          popup={true}
          onClose={() => {
            setShowRegister(false);
          }}
          onSwitch={() => {
            setShowLogin(true);
            setShowRegister(false);
          }}
        />
      )}
    </React.Fragment>
  );
}
