import AccountPage from './pages/account-page/AccountPage';
import { LogIn } from './component/auth/log-in.component';
import { Register } from './component/auth/register.component';
import ChartOverviewPage from './pages/chart_overview-page/ChartOverviewPage';
import Edit from './component/edit-page/edit.component';
import Home from './component/home-page/Home';
import LandingPage from './pages/landing-page/LandingPage';
import SimulationHistoryPage from './component/simulation-history-page';
import Simulation from './component/simulation-page/simulation.component';
import SimulationHelpPage from './pages/simulation_help-page/SimulationHelpPage';
import ChartCreatePage from './pages/chart_create-page/ChartCreatePage';
import ResearchPage from './pages/research/ResearchPage';
import LogOutPage from './pages/logout-page/LogOutPage';
import InitiativeReachPage from './pages/initiative_pages/InitiativeReachPage';
import InitiativeEventPage from './pages/initiative_pages/InitiativeEventPage';
import InitiativeTeamPage from './pages/initiative_pages/InitiativeTeamPage';
import InitiativeResourcePage from './pages/initiative_pages/InitiativeResourcePage';
import NotFoundPage from './pages/not-found-page/NotFoundPage';
import ForumPage from './pages/forum-page/ForumPage';
import AccountListPage from './pages/account-list-page/AccountListPage';
export const router = [
  // Old router
  {
    name: 'introduction',
    path: '/',
    component: LandingPage,
  },
  {
    name: 'home',
    path: '/home',
    component: Home,
  },
  {
    name: 'login',
    path: '/login',
    component: LogIn,
  },
  {
    name: 'register',
    path: '/register',
    component: Register,
  },
  {
    name: 'simulation-help',
    path: '/simulation/help/',
    component: SimulationHelpPage,
  },
  {
    name: 'simulation-edit',
    path: '/simulation/edit/',
    component: Edit,
  },
  {
    name: 'simulation-history',
    path: '/simulation/:id/history/',
    component: SimulationHistoryPage,
  },
  // New
  {
    name: 'simulation',
    path: '/simulation/:id',
    component: Simulation,
  },

  {
    name: 'chart',
    path: '/chart/overview',
    component: ChartOverviewPage,
  },
  {
    name: 'chart',
    path: '/chart/create',
    component: ChartCreatePage,
  },

  {
    name: 'research',
    path: '/research',
    component: ResearchPage,
  },

  {
    name: 'initiative',
    path: '/initiative/reach',
    component: InitiativeReachPage,
  },
  {
    name: 'initiative',
    path: '/initiative/event',
    component: InitiativeEventPage,
  },
  {
    name: 'initiative',
    path: '/initiative/resource',
    component: InitiativeResourcePage,
  },
  {
    name: 'initiative',
    path: '/initiative/team',
    component: InitiativeTeamPage,
  },

  {
    name: 'user',
    path: '/user/me',
    component: AccountPage,
  },
  {
    name: 'user-management',
    path: '/admin/users',
    component: AccountListPage,
  },
  {
    name: 'user',
    path: '/user/logout',
    component: LogOutPage,
  },
  {
    name: 'forum',
    path: '/forum',
    component: ForumPage,
  },
  {
    name: 'not-found',
    path: '*',
    component: NotFoundPage,
  },
];
