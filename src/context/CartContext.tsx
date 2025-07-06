import { createContext, useContext, useReducer, ReactNode } from 'react';
import { Product } from '@/components/ProductCard';

export interface CartItem extends Product {
  quantity: number;
}

interface CartState {
  items: CartItem[];
  total: number;
  itemCount: number;
  discount: number;
  couponCode: string | null;
}

type CartAction =
  | { type: 'ADD_ITEM'; payload: Product }
  | { type: 'REMOVE_ITEM'; payload: string }
  | { type: 'UPDATE_QUANTITY'; payload: { id: string; quantity: number } }
  | { type: 'APPLY_COUPON'; payload: { code: string; discount: number } }
  | { type: 'REMOVE_COUPON' }
  | { type: 'CLEAR_CART' };

const CartContext = createContext<{
  state: CartState;
  dispatch: React.Dispatch<CartAction>;
  addItem: (product: Product) => boolean;
  removeItem: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  applyCoupon: (code: string) => boolean;
  removeCoupon: () => void;
  clearCart: () => void;
  isInCart: (productId: string) => boolean;
} | null>(null);

const cartReducer = (state: CartState, action: CartAction): CartState => {
  switch (action.type) {
    case 'ADD_ITEM': {
      const existingItem = state.items.find(item => item.id === action.payload.id);
      if (existingItem) {
        return state; // Don't add if already exists
      }
      const newItem: CartItem = { ...action.payload, quantity: 1 };
      const newItems = [...state.items, newItem];
      return {
        items: newItems,
        total: newItems.reduce((sum, item) => sum + item.price * item.quantity, 0),
        itemCount: newItems.reduce((sum, item) => sum + item.quantity, 0),
        discount: state.discount,
        couponCode: state.couponCode,
      };
    }
    case 'REMOVE_ITEM': {
      const newItems = state.items.filter(item => item.id !== action.payload);
      return {
        items: newItems,
        total: newItems.reduce((sum, item) => sum + item.price * item.quantity, 0),
        itemCount: newItems.reduce((sum, item) => sum + item.quantity, 0),
        discount: state.discount,
        couponCode: state.couponCode,
      };
    }
    case 'UPDATE_QUANTITY': {
      const newItems = state.items.map(item =>
        item.id === action.payload.id
          ? { ...item, quantity: Math.max(0, action.payload.quantity) }
          : item
      ).filter(item => item.quantity > 0);
      return {
        items: newItems,
        total: newItems.reduce((sum, item) => sum + item.price * item.quantity, 0),
        itemCount: newItems.reduce((sum, item) => sum + item.quantity, 0),
        discount: state.discount,
        couponCode: state.couponCode,
      };
    }
    case 'APPLY_COUPON':
      return {
        ...state,
        discount: action.payload.discount,
        couponCode: action.payload.code,
      };
    case 'REMOVE_COUPON':
      return {
        ...state,
        discount: 0,
        couponCode: null,
      };
    case 'CLEAR_CART':
      return {
        items: [],
        total: 0,
        itemCount: 0,
        discount: 0,
        couponCode: null,
      };
    default:
      return state;
  }
};

const initialState: CartState = {
  items: [],
  total: 0,
  itemCount: 0,
  discount: 0,
  couponCode: null,
};

// Cupons válidos
const validCoupons: Record<string, number> = {
  'DESCONTO10': 10,
  'PROMO15': 15,
  'SAVE20': 20,
};

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  const addItem = (product: Product): boolean => {
    const isAlreadyInCart = state.items.some(item => item.id === product.id);
    if (!isAlreadyInCart) {
      dispatch({ type: 'ADD_ITEM', payload: product });
      return true;
    }
    return false;
  };

  const removeItem = (productId: string) => {
    dispatch({ type: 'REMOVE_ITEM', payload: productId });
  };

  const updateQuantity = (productId: string, quantity: number) => {
    dispatch({ type: 'UPDATE_QUANTITY', payload: { id: productId, quantity } });
  };

  const clearCart = () => {
    dispatch({ type: 'CLEAR_CART' });
  };

  const applyCoupon = (code: string): boolean => {
    const discount = validCoupons[code.toUpperCase()];
    if (discount) {
      dispatch({ type: 'APPLY_COUPON', payload: { code: code.toUpperCase(), discount } });
      return true;
    }
    return false;
  };

  const removeCoupon = () => {
    dispatch({ type: 'REMOVE_COUPON' });
  };

  const isInCart = (productId: string): boolean => {
    return state.items.some(item => item.id === productId);
  };

  return (
    <CartContext.Provider value={{
      state,
      dispatch,
      addItem,
      removeItem,
      updateQuantity,
      applyCoupon,
      removeCoupon,
      clearCart,
      isInCart,
    }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};