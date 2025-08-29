# 🚀 Hướng dẫn Setup Supabase

## 📋 Bước 1: Tạo Supabase Project

1. Truy cập [https://supabase.com](https://supabase.com)
2. Click "Start your project" hoặc "Sign Up"
3. Đăng nhập bằng GitHub hoặc tạo tài khoản mới
4. Click "New Project"
5. Chọn organization (hoặc tạo mới)
6. Đặt tên project: `tuan-danhsachsach`
7. Chọn database password (nhớ lưu lại!)
8. Chọn region gần nhất (Singapore hoặc Tokyo)
9. Click "Create new project"

## 🗄️ Bước 2: Tạo Database Schema

### 2.1. Mở SQL Editor
- Trong Supabase Dashboard, click "SQL Editor" ở sidebar
- Click "New query"

### 2.2. Tạo bảng Users
```sql
-- Tạo bảng users
CREATE TABLE IF NOT EXISTS users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email VARCHAR(255) UNIQUE NOT NULL,
  name VARCHAR(255) NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  last_login_at TIMESTAMP WITH TIME ZONE,
  is_active BOOLEAN DEFAULT true
);

-- Tạo index cho email
CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);
```

### 2.3. Tạo bảng Categories
```sql
-- Tạo bảng categories
CREATE TABLE IF NOT EXISTS categories (
  id SERIAL PRIMARY KEY,
  code VARCHAR(100) UNIQUE NOT NULL,
  name VARCHAR(255) NOT NULL,
  description TEXT
);

-- Insert categories mẫu
INSERT INTO categories (code, name, description) VALUES
('ai_education', 'Công nghệ giáo dục', 'Sách về AI trong giáo dục'),
('teaching_methods', 'Phương pháp giảng dạy', 'Phương pháp và kỹ thuật giảng dạy'),
('software_tech', 'Công nghệ thông tin', 'Công nghệ phần mềm và hệ thống'),
('web_design', 'Thiết kế web', 'Thiết kế và phát triển web'),
('programming', 'Lập trình', 'Sách về lập trình và thuật toán'),
('research_methods', 'Nghiên cứu khoa học', 'Phương pháp nghiên cứu'),
('stem_education', 'Giáo dục STEM', 'Giáo dục STEM và Robotics'),
('english_teaching', 'Giảng dạy tiếng Anh', 'Phương pháp dạy tiếng Anh'),
('python_programming', 'Lập trình Python', 'Học Python từ cơ bản'),
('ui_ux_design', 'Thiết kế UI/UX', 'Thiết kế giao diện người dùng'),
('database_systems', 'Cơ sở dữ liệu', 'Hệ thống cơ sở dữ liệu'),
('mobile_development', 'Phát triển ứng dụng', 'Phát triển ứng dụng di động')
ON CONFLICT (code) DO NOTHING;
```

### 2.4. Tạo bảng Books (Products)
```sql
-- Tạo bảng books (products)
CREATE TABLE IF NOT EXISTS books (
  id SERIAL PRIMARY KEY,
  title VARCHAR(500) NOT NULL,
  author VARCHAR(255) NOT NULL,
  category_id INTEGER REFERENCES categories(id),
  description TEXT,
  price DECIMAL(10,2) NOT NULL,
  image_url TEXT,
  publish_year INTEGER,
  pages INTEGER,
  isbn VARCHAR(20),
  brand VARCHAR(100) DEFAULT 'nxb_dai_hoc_su_pham'
);

-- Tạo index cho category_id
CREATE INDEX IF NOT EXISTS idx_books_category_id ON books(category_id);
```

### 2.5. Tạo bảng User Actions (E-commerce Events)
```sql
-- Tạo bảng user_actions (e-commerce events)
CREATE TABLE IF NOT EXISTS user_actions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  
  -- Event information
  event_time TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  event_type VARCHAR(50) NOT NULL CHECK (event_type IN ('view', 'cart', 'remove_from_cart', 'purchase')),
  
  -- Product information
  product_id INTEGER REFERENCES books(id) ON DELETE CASCADE,
  category_id INTEGER REFERENCES categories(id),
  category_code VARCHAR(100),
  brand VARCHAR(100),
  price DECIMAL(10,2),
  
  -- User information
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  user_session VARCHAR(100) NOT NULL,
  
  -- Additional metadata
  user_agent TEXT,
  ip_address INET,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tạo indexes cho performance
CREATE INDEX IF NOT EXISTS idx_user_actions_event_time ON user_actions(event_time);
CREATE INDEX IF NOT EXISTS idx_user_actions_event_type ON user_actions(event_type);
CREATE INDEX IF NOT EXISTS idx_user_actions_user_id ON user_actions(user_id);
CREATE INDEX IF NOT EXISTS idx_user_actions_product_id ON user_actions(product_id);
CREATE INDEX IF NOT EXISTS idx_user_actions_category_id ON user_actions(category_id);
CREATE INDEX IF NOT EXISTS idx_user_actions_user_session ON user_actions(user_session);
```

### 2.6. Insert dữ liệu sách mẫu
```sql
-- Insert 12 cuốn sách mẫu với category_id và price
INSERT INTO books (title, author, category_id, description, price, image_url, publish_year, pages, isbn) VALUES
('Các Công Cụ AI Dành Cho Giáo Viên', 'NXB Đại Học Sư Phạm', 
 (SELECT id FROM categories WHERE code = 'ai_education'), 
 'Cuốn sách giới thiệu các công cụ AI hiện đại giúp giáo viên nâng cao hiệu quả giảng dạy và quản lý lớp học.', 
 150000.00, 'https://via.placeholder.com/300x400/4F46E5/FFFFFF?text=AI+Tools', 2024, 280, '978-604-123-456-7'),

('Hướng Dẫn Giáo Viên Sử Dụng Các Công Cụ AI Trong Hoạt Động Dạy Học', 'NXB Đại Học Sư Phạm', 
 (SELECT id FROM categories WHERE code = 'teaching_methods'), 
 'Hướng dẫn chi tiết cách tích hợp AI vào quy trình giảng dạy, từ lập kế hoạch đến đánh giá kết quả học tập.', 
 180000.00, 'https://via.placeholder.com/300x400/10B981/FFFFFF?text=AI+Teaching', 2024, 320, '978-604-123-456-8'),

('Công Nghệ Phần Mềm', 'NXB Đại Học Sư Phạm', 
 (SELECT id FROM categories WHERE code = 'software_tech'), 
 'Cung cấp kiến thức cơ bản về quy trình phát triển phần mềm, từ phân tích yêu cầu đến triển khai và bảo trì.', 
 120000.00, 'https://via.placeholder.com/300x400/F59E0B/FFFFFF?text=Software', 2024, 250, '978-604-123-456-9'),

('Bài Tập Thiết Kế Web', 'NXB Đại Học Sư Phạm', 
 (SELECT id FROM categories WHERE code = 'web_design'), 
 'Bộ sưu tập bài tập thực hành thiết kế web responsive, sử dụng HTML5, CSS3 và JavaScript hiện đại.', 
 95000.00, 'https://via.placeholder.com/300x400/EF4444/FFFFFF?text=Web+Design', 2024, 200, '978-604-123-456-0'),

('Cấu Trúc Dữ Liệu', 'NXB Đại Học Sư Phạm', 
 (SELECT id FROM categories WHERE code = 'programming'), 
 'Giới thiệu các cấu trúc dữ liệu cơ bản và nâng cao, thuật toán xử lý và ứng dụng trong thực tế.', 
 110000.00, 'https://via.placeholder.com/300x400/8B5CF6/FFFFFF?text=Data+Structures', 2024, 280, '978-604-123-456-1'),

('Phương Pháp Luận Nghiên Cứu Khoa Học', 'NXB Đại Học Sư Phạm', 
 (SELECT id FROM categories WHERE code = 'research_methods'), 
 'Hướng dẫn phương pháp nghiên cứu khoa học, từ xác định vấn đề đến viết báo cáo và công bố kết quả.', 
 140000.00, 'https://via.placeholder.com/300x400/06B6D4/FFFFFF?text=Research', 2024, 300, '978-604-123-456-2'),

('Giáo Dục STEM Robotics Ở Trường Trung Học', 'NXB Đại Học Sư Phạm', 
 (SELECT id FROM categories WHERE code = 'stem_education'), 
 'Tài liệu giảng dạy STEM Robotics, tích hợp khoa học, công nghệ, kỹ thuật và toán học.', 
 160000.00, 'https://via.placeholder.com/300x400/84CC16/FFFFFF?text=STEM+Robotics', 2024, 350, '978-604-123-456-3'),

('Hội Thảo Khoa Học Quốc Tế VNZ-TESOL Lần 3 Năm 2023', 'NXB Đại Học Sư Phạm', 
 (SELECT id FROM categories WHERE code = 'english_teaching'), 
 'Kỷ yếu hội thảo quốc tế về giảng dạy tiếng Anh, chia sẻ kinh nghiệm và phương pháp mới.', 
 200000.00, 'https://via.placeholder.com/300x400/F97316/FFFFFF?text=TESOL', 2024, 400, '978-604-123-456-4'),

('Lập Trình Python Cho Người Mới Bắt Đầu', 'NXB Đại Học Sư Phạm', 
 (SELECT id FROM categories WHERE code = 'python_programming'), 
 'Sách học Python từ cơ bản đến nâng cao, với nhiều ví dụ thực tế và bài tập thực hành.', 
 130000.00, 'https://via.placeholder.com/300x400/14B8A6/FFFFFF?text=Python', 2024, 300, '978-604-123-456-5'),

('Thiết Kế Giao Diện Người Dùng (UI/UX)', 'NXB Đại Học Sư Phạm', 
 (SELECT id FROM categories WHERE code = 'ui_ux_design'), 
 'Nguyên tắc thiết kế UI/UX, quy trình thiết kế và công cụ hỗ trợ thiết kế hiện đại.', 
 170000.00, 'https://via.placeholder.com/300x400/EC4899/FFFFFF?text=UI+UX', 2024, 320, '978-604-123-456-6'),

('Cơ Sở Dữ Liệu Và Hệ Quản Trị Cơ Sở Dữ Liệu', 'NXB Đại Học Sư Phạm', 
 (SELECT id FROM categories WHERE code = 'database_systems'), 
 'Kiến thức về thiết kế cơ sở dữ liệu, SQL và quản trị hệ thống cơ sở dữ liệu.', 
 145000.00, 'https://via.placeholder.com/300x400/6366F1/FFFFFF?text=Database', 2024, 280, '978-604-123-456-7'),

('Phát Triển Ứng Dụng Di Động Với React Native', 'NXB Đại Học Sư Phạm', 
 (SELECT id FROM categories WHERE code = 'mobile_development'), 
 'Hướng dẫn phát triển ứng dụng di động cross-platform sử dụng React Native.', 
 190000.00, 'https://via.placeholder.com/300x400/A855F7/FFFFFF?text=React+Native', 2024, 380, '978-604-123-456-8')
ON CONFLICT (id) DO NOTHING;
```

### 2.7. Tạo View để export CSV dễ dàng
```sql
-- Tạo view để export CSV với đầy đủ thông tin
CREATE OR REPLACE VIEW user_actions_export AS
SELECT 
  ua.id,
  ua.event_time,
  ua.event_type,
  ua.product_id,
  b.title as product_name,
  ua.category_id,
  c.code as category_code,
  c.name as category_name,
  ua.brand,
  ua.price,
  ua.user_id,
  u.name as user_name,
  u.email as user_email,
  ua.user_session,
  ua.user_agent,
  ua.created_at
FROM user_actions ua
LEFT JOIN books b ON ua.product_id = b.id
LEFT JOIN categories c ON ua.category_id = c.id
LEFT JOIN users u ON ua.user_id = u.id
ORDER BY ua.event_time DESC;
```

## 🔑 Bước 3: Lấy API Keys

### 3.1. Vào Settings > API
- Trong Supabase Dashboard, click "Settings" ở sidebar
- Click "API"

### 3.2. Copy thông tin
- **Project URL**: Copy `Project URL`
- **anon public**: Copy `anon public` key

## ⚙️ Bước 4: Cấu hình Environment Variables

### 4.1. Tạo file .env
```bash
# Trong thư mục gốc của dự án
touch .env
```

### 4.2. Thêm vào file .env
```bash
VITE_SUPABASE_URL=https://your-project-id.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key-here
```

**Thay thế:**
- `your-project-id` bằng Project ID thực
- `your-anon-key-here` bằng anon key thực

## 🚀 Bước 5: Test kết nối

### 5.1. Khởi động ứng dụng
```bash
npm run dev
```

### 5.2. Kiểm tra console
- Mở Developer Tools (F12)
- Xem console có thông báo "Supabase connected successfully!" không

### 5.3. Test đăng ký/đăng nhập
- Vào trang đăng ký
- Tạo tài khoản mới
- Kiểm tra dữ liệu trong Supabase Dashboard > Table Editor > users

## 📊 Bước 6: Xem dữ liệu trong Supabase

### 6.1. Table Editor
- Vào "Table Editor" trong sidebar
- Xem các bảng: `users`, `categories`, `books`, `user_actions`

### 6.2. SQL Editor - Export CSV
```sql
-- Export toàn bộ user actions ra CSV format
SELECT 
  ua.user_id,
  ua.user_session,
  ua.product_id,
  ua.price,
  b.title as product_name,
  ua.event_time,
  ua.event_type,
  ua.category_id,
  c.code as category_code,
  ua.brand
FROM user_actions ua
LEFT JOIN books b ON ua.product_id = b.id
LEFT JOIN categories c ON ua.category_id = c.id
ORDER BY ua.event_time DESC;

-- Thống kê theo event type
SELECT 
  event_type,
  COUNT(*) as count,
  ROUND(COUNT(*) * 100.0 / (SELECT COUNT(*) FROM user_actions), 2) as percentage
FROM user_actions
GROUP BY event_type
ORDER BY count DESC;

-- Thống kê theo user
SELECT 
  u.name,
  u.email,
  COUNT(CASE WHEN ua.event_type = 'view' THEN 1 END) as views,
  COUNT(CASE WHEN ua.event_type = 'cart' THEN 1 END) as cart_adds,
  COUNT(CASE WHEN ua.event_type = 'purchase' THEN 1 END) as purchases,
  COUNT(*) as total_actions
FROM users u
LEFT JOIN user_actions ua ON u.id = ua.user_id
GROUP BY u.id, u.name, u.email
ORDER BY total_actions DESC;
```

## 🔒 Bước 7: Cấu hình Row Level Security (RLs)

### 7.1. Bật RLS cho bảng users
```sql
ALTER TABLE users ENABLE ROW LEVEL SECURITY;

-- Policy: Users chỉ có thể xem thông tin của chính mình
CREATE POLICY "Users can view own profile" ON users
  FOR SELECT USING (auth.uid() = id);

-- Policy: Users chỉ có thể cập nhật thông tin của chính mình
CREATE POLICY "Users can update own profile" ON users
  FOR UPDATE USING (auth.uid() = id);
```

### 7.2. Bật RLS cho bảng user_actions
```sql
ALTER TABLE user_actions ENABLE ROW LEVEL SECURITY;

-- Policy: Users chỉ có thể xem hành vi của chính mình
CREATE POLICY "Users can view own actions" ON user_actions
  FOR SELECT USING (auth.uid() = user_id);

-- Policy: Users chỉ có thể tạo hành vi cho chính mình
CREATE POLICY "Users can insert own actions" ON user_actions
  FOR INSERT WITH CHECK (auth.uid() = user_id);
```

## 🎯 Bước 8: Monitoring và Analytics

### 8.1. Dashboard
- Vào "Dashboard" để xem thống kê tổng quan
- Xem số lượng users, actions, books

### 8.2. Logs
- Vào "Logs" để xem các API calls
- Debug nếu có lỗi

## 🆘 Troubleshooting

### Lỗi thường gặp:
1. **"Invalid API key"**: Kiểm tra lại anon key
2. **"Table does not exist"**: Chạy lại SQL để tạo bảng
3. **"Connection failed"**: Kiểm tra internet và URL

### Liên hệ hỗ trợ:
- Supabase Discord: [https://discord.supabase.com](https://discord.supabase.com)
- Documentation: [https://supabase.com/docs](https://supabase.com/docs)

---

## 🎉 Hoàn thành!

Bây giờ ứng dụng của bạn đã có cấu trúc database giống như **Kaggle E-commerce Dataset**!

**Dữ liệu sẽ được lưu:**
- ✅ Users đăng ký/đăng nhập
- ✅ Categories sách chi tiết
- ✅ Books với thông tin đầy đủ
- ✅ User actions với event types: view, cart, remove_from_cart, purchase
- ✅ Session tracking
- ✅ Price tracking
- ✅ Category tracking
- ✅ Brand tracking

**CSV Export sẽ có:**
- ✅ User ID
- ✅ User Session
- ✅ Product ID
- ✅ Product Price
- ✅ Product Details
- ✅ Event Time
- ✅ Event Type
- ✅ Category ID & Code
- ✅ Brand

**Ước tính chi phí 2 tuần:**
- **Storage**: ~10-50MB (Miễn phí)
- **API calls**: ~10,000 calls (Miễn phí)
- **Users**: ~100-500 (Miễn phí)
- **Tổng**: **Hoàn toàn miễn phí!** 🎯 