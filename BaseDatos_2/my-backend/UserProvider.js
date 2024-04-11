import React, { useState, useEffect, useCallback } from 'react';
import UserContext from './UserContext';

const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const updateUser = useCallback((newUser) => {
    localStorage.setItem('user', JSON.stringify(newUser));
    setUser(newUser);
  }, []);

  return (
    <UserContext.Provider value={{ user, updateUser }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
