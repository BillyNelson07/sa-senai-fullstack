import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import Sidebar from './components/Sidebar/Sidebar';
import TopBar from './components/TopBar/TopBar';
import Home from './pages/Home/Home';
import CreateActivity from './pages/CreateActivity/CreateActivity';
import Login from './pages/Login/Login';
import { useAuth } from './context/AuthContext';
import { company, guestStats, loggedUser } from './data/mockData';

export default function App() {
  const { isLoggedIn, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const isActivityPage = location.pathname === '/atividade';
  const isLoginPage = location.pathname === '/login';

  const handleNavActivity = () => {
    navigate(isActivityPage ? '/' : '/atividade');
  };

  const handleAuthClick = () => {
    if (isLoggedIn) {
      logout();
      navigate('/');
    } else {
      navigate('/login');
    }
  };

  const stats = isLoggedIn
    ? { totalActivities: loggedUser.totalActivities, totalCalories: loggedUser.totalCalories }
    : guestStats;

  // A tela de login ocupa a página inteira, sem sidebar/topbar do app.
  if (isLoginPage) {
    return (
      <Routes>
        <Route path="/login" element={<Login />} />
      </Routes>
    );
  }

  return (
    <div className="app-shell">
      <Sidebar
        company={company}
        stats={stats}
        isLoggedIn={isLoggedIn}
        isActivePage={isActivityPage}
        onNavActivityClick={handleNavActivity}
      />

      <div className="main-column">
        <TopBar isLoggedIn={isLoggedIn} onAuthClick={handleAuthClick} />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/atividade" element={<CreateActivity />} />
        </Routes>
      </div>
    </div>
  );
}
