import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Game } from '../../types';
import { faker } from '@faker-js/faker';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Edit, Trash2 } from 'lucide-react';

const AdminGames: React.FC = () => {
  const { state, dispatch } = useApp();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentGame, setCurrentGame] = useState<Game | null>(null);

  const openModal = (game: Game | null = null) => {
    setCurrentGame(game);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setCurrentGame(null);
    setIsModalOpen(false);
  };

  const handleDelete = (id: string) => {
    if (window.confirm('Apakah Anda yakin ingin menghapus game ini?')) {
      dispatch({ type: 'DELETE_GAME', payload: id });
    }
  };

  const GameModal = ({ game, onClose }: { game: Game | null; onClose: () => void }) => {
    const [formData, setFormData] = useState({
      id: game?.id || faker.string.uuid(),
      name: game?.name || '',
      publisher: game?.publisher || '',
      category: game?.category || '',
      image:
        game?.image ||
        'https://img-wrapper.vercel.app/image?url=https://placehold.co/400x300/1e293b/94a3b8?text=Game',
      description: game?.description || '',
      isPopular: game?.isPopular || false
    });

    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      if (game) {
        dispatch({ type: 'EDIT_GAME', payload: { ...game, ...formData } });
      } else {
        dispatch({ type: 'ADD_GAME', payload: formData as Game });
      }
      onClose();
    };

    return (
      <AnimatePresence>
        <motion.div
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
          onClick={onClose}
          role="presentation"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0.9 }}
            className="glass-card w-full max-w-lg p-6"
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-labelledby="game-modal-title"
          >
            <h2 id="game-modal-title" className="text-xl font-bold mb-4">
              {game ? 'Edit Game' : 'Tambah Game'}
            </h2>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="game-name" className="block text-sm mb-1">
                  Nama Game
                </label>
                <input
                  id="game-name"
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full p-2 bg-slate-800 border border-slate-700 rounded"
                  required
                />
              </div>

              <div>
                <label htmlFor="game-publisher" className="block text-sm mb-1">
                  Publisher
                </label>
                <input
                  id="game-publisher"
                  type="text"
                  value={formData.publisher}
                  onChange={(e) => setFormData({ ...formData, publisher: e.target.value })}
                  className="w-full p-2 bg-slate-800 border border-slate-700 rounded"
                  required
                />
              </div>

              <div>
                <label htmlFor="game-category" className="block text-sm mb-1">
                  Kategori
                </label>
                <input
                  id="game-category"
                  type="text"
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  className="w-full p-2 bg-slate-800 border border-slate-700 rounded"
                  required
                />
              </div>

              <div>
                <label htmlFor="game-image" className="block text-sm mb-1">
                  URL Gambar
                </label>
                <input
                  id="game-image"
                  type="text"
                  value={formData.image}
                  onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                  className="w-full p-2 bg-slate-800 border border-slate-700 rounded"
                />
              </div>

              <div>
                <label htmlFor="game-description" className="block text-sm mb-1">
                  Deskripsi
                </label>
                <textarea
                  id="game-description"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full p-2 bg-slate-800 border border-slate-700 rounded"
                  rows={3}
                />
              </div>

              <label className="flex items-center space-x-2">
                <input
                  id="game-popular"
                  type="checkbox"
                  checked={formData.isPopular}
                  onChange={(e) => setFormData({ ...formData, isPopular: e.target.checked })}
                />
                <span>Populer</span>
              </label>

              <div className="flex justify-end space-x-2">
                <button type="button" onClick={onClose} className="px-4 py-2 bg-slate-600 rounded">
                  Batal
                </button>
                <button type="submit" className="px-4 py-2 bg-primary-600 rounded">
                  Simpan
                </button>
              </div>
            </form>
          </motion.div>
        </motion.div>
      </AnimatePresence>
    );
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-slate-100">Manajemen Game</h1>

        {/* Tombol tambah: sudah punya teks, ikon disembunyikan dari SR */}
        <button
          type="button"
          onClick={() => openModal()}
          className="flex items-center space-x-2 bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700"
          aria-label="Tambah game baru"
          title="Tambah game baru"
        >
          <Plus aria-hidden={true} className="w-4 h-4" />
          <span>Tambah Game</span>
        </button>
      </div>

      <div className="glass-card p-6">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-slate-700">
                <th className="p-3">Game</th>
                <th className="p-3">Publisher</th>
                <th className="p-3">Kategori</th>
                <th className="p-3">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {state.games.map((game) => (
                <tr key={game.id} className="border-b border-slate-800 hover:bg-slate-800/50">
                  <td className="p-3 flex items-center space-x-3">
                    <img
                      src={game.image}
                      alt={game.name}
                      className="w-10 h-10 rounded-lg object-cover"
                    />
                    <span>{game.name}</span>
                  </td>
                  <td className="p-3">{game.publisher}</td>
                  <td className="p-3">{game.category}</td>
                  <td className="p-3 space-x-2">
                    {/* EDIT button — punya nama yang bisa dibaca */}
                    <button
                      type="button"
                      onClick={() => openModal(game)}
                      className="p-2 hover:bg-slate-700 rounded"
                      aria-label={`Edit ${game.name}`}
                      title={`Edit ${game.name}`}
                    >
                      <Edit className="w-4 h-4" aria-hidden={true} />
                      <span className="sr-only">{`Edit ${game.name}`}</span>
                    </button>

                    {/* DELETE button — punya nama yang bisa dibaca */}
                    <button
                      type="button"
                      onClick={() => handleDelete(game.id)}
                      className="p-2 hover:bg-slate-700 rounded text-red-400"
                      aria-label={`Hapus ${game.name}`}
                      title={`Hapus ${game.name}`}
                    >
                      <Trash2 className="w-4 h-4" aria-hidden={true} />
                      <span className="sr-only">{`Hapus ${game.name}`}</span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <AnimatePresence>
        {isModalOpen && <GameModal game={currentGame} onClose={closeModal} />}
      </AnimatePresence>
    </div>
  );
};

export default AdminGames;
