-- Cập nhật bảng users để thêm các trường thông tin chi tiết cần thiết
-- Chạy lệnh này trên Supabase SQL Editor

-- Thêm các cột mới vào bảng users
ALTER TABLE users 
ADD COLUMN IF NOT EXISTS year_birth INTEGER,
ADD COLUMN IF NOT EXISTS education VARCHAR(50),
ADD COLUMN IF NOT EXISTS marital_status VARCHAR(30),
ADD COLUMN IF NOT EXISTS income DECIMAL(12,2),
ADD COLUMN IF NOT EXISTS kidhome INTEGER DEFAULT 0,
ADD COLUMN IF NOT EXISTS teenhome INTEGER DEFAULT 0;

-- Tạo index cho các trường thường query
CREATE INDEX IF NOT EXISTS idx_users_education ON users(education);
CREATE INDEX IF NOT EXISTS idx_users_marital_status ON users(marital_status);
CREATE INDEX IF NOT EXISTS idx_users_income ON users(income);
CREATE INDEX IF NOT EXISTS idx_users_year_birth ON users(year_birth);

-- Thêm constraints
ALTER TABLE users 
ADD CONSTRAINT check_year_birth CHECK (year_birth >= 1900 AND year_birth <= EXTRACT(YEAR FROM NOW())),
ADD CONSTRAINT check_income CHECK (income >= 0),
ADD CONSTRAINT check_kidhome CHECK (kidhome >= 0),
ADD CONSTRAINT check_teenhome CHECK (teenhome >= 0),
ADD CONSTRAINT check_education CHECK (education IN ('Basic', 'Graduation', 'Master', 'PhD', '2n Cycle')),
ADD CONSTRAINT check_marital_status CHECK (marital_status IN ('Single', 'Married', 'Divorced', 'Widow', 'YOLO'));

-- Tạo view để dễ dàng query thông tin user
CREATE OR REPLACE VIEW user_profile_view AS
SELECT 
    id,
    email,
    name,
    year_birth,
    education,
    marital_status,
    income,
    kidhome,
    teenhome,
    created_at
FROM users;

-- Thông báo hoàn thành
SELECT 'Database schema updated successfully!' AS status;
