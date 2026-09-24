import React, { createContext, useReducer, useMemo, useContext, ReactNode } from 'react';
import { Product } from '../types';

// State type
interface FavoritesState {
  favorites: Product[];
}

// Actions
type FavoritesAction =
  | { type: 'ADD_FAVORITE'; payload: Product }
  | { type: 'REMOVE_FAVORITE'; payload: number };

// Initial state
const initialState: FavoritesState = {
  favorites: [],
};

// Reducer
const favoritesReducer = (state: FavoritesState, action: FavoritesAction): FavoritesState => {
  switch (action.type) {
    case 'ADD_FAVORITE':
      if (state.favorites.some(p => p.id === action.payload.id)) {
        return state;
      }
      return {
        ...state,
        favorites: [...state.favorites, action.payload],
      };
    case 'REMOVE_FAVORITE':
      return {
        ...state,
        favorites: state.favorites.filter((p) => p.id !== action.payload),
      };
    default:
      return state;
  }
};

// Context Type
interface FavoritesContextType {
  state: FavoritesState;
  dispatch: React.Dispatch<FavoritesAction>;
}

// Create Context
const FavoritesContext = createContext<FavoritesContextType | undefined>(undefined);

// Provider Component
export const FavoritesProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(favoritesReducer, initialState);

  // Memoize value to prevent unnecessary re-renders when provider parent re-renders
  const value = useMemo(() => ({ state, dispatch }), [state, dispatch]);

  return (
    <FavoritesContext.Provider value={value}>
      {children}
    </FavoritesContext.Provider>
  );
};

// Custom Hook
export const useFavorites = () => {
  const context = useContext(FavoritesContext);
  if (context === undefined) {
    throw new Error('useFavorites must be used within a FavoritesProvider');
  }
  return context;
};
