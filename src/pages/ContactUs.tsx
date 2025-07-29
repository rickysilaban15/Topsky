import { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function ContactUs() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: kirim data form ke backend/email service
    alert('Pesan Anda sudah terkirim!');
    setFormData({ name: '', email: '', message: '' });
  };

  return (
    <div className="min-h-screen max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <h1 className="text-3xl sm:text-4xl font-bold text-slate-100 text-center mb-8">
        Hubungi Kami
      </h1>

      <div className="glass-card p-6 rounded-lg mb-8">
        <p className="text-slate-300 mb-3">
          Jika ada pertanyaan atau masalah, silakan hubungi kami melalui form di bawah atau gunakan kontak resmi kami:
        </p>
        <div className="space-y-2 text-slate-400">
          <div className="flex items-center gap-2">
            <Mail className="h-5 w-5 text-primary-400" /> support@topsky.com
          </div>
          <div className="flex items-center gap-2">
            <Phone className="h-5 w-5 text-primary-400" /> +62 812-3456-7890
          </div>
        </div>
      </div>

      <motion.form
        onSubmit={handleSubmit}
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-card p-6 rounded-lg space-y-4"
      >
        <div>
          <label htmlFor="name" className="block text-slate-400 mb-1">Nama</label>
          <input
            type="text"
            id="name"
            name="name"
            required
            value={formData.name}
            onChange={handleChange}
            className="w-full rounded-lg bg-slate-800 border border-slate-700 px-4 py-2 text-slate-300 focus:ring-2 focus:ring-primary-500"
          />
        </div>
        <div>
          <label htmlFor="email" className="block text-slate-400 mb-1">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            required
            value={formData.email}
            onChange={handleChange}
            className="w-full rounded-lg bg-slate-800 border border-slate-700 px-4 py-2 text-slate-300 focus:ring-2 focus:ring-primary-500"
          />
        </div>
        <div>
          <label htmlFor="message" className="block text-slate-400 mb-1">Pesan</label>
          <textarea
            id="message"
            name="message"
            required
            rows={5}
            value={formData.message}
            onChange={handleChange}
            className="w-full rounded-lg bg-slate-800 border border-slate-700 px-4 py-2 text-slate-300 focus:ring-2 focus:ring-primary-500"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-primary-600 hover:bg-primary-700 text-white font-semibold rounded-lg py-2 transition-colors"
        >
          Kirim Pesan
        </button>
      </motion.form>

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
