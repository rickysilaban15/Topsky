import { useState } from 'react';
import { Edit3, Calendar, Mail, Phone, ShoppingBag, BarChart, DollarSign } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { motion } from 'framer-motion';
import SettingsModal from '../components/Profile/SettingsModal';

type Status = 'completed' | 'processing' | 'waiting_payment' | 'failed';

const statusStyles: Record<Status, { text: string; badgeClass: string }> = {
  completed: { text: 'Berhasil', badgeClass: 'bg-green-500/20 text-green-400' },
  processing: { text: 'Diproses', badgeClass: 'bg-amber-500/20 text-amber-400' },
  waiting_payment: { text: 'Menunggu Pembayaran', badgeClass: 'bg-yellow-500/20 text-yellow-400' },
  failed: { text: 'Gagal', badgeClass: 'bg-red-500/20 text-red-400' },
};

const Profile = () => {
  const { state } = useApp();
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  const formatCurrency = (amount: number) =>
    new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(amount);

  const formatDate = (dateString: string) =>
    new Date(dateString).toLocaleDateString('id-ID', { year: 'numeric', month: 'long', day: 'numeric' });

  if (!state.user) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <h2 className="text-xl sm:text-2xl font-bold text-slate-100 text-center">
          Silakan login terlebih dahulu
        </h2>
      </div>
    );
  }

  const userTransactions = state.transactions.filter((t) => t.userId === state.user!.id);
  const totalSpending = userTransactions.reduce((sum, t) => sum + t.amount, 0);

  return (
    <>
      <SettingsModal isOpen={isSettingsOpen} onClose={() => setIsSettingsOpen(false)} />

      <div className="min-h-screen">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
          {/* Header Profil */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass-card p-4 sm:p-6 mb-6 sm:mb-8"
          >
            <div className="flex flex-col md:flex-row md:items-start gap-4 md:gap-6">
              <div className="relative self-center md:self-start">
                <img
                  src={state.user.avatar}
                  alt={state.user.name ? `Foto profil ${state.user.name}` : 'Foto profil pengguna'}
                  className="w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 rounded-full object-cover border-4 border-primary-500/50"
                />
              </div>

              <div className="flex-1">
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
                  <div className="text-center sm:text-left">
                    <h1 className="text-2xl sm:text-3xl font-bold text-slate-100 break-words">
                      {state.user.name}
                    </h1>
                    <p className="text-slate-400">
                      {state.user.role === 'admin' ? 'Administrator' : 'Anggota'}
                    </p>
                  </div>

                  <button
                    onClick={() => setIsSettingsOpen(true)}
                    className="inline-flex items-center justify-center gap-2 self-center sm:self-auto text-primary-400 hover:text-primary-300 transition-colors px-3 py-2 rounded-lg hover:bg-slate-800/60"
                    aria-label="Edit Profil"
                    type="button"
                  >
                    <Edit3 className="h-5 w-5" />
                    <span className="text-sm sm:text-base">Edit Profil</span>
                  </button>
                </div>

                <div className="mt-4 flex flex-wrap justify-center sm:justify-start gap-x-4 gap-y-2 text-slate-400">
                  <div className="flex items-center gap-2 min-w-0">
                    <Mail className="h-4 w-4 shrink-0" />
                    <span className="truncate" title={state.user.email}>{state.user.email}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone className="h-4 w-4" />
                    <span className="break-all">{state.user.phone}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4" />
                    <span className="whitespace-nowrap">Bergabung {formatDate(state.user.joinDate)}</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Stat Cards */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.05 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 mb-6 sm:mb-8"
          >
            <div className="glass-card p-5 text-center">
              <BarChart className="h-8 w-8 text-primary-400 mx-auto mb-2" />
              <div className="text-2xl sm:text-3xl font-bold text-slate-100">{userTransactions.length}</div>
              <div className="text-slate-400">Total Transaksi</div>
            </div>

            <div className="glass-card p-5 text-center">
              <DollarSign className="h-8 w-8 text-green-400 mx-auto mb-2" />
              <div className="text-2xl sm:text-3xl font-bold text-slate-100">{formatCurrency(totalSpending)}</div>
              <div className="text-slate-400">Total Pengeluaran</div>
            </div>

            <div className="glass-card p-5 text-center">
              <ShoppingBag className="h-8 w-8 text-amber-400 mx-auto mb-2" />
              <div className="text-2xl sm:text-3xl font-bold text-slate-100">
                {userTransactions.filter((t) => t.status === 'completed').length}
              </div>
              <div className="text-slate-400">Transaksi Sukses</div>
            </div>
          </motion.div>

          {/* Riwayat Transaksi */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="glass-card"
          >
            <div className="p-4 sm:p-6 border-b border-slate-700">
              <h2 className="text-lg sm:text-xl font-bold text-slate-100">Riwayat Transaksi</h2>
            </div>

            <div className="p-4 sm:p-6">
              {userTransactions.length > 0 ? (
                <div className="space-y-3 sm:space-y-4">
                  {userTransactions.map((t, index) => (
                    <motion.div
                      key={t.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: Math.min(index * 0.05, 0.4) }}
                      className="border border-slate-700 rounded-lg p-4 hover:bg-slate-800/50 transition-colors"
                    >
                      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
                        <div className="flex items-center gap-3 min-w-0">
                          <img
                            src={t.game.image}
                            alt={t.game.name}
                            className="w-12 h-12 rounded-lg object-cover shrink-0"
                          />
                          <div className="min-w-0">
                            <h3 className="font-semibold text-slate-100 truncate">
                              {t.game.name} - {t.package.name}
                            </h3>
                            <p className="text-sm text-slate-400 truncate">
                              {formatDate(t.createdAt)} • ID: {t.id}
                            </p>
                          </div>
                        </div>

                        <div className="flex items-center gap-3 md:gap-4 md:w-auto">
                          <div className="text-lg font-bold text-slate-100 text-right md:text-left">
                            {formatCurrency(t.amount)}
                          </div>
                          <div
                            className={`text-xs sm:text-sm px-3 py-1 rounded-full whitespace-nowrap ${statusStyles[t.status as Status].badgeClass}`}
                          >
                            {statusStyles[t.status as Status].text}
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <ShoppingBag className="h-10 w-10 sm:h-12 sm:w-12 text-slate-600 mx-auto mb-3" />
                  <h3 className="text-base sm:text-lg font-medium text-slate-200 mb-1">
                    Belum ada transaksi
                  </h3>
                  <p className="text-slate-400">Mulai top-up game favoritmu sekarang!</p>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </>
  );
};

export default Profile;
