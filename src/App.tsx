// src/App.tsx
import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AppProvider } from './context/AppContext';

import Header from './components/Layout/Header';
import Footer from './components/Layout/Footer';
import ProtectedRoute from './components/Common/ProtectedRoute';
import AdminRoute from './components/Common/AdminRoute';
import AdminLayout from './components/Admin/AdminLayout';
import ScrollToTop from './pages/ScrollToTop';

// ===== Lazy-loaded pages (code splitting) =====
const Home = lazy(() => import('./pages/Home'));
const Games = lazy(() => import('./pages/Games'));
const GameDetail = lazy(() => import('./pages/GameDetail'));
const Invoice = lazy(() => import('./pages/Invoice'));
const Profile = lazy(() => import('./pages/Profile'));
const Login = lazy(() => import('./pages/Login'));
const Register = lazy(() => import('./pages/Register'));
const Search = lazy(() => import('./pages/Search'));
const TransactionProgress = lazy(() => import('./pages/TransactionProgress'));

const FAQ = lazy(() => import('./pages/FAQ'));
const HowToTopup = lazy(() => import('./pages/HowToTopup'));
const ContactUs = lazy(() => import('./pages/ContactUs'));
const Terms = lazy(() => import('./pages/Terms'));

const Dashboard = lazy(() => import('./pages/admin/Dashboard'));
const AdminUsers = lazy(() => import('./pages/admin/AdminUsers'));
const AdminGames = lazy(() => import('./pages/admin/AdminGames'));

function App() {
  return (
    <AppProvider>
      <Router>
        <ScrollToTop />
        <div className="min-h-screen flex flex-col font-sans animated-gradient">
          <Header />

          <main className="flex-1">
            <Suspense
              fallback={
                <div className="p-6 text-slate-300">Memuat halaman…</div>
              }
            >
              <Routes>
                {/* Public Routes */}
                <Route path="/" element={<Home />} />
                <Route path="/games" element={<Games />} />
                <Route path="/game/:id" element={<GameDetail />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/search" element={<Search />} />

                {/* Pages */}
                <Route path="/faq" element={<FAQ />} />
                <Route path="/how-to-topup" element={<HowToTopup />} />
                <Route path="/contact-us" element={<ContactUs />} />
                <Route path="/terms" element={<Terms />} />

                {/* Protected Routes */}
                <Route
                  path="/transaction/:id"
                  element={
                    <ProtectedRoute>
                      <TransactionProgress />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/invoice/:id"
                  element={
                    <ProtectedRoute>
                      <Invoice />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/profile"
                  element={
                    <ProtectedRoute>
                      <Profile />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/transactions"
                  element={
                    <ProtectedRoute>
                      <Profile />
                    </ProtectedRoute>
                  }
                />

                {/* Admin Routes */}
                <Route
                  path="/admin"
                  element={
                    <AdminRoute>
                      <AdminLayout />
                    </AdminRoute>
                  }
                >
                  <Route index element={<Dashboard />} />
                  <Route path="users" element={<AdminUsers />} />
                  <Route path="games" element={<AdminGames />} />
                </Route>
              </Routes>
            </Suspense>
          </main>

          <Footer />
        </div>
      </Router>
    </AppProvider>
  );
}

export default App;
