import { createContext, useContext, useState, useEffect } from 'react';
import databaseService from '../services/databaseService.js';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Kiểm tra user đã đăng nhập
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser));
      } catch (error) {
        console.error('Error parsing saved user:', error);
        localStorage.removeItem('user');
      }
    }
    setIsLoading(false);
  }, []);

  // Đăng ký tài khoản mới
  const register = async (userData) => {
    try {
      // Kiểm tra email đã tồn tại
      const existingUser = await databaseService.getUserByEmail(userData.email);
      if (existingUser.success) {
        throw new Error('Email đã được sử dụng');
      }

      // Tạo user mới trong database
      const result = await databaseService.createUser({
        email: userData.email,
        name: userData.name,
        password: userData.password  // Thêm password vào đây!
      });

      if (!result.success) {
        throw new Error(result.error);
      }

      // Tự động đăng nhập sau khi đăng ký
      const user = {
        ...result.user,
        password: userData.password // Lưu tạm trong memory
      };
      
      setUser(user);
      localStorage.setItem('user', JSON.stringify(user));

      return { success: true, user };
    } catch (error) {
      return { success: false, error: error.message };
    }
  };

  // Đăng nhập
  const login = async (email, password) => {
    try {
      console.log('=== LOGIN DEBUG START ===');
      console.log('Login attempt for email:', email);
      console.log('Password input length:', password.length);
      
      // Lấy user từ database
      const result = await databaseService.getUserByEmail(email);
      console.log('Database result:', result);
      
      if (!result.success) {
        console.log('Database query failed');
        throw new Error('Email hoặc mật khẩu không đúng');
      }

      const user = result.user;
      console.log('User object:', user);
      console.log('User password_hash:', user.password_hash);
      console.log('User password_hash type:', typeof user.password_hash);
      console.log('User password_hash length:', user.password_hash ? user.password_hash.length : 'null');
      
      // Kiểm tra password từ database
      if (!user.password_hash) {
        console.log('ERROR: User has no password_hash in database');
        throw new Error('Tài khoản chưa được thiết lập mật khẩu. Vui lòng đăng ký lại.');
      }
      
      if (user.password_hash !== password) {
        console.log('Password mismatch:');
        console.log('  Database password_hash:', user.password_hash);
        console.log('  Input password:', password);
        console.log('  Length comparison:', user.password_hash.length, 'vs', password.length);
        throw new Error('Mật khẩu không đúng');
      }

      if (!user.is_active) {
        throw new Error('Tài khoản đã bị khóa');
      }

      // Cập nhật thời gian đăng nhập cuối
      await databaseService.updateLastLogin(user.id);

      // Đăng nhập thành công
      const userWithPassword = { ...user, password: password };
      setUser(userWithPassword);
      localStorage.setItem('user', JSON.stringify(userWithPassword));

      console.log('Login successful for user:', userWithPassword);
      console.log('=== LOGIN DEBUG END ===');
      return { success: true, user: userWithPassword };
    } catch (error) {
      console.error('Login error:', error);
      console.log('=== LOGIN DEBUG END WITH ERROR ===');
      return { success: false, error: error.message };
    }
  };

  // Đăng xuất
  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  // Cập nhật thông tin user
  const updateProfile = (updates) => {
    try {
      const users = JSON.parse(localStorage.getItem('users') || '[]');
      const userIndex = users.findIndex(u => u.id === user.id);
      
      if (userIndex !== -1) {
        users[userIndex] = { ...users[userIndex], ...updates };
        localStorage.setItem('users', JSON.stringify(users));
        
        const updatedUser = { ...user, ...updates };
        setUser(updatedUser);
        localStorage.setItem('user', JSON.stringify(updatedUser));
        
        return { success: true, user: updatedUser };
      }
    } catch (error) {
      return { success: false, error: error.message };
    }
  };

  // Đổi mật khẩu
  const changePassword = (currentPassword, newPassword) => {
    try {
      if (user.password !== currentPassword) {
        throw new Error('Mật khẩu hiện tại không đúng');
      }

      const users = JSON.parse(localStorage.getItem('users') || '[]');
      const userIndex = users.findIndex(u => u.id === user.id);
      
      if (userIndex !== -1) {
        users[userIndex].password = newPassword;
        localStorage.setItem('users', JSON.stringify(users));
        
        const updatedUser = { ...user, password: newPassword };
        setUser(updatedUser);
        localStorage.setItem('user', JSON.stringify(updatedUser));
        
        return { success: true };
      }
    } catch (error) {
      return { success: false, error: error.message };
    }
  };

  const value = {
    user,
    isLoading,
    isAuthenticated: !!user,
    register,
    login,
    logout,
    updateProfile,
    changePassword
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}; 