import React from 'react';
import { Link } from 'react-router-dom';
import { Star, TrendingUp } from 'lucide-react';
import { Game } from '../../types';
import { motion } from 'framer-motion';

interface GameCardProps {
  game: Game;
  index?: number;
}

const placeholder =
  'data:image/svg+xml;utf8,' +
  encodeURIComponent(`
<svg xmlns="http://www.w3.org/2000/svg" width="400" height="225">
  <rect width="100%" height="100%" fill="#0f172a"/>
  <text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" fill="#94a3b8" font-family="Arial" font-size="16">
    No Image
  </text>
</svg>`);

const GameCard: React.FC<GameCardProps> = ({ game, index = 0 }) => {
  const [imgSrc, setImgSrc] = React.useState(game.image);

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, delay: index * 0.05 }
    }
  };

  return (
    <motion.div
      variants={cardVariants}
      whileHover={{ y: -5, scale: 1.03 }}
      className="glass-card overflow-hidden hover:shadow-xl hover:shadow-primary-500/10 transition-all duration-300"
    >
      <Link to={`/game/${game.id}`}>
        {/* Wrapper agar tinggi konsisten & logo tidak terpotong */}
        <div className="relative bg-slate-900/50">
          {/* Kotak aspek 16:9 supaya semua card sama tinggi */}
          <div className="aspect-video w-full flex items-center justify-center">
            <img
              src={imgSrc}
              alt={game.name}
              loading="lazy"
              onError={() => setImgSrc(placeholder)}   // fallback bila hotlink/403
              className="max-h-[70%] max-w-[85%] object-contain"
            />
          </div>

          {game.isPopular && (
            <div className="absolute top-3 left-3 bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-3 py-1 rounded-full text-sm font-medium flex items-center space-x-1 shadow-lg">
              <TrendingUp className="h-4 w-4" />
              <span>Popular</span>
            </div>
          )}
          <div className="absolute top-3 right-3 bg-black/60 text-white px-2 py-1 rounded text-sm">
            {game.category}
          </div>
        </div>

        <div className="p-4">
          <h3 className="text-lg font-semibold text-slate-100 mb-2 line-clamp-2 h-14">
            {game.name}
          </h3>
          <p className="text-sm text-slate-400 mb-3 line-clamp-2 h-10">
            {game.description}
          </p>
          <div className="flex items-center justify-between mt-4 pt-4 border-t border-slate-700">
            <span className="text-sm text-slate-500">{game.publisher}</span>
            <div className="flex items-center space-x-1">
              <Star className="h-4 w-4 text-yellow-400 fill-current" />
              <span className="text-sm text-slate-300">4.8</span>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

export default GameCard;
