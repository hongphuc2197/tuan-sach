// Utility để theo dõi user ẩn danh
// Tạo ID duy nhất cho mỗi user dựa trên browser fingerprint

// Tạo fingerprint đơn giản từ browser
const generateBrowserFingerprint = () => {
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  ctx.textBaseline = 'top';
  ctx.font = '14px Arial';
  ctx.fillText('Anonymous User', 2, 2);
  
  const fingerprint = {
    userAgent: navigator.userAgent,
    language: navigator.language,
    platform: navigator.platform,
    screenResolution: `${screen.width}x${screen.height}`,
    timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
    canvasHash: canvas.toDataURL(),
    timestamp: Date.now()
  };
  
  return btoa(JSON.stringify(fingerprint)).slice(0, 16);
};

// Tạo hoặc lấy User ID
export const getUserId = () => {
  let userId = localStorage.getItem('anonymous_user_id');
  
  if (!userId) {
    userId = generateBrowserFingerprint();
    localStorage.setItem('anonymous_user_id', userId);
    localStorage.setItem('user_created_at', Date.now().toString());
  }
  
  return userId;
};

// Lấy thông tin user
export const getUserInfo = () => {
  const userId = getUserId();
  const createdAt = localStorage.getItem('user_created_at');
  
  return {
    id: userId,
    createdAt: createdAt ? new Date(parseInt(createdAt)) : new Date(),
    isAnonymous: true,
    sessionId: getSessionId()
  };
};

// Tạo session ID mới mỗi lần mở tab
export const getSessionId = () => {
  let sessionId = sessionStorage.getItem('session_id');
  
  if (!sessionId) {
    sessionId = `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    sessionStorage.setItem('session_id', sessionId);
  }
  
  return sessionId;
};

// Lưu hành vi user với timestamp
export const trackUserAction = (action, bookId, additionalData = {}) => {
  const userId = getUserId();
  const sessionId = getSessionId();
  const timestamp = Date.now();
  
  const actionData = {
    userId,
    sessionId,
    action,
    bookId,
    timestamp,
    ...additionalData
  };
  
  // Lưu vào localStorage
  const userActions = JSON.parse(localStorage.getItem('userActions') || '{}');
  if (!userActions[bookId]) {
    userActions[bookId] = {};
  }
  
  // Cập nhật hành động
  if (action === 'view') {
    userActions[bookId].viewed = true;
    userActions[bookId].viewedAt = timestamp;
    userActions[bookId].viewedBy = userId;
  } else if (action === 'purchase') {
    userActions[bookId].purchased = true;
    userActions[bookId].purchasedAt = timestamp;
    userActions[bookId].purchasedBy = userId;
  }
  
  // Lưu thông tin session
  userActions[bookId].lastSessionId = sessionId;
  userActions[bookId].lastActionAt = timestamp;
  
  localStorage.setItem('userActions', JSON.stringify(userActions));
  
  // Lưu lịch sử hành động
  const actionHistory = JSON.parse(localStorage.getItem('actionHistory') || '[]');
  actionHistory.push(actionData);
  
  // Giữ chỉ 1000 hành động gần nhất
  if (actionHistory.length > 1000) {
    actionHistory.splice(0, actionHistory.length - 1000);
  }
  
  localStorage.setItem('actionHistory', JSON.stringify(actionHistory));
  
  return actionData;
};

// Lấy thống kê user
export const getUserStats = () => {
  const userActions = JSON.parse(localStorage.getItem('userActions') || '{}');
  const actionHistory = JSON.parse(localStorage.getItem('actionHistory') || '[]');
  const userId = getUserId();
  
  const totalBooks = Object.keys(userActions).length;
  const viewedBooks = Object.values(userActions).filter(action => action.viewed).length;
  const purchasedBooks = Object.values(userActions).filter(action => action.purchased).length;
  
  // Lọc hành động của user hiện tại
  const userActionsHistory = actionHistory.filter(action => action.userId === userId);
  const todayActions = userActionsHistory.filter(action => {
    const today = new Date();
    const actionDate = new Date(action.timestamp);
    return actionDate.toDateString() === today.toDateString();
  });
  
  return {
    userId,
    totalBooks,
    viewedBooks,
    purchasedBooks,
    totalActions: userActionsHistory.length,
    todayActions: todayActions.length,
    firstAction: userActionsHistory.length > 0 ? new Date(userActionsHistory[0].timestamp) : null,
    lastAction: userActionsHistory.length > 0 ? new Date(userActionsHistory[userActionsHistory.length - 1].timestamp) : null
  };
};

// Xóa dữ liệu user (reset)
export const clearUserData = () => {
  localStorage.removeItem('anonymous_user_id');
  localStorage.removeItem('user_created_at');
  localStorage.removeItem('userActions');
  localStorage.removeItem('actionHistory');
  sessionStorage.removeItem('session_id');
  
  // Tạo user ID mới
  getUserId();
};

// Export dữ liệu với thông tin user
export const exportUserData = () => {
  const userInfo = getUserInfo();
  const userActions = JSON.parse(localStorage.getItem('userActions') || '{}');
  const actionHistory = JSON.parse(localStorage.getItem('actionHistory') || '[]');
  
  return {
    userInfo,
    userActions,
    actionHistory,
    exportDate: new Date().toISOString()
  };
}; 