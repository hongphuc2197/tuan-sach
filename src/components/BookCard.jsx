import { useNavigate } from 'react-router-dom';
import { Eye, ShoppingCart } from 'lucide-react';
import { useUserActions } from '../hooks/useUserActions.js';

const BookCard = ({ book }) => {
  const navigate = useNavigate();
  const { actions, markAsPurchased } = useUserActions(book.id);

  // Debug: log book data
  console.log('BookCard received book:', book);

  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
      {/* Book Image */}
      <div className="relative bg-gray-100">
        <img
          src={book.image}
          alt={book.title}
          className="w-full h-64 object-cover border border-gray-200"
          onError={(e) => {
            console.error('Image failed to load:', book.image);
            e.target.src = 'https://via.placeholder.com/300x400/6B7280/FFFFFF?text=No+Image';
          }}
          onLoad={() => console.log('Image loaded successfully:', book.image)}
          style={{ minHeight: '256px' }}
        />
        {/* Debug info - chỉ hiển thị trong development */}
        {/* {process.env.NODE_ENV === 'development' && (
          <div className="absolute top-0 left-0 bg-black bg-opacity-50 text-white text-xs p-1">
            {book.image ? 'Image URL: ' + book.image.substring(0, 30) + '...' : 'No image URL'}
          </div>
        )} */}

        <div className="absolute bottom-2 left-2 bg-blue-600 text-white px-2 py-1 rounded text-sm font-medium">
          {book.category}
        </div>
      </div>

      {/* Book Info */}
      <div className="p-6">
        <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-2">
          {book.title}
        </h3>
        <p className="text-gray-600 text-sm mb-3">
          <span className="font-medium">Tác giả:</span> {book.author}
        </p>
        <p className="text-gray-700 text-sm mb-4 line-clamp-3">
          {book.description}
        </p>

        {/* Book Details */}
        <div className="grid grid-cols-2 gap-4 mb-4 text-sm text-gray-600">
          <div>
            <span className="font-medium">Năm xuất bản:</span> {book.publishYear}
          </div>
          <div>
            <span className="font-medium">Số trang:</span> {book.pages}
          </div>
          <div>
            <span className="font-medium">ISBN:</span> {book.isbn}
          </div>
          <div>
            <span className="font-medium">Giá:</span> {book.price}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex">
          <button 
            onClick={() => navigate(`/books/${book.id}`)}
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors flex items-center justify-center space-x-2"
          >
            <Eye className="h-4 w-4" />
            <span>Xem chi tiết</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default BookCard; 