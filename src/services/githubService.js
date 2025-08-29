// GitHub Gist service để lưu trữ CSV online
// Sử dụng GitHub Personal Access Token
import { getUserInfo } from '../utils/userTracking.js';

class GitHubService {
  constructor() {
    this.GITHUB_TOKEN = import.meta.env.VITE_GITHUB_TOKEN;
    this.GITHUB_USERNAME = import.meta.env.VITE_GITHUB_USERNAME;
    this.API_BASE = 'https://api.github.com';
  }

  // Kiểm tra xem có token không
  isConfigured() {
    // Kiểm tra biến môi trường trước, sau đó kiểm tra localStorage
    const envToken = this.GITHUB_TOKEN;
    const envUsername = this.GITHUB_USERNAME;
    const localToken = localStorage.getItem('github_token');
    const localUsername = localStorage.getItem('github_username');
    
    return !!(envToken && envUsername) || !!(localToken && localUsername);
  }

  // Lấy token và username từ biến môi trường hoặc localStorage
  getCredentials() {
    const envToken = this.GITHUB_TOKEN;
    const envUsername = this.GITHUB_USERNAME;
    const localToken = localStorage.getItem('github_token');
    const localUsername = localStorage.getItem('github_username');
    
    return {
      token: envToken || localToken,
      username: envUsername || localUsername
    };
  }

  // Tạo Gist mới với nội dung CSV
  async createGist(fileName, content, description = 'User actions CSV export') {
    try {
      if (!this.isConfigured()) {
        throw new Error('GitHub service not configured. Please set GITHUB_TOKEN and GITHUB_USERNAME.');
      }

      const credentials = this.getCredentials();

      const gistData = {
        description: description,
        public: false, // Gist private để bảo mật
        files: {
          [fileName]: {
            content: content
          }
        }
      };

      const response = await fetch(`${this.API_BASE}/gists`, {
        method: 'POST',
        headers: {
          'Authorization': `token ${credentials.token}`,
          'Content-Type': 'application/json',
          'Accept': 'application/vnd.github.v3+json'
        },
        body: JSON.stringify(gistData)
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(`GitHub API error: ${errorData.message || response.statusText}`);
      }

      const gist = await response.json();
      
      return {
        success: true,
        gistId: gist.id,
        gistUrl: gist.html_url,
        rawUrl: gist.files[fileName].raw_url,
        message: 'CSV uploaded successfully to GitHub Gist'
      };

    } catch (error) {
      console.error('Error creating GitHub Gist:', error);
      return {
        success: false,
        error: error.message
      };
    }
  }

  // Cập nhật Gist đã tồn tại
  async updateGist(gistId, fileName, content, description = 'User actions CSV export - Updated') {
    try {
      if (!this.isConfigured()) {
        throw new Error('GitHub service not configured.');
      }

      const credentials = this.getCredentials();

      const gistData = {
        description: description,
        files: {
          [fileName]: {
            content: content
          }
        }
      };

      const response = await fetch(`${this.API_BASE}/gists/${gistId}`, {
        method: 'PATCH',
        headers: {
          'Authorization': `token ${credentials.token}`,
          'Content-Type': 'application/json',
          'Accept': 'application/vnd.github.v3+json'
        },
        body: JSON.stringify(gistData)
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(`GitHub API error: ${errorData.message || response.statusText}`);
      }

      const gist = await response.json();
      
      return {
        success: true,
        gistId: gist.id,
        gistUrl: gist.html_url,
        rawUrl: gist.files[fileName].raw_url,
        message: 'CSV updated successfully in GitHub Gist'
      };

    } catch (error) {
      console.error('Error updating GitHub Gist:', error);
      return {
        success: false,
        error: error.message
      };
    }
  }

  // Upload CSV user actions
  async uploadUserActionsCSV(userActions, fileName = null) {
    try {
      const csvContent = this.generateCSVContent(userActions);
      const finalFileName = fileName || `user_actions_${new Date().toISOString().split('T')[0]}.csv`;
      
      // Kiểm tra xem có Gist cũ không
      const existingGistId = localStorage.getItem('github_gist_id');
      
      let result;
      if (existingGistId) {
        // Cập nhật Gist cũ
        result = await this.updateGist(existingGistId, finalFileName, csvContent);
      } else {
        // Tạo Gist mới
        result = await this.createGist(finalFileName, csvContent);
        
        // Lưu Gist ID để lần sau cập nhật
        if (result.success) {
          localStorage.setItem('github_gist_id', result.gistId);
        }
      }
      
      return result;

    } catch (error) {
      console.error('Error uploading CSV to GitHub:', error);
      return {
        success: false,
        error: error.message
      };
    }
  }

  // Tạo nội dung CSV
  generateCSVContent(userActions) {
    const headers = [
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
      const book = this.findBookById(parseInt(bookId));
      if (!book) return null;

      const viewedDate = actions.viewedAt ? new Date(actions.viewedAt).toLocaleString('vi-VN') : '';
      const purchasedDate = actions.purchasedAt ? new Date(actions.purchasedAt).toLocaleString('vi-VN') : '';
      const exportDate = new Date().toLocaleString('vi-VN');

      return [
        userInfo.id,
        userInfo.createdAt.toLocaleString('vi-VN'),
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
  }

  // Tìm sách theo ID
  findBookById(id) {
    // Import books data từ localStorage hoặc từ data
    try {
      const booksData = localStorage.getItem('books_data');
      if (booksData) {
        const books = JSON.parse(booksData);
        return books.find(book => book.id === id);
      }
    } catch (error) {
      console.error('Error parsing books data:', error);
    }
    
    // Fallback data
    const fallbackBooks = [
      { id: 1, title: "Các Công Cụ AI Dành Cho Giáo Viên", author: "NXB Đại Học Sư Phạm", category: "Công nghệ giáo dục", price: "150.000 VNĐ" },
      { id: 2, title: "Hướng Dẫn Giáo Viên Sử Dụng Các Công Cụ AI Trong Hoạt Động Dạy Học", author: "NXB Đại Học Sư Phạm", category: "Phương pháp giảng dạy", price: "180.000 VNĐ" },
      { id: 3, title: "Công Nghệ Phần Mềm", author: "NXB Đại Học Sư Phạm", category: "Công nghệ thông tin", price: "120.000 VNĐ" },
      { id: 4, title: "Bài Tập Thiết Kế Web", author: "NXB Đại Học Sư Phạm", category: "Thiết kế web", price: "95.000 VNĐ" },
      { id: 5, title: "Cấu Trúc Dữ Liệu", author: "NXB Đại Học Sư Phạm", category: "Lập trình", price: "110.000 VNĐ" },
      { id: 6, title: "Phương Pháp Luận Nghiên Cứu Khoa Học", author: "NXB Đại Học Sư Phạm", category: "Nghiên cứu khoa học", price: "140.000 VNĐ" },
      { id: 7, title: "Giáo Dục STEM Robotics Ở Trường Trung Học", author: "NXB Đại Học Sư Phạm", category: "Giáo dục STEM", price: "160.000 VNĐ" },
      { id: 8, title: "Hội Thảo Khoa Học Quốc Tế VNZ-TESOL Lần 3 Năm 2023", author: "NXB Đại Học Sư Phạm", category: "Giảng dạy tiếng Anh", price: "200.000 VNĐ" },
      { id: 9, title: "Lập Trình Python Cho Người Mới Bắt Đầu", author: "NXB Đại Học Sư Phạm", category: "Lập trình", price: "130.000 VNĐ" },
      { id: 10, title: "Thiết Kế Giao Diện Người Dùng (UI/UX)", author: "NXB Đại Học Sư Phạm", category: "Thiết kế", price: "170.000 VNĐ" },
      { id: 11, title: "Cơ Sở Dữ Liệu Và Hệ Quản Trị Cơ Sở Dữ Liệu", author: "NXB Đại Học Sư Phạm", category: "Cơ sở dữ liệu", price: "145.000 VNĐ" },
      { id: 12, title: "Phát Triển Ứng Dụng Di Động Với React Native", author: "NXB Đại Học Sư Phạm", category: "Phát triển ứng dụng", price: "190.000 VNĐ" }
    ];
    
    return fallbackBooks.find(book => book.id === id);
  }

  // Lấy danh sách Gist của user
  async getUserGists() {
    try {
      if (!this.isConfigured()) {
        throw new Error('GitHub service not configured.');
      }

      const credentials = this.getCredentials();

      const response = await fetch(`${this.API_BASE}/users/${credentials.username}/gists`, {
        headers: {
          'Authorization': `token ${credentials.token}`,
          'Accept': 'application/vnd.github.v3+json'
        }
      });

      if (!response.ok) {
        throw new Error(`GitHub API error: ${response.statusText}`);
      }

      const gists = await response.json();
      return gists.filter(gist => gist.description && gist.description.includes('User actions CSV'));

    } catch (error) {
      console.error('Error fetching user gists:', error);
      return [];
    }
  }
}

export default new GitHubService(); 