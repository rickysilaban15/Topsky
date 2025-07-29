import { useEffect, useRef, useState } from 'react';

export type GoogleProfile = {
  sub: string;
  name: string;
  email: string;
  picture?: string;
};

interface GoogleLoginButtonProps {
  onSuccess: (profile: GoogleProfile) => void;
  onError?: (error: unknown) => void;
  text?: 'signup_with' | 'signin_with' | 'continue_with' | 'signin';
  shape?: 'rectangular' | 'pill' | 'circle' | 'square';
  theme?: 'outline' | 'filled_blue' | 'filled_black';
  size?: 'large' | 'medium' | 'small';
}

declare global {
  interface Window {
    google?: {
      accounts: {
        id: {
          initialize(opts: {
            client_id: string;
            callback: (response: { credential?: string }) => void;
          }): void;
          renderButton(parent: HTMLElement, options: Record<string, unknown>): void;
          prompt(): void;
          disableAutoSelect(): void;
        };
      };
    };
  }
}

function decodeJwt<T = unknown>(token: string): T {
  const payload = token.split('.')[1];
  const json = atob(payload.replace(/-/g, '+').replace(/_/g, '/'));
  return JSON.parse(decodeURIComponent(escape(json))) as T;
}

export default function GoogleLoginButton({
  onSuccess,
  onError,
  text = 'signin_with',
  shape = 'pill',
  theme = 'filled_blue',
  size = 'large',
}: GoogleLoginButtonProps) {
  const divRef = useRef<HTMLDivElement | null>(null);
  const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID as string | undefined;
  const [status, setStatus] = useState<'idle' | 'no-client' | 'loading' | 'ready' | 'error'>('idle');
  const [errMsg, setErrMsg] = useState<string>('');

  useEffect(() => {
    if (!clientId) {
      setStatus('no-client');
      setErrMsg('VITE_GOOGLE_CLIENT_ID tidak ditemukan. Pastikan .env sudah diisi dan dev server di-restart.');
      return;
    }

    setStatus('loading');

    const init = () => {
      try {
        window.google?.accounts.id.initialize({
          client_id: clientId,
          callback: (response) => {
            try {
              if (!response.credential) throw new Error('Credential kosong');
              const profile = decodeJwt<GoogleProfile>(response.credential);
              onSuccess(profile);
            } catch (e) {
              setStatus('error');
              setErrMsg('Gagal memproses token Google.');
              onError?.(e);
            }
          },
        });

        if (divRef.current) {
          window.google?.accounts.id.renderButton(divRef.current, {
            type: 'standard',
            text,
            shape,
            theme,
            size,
          });
          setStatus('ready');
        } else {
          setStatus('error');
          setErrMsg('Container tombol tidak ditemukan.');
        }
      } catch (e) {
        setStatus('error');
        setErrMsg('Inisialisasi Google gagal.');
        onError?.(e);
      }
    };

    const existing = document.querySelector<HTMLScriptElement>('script[src="https://accounts.google.com/gsi/client"]');
    if (existing) {
      if ((existing as unknown as { loaded?: boolean }).loaded) {
        init();
      } else {
        existing.addEventListener('load', init, { once: true });
      }
    } else {
      const script = document.createElement('script');
      script.src = 'https://accounts.google.com/gsi/client';
      script.async = true;
      script.defer = true;
      script.onload = () => {
        (script as unknown as { loaded?: boolean }).loaded = true;
        init();
      };
      script.onerror = () => {
        setStatus('error');
        setErrMsg('Gagal memuat script Google. Periksa koneksi/adblock.');
      };
      document.head.appendChild(script);
    }
  }, [clientId, onError, onSuccess, shape, size, text, theme]);

  if (status === 'no-client' || status === 'error') {
    return (
      <div className="rounded-lg border border-slate-700 bg-slate-800/60 p-3 text-sm text-slate-300">
        <p className="mb-1 font-semibold">Google Sign‑In tidak tersedia</p>
        <p className="text-slate-400">{errMsg}</p>
      </div>
    );
  }

  return (
    <div className="w-full flex justify-center">
      {/* Saat loading, tampilkan placeholder agar layout tidak loncat */}
      {status === 'loading' && (
        <div className="h-10 w-56 animate-pulse rounded-md bg-slate-700" />
      )}
      <div ref={divRef} />
    </div>
  );
}
