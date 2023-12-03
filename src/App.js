import { Route, BrowserRouter, Switch } from 'react-router-dom';
import { router } from './router';
import 'antd/dist/antd.min.css';
import 'react-notifications-component/dist/theme.css';
import { connect } from 'react-redux';
import { Spin } from 'antd';
import PageFooter from './component/edit-page/page-footer/PageFooter';
import Header from './component/header/Header';
import { getItem } from './utils';
import { SimulationProvider } from './component/simulation-context/SimulationContext';
const loggedIn = getItem('user');

function App(props) {
  const { isLoading } = props;
  return (
    <>
      <BrowserRouter>
        <Spin spinning={isLoading}>
          {loggedIn ? (
            <Header />
          ) : (
            <div className="not-loged-header">
              <img
                alt="logo"
                src="https://uet.vnu.edu.vn/wp-content/uploads/2017/02/logo2_new.png"
              />
              <p className="test">
                HANOI UNIVERSITY OF ENGINEERING AND TECHNOLOGY
              </p>
              <button
                className="ld-btn "
                type="link"
                onClick={() => {
                  window.location = 'https://uet.vnu.edu.vn/';
                }}
              >
                <span
                  style={{
                    padding: 12,
                    width: '100%',
                  }}
                >
                  Find Us
                </span>
              </button>
            </div>
          )}
          <SimulationProvider>
            <Switch>
              {router.map((item, index) => (
                <Route
                  key={index}
                  exact
                  path={item.path}
                  component={item.component}
                />
              ))}
            </Switch>
          </SimulationProvider>
          <PageFooter />
        </Spin>
      </BrowserRouter>
    </>
  );
}

const mapStateToProps = (state) => {
  return {
    isLoading: state.isLoading,
  };
};

export default connect(mapStateToProps, {})(App);
