import { supabase, TABLES } from '../lib/supabase.js';

class DatabaseService {
  // ===== USERS =====
  
  // Tạo user mới
  async createUser(userData) {
    try {
      console.log('Creating user with data:', { ...userData, password: '***' });
      
      const { data, error } = await supabase
        .from(TABLES.USERS)
        .insert([{
          email: userData.email,
          name: userData.name,
          password_hash: userData.password,
          year_birth: userData.yearBirth,
          education: userData.education,
          marital_status: userData.maritalStatus,
          income: userData.income,
          kidhome: userData.kidhome,
          teenhome: userData.teenhome,
          created_at: new Date().toISOString(),
          is_active: true
        }])
        .select()
        .single();

      if (error) throw error;
      
      console.log('User created successfully:', data);
      return { success: true, user: data };
    } catch (error) {
      console.error('Error creating user:', error);
      return { success: false, error: error.message };
    }
  }

  // Lấy user theo email
  async getUserByEmail(email) {
    try {
      console.log('Getting user by email:', email);
      console.log('Tables:', TABLES);
      
      const { data, error } = await supabase
        .from(TABLES.USERS)
        .select('*')
        .eq('email', email)
        .eq('is_active', true)
        .single();

      console.log('Supabase response:', { data, error });

      if (error) throw error;
      
      // Log user data (ẩn password)
      if (data) {
        const { password_hash, ...userWithoutPassword } = data;
        console.log('User found:', { ...userWithoutPassword, password_hash: password_hash ? '***' : 'null' });
      }
      
      return { success: true, user: data };
    } catch (error) {
      console.error('Error in getUserByEmail:', error);
      return { success: false, error: error.message };
    }
  }

  // Cập nhật thông tin user
  async updateUser(userId, updates) {
    try {
      const { data, error } = await supabase
        .from(TABLES.USERS)
        .update(updates)
        .eq('id', userId)
        .select()
        .single();

      if (error) throw error;
      return { success: true, user: data };
    } catch (error) {
      console.error('Error updating user:', error);
      return { success: false, error: error.message };
    }
  }

  // Cập nhật password cho user
  async updateUserPassword(userId, newPassword) {
    try {
      console.log('Updating password for user:', userId);
      
      const { data, error } = await supabase
        .from(TABLES.USERS)
        .update({ password_hash: newPassword })
        .eq('id', userId)
        .select()
        .single();

      if (error) throw error;
      
      console.log('Password updated successfully');
      return { success: true, user: data };
    } catch (error) {
      console.error('Error updating password:', error);
      return { success: false, error: error.message };
    }
  }

  // Cập nhật thời gian đăng nhập cuối
  async updateLastLogin(userId) {
    return this.updateUser(userId, {
      last_login_at: new Date().toISOString()
    });
  }

  // ===== BOOKS =====
  
  // Lấy tất cả sách
  async getAllBooks() {
    try {
      const { data, error } = await supabase
        .from(TABLES.BOOKS)
        .select('*')
        .order('id', { ascending: true });

      if (error) throw error;
      return { success: true, books: data };
    } catch (error) {
      console.error('Error fetching books:', error);
      return { success: false, error: error.message };
    }
  }

  // Lấy sách theo ID
  async getBookById(bookId) {
    try {
      console.log('=== GET BOOK BY ID DEBUG START ===');
      console.log('Book ID requested:', bookId);
      console.log('Table name:', TABLES.BOOKS);
      
      const { data, error } = await supabase
        .from(TABLES.BOOKS)
        .select('*')
        .eq('id', bookId)
        .single();

      console.log('Supabase response:', { data, error });

      if (error) {
        console.error('Supabase error:', error);
        throw error;
      }
      
      if (!data) {
        console.error('No data returned from Supabase, trying local data...');
        // Fallback về local data
        const { books } = await import('../data/books.js');
        const localBook = books.find(b => b.id === bookId);
        
        if (localBook) {
          console.log('Found book in local data:', localBook);
          console.log('=== GET BOOK BY ID DEBUG END (LOCAL FALLBACK) ===');
          return { success: true, book: localBook };
        } else {
          throw new Error('Book not found in database or local data');
        }
      }
      
      console.log('Book data retrieved from database:', data);
      console.log('=== GET BOOK BY ID DEBUG END ===');
      return { success: true, book: data };
    } catch (error) {
      console.error('Error fetching book by ID:', error);
      console.log('=== GET BOOK BY ID DEBUG END WITH ERROR ===');
      return { success: false, error: error.message };
    }
  }

  // Lấy sách theo category
  async getBooksByCategory(category) {
    try {
      const { data, error } = await supabase
        .from(TABLES.BOOKS)
        .select('*')
        .eq('category', category)
        .order('id', { ascending: true });

      if (error) throw error;
      return { success: true, books: data };
    } catch (error) {
      console.error('Error fetching books by category:', error);
      return { success: false, error: error.message };
    }
  }

  // ===== USER ACTIONS =====
  
  // Lưu hành vi user
  async saveUserAction(actionData) {
    try {
      console.log('=== SAVE USER ACTION DEBUG START ===');
      console.log('Action data received:', actionData);
      
      // Lấy thông tin sách để có price, category_id, brand
      let book = null;
      
      // Thử lấy từ database trước
      const bookResult = await this.getBookById(actionData.bookId);
      console.log('Book result from database:', bookResult);
      
      if (bookResult.success) {
        book = bookResult.book;
        console.log('Book data from database:', book);
        console.log('Database book category_id:', book.category_id);
      }
      
      // Nếu database không có category_id, fallback về local data
      if (!book || book.category_id === null || book.category_id === undefined) {
        console.log('Database book missing category_id, falling back to local data...');
        const { books } = await import('../data/books.js');
        const localBook = books.find(b => b.id === actionData.bookId);
        
        if (localBook) {
          console.log('Found book in local data with category_id:', localBook);
          book = localBook;
        } else {
          throw new Error('Book not found in database or local data');
        }
      }
      
      // Chuẩn bị data để insert - chỉ sử dụng các cột có trong schema
      const actionDataToInsert = {
        event_type: actionData.actionType,
        product_id: actionData.bookId,
        category_id: book.category_id, // Bây giờ chắc chắn có giá trị
        price: book.price || 0,
        user_id: actionData.userId,
        user_session: actionData.sessionId,
        user_agent: navigator.userAgent,
        ip_address: null // Sẽ được set từ server
      };
      
      console.log('Data to insert:', actionDataToInsert);
      console.log('Table name:', TABLES.USER_ACTIONS);
      
      const { data, error } = await supabase
        .from(TABLES.USER_ACTIONS)
        .insert([actionDataToInsert])
        .select()
        .single();

      if (error) {
        console.error('Supabase insert error:', error);
        throw error;
      }
      
      console.log('Action saved successfully:', data);
      console.log('=== SAVE USER ACTION DEBUG END ===');
      return { success: true, action: data };
    } catch (error) {
      console.error('Error saving user action:', error);
      console.log('=== SAVE USER ACTION DEBUG END WITH ERROR ===');
      return { success: false, error: error.message };
    }
  }

  // Lấy hành vi của user
  async getUserActions(userId) {
    try {
      const { data, error } = await supabase
        .from(TABLES.USER_ACTIONS)
        .select(`
          *,
          books (
            id,
            title,
            author,
            category,
            price
          )
        `)
        .eq('user_id', userId)
        .order('action_timestamp', { ascending: false });

      if (error) throw error;
      return { success: true, actions: data };
    } catch (error) {
      console.error('Error fetching user actions:', error);
      return { success: false, error: error.message };
    }
  }

  // Lấy thống kê user
  async getUserStats(userId) {
    try {
      // Lấy tổng số hành vi
      const { count: totalActions, error: countError } = await supabase
        .from(TABLES.USER_ACTIONS)
        .select('*', { count: 'exact', head: true })
        .eq('user_id', userId);

      if (countError) throw countError;

      // Lấy số sách đã xem
      const { count: viewedBooks, error: viewedError } = await supabase
        .from(TABLES.USER_ACTIONS)
        .select('book_id', { count: 'exact', head: true })
        .eq('user_id', userId)
        .eq('action_type', 'view');

      if (viewedError) throw viewedError;

      // Lấy số sách đã mua
      const { count: purchasedBooks, error: purchasedError } = await supabase
        .from(TABLES.USER_ACTIONS)
        .select('book_id', { count: 'exact', head: true })
        .eq('user_id', userId)
        .eq('action_type', 'purchase');

      if (purchasedError) throw purchasedError;

      // Lấy hành vi đầu tiên và cuối cùng
      const { data: firstAction, error: firstError } = await supabase
        .from(TABLES.USER_ACTIONS)
        .select('action_timestamp')
        .eq('user_id', userId)
        .order('action_timestamp', { ascending: true })
        .limit(1)
        .single();

      if (firstError && firstError.code !== 'PGRST116') throw firstError;

      const { data: lastAction, error: lastError } = await supabase
        .from(TABLES.USER_ACTIONS)
        .select('action_timestamp')
        .eq('user_id', userId)
        .order('action_timestamp', { ascending: false })
        .limit(1)
        .single();

      if (lastError && lastError.code !== 'PGRST116') throw lastError;

      return {
        success: true,
        stats: {
          totalActions: totalActions || 0,
          viewedBooks: viewedBooks || 0,
          purchasedBooks: purchasedBooks || 0,
          firstAction: firstAction?.action_timestamp || null,
          lastAction: lastAction?.action_timestamp || null
        }
      };
    } catch (error) {
      console.error('Error fetching user stats:', error);
      return { success: false, error: error.message };
    }
  }

  // Lấy tất cả hành vi (cho admin)
  async getAllUserActions(limit = 1000) {
    try {
      const { data, error } = await supabase
        .from(TABLES.USER_ACTIONS)
        .select(`
          *,
          users (
            id,
            name,
            email
          ),
          books (
            id,
            title,
            author,
            category
          )
        `)
        .order('action_timestamp', { ascending: false })
        .limit(limit);

      if (error) throw error;
      return { success: true, actions: data };
    } catch (error) {
      console.error('Error fetching all user actions:', error);
      return { success: false, error: error.message };
    }
  }

  // ===== SEARCH =====
  
  // Tìm kiếm sách
  async searchBooks(query) {
    try {
      const { data, error } = await supabase
        .from(TABLES.BOOKS)
        .select('*')
        .or(`title.ilike.%${query}%,author.ilike.%${query}%,category.ilike.%${query}%`)
        .order('id', { ascending: true });

      if (error) throw error;
      return { success: true, books: data };
    } catch (error) {
      console.error('Error searching books:', error);
      return { success: false, error: error.message };
    }
  }
}

export default new DatabaseService(); 