import { useState, useEffect } from 'react';
import databaseService from '../services/databaseService.js';

export const useUserActions = (bookId) => {
  const [actions, setActions] = useState({
    viewed: false,
    purchased: false,
    viewedAt: null,
    purchasedAt: null
  });

  // Không cần useEffect để load từ localStorage nữa
  // Chỉ lưu vào database

  const markAsViewed = async () => {
    try {
      console.log('=== MARK AS VIEWED DEBUG START ===');
      console.log('Book ID:', bookId);
      
      // Lấy user hiện tại
      const currentUser = JSON.parse(localStorage.getItem('user'));
      console.log('Current user from localStorage:', currentUser);
      
      if (!currentUser) {
        console.log('No user found, cannot save action');
        return;
      }

      console.log('Calling databaseService.saveUserAction with:', {
        userId: currentUser.id,
        bookId: bookId,
        actionType: 'view',
        sessionId: `session_${Date.now()}`,
        categoryCode: 'view_action'
      });

      // Lưu hành động view vào database
      const result = await databaseService.saveUserAction({
        userId: currentUser.id,
        bookId: bookId,
        actionType: 'view',
        sessionId: `session_${Date.now()}`,
        categoryCode: 'view_action'
      });

      console.log('Save user action result:', result);

      // Không cần cập nhật state local nữa, chỉ lưu vào database
      console.log('View action saved to database successfully');
      console.log('=== MARK AS VIEWED DEBUG END ===');
    } catch (error) {
      console.error('Error marking as viewed:', error);
      console.log('=== MARK AS VIEWED DEBUG END WITH ERROR ===');
    }
  };

  const markAsPurchased = async () => {
    try {
      // Lấy user hiện tại
      const currentUser = JSON.parse(localStorage.getItem('user'));
      if (!currentUser) return;

      // Lưu hành động purchase vào database
      await databaseService.saveUserAction({
        userId: currentUser.id,
        bookId: bookId,
        actionType: 'purchase',
        sessionId: `session_${Date.now()}`,
        categoryCode: 'purchase_action'
      });

      // Không cần cập nhật state local nữa, chỉ lưu vào database
      console.log('Purchase action saved to database successfully');
    } catch (error) {
      console.error('Error marking as purchased:', error);
    }
  };

  const getUserStats = async () => {
    try {
      const currentUser = JSON.parse(localStorage.getItem('user'));
      if (!currentUser) return { totalBooks: 0, viewedBooks: 0, purchasedBooks: 0 };

      const result = await databaseService.getUserStats(currentUser.id);
      if (result.success) {
        return {
          totalBooks: result.stats.totalActions,
          viewedBooks: result.stats.viewedBooks,
          purchasedBooks: result.stats.purchasedBooks
        };
      }
      return { totalBooks: 0, viewedBooks: 0, purchasedBooks: 0 };
    } catch (error) {
      console.error('Error getting user stats:', error);
      return { totalBooks: 0, viewedBooks: 0, purchasedBooks: 0 };
    }
  };

  return {
    actions,
    markAsViewed,
    markAsPurchased,
    getUserStats
  };
}; 