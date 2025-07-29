import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Gamepad2, Mail, Lock, User as UserIcon, Loader2 } from 'lucide-react';
import { motion } from 'framer-motion';

export interface AuthFormData {
  name?: string;
  email: string;
  password: string;
}

interface AuthFormProps<T = AuthFormData> {
  type: 'login' | 'register';
  onSubmit: (formData: T) => void;
  error?: string | null;
  loading: boolean;
}

const AuthForm = <T extends AuthFormData>({
  type,
  onSubmit,
  error,
  loading,
}: AuthFormProps<T>) => {
  const [formData, setFormData] = useState<T>({
    name: '',
    email: '',
    password: '',
  } as T);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value } as T);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const isLogin = type === 'login';

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md glass-card p-8"
      >
        <div className="text-center mb-8">
          <Link
            to="/"
            className="inline-flex items-center justify-center space-x-2 mb-4"
          >
            <div className="bg-gradient-to-r from-primary-500 to-primary-600 p-2 rounded-lg">
              <Gamepad2 className="h-6 w-6 text-white" />
            </div>
            <span className="text-3xl font-bold bg-gradient-to-r from-primary-400 to-primary-300 bg-clip-text text-transparent">
              Topsky
            </span>
          </Link>
          <h2 className="text-2xl font-bold text-slate-100">
            {isLogin ? 'Selamat Datang Kembali' : 'Buat Akun Baru'}
          </h2>
          <p className="text-slate-400">
            {isLogin
              ? 'Masuk untuk melanjutkan'
              : 'Daftar untuk memulai petualanganmu'}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {!isLogin && (
            <div className="relative">
              <UserIcon className="absolute left-3 top-3.5 h-5 w-5 text-slate-400" />
              <input
                type="text"
                name="name"
                placeholder="Nama Lengkap"
                required
                onChange={handleChange}
                className="w-full pl-10 pr-4 py-3 bg-slate-800 border border-slate-700 rounded-lg text-slate-300 focus:ring-2 focus:ring-primary-500 focus:border-transparent transition"
              />
            </div>
          )}
          <div className="relative">
            <Mail className="absolute left-3 top-3.5 h-5 w-5 text-slate-400" />
            <input
              type="email"
              name="email"
              placeholder="Email"
              required
              onChange={handleChange}
              className="w-full pl-10 pr-4 py-3 bg-slate-800 border border-slate-700 rounded-lg text-slate-300 focus:ring-2 focus:ring-primary-500 focus:border-transparent transition"
            />
          </div>
          <div className="relative">
            <Lock className="absolute left-3 top-3.5 h-5 w-5 text-slate-400" />
            <input
              type="password"
              name="password"
              placeholder="Password"
              required
              onChange={handleChange}
              className="w-full pl-10 pr-4 py-3 bg-slate-800 border border-slate-700 rounded-lg text-slate-300 focus:ring-2 focus:ring-primary-500 focus:border-transparent transition"
            />
          </div>

          {error && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="bg-red-500/20 border border-red-500/30 text-red-300 p-3 rounded-lg text-sm"
              role="alert"
            >
              <p>{error}</p>
            </motion.div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-primary-500 to-primary-600 text-white font-bold py-3 px-4 rounded-lg hover:from-primary-600 hover:to-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 transition-all duration-300 disabled:opacity-50 flex items-center justify-center"
          >
            {loading ? <Loader2 className="animate-spin" /> : isLogin ? 'Masuk' : 'Daftar'}
          </button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-sm text-slate-400">
            {isLogin ? 'Belum punya akun?' : 'Sudah punya akun?'}
            <Link
              to={isLogin ? '/register' : '/login'}
              className="font-medium text-primary-400 hover:text-primary-300 ml-1"
            >
              {isLogin ? 'Daftar di sini' : 'Masuk di sini'}
            </Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default AuthForm;
