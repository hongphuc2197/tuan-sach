import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, ShoppingCart, Eye, Heart, Star } from 'lucide-react';
import { books } from '../data/books';
import { useUserActions } from '../hooks/useUserActions.js';
import { useAuth } from '../hooks/useAuth.jsx';

const BookDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [book, setBook] = useState(null);
  const [isLiked, setIsLiked] = useState(false);
  const { user, isAuthenticated } = useAuth();
  const { actions: userActions, markAsViewed, markAsPurchased } = useUserActions(book?.id);

  useEffect(() => {
    const foundBook = books.find(b => b.id === parseInt(id));
    if (foundBook) {
      setBook(foundBook);
    }
  }, [id, books]);

  // Gọi markAsViewed khi book đã được set
  useEffect(() => {
    if (book && book.id) {
      console.log('Book loaded, calling markAsViewed for book ID:', book.id);
      console.log('User authentication status:', { isAuthenticated, user: user ? { id: user.id, email: user.email } : null });
      
      if (isAuthenticated && user) {
        console.log('User is authenticated, calling markAsViewed');
        try {
          markAsViewed();
        } catch (error) {
          console.error('Error calling markAsViewed:', error);
          console.log('Continuing without tracking view action');
        }
      } else {
        console.log('User not authenticated, skipping markAsViewed');
      }
    }
  }, [book, markAsViewed, isAuthenticated, user]);

  const handlePurchase = () => {
    if (book) {
      try {
        markAsPurchased();
        alert(`Cảm ơn bạn đã mua sách "${book.title}"!`);
      } catch (error) {
        console.error('Error calling markAsPurchased:', error);
        alert(`Cảm ơn bạn đã mua sách "${book.title}"! (Lưu ý: Hành động mua sách không được ghi nhận do lỗi hệ thống)`);
      }
    }
  };

  const handleLike = () => {
    setIsLiked(!isLiked);
  };

  if (!book) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Không tìm thấy sách</h2>
          <button
            onClick={() => navigate('/books')}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Quay lại danh sách
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Button */}
        <button
          onClick={() => navigate('/books')}
          className="flex items-center space-x-2 text-blue-600 hover:text-blue-700 mb-6 transition-colors"
        >
          <ArrowLeft className="h-5 w-5" />
          <span>Quay lại danh sách sách</span>
        </button>

        {/* Book Details */}
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-8">
            {/* Book Image */}
            <div className="relative">
              <img
                src={book.image}
                alt={book.title}
                className="w-full h-96 object-cover rounded-lg"
              />
              <div className="absolute top-4 right-4 flex space-x-2">
                <button
                  onClick={handleLike}
                  className={`p-2 rounded-full ${
                    isLiked ? 'bg-red-500 text-white' : 'bg-white text-gray-600'
                  } hover:scale-110 transition-all duration-200 shadow-lg`}
                >
                  <Heart className="h-5 w-5" fill={isLiked ? 'currentColor' : 'none'} />
                </button>
              </div>
              <div className="absolute bottom-4 left-4 bg-blue-600 text-white px-3 py-1 rounded text-sm font-medium">
                {book.category}
              </div>
            </div>

            {/* Book Info */}
            <div className="space-y-6">
              <div>
                <h1 className="text-3xl font-bold text-gray-900 mb-2">
                  {book.title}
                </h1>
                <p className="text-lg text-gray-600 mb-4">
                  <span className="font-medium">Tác giả:</span> {book.author}
                </p>
                <div className="flex items-center space-x-4 mb-4">
                  <div className="flex items-center space-x-1">
                    <Star className="h-5 w-5 text-yellow-400 fill-current" />
                    <Star className="h-5 w-5 text-yellow-400 fill-current" />
                    <Star className="h-5 w-5 text-yellow-400 fill-current" />
                    <Star className="h-5 w-5 text-yellow-400 fill-current" />
                    <Star className="h-5 w-5 text-gray-300" />
                    <span className="text-sm text-gray-600 ml-2">4.0/5</span>
                  </div>
                </div>
              </div>

              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-semibold text-gray-900 mb-3">Mô tả</h3>
                <p className="text-gray-700 leading-relaxed">
                  {book.description}
                </p>
              </div>

              {/* Book Details Grid */}
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-gray-50 p-3 rounded-lg">
                  <span className="text-sm text-gray-600">Năm xuất bản</span>
                  <p className="font-semibold text-gray-900">{book.publishYear}</p>
                </div>
                <div className="bg-gray-50 p-3 rounded-lg">
                  <span className="text-sm text-gray-600">Số trang</span>
                  <p className="font-semibold text-gray-900">{book.pages}</p>
                </div>
                <div className="bg-gray-50 p-3 rounded-lg">
                  <span className="text-sm text-gray-600">ISBN</span>
                  <p className="font-semibold text-gray-900 text-sm">{book.isbn}</p>
                </div>
                <div className="bg-gray-50 p-3 rounded-lg">
                  <span className="text-sm text-gray-600">Danh mục</span>
                  <p className="font-semibold text-gray-900">{book.category}</p>
                </div>
              </div>

              {/* Price and Actions */}
              <div className="border-t pt-6">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <span className="text-2xl font-bold text-blue-600">{book.price}</span>
                    <span className="text-sm text-gray-500 ml-2">(Giá bìa)</span>
                  </div>
                  <div className="text-right">
                    <div className="text-sm text-gray-600">
                      {userActions.viewed && (
                        <div className="flex items-center space-x-1 text-green-600">
                          <Eye className="h-4 w-4" />
                          <span>Đã xem</span>
                        </div>
                      )}
                    </div>
                    <div className="text-sm text-gray-600">
                      {userActions.purchased && (
                        <div className="flex items-center space-x-1 text-blue-600">
                          <ShoppingCart className="h-4 w-4" />
                          <span>Đã mua</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                <div className="flex space-x-4">
                  <button
                    onClick={handlePurchase}
                    disabled={userActions.purchased}
                    className={`flex-1 flex items-center justify-center space-x-2 py-3 px-6 rounded-lg font-semibold transition-colors ${
                      userActions.purchased
                        ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                        : 'bg-green-600 text-white hover:bg-green-700'
                    }`}
                  >
                    <ShoppingCart className="h-5 w-5" />
                    <span>
                      {userActions.purchased ? 'Đã mua' : 'Mua sách'}
                    </span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Related Books */}
        <div className="mt-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Sách liên quan</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {books
              .filter(b => b.category === book.category && b.id !== book.id)
              .slice(0, 4)
              .map((relatedBook) => (
                <div
                  key={relatedBook.id}
                  className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow cursor-pointer"
                  onClick={() => navigate(`/books/${relatedBook.id}`)}
                >
                  <img
                    src={relatedBook.image}
                    alt={relatedBook.title}
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-4">
                    <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2">
                      {relatedBook.title}
                    </h3>
                    <p className="text-sm text-gray-600 mb-2">{relatedBook.author}</p>
                    <p className="font-bold text-blue-600">{relatedBook.price}</p>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookDetail; 