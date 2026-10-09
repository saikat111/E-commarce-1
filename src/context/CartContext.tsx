import React, { createContext, useContext, useEffect, useState, useMemo } from 'react';
import { Cart, CartItem, Product, ProductVariantColor, ProductVariantMaterial } from '../types';
import { api } from '../services/api';

interface CartContextType {
  cart: Cart;
  itemCount: number;
  isCartOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
  toggleCart: () => void;
  addItem: (
    product: Product,
    selectedColor?: ProductVariantColor,
    selectedMaterial?: ProductVariantMaterial,
    quantity?: number
  ) => void;
  updateQuantity: (itemId: string, quantity: number) => void;
  removeItem: (itemId: string) => void;
  clearCart: () => void;
  appliedPromo: Cart['appliedPromo'];
  promoError: string | null;
  applyPromoCode: (code: string) => Promise<boolean>;
  removePromoCode: () => void;
  wishlist: string[];
  toggleWishlist: (productId: string) => void;
  isWishlisted: (productId: string) => boolean;
  freeShippingThreshold: number;
  freeShippingRemaining: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const STORAGE_CART_ITEMS = 'atelier_cart_items';
const STORAGE_WISHLIST = 'atelier_wishlist';
const FREE_SHIPPING_THRESHOLD = 250;

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [items, setItems] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_CART_ITEMS);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [wishlist, setWishlist] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_WISHLIST);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [appliedPromo, setAppliedPromo] = useState<Cart['appliedPromo']>(undefined);
  const [promoError, setPromoError] = useState<string | null>(null);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_CART_ITEMS, JSON.stringify(items));
    } catch (e) {
      console.warn('Failed saving cart to localStorage', e);
    }
  }, [items]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_WISHLIST, JSON.stringify(wishlist));
    } catch (e) {
      console.warn('Failed saving wishlist to localStorage', e);
    }
  }, [wishlist]);

  const subtotal = useMemo(() => {
    return items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  }, [items]);

  const discount = useMemo(() => {
    if (!appliedPromo) return 0;
    return Math.round((subtotal * appliedPromo.discountPercent) / 100);
  }, [subtotal, appliedPromo]);

  const shipping = useMemo(() => {
    if (items.length === 0) return 0;
    return subtotal >= FREE_SHIPPING_THRESHOLD ? 0 : 25;
  }, [subtotal, items.length]);

  const total = useMemo(() => {
    return Math.max(0, subtotal - discount + shipping);
  }, [subtotal, discount, shipping]);

  const cart: Cart = {
    items,
    subtotal,
    discount,
    shipping,
    total,
    appliedPromo,
  };

  const itemCount = useMemo(() => {
    return items.reduce((count, item) => count + item.quantity, 0);
  }, [items]);

  const freeShippingRemaining = Math.max(0, FREE_SHIPPING_THRESHOLD - subtotal);

  const addItem = (
    product: Product,
    selectedColor?: ProductVariantColor,
    selectedMaterial?: ProductVariantMaterial,
    quantity: number = 1
  ) => {
    const activeColor = selectedColor || product.colors[0];
    const unitPrice = product.price + (selectedMaterial?.surcharge || 0);
    const instanceKey = `${product.id}_${activeColor.name}_${selectedMaterial?.name || 'default'}`;

    setItems((prev) => {
      const existingIndex = prev.findIndex((i) => i.id === instanceKey);
      if (existingIndex > -1) {
        const next = [...prev];
        next[existingIndex] = {
          ...next[existingIndex],
          quantity: next[existingIndex].quantity + quantity,
        };
        return next;
      }

      return [
        ...prev,
        {
          id: instanceKey,
          productId: product.id,
          product,
          selectedColor: activeColor,
          selectedMaterial,
          quantity,
          price: unitPrice,
        },
      ];
    });

    setIsCartOpen(true);
  };

  const updateQuantity = (itemId: string, quantity: number) => {
    if (quantity <= 0) {
      removeItem(itemId);
      return;
    }
    setItems((prev) =>
      prev.map((item) => (item.id === itemId ? { ...item, quantity } : item))
    );
  };

  const removeItem = (itemId: string) => {
    setItems((prev) => prev.filter((item) => item.id !== itemId));
  };

  const clearCart = () => {
    setItems([]);
    setAppliedPromo(undefined);
  };

  const applyPromoCode = async (code: string): Promise<boolean> => {
    setPromoError(null);
    const res = await api.promos.validateCode(code);
    if (res.valid && res.discountPercent) {
      setAppliedPromo({
        code: code.toUpperCase().trim(),
        discountPercent: res.discountPercent,
        description: res.description || '',
      });
      return true;
    } else {
      setPromoError(res.message);
      return false;
    }
  };

  const removePromoCode = () => {
    setAppliedPromo(undefined);
    setPromoError(null);
  };

  const toggleWishlist = (productId: string) => {
    setWishlist((prev) =>
      prev.includes(productId) ? prev.filter((id) => id !== productId) : [...prev, productId]
    );
  };

  const isWishlisted = (productId: string) => wishlist.includes(productId);

  return (
    <CartContext.Provider
      value={{
        cart,
        itemCount,
        isCartOpen,
        openCart: () => setIsCartOpen(true),
        closeCart: () => setIsCartOpen(false),
        toggleCart: () => setIsCartOpen((prev) => !prev),
        addItem,
        updateQuantity,
        removeItem,
        clearCart,
        appliedPromo,
        promoError,
        applyPromoCode,
        removePromoCode,
        wishlist,
        toggleWishlist,
        isWishlisted,
        freeShippingThreshold: FREE_SHIPPING_THRESHOLD,
        freeShippingRemaining,
      }}
    >
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
