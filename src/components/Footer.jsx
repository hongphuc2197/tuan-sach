import { Link } from 'react-router-dom';
import { BookOpen, Mail, Phone, MapPin, Globe } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Company Info */}
          <div>
            <Link to="/" className="flex items-center space-x-2 mb-4">
              <BookOpen className="h-8 w-8 text-blue-400" />
              <span className="text-xl font-bold">NXB Sư Phạm</span>
            </Link>
            <p className="text-gray-300 mb-6 max-w-md">
              NXB Đại Học Sư Phạm - Nơi ươm mầm tri thức, phát triển tài năng giáo dục Việt Nam. 
              Với hơn 25 năm kinh nghiệm, chúng tôi cam kết mang đến những cuốn sách chất lượng cao.
            </p>
            
            {/* Contact Info - Chỉ giữ lại thông tin cơ bản */}
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <MapPin className="h-5 w-5 text-blue-400" />
                <span className="text-gray-300 text-sm">
                  B506 - 280 An Dương Vương, Phường Chợ Quán, TP.HCM
                </span>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="h-5 w-5 text-blue-400" />
                <span className="text-gray-300 text-sm">
                  +84 28 3835 2020
                </span>
              </div>
              <div className="flex items-center space-x-3">
                <Globe className="h-5 w-5 text-blue-400" />
                <a 
                  href="https://kyanon.digital/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-gray-300 text-sm hover:text-blue-400 transition-colors duration-200"
                >
                  kyanon.digital
                </a>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="h-5 w-5 text-blue-400" />
                <span className="text-gray-300 text-sm">
                  contact@kyanon.digital
                </span>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="h-5 w-5 text-blue-400" />
                <span className="text-gray-300 text-sm">
                  hai.tran@kyanon.digital
                </span>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="h-5 w-5 text-blue-400" />
                <span className="text-gray-300 text-sm">
                  trananhtuan526201@gmail.com
                </span>
              </div>
            </div>
          </div>

          {/* Quick Links - Chỉ giữ lại những link quan trọng */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Liên kết nhanh</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/books"
                  className="text-gray-300 hover:text-white transition-colors text-sm"
                >
                  Danh sách sách
                </Link>
              </li>
              <li>
                <Link
                  to="/about"
                  className="text-gray-300 hover:text-white transition-colors text-sm"
                >
                  Về chúng tôi
                </Link>
              </li>
              <li>
                <Link
                  to="/history"
                  className="text-gray-300 hover:text-white transition-colors text-sm"
                >
                  Lịch sử & Sứ mệnh
                </Link>
              </li>

            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-800 mt-12 pt-8">
          <div className="text-center">
            <div className="text-gray-400 text-sm">
              © {currentYear} NXB Đại Học Sư Phạm. Tất cả quyền được bảo lưu.
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 