import { createClient } from '@supabase/supabase-js';

// Supabase configuration
// Bạn cần thay thế bằng URL và API key thực từ Supabase dashboard
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'YOUR_SUPABASE_URL';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'YOUR_SUPABASE_ANON_KEY';

// Tạo Supabase client
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Kiểm tra kết nối
export const checkSupabaseConnection = async () => {
  try {
    console.log('Checking Supabase connection...');
    console.log('Supabase URL:', supabaseUrl);
    console.log('Supabase Key:', supabaseAnonKey ? '***' + supabaseAnonKey.slice(-4) : 'NOT SET');
    
    const { data, error } = await supabase.from('books').select('count').limit(1);
    if (error) {
      console.error('Supabase connection error:', error);
      return false;
    }
    console.log('Supabase connected successfully!');
    return true;
  } catch (error) {
    console.error('Supabase connection failed:', error);
    return false;
  }
};

// Database tables
export const TABLES = {
  USERS: 'users',
  BOOKS: 'books',
  USER_ACTIONS: 'user_actions'
}; 