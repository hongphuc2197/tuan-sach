import { useState, useMemo, useEffect } from 'react';
import { Search, Filter, Grid, List } from 'lucide-react';
import BookCard from '../components/BookCard';
import databaseService from '../services/databaseService.js';

const Books = () => {
  const [books, setBooks] = useState([]);
  const [categories, setCategories] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Tất cả');
  const [viewMode, setViewMode] = useState('grid');
  const [isLoading, setIsLoading] = useState(true);

  // Load books từ local data trước, sau đó thử sync với database
  useEffect(() => {
    const loadBooks = async () => {
      try {
        setIsLoading(true);
        
        // Ưu tiên load local data trước để hiển thị ngay
        const { books: localBooks, categories: localCategories } = await import('../data/books.js');
        setBooks(localBooks);
        setCategories(localCategories);
        
        // Sau đó thử sync với database (không block UI)
        try {
          const result = await databaseService.getAllBooks();
          if (result.success && result.books.length > 0) {
            console.log('Database books loaded successfully');
            // Có thể cập nhật books từ database nếu cần
            // setBooks(result.books);
          }
        } catch (dbError) {
          console.log('Database not available, using local data:', dbError.message);
        }
        
      } catch (error) {
        console.error('Error loading local books:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadBooks();
  }, []);

  // Scroll to top khi vào trang danh sách sách
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const filteredBooks = useMemo(() => {
    return books.filter(book => {
      const matchesSearch = book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          book.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          book.description.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesCategory = selectedCategory === 'Tất cả' || book.category === selectedCategory;
      
      return matchesSearch && matchesCategory;
    });
  }, [books, searchTerm, selectedCategory]);

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Danh Sách Sách
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Khám phá bộ sưu tập sách đa dạng về chủ đề và lĩnh vực từ NXB Đại Học Sư Phạm
          </p>
        </div>

        {/* Search and Filter Section */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="flex flex-col lg:flex-row gap-6">
            {/* Search */}
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <input
                  type="text"
                  placeholder="Tìm kiếm sách theo tên, tác giả hoặc mô tả..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>

            {/* Category Filter */}
            <div className="lg:w-64">
              <div className="relative">
                <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none bg-white"
                >
                  {categories.map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* View Mode Toggle */}
            <div className="flex items-center space-x-2">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded-lg ${
                  viewMode === 'grid' 
                    ? 'bg-blue-600 text-white' 
                    : 'bg-gray-200 text-gray-600 hover:bg-gray-300'
                } transition-colors`}
              >
                <Grid className="h-5 w-5" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 rounded-lg ${
                  viewMode === 'list' 
                    ? 'bg-blue-600 text-white' 
                    : 'bg-gray-200 text-gray-600 hover:bg-gray-300'
                } transition-colors`}
              >
                <List className="h-5 w-5" />
              </button>
            </div>
          </div>

                  {/* Results Count */}
        <div className="mt-4 text-sm text-gray-600">
          {isLoading ? (
            'Đang tải dữ liệu...'
          ) : (
            <>
              Tìm thấy {filteredBooks.length} cuốn sách
              {selectedCategory !== 'Tất cả' && ` trong danh mục "${selectedCategory}"`}
              {searchTerm && ` cho từ khóa "${searchTerm}"`}
            </>
          )}
        </div>
      </div>

        {/* Books Grid/List */}
        {filteredBooks.length > 0 ? (
          <div className={viewMode === 'grid' ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8' : 'space-y-6'}>
            {filteredBooks.map((book) => (
              <BookCard key={book.id} book={book} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <div className="bg-white rounded-lg shadow-md p-12">
              <div className="text-gray-400 mb-4">
                <Search className="h-16 w-16 mx-auto" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Không tìm thấy sách
              </h3>
              <p className="text-gray-600 mb-6">
                Không có cuốn sách nào phù hợp với tiêu chí tìm kiếm của bạn.
              </p>
              <button
                onClick={() => {
                  setSearchTerm('');
                  setSelectedCategory('Tất cả');
                }}
                className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
              >
                Xóa bộ lọc
              </button>
            </div>
          </div>
        )}

        {/* Pagination (if needed) */}
        {filteredBooks.length > 12 && (
          <div className="mt-12 flex justify-center">
            <nav className="flex items-center space-x-2">
              <button className="px-3 py-2 text-gray-500 hover:text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed">
                Trước
              </button>
              <button className="px-3 py-2 bg-blue-600 text-white rounded-lg">1</button>
              <button className="px-3 py-2 text-gray-700 hover:text-gray-900">2</button>
              <button className="px-3 py-2 text-gray-700 hover:text-gray-900">3</button>
              <button className="px-3 py-2 text-gray-500 hover:text-gray-700">
                Sau
              </button>
            </nav>
          </div>
        )}
      </div>
    </div>
  );
};

export default Books; 