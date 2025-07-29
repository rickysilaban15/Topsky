export interface Game {
  id: string;
  name: string;
  publisher: string;
  image: string;
  category: string;
  isPopular: boolean;
  description: string;
}

export interface TopUpPackage {
  id: string;
  gameId: string;
  name: string;
  price: number;
  originalPrice?: number;
  currency: string;
  description: string;
  isPopular?: boolean;
}

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  avatar?: string;
  joinDate: string;
  role: 'admin' | 'user';
  password?: string; // Should only be used for mock data
}

export type TransactionStatus = 'waiting_payment' | 'processing' | 'completed' | 'failed';

export interface Transaction {
  id: string;
  userId: string;
  game: Game;
  package: TopUpPackage;
  amount: number;
  status: TransactionStatus;
  paymentMethod?: string;
  createdAt: string;
  playerId: string;
  playerName?: string;
  virtualAccount?: string;
}

export interface CartItem {
  game: Game;
  package: TopUpPackage;
  playerId: string;
  playerName?: string;
}
