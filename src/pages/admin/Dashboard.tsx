import React from 'react';
import { useApp } from '../../context/AppContext';
import { Users, DollarSign, ShoppingCart, Gamepad2 } from 'lucide-react';
import { motion } from 'framer-motion';

const StatsCard: React.FC<{ icon: React.ReactNode; title: string; value: string; color: string }> = ({ icon, title, value, color }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    className="glass-card p-6"
  >
    <div className="flex items-center space-x-4">
      <div className={`w-12 h-12 rounded-lg flex items-center justify-center bg-${color}-500/20 text-${color}-400`}>
        {icon}
      </div>
      <div>
        <p className="text-slate-400">{title}</p>
        <p className="text-2xl font-bold text-slate-100">{value}</p>
      </div>
    </div>
  </motion.div>
);

const Dashboard: React.FC = () => {
  const { state } = useApp();
  const totalRevenue = state.transactions
    .filter(t => t.status === 'completed')
    .reduce((sum, t) => sum + t.amount, 0);

  const formatCurrency = (amount: number) => new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(amount);

  return (
    <div>
      <h1 className="text-3xl font-bold text-slate-100 mb-8">Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6 mb-8">
        <StatsCard icon={<Users className="w-6 h-6" />} title="Total Pengguna" value={state.users.length.toString()} color="primary" />
        <StatsCard icon={<DollarSign className="w-6 h-6" />} title="Total Pendapatan" value={formatCurrency(totalRevenue)} color="green" />
        <StatsCard icon={<ShoppingCart className="w-6 h-6" />} title="Total Transaksi" value={state.transactions.length.toString()} color="amber" />
        <StatsCard icon={<Gamepad2 className="w-6 h-6" />} title="Total Game" value={state.games.length.toString()} color="red" />
      </div>
      
      <div className="glass-card p-6">
        <h2 className="text-xl font-bold text-slate-100 mb-4">Transaksi Terbaru</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-slate-700">
                <th className="p-3 text-slate-400">ID Transaksi</th>
                <th className="p-3 text-slate-400">Pengguna</th>
                <th className="p-3 text-slate-400">Jumlah</th>
                <th className="p-3 text-slate-400">Status</th>
              </tr>
            </thead>
            <tbody>
              {state.transactions.slice(0, 5).map(t => (
                <tr key={t.id} className="border-b border-slate-800 hover:bg-slate-800/50">
                  <td className="p-3 text-slate-300 font-mono text-sm">{t.id}</td>
                  <td className="p-3 text-slate-300">{state.users.find(u => u.id === t.userId)?.name || 'N/A'}</td>
                  <td className="p-3 text-slate-300">{formatCurrency(t.amount)}</td>
                  <td className="p-3">
                    <span className={`px-2 py-1 text-xs rounded-full bg-${t.status === 'completed' ? 'green' : 'amber'}-500/20 text-${t.status === 'completed' ? 'green' : 'amber'}-400`}>
                      {t.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
