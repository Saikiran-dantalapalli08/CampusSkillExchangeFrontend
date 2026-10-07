import { createContext, useContext, useEffect, useState } from 'react';
import axios from 'axios';

const AuthContext = createContext();

function applyAuthHeader() {
  const storedAuth = localStorage.getItem('campusAuth');
  if (!storedAuth) {
    delete axios.defaults.headers.common.Authorization;
    return;
  }

  const { email, password } = JSON.parse(storedAuth);
  if (email && password) {
    axios.defaults.headers.common.Authorization = 'Basic ' + window.btoa(`${email}:${password}`);
  } else {
    delete axios.defaults.headers.common.Authorization;
  }
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem('campusUser');
    return storedUser ? JSON.parse(storedUser) : null;
  });

  useEffect(() => {
    if (user) {
      localStorage.setItem('campusUser', JSON.stringify(user));
    } else {
      localStorage.removeItem('campusUser');
    }

    applyAuthHeader();
  }, [user]);

  useEffect(() => {
    applyAuthHeader();
  }, []);

  const value = { user, setUser };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  return useContext(AuthContext);
}
