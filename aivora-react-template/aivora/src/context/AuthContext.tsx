import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface AuthContextType {
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // Check if user is already logged in on mount
  useEffect(() => {
    const token = localStorage.getItem('admin_token');
    const adminData = localStorage.getItem('admin_data');
    
    if (token && adminData) {
      setIsAuthenticated(true);
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    setIsLoading(true);
    
    // Default admin credentials (you can change these)
    // In production, this should call an API
    const ADMIN_EMAIL = 'admin@minex.com';
    const ADMIN_PASSWORD = 'admin123';
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500));
      
      if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
        const token = 'admin_token_' + Date.now();
        const adminData = {
          email,
          name: 'Admin User',
          role: 'admin',
          loginTime: new Date().toISOString()
        };
        
        localStorage.setItem('admin_token', token);
        localStorage.setItem('admin_data', JSON.stringify(adminData));
        setIsAuthenticated(true);
        setIsLoading(false);
        return true;
      } else {
        setIsLoading(false);
        return false;
      }
    } catch (error) {
      console.error('Login error:', error);
      setIsLoading(false);
      return false;
    }
  };

  const logout = () => {
    localStorage.removeItem('admin_token');
    localStorage.removeItem('admin_data');
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};
