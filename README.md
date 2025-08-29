# Ứng Dụng Quản Lý Sách - NXB Đại Học Sư Phạm

## Mô tả

Đây là một ứng dụng web frontend hiện đại được xây dựng bằng React để quản lý và hiển thị danh sách sách của NXB Đại Học Sư Phạm. Ứng dụng có giao diện đẹp mắt, responsive và các chức năng cơ bản như đăng nhập/đăng xuất, tìm kiếm sách, lọc theo danh mục.

## Tính năng chính

- 🏠 **Trang chủ**: Hero section, thống kê, sách nổi bật
- 📚 **Danh sách sách**: Hiển thị 12 cuốn sách với thông tin chi tiết
- 🔍 **Tìm kiếm và lọc**: Tìm kiếm theo tên, tác giả, mô tả và lọc theo danh mục
- 📖 **Trang chi tiết sách**: Thông tin đầy đủ với nút purchase
- 🛒 **Hành động người dùng**: Lưu trữ view và purchase sách với timestamp
- 📊 **Thống kê cá nhân**: Theo dõi sách đã xem và mua
- 📁 **Export CSV**: Tải xuống dữ liệu dưới dạng CSV
- ☁️ **Lưu trữ online**: Upload CSV lên GitHub Gist để lưu trữ online
- 👤 **Quản lý người dùng**: Đăng nhập/đăng xuất với localStorage
- 📱 **Responsive design**: Tương thích với mọi thiết bị
- 🎨 **Giao diện hiện đại**: Sử dụng Tailwind CSS và Lucide React icons

## Danh sách sách

Ứng dụng bao gồm 12 cuốn sách đa dạng về chủ đề:

1. Các Công Cụ AI Dành Cho Giáo Viên
2. Hướng Dẫn Giáo Viên Sử Dụng Các Công Cụ AI Trong Hoạt Động Dạy Học
3. Công Nghệ Phần Mềm
4. Bài Tập Thiết Kế Web
5. Cấu Trúc Dữ Liệu
6. Phương Pháp Luận Nghiên Cứu Khoa Học
7. Giáo Dục STEM Robotics Ở Trường Trung Học
8. Hội Thảo Khoa Học Quốc Tế VNZ-TESOL Lần 3 Năm 2023
9. Lập Trình Python Cho Người Mới Bắt Đầu
10. Thiết Kế Giao Diện Người Dùng (UI/UX)
11. Cơ Sở Dữ Liệu Và Hệ Quản Trị Cơ Sở Dữ Liệu
12. Phát Triển Ứng Dụng Di Động Với React Native

## Công nghệ sử dụng

- **Frontend Framework**: React 18
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **Routing**: React Router DOM
- **Icons**: Lucide React
- **State Management**: React Context API
- **Database**: Supabase (PostgreSQL)
- **Authentication**: Supabase Auth

## Cài đặt và chạy

### Yêu cầu hệ thống
- Node.js (phiên bản 16 trở lên)
- npm hoặc yarn
- Tài khoản Supabase (miễn phí)

### Cài đặt dependencies
```bash
npm install
```

### Cấu hình Supabase
1. Tạo project tại [https://supabase.com](https://supabase.com)
2. Chạy SQL schema trong `SUPABASE_SETUP.md`
3. Tạo file `.env` với API keys:
```bash
VITE_SUPABASE_URL=https://your-project-id.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key-here
```

### Chạy ứng dụng ở môi trường development
```bash
npm run dev
```

Ứng dụng sẽ chạy tại `http://localhost:5173`

### Build ứng dụng cho production
```bash
npm run build
```

### Preview build production
```bash
npm run preview
```

## Cấu trúc thư mục

```
src/
├── components/          # Các component tái sử dụng
│   ├── Header.jsx      # Header với navigation và login
│   ├── Footer.jsx      # Footer với thông tin liên hệ
│   └── BookCard.jsx    # Component hiển thị thông tin sách
├── pages/              # Các trang của ứng dụng
│   ├── Home.jsx        # Trang chủ
│   ├── Books.jsx       # Trang danh sách sách
│   ├── BookDetail.jsx  # Trang chi tiết sách
│   ├── UserStats.jsx   # Trang thống kê cá nhân
│   ├── About.jsx       # Trang giới thiệu
│   └── Contact.jsx     # Trang liên hệ
├── hooks/              # Custom hooks
│   ├── useAuth.js      # Hook quản lý authentication
│   └── useUserActions.js # Hook quản lý user actions
├── data/               # Dữ liệu tĩnh
│   └── books.js        # Dữ liệu sách và danh mục
├── App.jsx             # Component chính với routing
├── main.jsx            # Entry point
└── index.css           # CSS chính với Tailwind
```

## Chức năng chi tiết

### Authentication & User Actions
- Đăng nhập với email và mật khẩu (giả lập)
- Lưu trạng thái đăng nhập trong localStorage
- Đăng xuất và xóa thông tin người dùng
- Lưu trữ hành động view sách
- Lưu trữ hành động purchase sách
- Thống kê cá nhân về sách đã xem và mua

### Quản lý sách
- Hiển thị danh sách sách với thông tin chi tiết
- Tìm kiếm theo tên, tác giả, mô tả
- Lọc theo danh mục (12 danh mục khác nhau)
- Chuyển đổi giữa chế độ xem grid và list
- Trang chi tiết sách với thông tin đầy đủ
- Nút purchase để mua sách

### Giao diện
- Responsive design cho mọi kích thước màn hình
- Dark/light theme với Tailwind CSS
- Smooth transitions và hover effects
- Mobile-first approach

## Tùy chỉnh

### Thêm sách mới
Chỉnh sửa file `src/data/books.js` để thêm sách mới:

```javascript
{
  id: 13,
  title: "Tên sách mới",
  author: "Tác giả",
  category: "Danh mục",
  description: "Mô tả sách",
  image: "URL hình ảnh",
  price: "Giá",
  publishYear: 2024,
  pages: 300,
  isbn: "ISBN"
}
```

### Thay đổi giao diện
- Chỉnh sửa các component trong thư mục `components/`
- Thay đổi styling bằng cách chỉnh sửa Tailwind classes
- Tùy chỉnh theme trong `tailwind.config.js`

### Cấu hình GitHub để lưu trữ CSV online

Để sử dụng tính năng upload CSV lên GitHub Gist:

1. **Tạo Personal Access Token:**
   - Vào GitHub → Settings → Developer settings → Personal access tokens → Tokens (classic)
   - Click "Generate new token (classic)"
   - Đặt tên token (ví dụ: "CSV Export")
   - Chọn quyền: `gist`
   - Click "Generate token"
   - Copy token và lưu lại

2. **Cấu hình (Chọn 1 trong 2 cách):**

   **Cách 1: Biến môi trường (Khuyến nghị)**
   - Tạo file `.env` trong thư mục gốc của dự án
   - Thêm các dòng sau:
   ```bash
   VITE_GITHUB_TOKEN=your_github_personal_access_token_here
   VITE_GITHUB_USERNAME=your_github_username_here
   ```
   - Khởi động lại ứng dụng

   **Cách 2: Cấu hình trong ứng dụng**
   - Vào trang "Thống kê"
   - Click "Upload lên GitHub"
   - Nhập GitHub username và Personal Access Token
   - Click "Lưu cấu hình"

3. **Sử dụng:**
   - Click "Upload lên GitHub" để lưu trữ CSV online
   - File sẽ được lưu trong GitHub Gist (private)
   - Có thể truy cập file từ bất kỳ đâu

### Cấu hình Google Drive (Tùy chọn)

Nếu muốn sử dụng Google Drive thay vì GitHub:

1. Tạo Google Cloud Project
2. Enable Google Drive API
3. Tạo OAuth 2.0 credentials
4. Cấu hình trong file `.env`:

```bash
VITE_GOOGLE_API_KEY=your_api_key
VITE_GOOGLE_CLIENT_ID=your_client_id
```

## Đóng góp

1. Fork repository
2. Tạo feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Mở Pull Request

## License

Dự án này được phát hành dưới MIT License.

## Liên hệ

- **Email**: info@nxbsp.edu.vn
- **Điện thoại**: +84 28 3835 2020
- **Địa chỉ**: 280 An Dương Vương, Phường 4, Quận 5, TP.HCM

---

**Lưu ý**: Đây là ứng dụng demo với chức năng đăng nhập giả lập. Trong môi trường production, cần tích hợp với backend thực tế và hệ thống authentication bảo mật.
