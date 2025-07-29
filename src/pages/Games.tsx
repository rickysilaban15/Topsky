import React, { useState, useMemo } from 'react';
import { Filter, Search } from 'lucide-react';
import { useApp } from '../context/AppContext';
import GameCard from '../components/Common/GameCard';
import { motion, AnimatePresence } from 'framer-motion';

const Games: React.FC = () => {
  const { state } = useApp();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [showFilters, setShowFilters] = useState(false);

  const categories = useMemo(() => {
    const uniqueCategories = Array.from(new Set(state.games.map(game => game.category)));
    return ['all', ...uniqueCategories];
  }, [state.games]);

  const filteredGames = useMemo(() => {
    return state.games.filter(game => {
      const matchesSearch =
        game.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        game.publisher.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory === 'all' || game.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [searchTerm, selectedCategory, state.games]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.05 }
    }
  };

  return (
    <div className="min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold text-slate-100 mb-2">Semua Game</h1>
          <p className="text-slate-400">Pilih game favoritmu dan mulai top-up sekarang</p>
        </div>

        {/* Search and Filter */}
        <div className="glass-card p-6 mb-8">
          <div className="flex flex-col md:flex-row gap-4 items-stretch md:items-center">
            {/* Search */}
            <div className="flex-1 relative">
              <label htmlFor="search-games" className="sr-only">
                Cari game atau publisher
              </label>
              <input
                id="search-games"
                type="text"
                placeholder="Cari game atau publisher..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-slate-800 border border-slate-700 rounded-lg text-slate-300 focus:ring-2 focus:ring-primary-500 focus:border-transparent transition"
              />
              <Search
                className="absolute left-3 top-3.5 h-5 w-5 text-slate-400"
                aria-hidden={true}
              />
            </div>

            {/* Filter Button - Mobile */}
            <button
  type="button"
  onClick={() => setShowFilters(!showFilters)}
  className="md:hidden flex items-center justify-center space-x-2 bg-primary-600 text-white px-4 py-3 rounded-lg hover:bg-primary-700 transition-colors"
  aria-expanded={showFilters}           // ✅ boolean (true/false)
  aria-controls="mobile-filter-panel"   // ✅ harus cocok dengan id panel
>
  <Filter className="h-5 w-5" aria-hidden={true} />
  <span>Filter</span>
</button>


            {/* Category Filter - Desktop */}
            <div className="hidden md:flex items-center gap-2">
              <label
                htmlFor="category-desktop"
                className="text-slate-300 text-sm font-medium"
              >
                Kategori
              </label>
              <select
                id="category-desktop"
                name="category"
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full md:w-auto px-4 py-3 border border-slate-700 rounded-lg bg-slate-800 text-slate-300 focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              >
                {categories.map((category) => (
                  <option
                    key={category}
                    value={category}
                    className="bg-slate-800 text-slate-300"
                  >
                    {category === 'all' ? 'Semua Kategori' : category}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Mobile Filter Panel */}
          <AnimatePresence>
            {showFilters && (
              <motion.div
                id="mobile-filter-panel"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="md:hidden mt-4 pt-4 border-t border-slate-700"
                role="region"
                aria-label="Panel filter kategori"
              >
                <label
                  htmlFor="category-mobile"
                  className="block text-sm font-medium text-slate-400 mb-2"
                >
                  Kategori
                </label>
                <select
                  id="category-mobile"
                  name="category"
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="w-full px-4 py-3 border border-slate-700 rounded-lg bg-slate-800 text-slate-300 focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                >
                  {categories.map((category) => (
                    <option
                      key={category}
                      value={category}
                      className="bg-slate-800 text-slate-300"
                    >
                      {category === 'all' ? 'Semua Kategori' : category}
                    </option>
                  ))}
                </select>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Results Info */}
        <div className="mb-6">
          <p className="text-slate-400">
            Menampilkan {filteredGames.length} dari {state.games.length} game
            {searchTerm && ` untuk "${searchTerm}"`}
            {selectedCategory !== 'all' && ` dalam kategori ${selectedCategory}`}
          </p>
        </div>

        {/* Games Grid */}
        {filteredGames.length > 0 ? (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
          >
            {filteredGames.map((game, index) => (
              <GameCard key={game.id} game={game} index={index} />
            ))}
          </motion.div>
        ) : (
          <div className="text-center py-12 glass-card">
            <div className="text-slate-500 mb-4">
              <Search className="h-12 w-12 mx-auto" aria-hidden={true} />
            </div>
            <h3 className="text-lg font-medium text-slate-200 mb-2">Game tidak ditemukan</h3>
            <p className="text-slate-400">
              Coba ubah kata kunci pencarian atau filter kategori
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Games;
