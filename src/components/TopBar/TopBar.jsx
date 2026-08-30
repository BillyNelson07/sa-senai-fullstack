import styles from './TopBar.module.css';

export default function TopBar({ isLoggedIn, onAuthClick }) {
  return (
    <header className={styles.topbar}>
      <button
        className={`${styles.btnAuth} ${isLoggedIn ? styles.isLogout : ''}`}
        onClick={onAuthClick}
      >
        {isLoggedIn ? 'Logout' : 'Login'}
      </button>
    </header>
  );
}
