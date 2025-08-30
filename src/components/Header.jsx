import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { BookOpen, User, LogOut, Menu, X } from 'lucide-react';
import { useAuth } from '../hooks/useAuth.jsx';

const Header = () => {
  const { user, logout, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="bg-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3">
            <div className="relative">
              {/* Logo container với target và arrow */}
              <div className="w-10 h-10 bg-white border-2 border-red-600 rounded-full flex items-center justify-center relative">
                {/* Target (bullseye) */}
                <div className="w-6 h-6 bg-red-600 rounded-full flex items-center justify-center">
                  <div className="w-3 h-3 bg-white rounded-full"></div>
                </div>
                {/* Arrow */}
                <div className="absolute -top-1 left-1/2 transform -translate-x-1/2">
                  <div className="w-0.5 h-3 bg-amber-700"></div>
                  <div className="w-0 h-0 border-l-2 border-r-2 border-b-3 border-l-transparent border-r-transparent border-b-red-600 transform -translate-x-1/2 ml-0.5"></div>
                </div>
              </div>
            </div>
            <div className="flex flex-col">
              <span className="text-2xl font-bold text-red-600 tracking-wide">KYANON</span>
              <span className="text-sm font-bold text-red-600 -mt-1">KF-Lab</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            <Link to="/" className="text-gray-700 hover:text-blue-600 transition-colors">
              Trang chủ
            </Link>
            <Link to="/books" className="text-gray-700 hover:text-blue-600 transition-colors">
              Danh sách sách
            </Link>

            <Link to="/about" className="text-gray-700 hover:text-blue-600 transition-colors">
              Giới thiệu
            </Link>
            <Link to="/history" className="text-gray-700 hover:text-blue-600 transition-colors">
              Lịch sử & Sứ mệnh
            </Link>
            <Link to="/contact" className="text-gray-700 hover:text-blue-600 transition-colors">
              Liên hệ
            </Link>
          </nav>

          {/* User Actions */}
          <div className="hidden md:flex items-center space-x-4">
            {isAuthenticated ? (
              <div className="flex items-center space-x-3">
                <span className="text-gray-700">Xin chào, {user?.name}</span>
                <button
                  onClick={() => {
                    logout();
                    navigate('/');
                    setIsMenuOpen(false);
                  }}
                  className="flex items-center space-x-2 px-4 py-2 text-gray-700 hover:text-red-600 transition-colors"
                >
                  <LogOut className="h-4 w-4" />
                  <span>Đăng xuất</span>
                </button>
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <Link
                  to="/login"
                  className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  <User className="h-4 w-4" />
                  <span>Đăng nhập</span>
                </Link>
                <Link
                  to="/register"
                  className="flex items-center space-x-2 px-4 py-2 border border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50 transition-colors"
                >
                  <span>Đăng ký</span>
                </Link>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 rounded-md text-gray-700 hover:text-blue-600"
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              <Link
                to="/"
                className="block px-3 py-2 text-gray-700 hover:text-blue-600"
                onClick={() => setIsMenuOpen(false)}
              >
                Trang chủ
              </Link>
              <Link
                to="/books"
                className="block px-3 py-2 text-gray-700 hover:text-blue-600"
                onClick={() => setIsMenuOpen(false)}
              >
                Danh sách sách
              </Link>

              <Link
                to="/about"
                className="block px-3 py-2 text-gray-700 hover:text-blue-600"
                onClick={() => setIsMenuOpen(false)}
              >
                Giới thiệu
              </Link>
              <Link
                to="/history"
                className="block px-3 py-2 text-gray-700 hover:text-blue-600"
                onClick={() => setIsMenuOpen(false)}
              >
                Lịch sử & Sứ mệnh
              </Link>
              <Link
                to="/contact"
                className="block px-3 py-2 text-gray-700 hover:text-blue-600"
                onClick={() => setIsMenuOpen(false)}
              >
                Liên hệ
              </Link>
              {isAuthenticated ? (
                <div className="px-3 py-2">
                  <span className="text-gray-700">Xin chào, {user?.name}</span>
                  <button
                    onClick={() => {
                      logout();
                      navigate('/');
                      setIsMenuOpen(false);
                    }}
                    className="block w-full mt-2 text-left text-red-600 hover:text-red-800"
                  >
                    Đăng xuất
                  </button>
                </div>
              ) : (
                <div className="space-y-2">
                  <Link
                    to="/login"
                    className="block px-3 py-2 text-blue-600 hover:text-blue-800"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Đăng nhập
                  </Link>
                  <Link
                    to="/register"
                    className="block px-3 py-2 text-blue-600 hover:text-blue-800"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Đăng ký
                  </Link>
                </div>
              )}
            </div>
          </div>
        )}
      </div>


    </header>
  );
};

export default Header; 