/**
 * Cart Context Provider
 * Global cart state management for guest and authenticated users
 */

'use client';

import { createContext, useContext, useState, useEffect, useCallback, type ReactNode } from 'react';
import * as cartApi from '@/services/cart';
import type { ApiCart, ApiCartItem, AddToCartRequest } from '@/services/cart';
import { isAuthenticated } from '@/services/customer';

interface CartContextValue {
  cart: ApiCart | null;
  itemCount: number;
  isLoading: boolean;
  error: string | null;
  addToCart: (data: AddToCartRequest) => Promise<void>;
  updateQuantity: (itemId: number, quantity: number) => Promise<void>;
  removeFromCart: (itemId: number) => Promise<void>;
  clearCart: () => Promise<void>;
  refreshCart: () => Promise<void>;
}

const CartContext = createContext<CartContextValue | undefined>(undefined);

const CART_TOKEN_KEY = 'cart_token';

export function CartProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<ApiCart | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Get cart token from localStorage
  const getCartToken = useCallback((): string | null => {
    if (typeof window === 'undefined') return null;
    return localStorage.getItem(CART_TOKEN_KEY);
  }, []);

  // Set cart token in localStorage
  const setCartToken = useCallback((token: string) => {
    if (typeof window !== 'undefined') {
      localStorage.setItem(CART_TOKEN_KEY, token);
    }
  }, []);

  // Load cart on mount
  const refreshCart = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      // Check if customer is authenticated
      if (isAuthenticated()) {
        const customerCart = await cartApi.getCustomerCart();
        setCart(customerCart);
      } else {
        // Guest cart - check for token
        const token = getCartToken();
        if (token) {
          try {
            const guestCart = await cartApi.getCart(token);
            setCart(guestCart);
          } catch (err) {
            // Token expired or invalid - clear it
            console.warn('Cart token invalid, clearing:', err);
            localStorage.removeItem(CART_TOKEN_KEY);
            setCart(null);
          }
        } else {
          setCart(null);
        }
      }
    } catch (err) {
      console.error('Failed to load cart:', err);
      setError(err instanceof Error ? err.message : 'Failed to load cart');
      setCart(null);
    } finally {
      setIsLoading(false);
    }
  }, [getCartToken]);

  // Add item to cart
  const addToCart = useCallback(async (data: AddToCartRequest) => {
    setIsLoading(true);
    setError(null);

    try {
      let token = getCartToken();
      
      // If no cart token exists, create new cart
      if (!token && !isAuthenticated()) {
        const newCart = await cartApi.createCart();
        token = newCart.token;
        setCartToken(token);
        setCart(newCart.cart);
      }

      // Add item to cart
      const updatedCart = await cartApi.addItem(data, token || undefined);
      setCart(updatedCart);

      // Save token if cart created
      if (updatedCart.token && !isAuthenticated()) {
        setCartToken(updatedCart.token);
      }
    } catch (err) {
      console.error('Failed to add to cart:', err);
      setError(err instanceof Error ? err.message : 'Failed to add to cart');
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, [getCartToken, setCartToken]);

  // Update item quantity
  const updateQuantity = useCallback(async (itemId: number, quantity: number) => {
    if (!cart || !cart.token) {
      setError('No active cart');
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const updatedCart = await cartApi.updateItem(cart.token, itemId, { quantity });
      setCart(updatedCart);
    } catch (err) {
      console.error('Failed to update quantity:', err);
      setError(err instanceof Error ? err.message : 'Failed to update quantity');
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, [cart]);

  // Remove item from cart
  const removeFromCart = useCallback(async (itemId: number) => {
    if (!cart || !cart.token) {
      setError('No active cart');
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const updatedCart = await cartApi.removeItem(cart.token, itemId);
      setCart(updatedCart);
    } catch (err) {
      console.error('Failed to remove item:', err);
      setError(err instanceof Error ? err.message : 'Failed to remove item');
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, [cart]);

  // Clear cart
  const clearCart = useCallback(async () => {
    if (!cart || !cart.token) return;

    setIsLoading(true);
    setError(null);

    try {
      await cartApi.clearCart(cart.token);
      setCart(null);
      if (typeof window !== 'undefined') {
        localStorage.removeItem(CART_TOKEN_KEY);
      }
    } catch (err) {
      console.error('Failed to clear cart:', err);
      setError(err instanceof Error ? err.message : 'Failed to clear cart');
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, [cart]);

  // Load cart on mount
  useEffect(() => {
    refreshCart();
  }, [refreshCart]);

  // Calculate item count
  const itemCount = cart?.items?.reduce((sum, item) => sum + item.quantity, 0) || 0;

  const value: CartContextValue = {
    cart,
    itemCount,
    isLoading,
    error,
    addToCart,
    updateQuantity,
    removeFromCart,
    clearCart,
    refreshCart,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}
