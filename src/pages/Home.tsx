import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Users, Zap, Shield } from 'lucide-react';
import { useApp } from '../context/AppContext';
import GameCard from '../components/Common/GameCard';
import { motion } from 'framer-motion';

const Home: React.FC = () => {
  const { state } = useApp();
  const popularGames = state.games.filter(game => game.isPopular);
  const allGamesPreview = state.games.slice(0, 8);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  return (
    <div className="text-white bg-gradient-to-b from-slate-950 to-slate-900 min-h-screen">
      {/* Hero Section */}
      <section className="relative text-white py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-primary-800/40 to-teal-600/30 blur-md opacity-70" />
        <div className="relative max-w-7xl mx-auto px-6">
          <div className="text-center">
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, type: 'spring' }}
              className="text-5xl md:text-6xl font-extrabold leading-tight tracking-tight"
            >
              Top-up Game Favoritmu
              <span className="block mt-2 bg-clip-text text-transparent bg-gradient-to-r from-primary-400 to-teal-400">
                Mudah, Cepat & Aman
              </span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2, type: 'spring' }}
              className="text-lg md:text-xl text-slate-300 mt-6 max-w-2xl mx-auto"
            >
              Platform top-up terpercaya dengan ribuan pilihan game. Dapatkan item game dalam hitungan detik.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.4, type: 'spring' }}
              className="mt-10"
            >
              <Link
                to="/games"
                className="bg-gradient-to-r from-primary-500 to-teal-500 hover:from-primary-600 hover:to-teal-600 transition-all px-8 py-4 rounded-xl text-lg font-semibold shadow-lg hover:scale-105 inline-flex items-center gap-2"
              >
                Mulai Top-up Sekarang
                <ArrowRight className="w-5 h-5" />
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 bg-slate-900/60 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-14">
            <h2 className="text-3xl font-bold">Kenapa Pilih Topsky?</h2>
            <p className="text-slate-400 max-w-xl mx-auto mt-2">
              Kami berkomitmen memberikan pengalaman top-up terbaik dengan layanan berkualitas.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[{
              icon: <Zap className="h-8 w-8 text-teal-400" />,
              title: "Proses Super Cepat",
              desc: "Top-up selesai dalam hitungan detik. Tidak perlu menunggu lama untuk kembali bermain."
            }, {
              icon: <Shield className="h-8 w-8 text-teal-400" />,
              title: "100% Aman & Terpercaya",
              desc: "Sistem keamanan berlapis dan transaksi terenkripsi untuk melindungi data Anda."
            }, {
              icon: <Users className="h-8 w-8 text-teal-400" />,
              title: "Customer Service 24/7",
              desc: "Tim support kami siap membantu kapan saja jika Anda mengalami kendala."
            }].map((feature, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: i * 0.2 }}
                viewport={{ once: true }}
                className="bg-white/5 backdrop-blur-lg rounded-xl p-6 border border-white/10 shadow-md text-center hover:shadow-xl transition"
              >
                <div className="mb-4 flex items-center justify-center">
                  <div className="bg-teal-800/10 p-4 rounded-full border border-teal-400/50">
                    {feature.icon}
                  </div>
                </div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-slate-400">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Popular Games */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-3xl font-bold">Game Populer</h2>
              <p className="text-slate-400">Game yang paling banyak di-top-up oleh pengguna Topsky</p>
            </div>
            <Link
              to="/games"
              className="text-primary-400 hover:underline inline-flex items-center gap-1"
            >
              Lihat Semua
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {popularGames.slice(0, 4).map((game, index) => (
              <GameCard key={game.id} game={game} index={index} />
            ))}
          </motion.div>
        </div>
      </section>

      {/* All Games */}
      <section className="py-20 bg-slate-900/50 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-4">Semua Game Tersedia</h2>
          <p className="text-slate-400 mb-10 max-w-xl mx-auto">
            Dari MOBA hingga Battle Royale, kami menyediakan top-up untuk semua game favoritmu.
          </p>
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-10"
          >
            {allGamesPreview.map((game, index) => (
              <GameCard key={game.id} game={game} index={index} />
            ))}
          </motion.div>
          <Link
            to="/games"
            className="bg-gradient-to-r from-primary-600 to-teal-600 px-6 py-3 rounded-xl text-white font-semibold shadow-lg hover:scale-105 transition inline-flex items-center gap-2"
          >
            Lihat Semua Game
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;
