import { Link } from 'react-router-dom';

export default function Terms() {
  return (
    <div className="min-h-screen max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <h1 className="text-3xl sm:text-4xl font-bold text-slate-100 text-center mb-8">
        Syarat & Ketentuan
      </h1>

      <div className="glass-card p-6 rounded-lg space-y-6 text-slate-300 text-base sm:text-lg leading-relaxed">
        <section>
          <h2 className="text-xl font-semibold text-slate-100 mb-2">1. Ketentuan Umum</h2>
          <p>
            Dengan menggunakan platform ini, Anda dianggap telah membaca dan menyetujui semua Syarat & Ketentuan yang berlaku.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-slate-100 mb-2">2. Akun Pengguna</h2>
          <p>
            Anda bertanggung jawab menjaga kerahasiaan akun dan kata sandi. Segala aktivitas yang menggunakan akun Anda menjadi tanggung jawab Anda.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-slate-100 mb-2">3. Transaksi</h2>
          <p>
            Semua transaksi yang sudah dikonfirmasi tidak dapat dibatalkan atau dikembalikan kecuali ada kesalahan teknis dari pihak kami.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-slate-100 mb-2">4. Pembatasan</h2>
          <p>
            Platform ini tidak boleh digunakan untuk tujuan ilegal, penipuan, atau aktivitas lain yang melanggar hukum.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-slate-100 mb-2">5. Perubahan</h2>
          <p>
            Kami berhak mengubah Syarat & Ketentuan kapan saja. Perubahan akan diumumkan melalui platform ini.
          </p>
        </section>
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
