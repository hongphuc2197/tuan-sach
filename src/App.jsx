import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useEffect } from 'react';
import { AuthProvider } from './hooks/useAuth.jsx';
import { checkSupabaseConnection } from './lib/supabase.js';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Books from './pages/Books';
import BookDetail from './pages/BookDetail';
import UserStats from './pages/UserStats';
import About from './pages/About';
import Contact from './pages/Contact';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  useEffect(() => {
    // Test Supabase connection khi app khởi động
    checkSupabaseConnection().then(isConnected => {
      if (isConnected) {
        console.log('✅ Supabase connected successfully!');
      } else {
        console.error('❌ Supabase connection failed!');
      }
    });
  }, []);

  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen flex flex-col">
          <Header />
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/books" element={
                <ProtectedRoute>
                  <Books />
                </ProtectedRoute>
              } />
              <Route path="/books/:id" element={
                <ProtectedRoute>
                  <BookDetail />
                </ProtectedRoute>
              } />
              <Route path="/stats" element={
                <ProtectedRoute>
                  <UserStats />
                </ProtectedRoute>
              } />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
