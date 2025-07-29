import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Download, Check, Calendar, User, Gamepad2 } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { motion } from 'framer-motion';

const Invoice: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { state } = useApp();

  const transaction = state.transactions.find(t => t.id === id);

  if (!transaction) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-slate-100 mb-4">Invoice tidak ditemukan</h2>
          <button
            onClick={() => navigate('/profile')}
            className="bg-primary-600 text-white px-6 py-2 rounded-lg hover:bg-primary-700 transition-colors"
          >
            Kembali ke Profil
          </button>
        </div>
      </div>
    );
  }

  const formatCurrency = (amount: number) => new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(amount);
  const formatDate = (dateString: string) => new Date(dateString).toLocaleDateString('id-ID', { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' });
  const handlePrint = () => window.print();

  const statusMap = {
    completed: { text: 'Berhasil', color: 'green' },
    processing: { text: 'Diproses', color: 'amber' },
    waiting_payment: { text: 'Menunggu Pembayaran', color: 'yellow' },
    failed: { text: 'Gagal', color: 'red' },
  };
  const currentStatus = statusMap[transaction.status];

  return (
    <div className="min-h-screen print-container">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center justify-between mb-8 print-hidden">
          <button onClick={() => navigate(-1)} className="flex items-center space-x-2 text-slate-400 hover:text-white transition-colors">
            <ArrowLeft className="h-5 w-5" />
            <span>Kembali</span>
          </button>
          <button onClick={handlePrint} className="flex items-center space-x-2 bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition-colors">
            <Download className="h-5 w-5" />
            <span>Cetak Invoice</span>
          </button>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-xl shadow-lg overflow-hidden print-card"
        >
          <div className={`bg-gradient-to-r from-${currentStatus.color}-500 to-${currentStatus.color}-600 text-white p-6`}>
            <div className="flex items-center space-x-3">
              <div className="bg-white bg-opacity-20 p-2 rounded-full"><Check className="h-6 w-6" /></div>
              <div>
                <h1 className="text-2xl font-bold">Pembayaran {currentStatus.text}!</h1>
                <p className={`text-${currentStatus.color}-100`}>Top-up Anda telah berhasil diproses</p>
              </div>
            </div>
          </div>

          <div className="p-6 border-b print-text-black">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="bg-gradient-to-r from-primary-500 to-primary-600 p-2 rounded-lg"><Gamepad2 className="h-6 w-6 text-white" /></div>
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 print-text-black">Topsky</h2>
                  <p className="text-gray-600 print-text-black">Invoice Pembayaran</p>
                </div>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold text-gray-900 print-text-black">#{transaction.id}</div>
                <div className="text-gray-600 print-text-black">{formatDate(transaction.createdAt)}</div>
              </div>
            </div>
          </div>

          <div className="p-6 print-text-black">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center space-x-2 print-text-black"><User className="h-5 w-5" /><span>Informasi Pelanggan</span></h3>
                <div className="space-y-2 text-gray-700 print-text-black">
                  <div><strong>Nama:</strong> {state.user?.name}</div>
                  <div><strong>Email:</strong> {state.user?.email}</div>
                  <div><strong>Telepon:</strong> {state.user?.phone}</div>
                </div>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center space-x-2 print-text-black"><Calendar className="h-5 w-5" /><span>Informasi Transaksi</span></h3>
                <div className="space-y-2 text-gray-700 print-text-black">
                  <div><strong>ID Transaksi:</strong> {transaction.id}</div>
                  <div><strong>Metode Pembayaran:</strong> {transaction.paymentMethod || 'N/A'}</div>
                  <div><strong>Status:</strong> <span className={`ml-2 bg-${currentStatus.color}-100 text-${currentStatus.color}-800 px-2 py-1 rounded-full text-sm`}>{currentStatus.text}</span></div>
                </div>
              </div>
            </div>

            <div className="mb-8">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 print-text-black">Detail Pesanan</h3>
              <div className="bg-gray-50 rounded-lg p-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-800">
                  <div><div className="text-sm text-gray-600">Game</div><div className="font-medium">{transaction.game.name}</div></div>
                  <div><div className="text-sm text-gray-600">ID Player</div><div className="font-medium">{transaction.playerId}</div></div>
                  {transaction.playerName && <div><div className="text-sm text-gray-600">Nama Player</div><div className="font-medium">{transaction.playerName}</div></div>}
                  <div><div className="text-sm text-gray-600">Paket</div><div className="font-medium">{transaction.package.name}</div></div>
                </div>
              </div>
            </div>

            <div className="border-t pt-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 print-text-black">Ringkasan Pembayaran</h3>
              <div className="bg-gray-50 rounded-lg p-4 text-gray-800">
                <div className="space-y-2">
                  <div className="flex justify-between"><span className="text-gray-600">Subtotal</span><span className="font-medium">{formatCurrency(transaction.package.price)}</span></div>
                  <div className="flex justify-between"><span className="text-gray-600">Biaya Admin</span><span className="font-medium">{formatCurrency(transaction.amount - transaction.package.price)}</span></div>
                  <div className="border-t pt-2 flex justify-between"><span className="text-lg font-bold">Total Dibayar</span><span className="text-lg font-bold text-primary-600">{formatCurrency(transaction.amount)}</span></div>
                </div>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t text-center text-gray-500 print-text-black">
              <p className="mb-2">Terima kasih telah menggunakan layanan Topsky!</p>
              <p className="text-sm">Jika ada pertanyaan, silakan hubungi customer service kami di support@topsky.com</p>
            </div>
          </div>
        </motion.div>

        <div className="mt-8 text-center space-y-4 print-hidden">
          <button onClick={() => navigate('/games')} className="bg-primary-600 text-white px-8 py-3 rounded-lg hover:bg-primary-700 transition-colors mr-4">Top-up Lagi</button>
          <button onClick={() => navigate('/profile')} className="bg-slate-600 text-white px-8 py-3 rounded-lg hover:bg-slate-700 transition-colors">Lihat Riwayat</button>
        </div>
      </div>
    </div>
  );
};

export default Invoice;
