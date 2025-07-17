import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { Product } from '@/components/ProductCard';

interface FavoritesState {
  items: Product[];
  itemCount: number;
}

interface FavoritesContextType {
  state: FavoritesState;
  addToFavorites: (product: Product) => boolean;
  removeFromFavorites: (productId: string) => void;
  isFavorite: (productId: string) => boolean;
  clearFavorites: () => void;
}

type FavoritesAction =
  | { type: 'ADD_TO_FAVORITES'; payload: Product }
  | { type: 'REMOVE_FROM_FAVORITES'; payload: string }
  | { type: 'CLEAR_FAVORITES' }
  | { type: 'LOAD_FAVORITES'; payload: Product[] };

const favoritesReducer = (state: FavoritesState, action: FavoritesAction): FavoritesState => {
  switch (action.type) {
    case 'ADD_TO_FAVORITES': {
      const existingItem = state.items.find(item => item.id === action.payload.id);
      if (existingItem) {
        return state; // Item já está nos favoritos
      }
      
      const newItems = [...state.items, action.payload];
      return {
        items: newItems,
        itemCount: newItems.length,
      };
    }
    
    case 'REMOVE_FROM_FAVORITES': {
      const newItems = state.items.filter(item => item.id !== action.payload);
      return {
        items: newItems,
        itemCount: newItems.length,
      };
    }
    
    case 'CLEAR_FAVORITES':
      return {
        items: [],
        itemCount: 0,
      };
    
    case 'LOAD_FAVORITES':
      return {
        items: action.payload,
        itemCount: action.payload.length,
      };
    
    default:
      return state;
  }
};

const FavoritesContext = createContext<FavoritesContextType | undefined>(undefined);

export const FavoritesProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(favoritesReducer, {
    items: [],
    itemCount: 0,
  });

  // Carrega favoritos do localStorage ao inicializar
  useEffect(() => {
    const storedFavorites = localStorage.getItem('favorites');
    if (storedFavorites) {
      try {
        const favorites = JSON.parse(storedFavorites);
        dispatch({ type: 'LOAD_FAVORITES', payload: favorites });
      } catch (error) {
        console.error('Erro ao carregar favoritos do localStorage:', error);
      }
    }
  }, []);

  // Salva favoritos no localStorage sempre que o estado mudar
  useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify(state.items));
  }, [state.items]);

  const addToFavorites = (product: Product): boolean => {
    const existingItem = state.items.find(item => item.id === product.id);
    if (existingItem) {
      return false; // Item já está nos favoritos
    }
    
    dispatch({ type: 'ADD_TO_FAVORITES', payload: product });
    return true;
  };

  const removeFromFavorites = (productId: string): void => {
    dispatch({ type: 'REMOVE_FROM_FAVORITES', payload: productId });
  };

  const isFavorite = (productId: string): boolean => {
    return state.items.some(item => item.id === productId);
  };

  const clearFavorites = (): void => {
    dispatch({ type: 'CLEAR_FAVORITES' });
  };

  const value: FavoritesContextType = {
    state,
    addToFavorites,
    removeFromFavorites,
    isFavorite,
    clearFavorites,
  };

  return (
    <FavoritesContext.Provider value={value}>
      {children}
    </FavoritesContext.Provider>
  );
};

export const useFavorites = (): FavoritesContextType => {
  const context = useContext(FavoritesContext);
  if (context === undefined) {
    throw new Error('useFavorites deve ser usado dentro de um FavoritesProvider');
  }
  return context;
};

