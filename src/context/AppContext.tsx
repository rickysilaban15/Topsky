import React, { createContext, useContext, useReducer, ReactNode, useEffect } from 'react';
import { User, Transaction, Game, TopUpPackage } from '../types';
import { users as mockUsers } from '../data/users';
import { games as mockGames } from '../data/games';
import { topUpPackages as mockPackages } from '../data/packages';

interface AppState {
  user: User | null;
  isAuthenticated: boolean;
  users: User[];
  games: Game[];
  packages: TopUpPackage[];
  transactions: Transaction[];
}

type AppAction =
  | { type: 'INITIALIZE_STATE' }
  | { type: 'LOGIN'; payload: User }
  | { type: 'LOGOUT' }
  | { type: 'REGISTER'; payload: User }
  | { type: 'UPDATE_USER'; payload: Partial<User> }
  | { type: 'ADD_TRANSACTION'; payload: Transaction }
  | { type: 'UPDATE_TRANSACTION_STATUS'; payload: { id: string; status: TransactionStatus; paymentMethod?: string } }
  | { type: 'ADD_USER'; payload: User }
  | { type: 'EDIT_USER'; payload: User }
  | { type: 'DELETE_USER'; payload: string }
  | { type: 'ADD_GAME'; payload: Game }
  | { type: 'EDIT_GAME'; payload: Game }
  | { type: 'DELETE_GAME'; payload: string };

const initialState: AppState = {
  user: null,
  isAuthenticated: false,
  users: [],
  games: [],
  packages: [],
  transactions: [],
};

const AppContext = createContext<{
  state: AppState;
  dispatch: React.Dispatch<AppAction>;
} | null>(null);

function appReducer(state: AppState, action: AppAction): AppState {
  switch (action.type) {
    case 'INITIALIZE_STATE': {
      const storedUser = localStorage.getItem('topskyUser');
      const storedTransactions = localStorage.getItem('topskyTransactions');
      const user = storedUser ? JSON.parse(storedUser) : null;
      const transactions = storedTransactions ? JSON.parse(storedTransactions) : [];

      return {
        ...state,
        user,
        isAuthenticated: !!user,
        users: mockUsers,
        games: mockGames,
        packages: mockPackages,
        transactions,
      };
    }
    case 'LOGIN':
      localStorage.setItem('topskyUser', JSON.stringify(action.payload));
      return { ...state, user: action.payload, isAuthenticated: true };
    case 'LOGOUT':
      localStorage.removeItem('topskyUser');
      return { ...state, user: null, isAuthenticated: false };
    case 'REGISTER':
      localStorage.setItem('topskyUser', JSON.stringify(action.payload));
      return { 
        ...state, 
        user: action.payload, 
        isAuthenticated: true,
        users: [...state.users, action.payload]
      };
    case 'UPDATE_USER':
      if (state.user) {
        const updatedUser = { ...state.user, ...action.payload };
        localStorage.setItem('topskyUser', JSON.stringify(updatedUser));
        return { 
          ...state, 
          user: updatedUser,
          users: state.users.map(u => u.id === updatedUser.id ? updatedUser : u)
        };
      }
      return state;
    case 'ADD_TRANSACTION': {
      const newTransactions = [action.payload, ...state.transactions];
      localStorage.setItem('topskyTransactions', JSON.stringify(newTransactions));
      return { ...state, transactions: newTransactions };
    }
    case 'UPDATE_TRANSACTION_STATUS': {
        const updatedTransactions = state.transactions.map(t => 
            t.id === action.payload.id 
            ? { ...t, status: action.payload.status, paymentMethod: action.payload.paymentMethod || t.paymentMethod } 
            : t
        );
        localStorage.setItem('topskyTransactions', JSON.stringify(updatedTransactions));
        return { ...state, transactions: updatedTransactions };
    }
    case 'ADD_USER':
      return { ...state, users: [...state.users, action.payload] };
    case 'EDIT_USER':
      return { ...state, users: state.users.map(u => u.id === action.payload.id ? action.payload : u) };
    case 'DELETE_USER':
      return { ...state, users: state.users.filter(u => u.id !== action.payload) };
    case 'ADD_GAME':
      return { ...state, games: [...state.games, action.payload] };
    case 'EDIT_GAME':
      return { ...state, games: state.games.map(g => g.id === action.payload.id ? action.payload : g) };
    case 'DELETE_GAME':
      return { ...state, games: state.games.filter(g => g.id !== action.payload) };
    default:
      return state;
  }
}

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(appReducer, initialState);

  useEffect(() => {
    dispatch({ type: 'INITIALIZE_STATE' });
  }, []);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
