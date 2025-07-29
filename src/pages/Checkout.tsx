import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, CreditCard, Smartphone, Building2, Check, AlertCircle } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { motion } from 'framer-motion';

interface PaymentMethod {
  id: string;
  name: string;
  type: 'bank' | 'ewallet' | 'card';
  icon: React.ReactNode;
  fee: number;
}

const Checkout: React.FC = () => {
  const { state, dispatch } = useApp();
  const navigate = useNavigate();
  
  const [selectedPayment, setSelectedPayment] = useState<string>('');
  const [isProcessing, setIsProcessing] = useState(false);

  const paymentMethods: PaymentMethod[] = [
    {
      id: 'bca',
      name: 'Bank BCA',
      type: 'bank',
      icon: <Building2 className="h-6 w-6" />,
      fee: 2500
    },
    {
      id: 'bni',
      name: 'Bank BNI',
      type: 'bank',
      icon: <Building2 className="h-6 w-6" />,
      fee: 2500
    },
    {
      id: 'mandiri',
      name: 'Bank Mandiri',
      type: 'bank',
      icon: <Building2 className="h-6 w-6" />,
      fee: 2500
    },
    {
      id: 'gopay',
      name: 'GoPay',
      type: 'ewallet',
      icon: <Smartphone className="h-6 w-6" />,
      fee: 0
    },
    {
      id: 'ovo',
      name: 'OVO',
      type: 'ewallet',
      icon: <Smartphone className="h-6 w-6" />,
      fee: 0
    },
    {
      id: 'dana',
      name: 'DANA',
      type: 'ewallet',
      icon: <Smartphone className="h-6 w-6" />,
      fee: 0
    },
    {
      id: 'visa',
      name: 'Credit/Debit Card',
      type: 'card',
      icon: <CreditCard className="h-6 w-6" />,
      fee: 3000
    }
  ];

  if (!state.cart) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <AlertCircle className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Keranjang Kosong</h2>
          <p className="text-gray-600 mb-6">Silakan pilih game dan paket top-up terlebih dahulu</p>
          <button
            onClick={() => navigate('/games')}
            className="bg-primary-600 text-white px-6 py-2 rounded-lg hover:bg-primary-700 transition-colors"
          >
            Pilih Game
          </button>
        </div>
      </div>
    );
  }

  const selectedMethod = paymentMethods.find(m => m.id === selectedPayment);
  const subtotal = state.cart.package.price;
  const fee = selectedMethod?.fee || 0;
  const total = subtotal + fee;

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0
    }).format(amount);
  };

  const handlePayment = async () => {
    if (!selectedPayment) return;

    setIsProcessing(true);

    // Simulate payment processing
    setTimeout(() => {
      const transaction = {
        id: Date.now().toString(),
        userId: state.user!.id,
        gameId: state.cart!.game.id,
        packageId: state.cart!.package.id,
        amount: total,
        status: 'completed' as const,
        paymentMethod: selectedMethod!.name,
        createdAt: new Date().toISOString(),
        playerId: state.cart!.playerId,
        playerName: state.cart!.playerName
      };

      dispatch({ type: 'ADD_TRANSACTION', payload: transaction });
      dispatch({ type: 'CLEAR_CART' });
      
      setIsProcessing(false);
      navigate(`/invoice/${transaction.id}`);
    }, 3000);
  };

  if (isProcessing) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto mb-4"></div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Memproses Pembayaran</h2>
          <p className="text-gray-600">Mohon tunggu, jangan tutup halaman ini...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 mb-6 transition-colors"
        >
          <ArrowLeft className="h-5 w-5" />
          <span>Kembali</span>
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Order Summary */}
          <div className="lg:col-span-1 order-2 lg:order-1">
            <div className="bg-white rounded-xl shadow-md p-6 sticky top-8">
              <h2 className="text-xl font-bold text-gray-900 mb-6">Ringkasan Pesanan</h2>
              
              <div className="space-y-4 mb-6">
                <div className="flex items-center space-x-3">
                  <img
                    src={state.cart.game.image}
                    alt={state.cart.game.name}
                    className="w-16 h-16 rounded-lg object-cover"
                  />
                  <div>
                    <h3 className="font-semibold text-gray-900">{state.cart.game.name}</h3>
                    <p className="text-sm text-gray-600">{state.cart.package.name}</p>
                  </div>
                </div>

                <div className="bg-gray-50 rounded-lg p-3">
                  <div className="text-sm space-y-1">
                    <div className="flex justify-between">
                      <span className="text-gray-600">ID Player</span>
                      <span className="font-medium">{state.cart.playerId}</span>
                    </div>
                    {state.cart.playerName && (
                      <div className="flex justify-between">
                        <span className="text-gray-600">Nama Player</span>
                        <span className="font-medium">{state.cart.playerName}</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <div className="border-t pt-4 space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="font-medium">{formatCurrency(subtotal)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Biaya Admin</span>
                  <span className="font-medium">{formatCurrency(fee)}</span>
                </div>
                <div className="border-t pt-2 flex justify-between">
                  <span className="font-bold text-lg">Total</span>
                  <span className="font-bold text-lg text-primary-600">
                    {formatCurrency(total)}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Payment Method */}
          <div className="lg:col-span-2 order-1 lg:order-2">
            <div className="bg-white rounded-xl shadow-md p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Pilih Metode Pembayaran</h2>

              {/* Bank Transfer */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Transfer Bank</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {paymentMethods.filter(m => m.type === 'bank').map((method, index) => (
                    <motion.div
                      key={method.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                      onClick={() => setSelectedPayment(method.id)}
                      className={`border rounded-lg p-4 cursor-pointer transition-all ${
                        selectedPayment === method.id
                          ? 'border-primary-500 bg-primary-50'
                          : 'border-gray-300 hover:border-primary-300'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <div className="text-primary-600">{method.icon}</div>
                          <div>
                            <div className="font-medium">{method.name}</div>
                            <div className="text-sm text-gray-500">
                              Admin: {formatCurrency(method.fee)}
                            </div>
                          </div>
                        </div>
                        {selectedPayment === method.id && (
                          <Check className="h-5 w-5 text-primary-600" />
                        )}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* E-Wallet */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">E-Wallet</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  {paymentMethods.filter(m => m.type === 'ewallet').map((method, index) => (
                    <motion.div
                      key={method.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                      onClick={() => setSelectedPayment(method.id)}
                      className={`border rounded-lg p-4 cursor-pointer transition-all ${
                        selectedPayment === method.id
                          ? 'border-primary-500 bg-primary-50'
                          : 'border-gray-300 hover:border-primary-300'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <div className="text-primary-600">{method.icon}</div>
                          <div>
                            <div className="font-medium">{method.name}</div>
                            <div className="text-sm text-green-600">Gratis Admin</div>
                          </div>
                        </div>
                        {selectedPayment === method.id && (
                          <Check className="h-5 w-5 text-primary-600" />
                        )}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Credit Card */}
              <div className="mb-8">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Kartu Kredit/Debit</h3>
                {paymentMethods.filter(m => m.type === 'card').map((method, index) => (
                  <motion.div
                    key={method.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    onClick={() => setSelectedPayment(method.id)}
                    className={`border rounded-lg p-4 cursor-pointer transition-all ${
                      selectedPayment === method.id
                        ? 'border-primary-500 bg-primary-50'
                        : 'border-gray-300 hover:border-primary-300'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="text-primary-600">{method.icon}</div>
                        <div>
                          <div className="font-medium">{method.name}</div>
                          <div className="text-sm text-gray-500">
                            Admin: {formatCurrency(method.fee)}
                          </div>
                        </div>
                      </div>
                      {selectedPayment === method.id && (
                        <Check className="h-5 w-5 text-primary-600" />
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Pay Button */}
              <button
                onClick={handlePayment}
                disabled={!selectedPayment}
                className={`w-full py-3 rounded-lg font-semibold transition-colors ${
                  selectedPayment
                    ? 'bg-primary-600 text-white hover:bg-primary-700'
                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                }`}
              >
                Bayar Sekarang - {formatCurrency(total)}
              </button>

              <p className="text-sm text-gray-500 text-center mt-4">
                Dengan melanjutkan, Anda menyetujui syarat dan ketentuan kami
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
