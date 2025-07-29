import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

export default function HowToTopup() {
  return (
    <div className="min-h-screen max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <h1 className="text-3xl sm:text-4xl font-bold text-slate-100 text-center mb-8">
        Cara Melakukan Top-Up
      </h1>

      <div className="space-y-6 text-slate-300 text-base sm:text-lg">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-card p-5 rounded-lg"
        >
          <h2 className="font-semibold text-primary-300 mb-2">1. Pilih Game</h2>
          <p>Pilih game yang ingin kamu top-up dari daftar yang tersedia di halaman utama.</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="glass-card p-5 rounded-lg"
        >
          <h2 className="font-semibold text-primary-300 mb-2">2. Masukkan User ID</h2>
          <p>Isi User ID dan/atau server ID sesuai petunjuk di halaman game.</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="glass-card p-5 rounded-lg"
        >
          <h2 className="font-semibold text-primary-300 mb-2">3. Pilih Nominal Top-Up</h2>
          <p>Pilih paket/top-up sesuai kebutuhan, lalu lanjutkan ke metode pembayaran.</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="glass-card p-5 rounded-lg"
        >
          <h2 className="font-semibold text-primary-300 mb-2">4. Selesaikan Pembayaran</h2>
          <p>
            Pilih metode pembayaran (e-wallet, transfer bank, kartu kredit, dll).
            Saldo akan otomatis masuk setelah pembayaran terkonfirmasi.
          </p>
        </motion.div>
      </div>

      <div className="text-center mt-10">
        <Link
          to="/"
          className="inline-block px-6 py-3 rounded-lg bg-primary-600 hover:bg-primary-700 text-white font-semibold transition-colors"
        >
          Kembali ke Beranda
        </Link>
      </div>
    </div>
  );
}
