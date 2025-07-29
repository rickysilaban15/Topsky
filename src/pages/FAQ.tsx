// src/pages/FAQ.tsx
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { Link } from 'react-router-dom';

const faqs = [
  {
    question: 'Bagaimana cara melakukan top-up game di platform ini?',
    answer:
      'Pilih game, masukkan User ID, pilih nominal, lalu selesaikan pembayaran. Saldo masuk otomatis setelah pembayaran terkonfirmasi.',
  },
  {
    question: 'Metode pembayaran apa saja yang tersedia?',
    answer:
      'Transfer bank, e-wallet (DANA, OVO, GoPay), dan kartu kredit/debit.',
  },
  {
    question: 'Berapa lama proses top-up?',
    answer:
      'Umumnya beberapa detik hingga 1 menit setelah pembayaran dikonfirmasi.',
  },
  {
    question: 'Apakah ada biaya tambahan?',
    answer:
      'Tidak ada biaya tambahan—harga yang tertera adalah harga yang dibayar.',
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const toggle = (i: number) => setOpenIndex(prev => (prev === i ? null : i));

  return (
    <div className="min-h-screen max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <h1 className="text-3xl sm:text-4xl font-bold text-slate-100 text-center mb-8">
        FAQ — Pertanyaan yang Sering Diajukan
      </h1>

      <div className="space-y-4">
        {faqs.map((faq, i) => (
          <div key={i} className="glass-card rounded-lg">
            <button
              className="w-full flex justify-between items-center px-4 py-3 text-left text-slate-200 font-medium"
              onClick={() => toggle(i)}
              aria-expanded={openIndex === i}
              aria-controls={`faq-panel-${i}`}
            >
              {faq.question}
              <ChevronDown
                className={`h-5 w-5 transition-transform ${openIndex === i ? 'rotate-180' : ''}`}
                aria-hidden="true"
              />
            </button>

            <AnimatePresence initial={false}>
              {openIndex === i && (
                <motion.div
                  id={`faq-panel-${i}`}
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.25 }}
                  className="px-4 pb-4 text-slate-400 text-sm sm:text-base"
                >
                  {faq.answer}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
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
