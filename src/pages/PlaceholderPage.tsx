import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Construction } from 'lucide-react';

interface PlaceholderPageProps {
  title: string;
}

const PlaceholderPage: React.FC<PlaceholderPageProps> = ({ title }) => {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="text-center p-8">
        <Construction className="h-24 w-24 text-primary-300 mx-auto mb-6" />
        <h1 className="text-4xl font-bold text-gray-800 mb-4">{title}</h1>
        <p className="text-lg text-gray-600 mb-8">
          Halaman ini sedang dalam pengembangan.
        </p>
        <Link
          to="/"
          className="bg-primary-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-primary-700 transition-colors inline-flex items-center space-x-2"
        >
          <ArrowLeft className="h-5 w-5" />
          <span>Kembali ke Beranda</span>
        </Link>
      </div>
    </div>
  );
};

export default PlaceholderPage;
