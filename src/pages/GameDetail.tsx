import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Star, ShoppingCart, Check, Crown } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { motion } from 'framer-motion';
import { TopUpPackage, Transaction } from '../types';
import { faker } from '@faker-js/faker';

const GameDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { state, dispatch } = useApp();

  const [selectedPackage, setSelectedPackage] = useState<string>('');
  const [playerId, setPlayerId] = useState('');
  const [playerName, setPlayerName] = useState('');

  const game = state.games.find((g) => g.id === id);
  const packages = state.packages.filter((p) => p.gameId === id);

  // Fallback gambar jika gagal dimuat
  const [imgSrc, setImgSrc] = useState(game?.image || '');
  const placeholder =
    'data:image/svg+xml;utf8,' +
    encodeURIComponent(`
<svg xmlns="http://www.w3.org/2000/svg" width="400" height="225">
  <rect width="100%" height="100%" fill="#0f172a"/>
  <text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" fill="#94a3b8" font-family="Arial" font-size="16">
    No Image
  </text>
</svg>`);

  if (!game) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-slate-100 mb-4">
            Game tidak ditemukan
          </h2>
          <button
            onClick={() => navigate('/games')}
            className="bg-primary-600 text-white px-6 py-2 rounded-lg hover:bg-primary-700 transition-colors"
          >
            Kembali ke Games
          </button>
        </div>
      </div>
    );
  }

  const selectedPkg = packages.find((p) => p.id === selectedPackage);

  const handlePurchase = () => {
    if (!selectedPackage || !playerId || !state.user) return;

    const transaction: Transaction = {
      id: `trx-${Date.now()}`,
      userId: state.user.id,
      game,
      package: selectedPkg!,
      amount: selectedPkg!.price,
      status: 'waiting_payment',
      createdAt: new Date().toISOString(),
      playerId,
      playerName: playerName || undefined,
      virtualAccount: `8808${faker.finance.accountNumber(10)}`
    };

    dispatch({ type: 'ADD_TRANSACTION', payload: transaction });
    navigate(`/transaction/${transaction.id}`);
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0
    }).format(amount);
  };

  return (
    <div className="min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center space-x-2 text-slate-400 hover:text-white mb-6 transition-colors"
        >
          <ArrowLeft className="h-5 w-5" />
          <span>Kembali</span>
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* CARD KIRI: GAMBAR + DESKRIPSI */}
          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="glass-card overflow-hidden sticky top-24"
            >
              {/* --- GAMBAR FIX --- */}
              <div className="relative bg-slate-900/40">
                <div className="aspect-video w-full flex items-center justify-center">
                  <img
                    src={imgSrc}
                    alt={game.name}
                    loading="lazy"
                    onError={() => setImgSrc(placeholder)}
                    className="object-contain max-h-[80%] max-w-[90%]"
                  />
                </div>
              </div>

              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <span className="bg-primary-500/20 text-primary-400 px-3 py-1 rounded-full text-sm font-medium">
                    {game.category}
                  </span>
                  <div className="flex items-center space-x-1">
                    <Star className="h-4 w-4 text-yellow-400 fill-current" />
                    <span className="text-sm text-slate-300">4.8</span>
                  </div>
                </div>

                <h1 className="text-2xl font-bold text-slate-100 mb-2">
                  {game.name}
                </h1>
                <p className="text-slate-400 mb-4">by {game.publisher}</p>
                <p className="text-slate-300">{game.description}</p>
              </div>
            </motion.div>
          </div>

          {/* CARD KANAN: PILIHAN TOP UP */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="glass-card p-6"
            >
              <h2 className="text-2xl font-bold text-slate-100 mb-6">
                Pilih Paket Top-up
              </h2>

              <div className="mb-6">
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  ID Player <span className="text-red-400">*</span>
                </label>
                <input
                  type="text"
                  value={playerId}
                  onChange={(e) => setPlayerId(e.target.value)}
                  placeholder="Masukkan ID Player"
                  className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-lg text-slate-300 focus:ring-2 focus:ring-primary-500 focus:border-transparent transition"
                />
              </div>

              <div className="mb-6">
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Nama Player (Opsional)
                </label>
                <input
                  type="text"
                  value={playerName}
                  onChange={(e) => setPlayerName(e.target.value)}
                  placeholder="Masukkan Nama Player"
                  className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-lg text-slate-300 focus:ring-2 focus:ring-primary-500 focus:border-transparent transition"
                />
              </div>

              <div className="mb-8">
                <label className="block text-sm font-medium text-slate-300 mb-4">
                  Pilih Paket <span className="text-red-400">*</span>
                </label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {packages.map((pkg) => (
                    <motion.div
                      key={pkg.id}
                      whileHover={{ scale: 1.02 }}
                      onClick={() => setSelectedPackage(pkg.id)}
                      className={`relative border-2 rounded-lg p-4 cursor-pointer transition-all duration-200 ${
                        selectedPackage === pkg.id
                          ? 'border-primary-500 bg-primary-500/10'
                          : 'border-slate-700 hover:border-primary-600'
                      }`}
                    >
                      {pkg.isPopular && (
                        <div className="absolute -top-3 left-4 bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-3 py-1 rounded-full text-xs font-medium flex items-center space-x-1">
                          <Crown className="h-3 w-3" />
                          <span>Popular</span>
                        </div>
                      )}

                      <div className="flex items-center justify-between mb-2">
                        <h3 className="font-semibold text-slate-100">
                          {pkg.name}
                        </h3>
                        {selectedPackage === pkg.id && (
                          <div className="w-6 h-6 bg-primary-500 rounded-full flex items-center justify-center">
                            <Check className="h-4 w-4 text-white" />
                          </div>
                        )}
                      </div>

                      <p className="text-sm text-slate-400 mb-3">
                        {pkg.description}
                      </p>

                      <div className="flex items-center space-x-2">
                        <span className="text-lg font-bold text-primary-400">
                          {formatCurrency(pkg.price)}
                        </span>
                        {pkg.originalPrice && (
                          <span className="text-sm text-slate-500 line-through">
                            {formatCurrency(pkg.originalPrice)}
                          </span>
                        )}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>

              {selectedPkg && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-slate-800/50 rounded-lg p-4 mb-6 border border-slate-700"
                >
                  <h3 className="font-semibold text-slate-100 mb-3">
                    Ringkasan Pesanan
                  </h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-slate-400">Game</span>
                      <span className="font-medium text-slate-200">
                        {game.name}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Paket</span>
                      <span className="font-medium text-slate-200">
                        {selectedPkg.name}
                      </span>
                    </div>
                    <div className="border-t border-slate-700 my-2"></div>
                    <div className="flex justify-between text-base">
                      <span className="font-semibold text-slate-200">
                        Total
                      </span>
                      <span className="font-bold text-primary-400">
                        {formatCurrency(selectedPkg.price)}
                      </span>
                    </div>
                  </div>
                </motion.div>
              )}

              <button
                onClick={handlePurchase}
                disabled={!selectedPackage || !playerId}
                className="w-full py-3 rounded-lg font-semibold transition-all flex items-center justify-center space-x-2 bg-primary-600 text-white hover:bg-primary-700 disabled:bg-slate-600 disabled:text-slate-400 disabled:cursor-not-allowed shadow-lg shadow-primary-500/20 disabled:shadow-none"
              >
                <ShoppingCart className="h-5 w-5" />
                <span>Lanjutkan</span>
              </button>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GameDetail;
