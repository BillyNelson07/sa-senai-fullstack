import { createContext, useContext, useState } from 'react';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openLoginModal = () => setIsModalOpen(true);
  const closeLoginModal = () => setIsModalOpen(false);

  // View-only: no credential check, just flips the visual state.
  const login = () => {
    setIsLoggedIn(true);
    setIsModalOpen(false);
  };

  const logout = () => setIsLoggedIn(false);

  const value = { isLoggedIn, isModalOpen, openLoginModal, closeLoginModal, login, logout };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  return useContext(AuthContext);
}
