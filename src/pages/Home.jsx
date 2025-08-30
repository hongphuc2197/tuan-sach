import { Link, useNavigate } from 'react-router-dom';
import { ArrowRight, BookOpen, Users, Award, Star } from 'lucide-react';
import { books } from '../data/books';
import { useAuth } from '../hooks/useAuth.jsx';
import { useEffect } from 'react';

const Home = () => {
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAuth();
  const featuredBooks = books.slice(0, 6);

  // Scroll to top khi vào trang chủ
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-purple-700 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Khám Phá Thế Giới Sách
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-blue-100 max-w-3xl mx-auto">
            NXB Đại Học Sư Phạm - Nơi ươm mầm tri thức, phát triển tài năng giáo dục Việt Nam
          </p>
                      <div className="flex flex-col sm:flex-row gap-4 justify-center">
              {isAuthenticated ? (
                // Nếu đã đăng nhập, hiển thị nút xem sách
                <Link
                  to="/books"
                  className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors flex items-center justify-center space-x-2"
                >
                  <span>Xem danh sách sách</span>
                  <ArrowRight className="h-5 w-5" />
                </Link>
              ) : (
                // Nếu chưa đăng nhập, hiển thị nút đăng nhập/đăng ký
                <>
                  <Link
                    to="/login"
                    className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors flex items-center justify-center space-x-2"
                  >
                    <span>Đăng nhập để xem sách</span>
                    <ArrowRight className="h-5 w-5" />
                  </Link>
                  <Link
                    to="/register"
                    className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors"
                  >
                    Đăng ký tài khoản
                  </Link>
                </>
              )}
            </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <BookOpen className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-3xl font-bold text-gray-900 mb-2">500+</h3>
              <p className="text-gray-600">Đầu sách đa dạng</p>
            </div>
            <div className="text-center">
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-3xl font-bold text-gray-900 mb-2">50K+</h3>
              <p className="text-gray-600">Độc giả tin tưởng</p>
            </div>
            <div className="text-center">
              <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Award className="h-8 w-8 text-purple-600" />
              </div>
              <h3 className="text-3xl font-bold text-gray-900 mb-2">25+</h3>
              <p className="text-gray-600">Năm kinh nghiệm</p>
            </div>
            <div className="text-center">
              <div className="bg-yellow-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Star className="h-8 w-8 text-yellow-600" />
              </div>
              <h3 className="text-3xl font-bold text-gray-900 mb-2">4.9/5</h3>
              <p className="text-gray-600">Đánh giá từ độc giả</p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Books Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Sách Nổi Bật
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Khám phá những cuốn sách mới nhất và được yêu thích nhất từ NXB Đại Học Sư Phạm
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredBooks.map((book) => (
              <div key={book.id} className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
                <div className="relative">
                  <img
                    src={book.image}
                    alt={book.title}
                    className="w-full h-48 object-cover"
                  />
                  <div className="absolute bottom-2 left-2 bg-blue-600 text-white px-2 py-1 rounded text-sm font-medium">
                    {book.category}
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-2">
                    {book.title}
                  </h3>
                  <p className="text-gray-600 text-sm mb-3">
                    <span className="font-medium">Tác giả:</span> {book.author}
                  </p>
                  <p className="text-gray-700 text-sm mb-4 line-clamp-2">
                    {book.description}
                  </p>
                  <div className="flex justify-between items-center">
                    <span className="text-lg font-bold text-blue-600">{book.price}</span>
                    <button
                      onClick={() => navigate(`/books/${book.id}`)}
                      className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors text-sm"
                    >
                      Xem chi tiết
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link
              to="/books"
              className="inline-flex items-center space-x-2 bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
            >
              <span>Xem tất cả sách</span>
              <ArrowRight className="h-5 w-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                Về NXB Đại Học Sư Phạm
              </h2>
              <p className="text-lg text-gray-600 mb-6">
                Với hơn 25 năm kinh nghiệm trong lĩnh vực xuất bản giáo dục, NXB Đại Học Sư Phạm 
                tự hào là đơn vị tiên phong trong việc cung cấp các tài liệu học tập chất lượng cao 
                cho sinh viên, giảng viên và các nhà nghiên cứu.
              </p>
              <p className="text-lg text-gray-600 mb-8">
                Chúng tôi cam kết mang đến những cuốn sách có nội dung khoa học, cập nhật và 
                phù hợp với nhu cầu thực tế của ngành giáo dục Việt Nam.
              </p>
              <Link
                to="/about"
                className="inline-flex items-center space-x-2 bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
              >
                <span>Tìm hiểu thêm</span>
                <ArrowRight className="h-5 w-5" />
              </Link>
            </div>
            <div className="relative">
              <div className="bg-blue-600 w-full h-80 rounded-lg"></div>
              <div className="absolute inset-0 bg-gradient-to-br from-blue-600 to-purple-700 rounded-lg flex items-center justify-center">
                <BookOpen className="h-32 w-32 text-white opacity-20" />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home; 