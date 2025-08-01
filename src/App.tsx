import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import Header from './components/Layout/Header';
import Footer from './components/Layout/Footer';
import Home from './pages/Home';
import Games from './pages/Games';
import GameDetail from './pages/GameDetail';
import Invoice from './pages/Invoice';
import Profile from './pages/Profile';
import Login from './pages/Login';
import Register from './pages/Register';
import Search from './pages/Search';
import PlaceholderPage from './pages/PlaceholderPage';
import ProtectedRoute from './components/Common/ProtectedRoute';
import AdminRoute from './components/Common/AdminRoute';
import AdminLayout from './components/Admin/AdminLayout';
import Dashboard from './pages/admin/Dashboard';
import AdminUsers from './pages/admin/AdminUsers';
import AdminGames from './pages/admin/AdminGames';
import TransactionProgress from './pages/TransactionProgress';
import ScrollToTop from './components/Common/ScrollToTop';

// PENTING: Aktifkan HANYA SATU dari baris import di bawah ini,
// yang sesuai dengan NAMA FILE ASLI Anda di GitHub (perhatikan huruf besar/kecil).
// Contoh: Jika file di GitHub adalah 'FAQ.tsx', gunakan baris pertama.
// Jika file di GitHub adalah 'faq.tsx', gunakan baris kedua.

// Jika nama file di GitHub adalah FAQ.tsx (huruf 'F' besar):
import FAQ from './pages/FAQ';
// Jika nama file di GitHub adalah faq.tsx (huruf 'f' kecil):
// import FAQ from './pages/faq';

import HowToTopup from './pages/HowToTopup';
import ContactUs from './pages/ContactUs';
import Terms from './pages/Terms';

function App() {
  return (
    <AppProvider>
      <Router>
        <ScrollToTop />
        <div className="min-h-screen flex flex-col font-sans animated-gradient">
          <Header />
          <main className="flex-1">
            <Routes>
              {/* Public Routes */}
              <Route path="/" element={<Home />} />
              <Route path="/games" element={<Games />} />
              <Route path="/game/:id" element={<GameDetail />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/search" element={<Search />} />
              <Route path="/faq" element={<FAQ />} /> {/* Ini adalah rute FAQ yang benar */}
              <Route path="/how-to-topup" element={<HowToTopup />} />
              <Route path="/contact-us" element={<ContactUs />} />
              <Route path="/terms" element={<Terms />} />

              {/* Rute Placeholder lainnya (pastikan tidak ada duplikasi /faq di sini) */}
              <Route path="/how-to-topup" element={<PlaceholderPage title="Cara Top-up" />} />
              <Route path="/contact-us" element={<PlaceholderPage title="Hubungi Kami" />} />
              <Route path="/terms" element={<PlaceholderPage title="Syarat & Ketentuan" />} />

              {/* Protected Routes */}
              <Route path="/transaction/:id" element={<ProtectedRoute><TransactionProgress /></ProtectedRoute>} />
              <Route path="/invoice/:id" element={<ProtectedRoute><Invoice /></ProtectedRoute>} />
              <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
              <Route path="/transactions" element={<ProtectedRoute><Profile /></ProtectedRoute>} />

              {/* Admin Routes */}
              <Route path="/admin" element={<AdminRoute><AdminLayout /></AdminRoute>}>
                <Route index element={<Dashboard />} />
                <Route path="users" element={<AdminUsers />} />
                <Route path="games" element={<AdminGames />} />
              </Route>
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </AppProvider>
  );
}

export default App;
