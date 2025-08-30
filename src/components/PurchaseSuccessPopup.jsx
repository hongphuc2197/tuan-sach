import { useEffect } from 'react';
import { CheckCircle, X } from 'lucide-react';

const PurchaseSuccessPopup = ({ isVisible, onClose, bookTitle }) => {
  useEffect(() => {
    if (isVisible) {
      // Tự động đóng popup sau 3 giây
      const timer = setTimeout(() => {
        onClose();
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [isVisible, onClose]);

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50 animate-fadeIn">
      {/* Popup Container */}
      <div className="bg-white rounded-2xl shadow-2xl max-w-sm w-full mx-4 transform transition-all duration-300 scale-100 animate-slideUp">
        {/* Header với nút đóng */}
        <div className="flex justify-between items-center p-4 border-b border-gray-100">
          <h3 className="text-lg font-semibold text-gray-900">Thành công!</h3>
          <button
            onClick={onClose}
            className="p-1 rounded-full hover:bg-gray-100 transition-colors active:scale-95"
          >
            <X className="h-5 w-5 text-gray-500" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 text-center">
          {/* Icon thành công với animation */}
          <div className="mx-auto mb-4 w-16 h-16 bg-green-100 rounded-full flex items-center justify-center animate-bounce">
            <CheckCircle className="h-8 w-8 text-green-600" />
          </div>

          {/* Thông báo */}
          <h4 className="text-xl font-semibold text-gray-900 mb-2">
            Mua sách thành công!
          </h4>
          <p className="text-gray-600 mb-4">
            Bạn đã mua thành công cuốn sách
          </p>
          
          {/* Tên sách */}
          <div className="bg-gray-50 rounded-lg p-3 mb-6 border border-gray-200">
            <p className="text-sm font-medium text-gray-900 line-clamp-2">
              {bookTitle}
            </p>
          </div>

          {/* Thông tin bổ sung */}
          <div className="space-y-2 text-sm text-gray-500">
            <p>• Sách đã được thêm vào danh sách đã mua</p>
            <p>• Bạn có thể xem lại sách bất cứ lúc nào</p>
          </div>
        </div>

        {/* Footer với nút đóng */}
        <div className="p-4 border-t border-gray-100">
          <button
            onClick={onClose}
            className="w-full bg-green-600 text-white py-3 px-6 rounded-xl font-semibold hover:bg-green-700 transition-colors active:scale-95 touch-manipulation"
            style={{
              WebkitTapHighlightColor: 'transparent',
              WebkitTouchCallout: 'none',
              WebkitUserSelect: 'none',
              userSelect: 'none'
            }}
          >
            Đóng
          </button>
        </div>
      </div>

      {/* Custom CSS cho animations */}
      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        
        @keyframes slideUp {
          from { 
            opacity: 0; 
            transform: translateY(20px) scale(0.95); 
          }
          to { 
            opacity: 1; 
            transform: translateY(0) scale(1); 
          }
        }
        
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }
        
        .animate-slideUp {
          animation: slideUp 0.4s ease-out;
        }
        
        .animate-bounce {
          animation: bounce 1s infinite;
        }
        
        @keyframes bounce {
          0%, 20%, 53%, 80%, 100% {
            transform: translate3d(0,0,0);
          }
          40%, 43% {
            transform: translate3d(0,-8px,0);
          }
          70% {
            transform: translate3d(0,-4px,0);
          }
          90% {
            transform: translate3d(0,-2px,0);
          }
        }
      `}</style>
    </div>
  );
};

export default PurchaseSuccessPopup;
