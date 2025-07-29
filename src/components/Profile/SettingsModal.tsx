import { useEffect, useState } from 'react';
import type { ChangeEvent } from 'react';
import { useApp } from '../../context/AppContext';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Save, Edit3, Mail, Phone, User as UserIcon } from 'lucide-react';

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

type ProfileFormData = {
  name: string;
  email: string;
  phone: string;
};

const SettingsModal = ({ isOpen, onClose }: SettingsModalProps) => {
  const { state, dispatch } = useApp();

  const [formData, setFormData] = useState<ProfileFormData>({
    name: '',
    email: '',
    phone: '',
  });

  useEffect(() => {
    if (state.user) {
      setFormData({
        name: state.user.name ?? '',
        email: state.user.email ?? '',
        phone: state.user.phone ?? '',
      });
    }
  }, [state.user, isOpen]);

  const handleSave = () => {
    dispatch({ type: 'UPDATE_USER', payload: formData });
    onClose();
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name as keyof ProfileFormData]: value }));
  };

  const headingId = 'settings-modal-title';

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
          onClick={onClose}
        >
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby={headingId}
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="glass-card w-full max-w-lg p-6 relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={onClose}
              className="absolute top-4 right-4 text-slate-400 hover:text-white"
              aria-label="Tutup modal"
              title="Tutup"
              type="button"
            >
              <X aria-hidden="true" />
            </button>

            <h2 id={headingId} className="text-2xl font-bold text-slate-100 mb-6">
              Edit Profil
            </h2>

            <div className="flex items-center space-x-4 mb-6">
              <div className="relative">
                <img
                  src={state.user?.avatar}
                  alt={state.user?.name ? `Foto profil ${state.user.name}` : 'Foto profil pengguna'}
                  className="w-20 h-20 rounded-full object-cover border-2 border-primary-500"
                />
                <button
                  className="absolute bottom-0 right-0 bg-primary-600 text-white p-1.5 rounded-full hover:bg-primary-700 transition-colors text-xs"
                  aria-label="Ubah foto profil"
                  title="Ubah foto profil"
                  type="button"
                >
                  <Edit3 className="h-3 w-3" aria-hidden="true" />
                </button>
              </div>
              <div>
                <p className="text-xl font-bold text-slate-200">{state.user?.name}</p>
                <p className="text-sm text-slate-400">Ubah foto profil dan detail akun Anda.</p>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-slate-400 mb-1"
                >
                  Nama
                </label>
                <div className="relative">
                  <UserIcon className="absolute left-3 top-3.5 h-5 w-5 text-slate-500" aria-hidden="true" />
                  <input
                    id="name"
                    type="text"
                    name="name"
                    placeholder="Nama lengkap"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full pl-10 pr-4 py-2 bg-slate-800 border border-slate-700 rounded-lg text-slate-300 focus:ring-2 focus:ring-primary-500"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-slate-400 mb-1"
                >
                  Email
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3.5 h-5 w-5 text-slate-500" aria-hidden="true" />
                  <input
                    id="email"
                    type="email"
                    name="email"
                    placeholder="nama@contoh.com"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full pl-10 pr-4 py-2 bg-slate-800 border border-slate-700 rounded-lg text-slate-300 focus:ring-2 focus:ring-primary-500"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="phone"
                  className="block text-sm font-medium text-slate-400 mb-1"
                >
                  Telepon
                </label>
                <div className="relative">
                  <Phone className="absolute left-3 top-3.5 h-5 w-5 text-slate-500" aria-hidden="true" />
                  <input
                    id="phone"
                    type="tel"
                    name="phone"
                    placeholder="Contoh: 08123456789"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full pl-10 pr-4 py-2 bg-slate-800 border border-slate-700 rounded-lg text-slate-300 focus:ring-2 focus:ring-primary-500"
                  />
                </div>
              </div>
            </div>

            <div className="mt-8 flex justify-end space-x-3">
              <button
                onClick={onClose}
                className="px-4 py-2 rounded-lg bg-slate-700 hover:bg-slate-600 text-slate-200 font-semibold transition-colors"
                type="button"
              >
                Batal
              </button>
              <button
                onClick={handleSave}
                className="px-4 py-2 rounded-lg bg-primary-600 hover:bg-primary-700 text-white font-semibold transition-colors flex items-center space-x-2"
                type="button"
              >
                <Save className="h-4 w-4" aria-hidden="true" />
                <span>Simpan Perubahan</span>
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default SettingsModal;
