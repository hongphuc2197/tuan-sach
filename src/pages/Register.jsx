import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth.jsx';
import { UserPlus, Eye, EyeOff, AlertCircle, CheckCircle } from 'lucide-react';

const Register = () => {
  const navigate = useNavigate();
  const { register } = useAuth();
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    yearBirth: '',
    education: '',
    maritalStatus: '',
    income: '',
    kidhome: 0,
    teenhome: 0
  });
  
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const validateForm = () => {
    if (!formData.name.trim()) {
      setMessage({ type: 'error', text: 'Vui lòng nhập họ tên' });
      return false;
    }
    
    if (!formData.email.trim()) {
      setMessage({ type: 'error', text: 'Vui lòng nhập email' });
      return false;
    }
    
    if (!formData.email.includes('@')) {
      setMessage({ type: 'error', text: 'Email không hợp lệ' });
      return false;
    }
    
    if (formData.password.length < 6) {
      setMessage({ type: 'error', text: 'Mật khẩu phải có ít nhất 6 ký tự' });
      return false;
    }
    
    if (formData.password !== formData.confirmPassword) {
      setMessage({ type: 'error', text: 'Mật khẩu xác nhận không khớp' });
      return false;
    }

    if (!formData.yearBirth) {
      setMessage({ type: 'error', text: 'Vui lòng chọn năm sinh' });
      return false;
    }

    if (!formData.education) {
      setMessage({ type: 'error', text: 'Vui lòng chọn trình độ học vấn' });
      return false;
    }

    if (!formData.maritalStatus) {
      setMessage({ type: 'error', text: 'Vui lòng chọn tình trạng hôn nhân' });
      return false;
    }
    
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsLoading(true);
    setMessage({ type: '', text: '' });
    
    try {
      const result = await register({
        name: formData.name.trim(),
        email: formData.email.trim().toLowerCase(),
        password: formData.password,
        yearBirth: parseInt(formData.yearBirth),
        education: formData.education,
        maritalStatus: formData.maritalStatus,
        income: formData.income ? parseFloat(formData.income) : null,
        kidhome: parseInt(formData.kidhome),
        teenhome: parseInt(formData.teenhome)
      });
      
      if (result.success) {
        setMessage({ 
          type: 'success', 
          text: 'Đăng ký thành công! Đang chuyển hướng...' 
        });
        
        // Chuyển hướng sau 2 giây
        setTimeout(() => {
          navigate('/books');
        }, 2000);
      } else {
        setMessage({ type: 'error', text: result.error });
      }
    } catch (error) {
      setMessage({ type: 'error', text: 'Có lỗi xảy ra, vui lòng thử lại' });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-lg w-full space-y-8">
        <div className="text-center">
          <div className="mx-auto h-16 w-16 bg-blue-600 rounded-full flex items-center justify-center">
            <UserPlus className="h-8 w-8 text-white" />
          </div>
          <h2 className="mt-6 text-3xl font-bold text-gray-900">
            Đăng ký tài khoản
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Tạo tài khoản để truy cập thư viện sách
          </p>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          {/* Message */}
          {message.text && (
            <div className={`rounded-md p-4 ${
              message.type === 'error' 
                ? 'bg-red-50 border border-red-200' 
                : 'bg-green-50 border border-green-200'
            }`}>
              <div className="flex">
                <div className="flex-shrink-0">
                  {message.type === 'error' ? (
                    <AlertCircle className="h-5 w-5 text-red-400" />
                  ) : (
                    <CheckCircle className="h-5 w-5 text-green-400" />
                  )}
                </div>
                <div className="ml-3">
                  <p className={`text-sm ${
                    message.type === 'error' ? 'text-red-800' : 'text-green-800'
                  }`}>
                    {message.text}
                  </p>
                </div>
              </div>
            </div>
          )}

          <div className="space-y-4">
            {/* Họ tên */}
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                Họ và tên
              </label>
              <input
                id="name"
                name="name"
                type="text"
                required
                value={formData.name}
                onChange={handleChange}
                className="mt-1 appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                placeholder="Nhập họ và tên của bạn"
              />
            </div>

            {/* Email */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                value={formData.email}
                onChange={handleChange}
                className="mt-1 appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                placeholder="example@email.com"
              />
            </div>

            {/* Mật khẩu */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Mật khẩu
              </label>
              <div className="mt-1 relative">
                <input
                  id="password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={formData.password}
                  onChange={handleChange}
                  className="appearance-none relative block w-full px-3 py-2 pr-10 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                  placeholder="Ít nhất 6 ký tự"
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5 text-gray-400" />
                  ) : (
                    <Eye className="h-5 w-5 text-gray-400" />
                  )}
                </button>
              </div>
            </div>

            {/* Xác nhận mật khẩu */}
            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
                Xác nhận mật khẩu
              </label>
              <div className="mt-1 relative">
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type={showConfirmPassword ? 'text' : 'password'}
                  required
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className="appearance-none relative block w-full px-3 py-2 pr-10 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                  placeholder="Nhập lại mật khẩu"
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  {showConfirmPassword ? (
                    <EyeOff className="h-5 w-5 text-gray-400" />
                  ) : (
                    <Eye className="h-5 w-5 text-gray-400" />
                  )}
                </button>
              </div>
            </div>
          </div>

          {/* Thông tin cá nhân */}
          <div className="border-t border-gray-200 pt-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Thông tin cá nhân</h3>
            
            {/* Năm sinh */}
            <div className="mb-4">
              <label htmlFor="yearBirth" className="block text-sm font-medium text-gray-700 mb-2">
                Năm sinh *
              </label>
              <select
                id="yearBirth"
                name="yearBirth"
                required
                value={formData.yearBirth}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              >
                <option value="">Chọn năm sinh</option>
                {Array.from({ length: 80 }, (_, i) => new Date().getFullYear() - i).map(year => (
                  <option key={year} value={year}>{year}</option>
                ))}
              </select>
            </div>

            {/* Trình độ học vấn */}
            <div className="mb-4">
              <label htmlFor="education" className="block text-sm font-medium text-gray-700 mb-2">
                Trình độ học vấn *
              </label>
              <select
                id="education"
                name="education"
                required
                value={formData.education}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              >
                <option value="">Chọn trình độ học vấn</option>
                <option value="Basic">Phổ thông cơ sở</option>
                <option value="Graduation">Tốt nghiệp phổ thông</option>
                <option value="Master">Đại học</option>
                <option value="PhD">Sau đại học</option>
                <option value="2n Cycle">Trung cấp/Cao đẳng</option>
              </select>
            </div>

            {/* Tình trạng hôn nhân */}
            <div className="mb-4">
              <label htmlFor="maritalStatus" className="block text-sm font-medium text-gray-700 mb-2">
                Tình trạng hôn nhân *
              </label>
              <select
                id="maritalStatus"
                name="maritalStatus"
                required
                value={formData.maritalStatus}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              >
                <option value="">Chọn tình trạng hôn nhân</option>
                <option value="Single">Độc thân</option>
                <option value="Married">Đã kết hôn</option>
                <option value="Divorced">Đã ly hôn</option>
                <option value="Widow">Góa</option>
                <option value="YOLO">Đang hẹn hò</option>
              </select>
            </div>

            {/* Thu nhập hàng năm */}
            <div className="mb-4">
              <label htmlFor="income" className="block text-sm font-medium text-gray-700 mb-2">
                Thu nhập hàng năm (VNĐ)
              </label>
              <input
                id="income"
                name="income"
                type="number"
                value={formData.income}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                placeholder="Ví dụ: 50000000"
                min="0"
                step="1000000"
              />
              <p className="text-xs text-gray-500 mt-1">Để trống nếu không muốn chia sẻ</p>
            </div>

            {/* Số con nhỏ */}
            <div className="mb-4">
              <label htmlFor="kidhome" className="block text-sm font-medium text-gray-700 mb-2">
                Số con nhỏ (dưới 12 tuổi)
              </label>
              <select
                id="kidhome"
                name="kidhome"
                value={formData.kidhome}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              >
                {Array.from({ length: 6 }, (_, i) => (
                  <option key={i} value={i}>{i}</option>
                ))}
              </select>
            </div>

            {/* Số con vị thành niên */}
            <div className="mb-4">
              <label htmlFor="teenhome" className="block text-sm font-medium text-gray-700 mb-2">
                Số con vị thành niên (12-18 tuổi)
              </label>
              <select
                id="teenhome"
                name="teenhome"
                value={formData.teenhome}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              >
                {Array.from({ length: 6 }, (_, i) => (
                  <option key={i} value={i}>{i}</option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <button
              type="submit"
              disabled={isLoading}
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
              ) : (
                'Đăng ký'
              )}
            </button>
          </div>

          <div className="text-center">
            <p className="text-sm text-gray-600">
              Đã có tài khoản?{' '}
              <Link
                to="/login"
                className="font-medium text-blue-600 hover:text-blue-500"
              >
                Đăng nhập ngay
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register; 