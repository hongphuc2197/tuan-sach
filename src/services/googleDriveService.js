// Google Drive API service
// Lưu ý: Cần setup Google Cloud Project và OAuth 2.0

class GoogleDriveService {
  constructor() {
    this.API_KEY = import.meta.env.VITE_GOOGLE_API_KEY;
    this.CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID;
    this.SCOPES = ['https://www.googleapis.com/auth/drive.file'];
    this.discoveryDocs = ['https://www.googleapis.com/discovery/v1/apis/drive/v3/rest'];
    this.tokenClient = null;
    this.gapiInited = false;
    this.gisInited = false;
  }

  // Khởi tạo Google API
  async init() {
    try {
      // Load Google API
      await this.loadGoogleAPI();
      await this.loadGoogleIdentityServices();
      
      this.gapiInited = true;
      this.gisInited = true;
      
      return true;
    } catch (error) {
      console.error('Error initializing Google Drive service:', error);
      return false;
    }
  }

  // Load Google API
  loadGoogleAPI() {
    return new Promise((resolve, reject) => {
      if (window.gapi) {
        resolve();
        return;
      }

      const script = document.createElement('script');
      script.src = 'https://apis.google.com/js/api.js';
      script.onload = () => {
        window.gapi.load('client', async () => {
          try {
            await window.gapi.client.init({
              apiKey: this.API_KEY,
              discoveryDocs: this.discoveryDocs,
            });
            resolve();
          } catch (error) {
            reject(error);
          }
        });
      };
      script.onerror = reject;
      document.head.appendChild(script);
    });
  }

  // Load Google Identity Services
  loadGoogleIdentityServices() {
    return new Promise((resolve, reject) => {
      if (window.google) {
        this.tokenClient = window.google.accounts.oauth2.initTokenClient({
          client_id: this.CLIENT_ID,
          scope: this.SCOPES.join(' '),
          callback: (tokenResponse) => {
            if (tokenResponse.error) {
              reject(new Error(tokenResponse.error));
            } else {
              resolve(tokenResponse);
            }
          },
        });
        resolve();
        return;
      }

      const script = document.createElement('script');
      script.src = 'https://accounts.google.com/gsi/client';
      script.onload = () => {
        this.tokenClient = window.google.accounts.oauth2.initTokenClient({
          client_id: this.CLIENT_ID,
          scope: this.SCOPES.join(' '),
          callback: (tokenResponse) => {
            if (tokenResponse.error) {
              reject(new Error(tokenResponse.error));
            } else {
              resolve(tokenResponse);
            }
          },
        });
        resolve();
      };
      script.onerror = reject;
      document.head.appendChild(script);
    });
  }

  // Lấy access token
  async getAccessToken() {
    if (!this.tokenClient) {
      throw new Error('Google Identity Services not initialized');
    }

    return new Promise((resolve, reject) => {
      this.tokenClient.requestAccessToken({ prompt: 'consent' });
      
      // Set callback
      this.tokenClient.callback = (response) => {
        if (response.error) {
          reject(new Error(response.error));
        } else {
          resolve(response.access_token);
        }
      };
    });
  }

  // Upload file lên Google Drive
  async uploadFile(fileName, fileContent, mimeType = 'text/csv') {
    try {
      if (!this.gapiInited || !this.gisInited) {
        await this.init();
      }

      const accessToken = await this.getAccessToken();
      
      // Tạo metadata cho file
      const metadata = {
        name: fileName,
        mimeType: mimeType,
        parents: ['root'] // Upload vào root folder
      };

      // Tạo file
      const file = await window.gapi.client.drive.files.create({
        resource: metadata,
        media: {
          mimeType: mimeType,
          body: fileContent
        }
      });

      return {
        success: true,
        fileId: file.result.id,
        fileName: file.result.name,
        webViewLink: file.result.webViewLink
      };

    } catch (error) {
      console.error('Error uploading to Google Drive:', error);
      return {
        success: false,
        error: error.message
      };
    }
  }

  // Tạo file CSV và upload
  async uploadUserActionsCSV(userActions, fileName = null) {
    try {
      const csvContent = this.generateCSVContent(userActions);
      const finalFileName = fileName || `user_actions_${new Date().toISOString().split('T')[0]}.csv`;
      
      const result = await this.uploadFile(finalFileName, csvContent);
      
      if (result.success) {
        return {
          success: true,
          message: 'File uploaded successfully to Google Drive',
          fileId: result.fileId,
          fileName: result.fileName,
          webViewLink: result.webViewLink
        };
      } else {
        throw new Error(result.error);
      }
      
    } catch (error) {
      console.error('Error uploading CSV:', error);
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
    // Import books data
    const books = [
      { id: 1, title: "Các Công Cụ AI Dành Cho Giáo Viên", author: "NXB Đại Học Sư Phạm", category: "Công nghệ giáo dục", price: "150.000 VNĐ" },
      { id: 2, title: "Hướng Dẫn Giáo Viên Sử Dụng Các Công Cụ AI Trong Hoạt Động Dạy Học", author: "NXB Đại Học Sư Phạm", category: "Phương pháp giảng dạy", price: "180.000 VNĐ" },
      // ... thêm các sách khác
    ];
    
    return books.find(book => book.id === id);
  }
}

export default new GoogleDriveService(); 