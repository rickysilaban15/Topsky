import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { ArrowLeft, Check, CreditCard, Smartphone, Building2, Copy, Loader2, QrCode } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Timer from '../components/Transaction/Timer';
import Step from '../components/Transaction/Step';

interface PaymentMethod {
  id: string;
  name: string;
  type: 'bank' | 'ewallet';
  icon: React.ReactNode;
  fee: number;
}

const TransactionProgress: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { state, dispatch } = useApp();

  const [isProcessing, setIsProcessing] = useState(false);
  const [isCreatingQR, setIsCreatingQR] = useState(false);
  const [selectedPayment, setSelectedPayment] = useState<string>('');
  const [copied, setCopied] = useState(false);

  // State khusus QRIS
  const [qrUrl, setQrUrl] = useState<string | null>(null);
  const [qrString, setQrString] = useState<string | null>(null);

  const transaction = state.transactions.find(t => t.id === id);

  useEffect(() => {
    if (transaction?.status === 'processing') {
      const timer = setTimeout(() => {
        dispatch({ type: 'UPDATE_TRANSACTION_STATUS', payload: { id: transaction.id, status: 'completed' } });
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [transaction, dispatch]);

  const paymentMethods: PaymentMethod[] = [
    // Tambahkan QRIS di paling atas agar mudah dipilih
    { id: 'qris', name: 'QRIS (Semua e-wallet & m-banking)', type: 'ewallet', icon: <QrCode className="h-6 w-6" />, fee: 0 },
    { id: 'bca', name: 'BCA Virtual Account', type: 'bank', icon: <Building2 className="h-6 w-6" />, fee: 2500 },
    { id: 'bni', name: 'BNI Virtual Account', type: 'bank', icon: <Building2 className="h-6 w-6" />, fee: 2500 },
    { id: 'bri', name: 'BRI Virtual Account', type: 'bank', icon: <Building2 className="h-6 w-6" />, fee: 2500 },
    { id: 'mandiri', name: 'Mandiri Virtual Account', type: 'bank', icon: <Building2 className="h-6 w-6" />, fee: 2500 },
    { id: 'cimb', name: 'CIMB Virtual Account', type: 'bank', icon: <Building2 className="h-6 w-6" />, fee: 2500 },
    { id: 'permata', name: 'Permata Virtual Account', type: 'bank', icon: <Building2 className="h-6 w-6" />, fee: 2500 },
    { id: 'gopay', name: 'GoPay', type: 'ewallet', icon: <Smartphone className="h-6 w-6" />, fee: 0 },
    { id: 'ovo', name: 'OVO', type: 'ewallet', icon: <Smartphone className="h-6 w-6" />, fee: 0 },
    { id: 'dana', name: 'DANA', type: 'ewallet', icon: <Smartphone className="h-6 w-6" />, fee: 0 },
  ];

  if (!transaction) {
    return (
      <div className="min-h-screen flex items-center justify-center text-center">
        <h2 className="text-2xl font-bold text-slate-100">Transaksi tidak ditemukan.</h2>
      </div>
    );
  }

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const formatCurrency = (amount: number) =>
    new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(amount);

  const getStepStatus = () => {
    switch (transaction.status) {
      case 'waiting_payment': return 1;
      case 'processing': return 2;
      case 'completed': return 3;
      default: return 0;
    }
  };

  const currentStep = getStepStatus();

  // --- Tambah: polling status saat ada QR (QRIS) dan masih waiting_payment ---
  useEffect(() => {
    let interval: number | undefined;

    if (transaction.status === 'waiting_payment' && (qrUrl || qrString)) {
      interval = window.setInterval(async () => {
        try {
          const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/payments/status/${transaction.id}`);
          const data = await res.json();
          const st = data?.transaction_status as string | undefined;

          if (st === 'settlement') {
            // Lanjutkan sesuai alurmu: processing → completed
            dispatch({ type: 'UPDATE_TRANSACTION_STATUS', payload: { id: transaction.id, status: 'processing' } });
            setTimeout(() => {
              dispatch({ type: 'UPDATE_TRANSACTION_STATUS', payload: { id: transaction.id, status: 'completed' } });
            }, 1200);
          }

          if (st && ['expire', 'cancel', 'deny', 'failure'].includes(st)) {
            // Reset QR jika gagal/kadaluarsa
            setQrUrl(null);
            setQrString(null);
          }
        } catch (e) {
          console.error(e);
        }
      }, 4000);
    }

    return () => { if (interval) clearInterval(interval); };
  }, [transaction.status, qrUrl, qrString, dispatch, transaction.id]);

  // --- Ubah handlePayment jadi async untuk QRIS ---
  const handlePayment = async () => {
    if (!selectedPayment) return;
    const paymentMethod = paymentMethods.find(p => p.id === selectedPayment);

    // Alur khusus QRIS: minta QR ke backend dan tampilkan
    if (selectedPayment === 'qris') {
      try {
        setIsCreatingQR(true);
        setIsProcessing(true);

        // Pastikan order_id unik; jika id transaksi sudah unik, pakai itu.
        const orderId = transaction.id;
        const amountWithFee = transaction.amount + (paymentMethod?.fee || 0);

        const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/payments/qris`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            order_id: orderId,
            amount: amountWithFee,
            items: [{
              id: 'topup',
              price: transaction.amount,
              quantity: 1,
              name: 'TopUp'
            }]
          })
        });

        const data = await res.json();
        if (!res.ok) throw new Error(data?.message || 'Gagal membuat QRIS');

        setQrUrl(data?.qr_url || null);
        setQrString(data?.qr_string || null);

        // Tetap di waiting_payment, cukup set paymentMethod agar UI kamu konsisten
        dispatch({
          type: 'UPDATE_TRANSACTION_STATUS',
          payload: { id: transaction.id, status: 'waiting_payment', paymentMethod: paymentMethod?.name }
        });
      } catch (err) {
        console.error(err);
        alert('Gagal membuat QRIS. Coba lagi.');
      } finally {
        setIsCreatingQR(false);
        setIsProcessing(false);
      }
      return;
    }

    // Metode lain (simulasi lama)
    setIsProcessing(true);
    setTimeout(() => {
      dispatch({
        type: 'UPDATE_TRANSACTION_STATUS',
        payload: { id: transaction.id, status: 'processing', paymentMethod: paymentMethod?.name }
      });
      setIsProcessing(false);
    }, 1500);
  };

  return (
    <div className="min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <button onClick={() => navigate(-1)} className="flex items-center space-x-2 text-slate-400 hover:text-white mb-6 transition-colors print-hidden">
          <ArrowLeft className="h-5 w-5" />
          <span>Kembali</span>
        </button>

        <div className="glass-card p-6 md:p-8">
          <h1 className="text-3xl font-bold text-slate-100 mb-4">Progress Transaksi</h1>
          <p className="text-slate-400 mb-8">ID Transaksi: {transaction.id}</p>

          <div className="flex justify-between items-center mb-12">
            <Step number={1} label="Transaksi Dibuat" active={currentStep >= 0} done={currentStep > 0} />
            <div className="flex-1 h-0.5 bg-slate-700"></div>
            <Step number={2} label="Pembayaran" active={currentStep >= 1} done={currentStep > 1} />
            <div className="flex-1 h-0.5 bg-slate-700"></div>
            <Step number={3} label="Sedang Di Proses" active={currentStep >= 2} done={currentStep > 2} />
            <div className="flex-1 h-0.5 bg-slate-700"></div>
            <Step number={4} label="Transaksi Selesai" active={currentStep >= 3} done={currentStep >= 3} />
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={transaction.status}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              {transaction.status === 'waiting_payment' && (
                <div>
                  <h2 className="text-2xl font-semibold text-center text-slate-100 mb-2">Menunggu Pembayaran</h2>
                  <p className="text-center text-slate-400 mb-4">Selesaikan pembayaran dalam:</p>
                  <Timer expiryTimestamp={new Date(transaction.createdAt).getTime() + 3 * 60 * 60 * 1000} />

                  <div className="my-8 border-t border-slate-700"></div>

                  <h3 className="text-xl font-semibold text-slate-200 mb-4">Pilih Metode Pembayaran</h3>
                  <div className="space-y-4">
                    {paymentMethods.map(method => (
                      <div
                        key={method.id}
                        onClick={() => setSelectedPayment(method.id)}
                        className={`border-2 rounded-lg p-4 cursor-pointer transition-all duration-200 flex justify-between items-center ${
                          selectedPayment === method.id ? 'border-primary-500 bg-primary-500/10' : 'border-slate-700 hover:border-primary-600'
                        }`}
                      >
                        <div className="flex items-center space-x-4">
                          <div className="text-primary-400">{method.icon}</div>
                          <div>
                            <p className="font-semibold text-slate-200">{method.name}</p>
                            <p className="text-sm text-slate-400">Biaya Admin: {formatCurrency(method.fee)}</p>
                          </div>
                        </div>
                        {selectedPayment === method.id && (
                          <div className="w-6 h-6 bg-primary-500 rounded-full flex items-center justify-center">
                            <Check className="h-4 w-4 text-white" />
                          </div>
                        )}
                      </div>
                    ))}
                  </div>

                  <div className="mt-8 text-center">
                    <button
                      onClick={handlePayment}
                      disabled={!selectedPayment || isProcessing}
                      className="bg-primary-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-primary-700 transition-colors disabled:bg-slate-600 disabled:cursor-not-allowed flex items-center justify-center w-full md:w-auto mx-auto"
                    >
                      {(isProcessing || isCreatingQR) ? <Loader2 className="animate-spin mr-2" /> : null}
                      Bayar Sekarang - {formatCurrency(transaction.amount + (paymentMethods.find(p => p.id === selectedPayment)?.fee || 0))}
                    </button>
                  </div>

                  {/* --- TAMPILKAN QRIS SETELAH DIBUAT --- */}
                  {selectedPayment === 'qris' && (qrUrl || qrString) && (
                    <div className="mt-8 bg-slate-800/60 border border-slate-700 rounded-lg p-6">
                      <h4 className="text-lg font-semibold text-slate-100 mb-3">Scan QRIS untuk membayar</h4>

                      {qrUrl && (
                        <div className="flex flex-col items-center">
                          <img src={qrUrl} alt="QRIS" className="w-64 h-64 object-contain bg-white p-2 rounded" />
                          <p className="text-slate-400 text-sm mt-3">
                            Bisa dibayar lewat GoPay, OVO, DANA, ShopeePay, atau mobile banking.
                          </p>
                        </div>
                      )}

                      {qrString && (
                        <div className="mt-4">
                          <div className="flex items-center justify-between bg-slate-900 rounded px-3 py-2">
                            <span className="truncate text-slate-300">{qrString}</span>
                            <button
                              onClick={() => copyToClipboard(qrString)}
                              className="flex items-center gap-2 text-primary-400 hover:text-primary-300"
                            >
                              <Copy className="h-4 w-4" /> {copied ? 'Tersalin' : 'Salin'}
                            </button>
                          </div>
                          <p className="text-xs text-slate-500 mt-1">Beberapa aplikasi menyediakan input “kode QR” manual.</p>
                        </div>
                      )}

                      <div className="mt-4 text-sm text-slate-400">
                        <ul className="list-disc list-inside space-y-1">
                          <li>Jangan tutup halaman ini sampai pembayaran berhasil.</li>
                          <li>QR dapat kadaluarsa ±15 menit (tergantung pengaturan Midtrans).</li>
                          <li>Status akan berubah otomatis setelah pembayaran terkonfirmasi.</li>
                        </ul>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {transaction.status === 'processing' && (
                <div className="text-center py-10">
                  <Loader2 className="h-16 w-16 text-primary-400 mx-auto animate-spin mb-6" />
                  <h2 className="text-2xl font-semibold text-slate-100">Pembayaran Diterima</h2>
                  <p className="text-slate-400">Pesanan Anda sedang kami proses. Mohon tunggu sebentar.</p>
                </div>
              )}

              {transaction.status === 'completed' && (
                <div className="text-center py-10">
                  <div className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-6 border-2 border-green-500">
                    <Check className="h-12 w-12 text-green-400" />
                  </div>
                  <h2 className="text-3xl font-bold text-slate-100">Transaksi Selesai!</h2>
                  <p className="text-slate-400 mb-6">Top-up Anda telah berhasil. Selamat bermain!</p>
                  <button
                    onClick={() => navigate(`/invoice/${transaction.id}`)}
                    className="bg-primary-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-primary-700 transition-colors"
                  >
                    Lihat Invoice
                  </button>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default TransactionProgress;
