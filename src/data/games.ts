import { Game, TopUpPackage } from '../types';

export const games: Game[] = [
  {
    id: '1',
    name: 'Mobile Legends: Bang Bang',
    publisher: 'Moonton',
    image: '/images/ml.jpg',
    category: 'MOBA',
    isPopular: true,
    description: 'Game MOBA 5v5 terpopuler dengan pertarungan seru dan kompetitif.'
  },
  {
    id: '2',
    name: 'Free Fire MAX',
    publisher: 'Garena',
    image: '/images/ff.jpg',
    category: 'Battle Royale',
    isPopular: true,
    description: 'Battle royale dengan 50 pemain bertarung hingga tersisa satu pemenang.'
  },
  {
    id: '3',
    name: 'PUBG Mobile',
    publisher: 'Tencent Games',
    image: '/images/pubg.jpg',
    category: 'Battle Royale',
    isPopular: true,
    description: 'Battle royale realistis dengan grafik memukau dan gameplay menantang.'
  },
  {
    id: '4',
    name: 'Genshin Impact',
    publisher: 'miHoYo',
    image: '/images/genshin.jpg',
    category: 'RPG',
    isPopular: true,
    description: 'Open world RPG dengan dunia fantasi yang luas dan karakter menarik.'
  },
  {
    id: '5',
    name: 'Call of Duty Mobile',
    publisher: 'Activision',
    image: '/images/cod.jpg',
    category: 'FPS',
    isPopular: false,
    description: 'First person shooter dengan berbagai mode permainan yang seru.'
  },
  {
    id: '8',
    name: 'Valorant',
    publisher: 'Riot Games',
    image: '/images/valorant.jpg',
    category: 'FPS',
    isPopular: true,
    description: 'Tactical shooter 5v5 dengan agent-agent unik yang memiliki abilities khusus.'
  },
  {
    id: '9',
    name: 'Clash of Clans',
    publisher: 'Supercell',
    image: '/images/coc.jpg',
    category: 'Strategy',
    isPopular: true,
    description: 'Bangun desamu, latih pasukan, dan bertarung dalam perang klan epik.'
  },
  {
    id: '10',
    name: 'EA SPORTS FC™ MOBILE',
    publisher: 'Electronic Arts',
    image: '/images/easports.jpg',
    category: 'Sports',
    isPopular: false,
    description: 'Mainkan game sepak bola paling otentik di perangkat mobile-mu.'
  },
  {
    id: '11',
    name: 'Roblox',
    publisher: 'Roblox Corporation',
    image: '/images/roblox.jpg',
    category: 'Sandbox',
    isPopular: true,
    description: 'Platform imajinasi ultimate yang memungkinkanmu membuat dan bermain game 3D.'
  },
  {
    id: '12',
    name: 'League of Legends: Wild Rift',
    publisher: 'Riot Games',
    image: '/images/lol.jpg',
    category: 'MOBA',
    isPopular: false,
    description: 'Pengalaman MOBA 5v5 dari League of Legends, kini dibangun untuk mobile.'
  },
  {
    id: '13',
    name: 'Honkai: Star Rail',
    publisher: 'miHoYo',
    image: '/images/honkai.webp',
    category: 'RPG',
    isPopular: true,
    description: 'Jelajahi galaksi dalam RPG fantasi luar angkasa terbaru dari HoYoverse.'
  },
  {
    id: '14',
    name: 'eFootball™ 2024',
    publisher: 'KONAMI',
    image: '/images/efootball.webp',
    category: 'Sports',
    isPopular: false,
    description: 'Era baru game sepak bola digital. "PES" berevolusi menjadi "eFootball™".'
  },
  {
    id: '15',
    name: 'Arena of Valor',
    publisher: 'Tencent Games',
    image: '/images/aov.webp',
    category: 'MOBA',
    isPopular: false,
    description: 'MOBA 5v5 dengan hero-hero legendaris dari berbagai mitologi dunia.'
  },
  {
    id: '16',
    name: 'Marvel Snap',
    publisher: 'Nuverse',
    image: '/images/marvel.jpg',
    category: 'Card Game',
    isPopular: false,
    description: 'Card battler super cepat di seluruh Marvel Multiverse. Rakit tim impianmu.'
  },
   {
    id: '17',
    name: 'Clash Royale',
    publisher: 'Supercell',
    image: '/images/clashroyale.jpg',
    category: 'Strategy',
    isPopular: true,
    description: 'Pertarungan kartu real-time dengan jutaan pemain di seluruh dunia.'
  },
  {
    id: '18',
    name: 'Diablo Immortal',
    publisher: 'Blizzard Entertainment',
    image: '/images/diablo.jpg',
    category: 'RPG',
    isPopular: false,
    description: 'RPG action open world dengan dungeon seru dan loot melimpah.'
  },
  {
    id: '19',
    name: 'Tower of Fantasy',
    publisher: 'Level Infinite',
    image: '/images/tof.jpg',
    category: 'RPG',
    isPopular: false,
    description: 'Open-world RPG sci-fi dengan karakter dan senjata unik.'
  },
  {
    id: '20',
    name: 'Pokemon UNITE',
    publisher: 'The Pokémon Company',
    image: '/images/unite.jpg',
    category: 'MOBA',
    isPopular: true,
    description: 'MOBA 5v5 dengan karakter Pokémon favoritmu.'
  },
  
  // 🔹 Game "judi online" (kategori Casino)
  {
    id: '21',
    name: 'PokerStars',
    publisher: 'PokerStars Ltd',
    image: '/images/pokerstars.jpg',
    category: 'Casino',
    isPopular: false,
    description: 'Main poker online dengan turnamen dan meja taruhan global.'
  },
  {
    id: '22',
    name: 'Slotomania',
    publisher: 'Playtika',
    image: '/images/slotomania.jpg',
    category: 'Casino',
    isPopular: false,
    description: 'Game slot online dengan ratusan mesin slot berbeda.'
  },
  {
    id: '23',
    name: '888 Casino',
    publisher: '888 Holdings',
    image: '/images/888casino.jpg',
    category: 'Casino',
    isPopular: false,
    description: 'Casino online dengan permainan slot, blackjack, dan roulette.'
  }
];


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
