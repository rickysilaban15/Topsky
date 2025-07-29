import { Link } from 'react-router-dom';
import {
  Gamepad2,
  Facebook,
  Instagram,
  Github,
  Phone,
} from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-slate-900 border-t border-slate-800 print-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Grid utama */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand dan deskripsi */}
          <div className="col-span-1 md:col-span-2">
            <Link to="/" className="flex items-center space-x-2 mb-4">
              <div className="bg-gradient-to-r from-primary-500 to-primary-600 p-2 rounded-lg shadow-md">
                <Gamepad2 className="h-6 w-6 text-white" />
              </div>
              <span className="text-2xl font-bold text-white">Topsky</span>
            </Link>
            <p className="text-slate-400 mb-6 max-w-md leading-relaxed">
              Platform top-up game terpercaya di Indonesia. Layanan kami aman, 
              cepat, dan terjangkau untuk semua game favoritmu.
            </p>
            <div className="flex space-x-4">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-slate-400 hover:text-pink-500 transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="h-6 w-6" />
              </a>
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-slate-400 hover:text-gray-300 transition-colors"
                aria-label="GitHub"
              >
                <Github className="h-6 w-6" />
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-slate-400 hover:text-blue-500 transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="h-6 w-6" />
              </a>
              <a
                href="https://wa.me/6281234567890"
                target="_blank"
                rel="noopener noreferrer"
                className="text-slate-400 hover:text-green-500 transition-colors"
                aria-label="WhatsApp"
              >
                <Phone className="h-6 w-6" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-slate-200">
              Quick Links
            </h3>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/"
                  className="text-slate-400 hover:text-white transition-colors"
                >
                  Beranda
                </Link>
              </li>
              <li>
                <Link
                  to="/games"
                  className="text-slate-400 hover:text-white transition-colors"
                >
                  Semua Game
                </Link>
              </li>
              <li>
                <Link
                  to="/profile"
                  className="text-slate-400 hover:text-white transition-colors"
                >
                  Profil
                </Link>
              </li>
              <li>
                <Link
                  to="/transactions"
                  className="text-slate-400 hover:text-white transition-colors"
                >
                  Riwayat Transaksi
                </Link>
              </li>
            </ul>
          </div>

          {/* Bantuan */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-slate-200">
              Bantuan
            </h3>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/faq"
                  className="text-slate-400 hover:text-white transition-colors"
                >
                  FAQ
                </Link>
              </li>
              <li>
                <Link
                  to="/how-to-topup"
                  className="text-slate-400 hover:text-white transition-colors"
                >
                  Cara Top-up
                </Link>
              </li>
              <li>
                <Link
                  to="/contact-us"
                  className="text-slate-400 hover:text-white transition-colors"
                >
                  Hubungi Kami
                </Link>
              </li>
              <li>
                <Link
                  to="/terms"
                  className="text-slate-400 hover:text-white transition-colors"
                >
                  Syarat & Ketentuan
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Metode pembayaran */}
        <div className="mt-10 border-t border-slate-800 pt-8 text-center">
          <p className="text-slate-300 mb-4">Metode Pembayaran yang Tersedia</p>
          <div className="flex flex-wrap justify-center items-center gap-4 mb-6">
            <img
              src="/images/payments/bankbca.png"
              alt="BCA"
              className="h-8 object-contain"
            />
            <img
              src="/images/payments/bakmandiri.png"
              alt="Mandiri"
              className="h-8 object-contain"
            />
            <img
              src="/images/payments/gopaygo.png"
              alt="Gopay"
              className="h-8 object-contain"
            />
            <img
              src="/images/payments/danabos.png"
              alt="DANA"
              className="h-8 object-contain"
            />
            <img
              src="/images/payments/ovoo.png"
              alt="OVO"
              className="h-8 object-contain"
            />
            <img
              src="/images/payments/visa.png"
              alt="Visa"
              className="h-8 object-contain"
            />
          </div>
          <p className="text-slate-500">
            © 2025 <span className="font-semibold">Topsky</span>. Semua hak
            cipta dilindungi.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
