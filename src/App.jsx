import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import Sidebar from './components/Sidebar/Sidebar';
import TopBar from './components/TopBar/TopBar';
import LoginModal from './components/LoginModal/LoginModal';
import Home from './pages/Home/Home';
import CreateActivity from './pages/CreateActivity/CreateActivity';
import { useAuth } from './context/AuthContext';
import { company, guestStats, loggedUser } from './data/mockData';

export default function App() {
  const { isLoggedIn, isModalOpen, openLoginModal, closeLoginModal, login, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const isActivityPage = location.pathname === '/atividade';

  const handleNavActivity = () => {
    navigate(isActivityPage ? '/' : '/atividade');
  };

  const handleAuthClick = () => {
    if (isLoggedIn) {
      logout();
      navigate('/');
    } else {
      openLoginModal();
    }
  };

  const stats = isLoggedIn
    ? { totalActivities: loggedUser.totalActivities, totalCalories: loggedUser.totalCalories }
    : guestStats;

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

      <LoginModal open={isModalOpen} onClose={closeLoginModal} onCancel={closeLoginModal} onSubmit={login} />
    </div>
  );
}
