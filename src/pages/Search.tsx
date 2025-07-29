import React, { useMemo } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { Search as SearchIcon, ArrowRight } from 'lucide-react';
import { games } from '../data/games';
import GameCard from '../components/Common/GameCard';

const Search: React.FC = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q') || '';

  const searchResults = useMemo(() => {
    if (!query.trim()) {
      return [];
    }
    return games.filter(game =>
      game.name.toLowerCase().includes(query.toLowerCase()) ||
      game.publisher.toLowerCase().includes(query.toLowerCase()) ||
      game.category.toLowerCase().includes(query.toLowerCase())
    );
  }, [query]);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Hasil Pencarian untuk "{query}"
          </h1>
          <p className="text-gray-600">
            {searchResults.length > 0
              ? `Ditemukan ${searchResults.length} game yang cocok`
              : 'Tidak ada game yang cocok dengan pencarian Anda'}
          </p>
        </div>

        {searchResults.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {searchResults.map((game, index) => (
              <GameCard key={game.id} game={game} index={index} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16 bg-white rounded-xl shadow-md">
            <div className="text-primary-300 mb-4">
              <SearchIcon className="h-16 w-16 mx-auto" />
            </div>
            <h3 className="text-xl font-medium text-gray-900 mb-2">Game Tidak Ditemukan</h3>
            <p className="text-gray-600 mb-6">
              Coba gunakan kata kunci lain atau jelajahi semua game kami.
            </p>
            <Link
              to="/games"
              className="bg-primary-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-primary-700 transition-colors inline-flex items-center space-x-2"
            >
              <span>Lihat Semua Game</span>
              <ArrowRight className="h-5 w-5" />
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Search;
