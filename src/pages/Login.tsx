// src/pages/Login.tsx

import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import AuthForm, { AuthFormData } from '../components/Common/AuthForm';
import GoogleLoginButton from '../components/Auth/GoogleLoginButton';
import { useApp } from '../context/AppContext';
import { users as mockUsers } from '../data/users';

type LocationState = {
  from?: { pathname: string };
};

export default function Login() {
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const { dispatch } = useApp();
  const navigate = useNavigate();
  const location = useLocation();

  // Lokasi redirect setelah login (default ke '/')
  const routeState = location.state as LocationState | null;
  const from = routeState?.from?.pathname ?? '/';

  // === Handle Login dengan data form ===
  const handleLogin = (formData: AuthFormData) => {
    setLoading(true);
    setError(null);

    setTimeout(() => {
      const user = mockUsers.find(
        (u) => u.email === formData.email && u.password === formData.password
      );

      if (user) {
        dispatch({ type: 'LOGIN', payload: user });
        navigate(from, { replace: true });
      } else {
        setError('Email atau password salah. Silakan coba lagi.');
      }

      setLoading(false);
    }, 800);
  };

  // === Handle Login via Google ===
  const handleGoogleSuccess = (profile: {
    sub: string;
    name: string;
    email: string;
    picture?: string;
  }) => {
    const googleUser = {
      id: `google-${profile.sub}`,
      name: profile.name,
      email: profile.email,
      avatar:
        profile.picture ??
        `https://ui-avatars.com/api/?name=${encodeURIComponent(profile.name)}`,
      phone: '',
      role: 'member',
      joinDate: new Date().toISOString(),
    };

    dispatch({ type: 'LOGIN', payload: googleUser });
    navigate(from, { replace: true });
  };

  const handleGoogleError = (e: unknown) => {
    console.error(e);
    setError('Gagal login dengan Google. Coba lagi.');
  };

  return (
    <div className="pb-8">
      {/* Form Login */}
      <AuthForm
        type="login"
        onSubmit={handleLogin}
        error={error}
        loading={loading}
      />

      {/* Divider & Google Login */}
      <div className="max-w-md px-4 mx-auto -mt-4">
        <div className="relative my-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-slate-700" />
          </div>
          <div className="relative flex justify-center">
            <span className="px-3 text-sm text-slate-400 bg-slate-900">
              atau
            </span>
          </div>
        </div>

        <GoogleLoginButton
          onSuccess={handleGoogleSuccess}
          onError={handleGoogleError}
        />
      </div>
    </div>
  );
}
