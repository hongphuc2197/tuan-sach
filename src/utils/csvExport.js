import { books } from '../data/books';
import { getUserInfo } from './userTracking';

// Chuyển đổi timestamp thành định dạng đọc được
const formatDate = (timestamp) => {
  const date = new Date(timestamp);
  return date.toLocaleString('vi-VN');
};

// Tạo nội dung CSV
export const generateCSV = (userActions) => {
  const userInfo = getUserInfo();
  const headers = [
    'User ID',
    'User Created At',
    'Session ID',
    'Book ID',
    'Book Title',
    'Author',
    'Category',
    'Price',
    'Viewed',
    'Viewed Date',
    'Purchased',
    'Purchased Date',
    'Export Date'
  ];

      const rows = Object.entries(userActions).map(([bookId, actions]) => {
      const book = books.find(b => b.id === parseInt(bookId));
      if (!book) return null;

      const viewedDate = actions.viewedAt ? formatDate(actions.viewedAt) : '';
      const purchasedDate = actions.purchasedAt ? formatDate(actions.purchasedAt) : '';
      const exportDate = formatDate(Date.now());

      return [
        userInfo.id,
        formatDate(userInfo.createdAt.getTime()),
        userInfo.sessionId,
        book.id,
        `"${book.title}"`,
        `"${book.author}"`,
        `"${book.category}"`,
        book.price,
        actions.viewed ? 'Yes' : 'No',
        viewedDate,
        actions.purchased ? 'Yes' : 'No',
        purchasedDate,
        exportDate
      ].join(',');
    }).filter(Boolean);

  return [headers.join(','), ...rows].join('\n');
};

// Tạo và download file CSV
export const downloadCSV = (userActions, filename = 'user_actions.csv') => {
  const csvContent = generateCSV(userActions);
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  
  const link = document.createElement('a');
  if (link.download !== undefined) {
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', filename);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
};

// Lấy dữ liệu user actions từ localStorage
export const getUserActionsData = () => {
  try {
    return JSON.parse(localStorage.getItem('userActions') || '{}');
  } catch (error) {
    console.error('Error parsing user actions:', error);
    return {};
  }
};

// Tạo báo cáo tổng hợp
export const generateSummaryReport = (userActions) => {
  const totalBooks = Object.keys(userActions).length;
  const viewedBooks = Object.values(userActions).filter(action => action.viewed).length;
  const purchasedBooks = Object.values(userActions).filter(action => action.purchased).length;
  
  const summary = [
    'User Actions Summary Report',
    `Generated on: ${formatDate(Date.now())}`,
    '',
    'Statistics:',
    `- Total books interacted: ${totalBooks}`,
    `- Books viewed: ${viewedBooks}`,
    `- Books purchased: ${purchasedBooks}`,
    `- View rate: ${totalBooks > 0 ? ((viewedBooks / totalBooks) * 100).toFixed(1) : 0}%`,
    `- Purchase rate: ${totalBooks > 0 ? ((purchasedBooks / totalBooks) * 100).toFixed(1) : 0}%`,
    ''
  ].join('\n');

  return summary + generateCSV(userActions);
}; 