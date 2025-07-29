import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search, User, Menu, X, Gamepad2, LogOut, Settings, ShieldCheck } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { motion, AnimatePresence } from 'framer-motion';

const Header: React.FC = () => {
  const { state, dispatch } = useApp();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
      setSearchQuery('');
      setIsMenuOpen(false);
    }
  };

  const handleLogout = () => {
    dispatch({ type: 'LOGOUT' });
    setIsProfileOpen(false);
    setIsMenuOpen(false);
    navigate('/');
  };

  return (
    <header className="bg-slate-900/50 backdrop-blur-lg shadow-lg sticky top-0 z-50 border-b border-slate-700/50 print-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="bg-gradient-to-r from-primary-500 to-primary-600 p-2 rounded-lg">
              <Gamepad2 className="h-6 w-6 text-white" />
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-primary-400 to-primary-300 bg-clip-text text-transparent">
              Topsky
            </span>
          </Link>

          {/* Search Bar - Desktop */}
          <form onSubmit={handleSearch} className="hidden md:flex flex-1 max-w-lg mx-8">
            <div className="relative w-full">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Cari game favoritmu..."
                className="w-full pl-10 pr-4 py-2 bg-slate-800 border border-slate-700 rounded-lg text-slate-300 focus:ring-2 focus:ring-primary-500 focus:border-transparent transition"
              />
              <Search className="absolute left-3 top-2.5 h-5 w-5 text-slate-400" />
            </div>
          </form>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-4">
            <Link
              to="/games"
              className="text-slate-300 hover:text-primary-400 font-medium transition-colors"
            >
              Games
            </Link>
            
            {state.isAuthenticated ? (
              <div className="relative">
                <button onClick={() => setIsProfileOpen(!isProfileOpen)} className="flex items-center space-x-2">
                  <img
                    src={state.user?.avatar}
                    alt={state.user?.name}
                    className="h-9 w-9 rounded-full object-cover border-2 border-primary-500"
                  />
                </button>
                <AnimatePresence>
                  {isProfileOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      className="absolute right-0 mt-2 w-56 bg-slate-800 border border-slate-700 rounded-md shadow-lg py-1 z-50"
                    >
                      <div className="px-4 py-2 border-b border-slate-700">
                        <p className="text-sm font-semibold text-slate-200 truncate">{state.user?.name}</p>
                        <p className="text-xs text-slate-400 truncate">{state.user?.email}</p>
                      </div>
                      <Link to="/profile" onClick={() => setIsProfileOpen(false)} className="flex items-center w-full text-left px-4 py-2 text-sm text-slate-300 hover:bg-slate-700">
                        <User className="mr-2 h-4 w-4" /> Profil
                      </Link>
                      {state.user?.role === 'admin' && (
                        <Link to="/admin" onClick={() => setIsProfileOpen(false)} className="flex items-center w-full text-left px-4 py-2 text-sm text-slate-300 hover:bg-slate-700">
                          <ShieldCheck className="mr-2 h-4 w-4" /> Admin Panel
                        </Link>
                      )}
                      <button onClick={handleLogout} className="flex items-center w-full text-left px-4 py-2 text-sm text-red-400 hover:bg-slate-700">
                        <LogOut className="mr-2 h-4 w-4" /> Keluar
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <Link to="/login" className="text-slate-300 hover:text-primary-400 font-medium transition-colors px-4 py-2 rounded-lg">
                  Masuk
                </Link>
                <Link to="/register" className="bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition-colors font-medium">
                  Daftar
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="md:hidden p-2 rounded-lg hover:bg-slate-800">
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-slate-900 border-t border-slate-700"
          >
            <div className="px-4 py-4 space-y-4">
              <form onSubmit={handleSearch} className="relative">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Cari game..."
                  className="w-full pl-10 pr-4 py-2 bg-slate-800 border border-slate-700 rounded-lg text-slate-300"
                />
                <Search className="absolute left-3 top-2.5 h-5 w-5 text-slate-400" />
              </form>
              <Link to="/games" className="block text-slate-300 hover:text-primary-400 font-medium" onClick={() => setIsMenuOpen(false)}>
                Games
              </Link>
              
              {state.isAuthenticated ? (
                <>
                  <Link to="/profile" className="flex items-center space-x-3 py-2 border-t border-slate-700" onClick={() => setIsMenuOpen(false)}>
                    <img src={state.user?.avatar} alt={state.user?.name} className="h-10 w-10 rounded-full object-cover" />
                    <div>
                      <div className="font-medium text-slate-300">{state.user?.name}</div>
                      <div className="text-sm text-slate-400">Lihat Profil</div>
                    </div>
                  </Link>
                  {state.user?.role === 'admin' && (
                    <Link to="/admin" onClick={() => setIsMenuOpen(false)} className="flex items-center space-x-2 text-slate-300 hover:text-primary-400">
                      <ShieldCheck className="h-5 w-5" />
                      <span>Admin Panel</span>
                    </Link>
                  )}
                  <button onClick={handleLogout} className="w-full text-left flex items-center space-x-2 text-red-400 hover:bg-red-500/20 p-2 rounded-md">
                    <LogOut className="h-5 w-5" />
                    <span>Keluar</span>
                  </button>
                </>
              ) : (
                <div className="flex items-center space-x-2 border-t border-slate-700 pt-4">
                  <Link to="/login" className="flex-1 text-center text-slate-300 bg-slate-800 hover:bg-slate-700 font-medium transition-colors px-4 py-2 rounded-lg" onClick={() => setIsMenuOpen(false)}>
                    Masuk
                  </Link>
                  <Link to="/register" className="flex-1 text-center bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition-colors font-medium" onClick={() => setIsMenuOpen(false)}>
                    Daftar
                  </Link>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;
