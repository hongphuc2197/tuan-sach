import { useUserActions } from '../hooks/useUserActions.js';
import { Eye, ShoppingCart, BookOpen, User, Clock, Activity } from 'lucide-react';
import CSVExport from '../components/CSVExport';
import { getUserInfo, clearUserData } from '../utils/userTracking';

const UserStats = () => {
  const { getUserStats } = useUserActions();
  const stats = getUserStats();
  const userInfo = getUserInfo();

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Thống Kê Cá Nhân
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Theo dõi hoạt động đọc sách của bạn
          </p>
          
          {/* User Info */}
          <div className="bg-blue-50 rounded-lg p-6 mt-6 max-w-2xl mx-auto">
            <div className="flex items-center justify-center space-x-2 mb-3">
              <User className="h-5 w-5 text-blue-600" />
              <h3 className="text-lg font-semibold text-blue-900">Thông Tin User</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
              <div>
                <span className="text-blue-700 font-medium">User ID:</span>
                <p className="text-blue-800 font-mono">{userInfo.id}</p>
              </div>
              <div>
                <span className="text-blue-700 font-medium">Tạo lúc:</span>
                <p className="text-blue-800">{userInfo.createdAt.toLocaleString('vi-VN')}</p>
              </div>
              <div>
                <span className="text-blue-700 font-medium">Session:</span>
                <p className="text-blue-800 font-mono">{userInfo.sessionId}</p>
              </div>
            </div>
            <div className="mt-4 flex justify-center">
              <button
                onClick={() => {
                  if (confirm('Bạn có chắc muốn xóa tất cả dữ liệu? Điều này sẽ tạo user mới.')) {
                    clearUserData();
                    window.location.reload();
                  }
                }}
                className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition-colors text-sm"
              >
                Reset User Data
              </button>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          <div className="bg-white rounded-lg shadow-lg p-8 text-center">
            <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <BookOpen className="h-8 w-8 text-blue-600" />
            </div>
            <h3 className="text-3xl font-bold text-gray-900 mb-2">{stats.totalBooks}</h3>
            <p className="text-gray-600">Sách đã tương tác</p>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-8 text-center">
            <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <Eye className="h-8 w-8 text-green-600" />
            </div>
            <h3 className="text-3xl font-bold text-gray-900 mb-2">{stats.viewedBooks}</h3>
            <p className="text-gray-600">Sách đã xem</p>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-8 text-center">
            <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <ShoppingCart className="h-8 w-8 text-purple-600" />
            </div>
            <h3 className="text-3xl font-bold text-gray-900 mb-2">{stats.purchasedBooks}</h3>
            <p className="text-gray-600">Sách đã mua</p>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h3 className="text-xl font-semibold text-gray-900 mb-6">Tiến độ đọc sách</h3>
          
          <div className="space-y-6">
            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium text-gray-700">Sách đã xem</span>
                <span className="text-sm font-medium text-gray-700">
                  {stats.viewedBooks}/{stats.totalBooks}
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-green-600 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${stats.totalBooks > 0 ? (stats.viewedBooks / stats.totalBooks) * 100 : 0}%` }}
                ></div>
              </div>
            </div>

            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium text-gray-700">Sách đã mua</span>
                <span className="text-sm font-medium text-gray-700">
                  {stats.purchasedBooks}/{stats.totalBooks}
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-purple-600 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${stats.totalBooks > 0 ? (stats.purchasedBooks / stats.totalBooks) * 100 : 0}%` }}
                ></div>
              </div>
            </div>
          </div>
        </div>

        {/* Tips */}
        <div className="mt-8 bg-blue-50 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-blue-900 mb-3">💡 Mẹo nhỏ</h3>
          <ul className="text-blue-800 space-y-2">
            <li>• Xem chi tiết sách để cập nhật thống kê</li>
            <li>• Mua sách để theo dõi sách yêu thích</li>
            <li>• Khám phá thêm sách mới để mở rộng kiến thức</li>
          </ul>
        </div>

        {/* CSV Export Section */}
        <div className="mt-8">
          <CSVExport />
        </div>
      </div>
    </div>
  );
};

export default UserStats; 