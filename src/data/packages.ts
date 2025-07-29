import { TopUpPackage } from '../types';
import { games } from './games';

export const topUpPackages: TopUpPackage[] = [];

games.forEach(game => {
  const basePrices = [15000, 25000, 50000, 75000, 100000, 250000];
  const currencyName = game.category === 'MOBA' || game.category === 'RPG' ? 'Diamonds' : game.category === 'Battle Royale' ? 'Cash' : 'Credits';

  basePrices.forEach((price, index) => {
    const amount = Math.floor(price / 200) + (index * 10);
    const isPopular = index === 2;
    const hasDiscount = index === 1 || index === 3;

    topUpPackages.push({
      id: `${game.id}-${index + 1}`,
      gameId: game.id,
      name: `${amount} ${currencyName}`,
      price: price,
      originalPrice: hasDiscount ? Math.floor(price * 1.1) : undefined,
      currency: 'IDR',
      description: `Paket ${currencyName} ${isPopular ? 'populer' : 'standar'}`,
      isPopular: isPopular
    });
  });
});
