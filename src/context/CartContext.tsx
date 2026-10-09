import React, { createContext, useContext, useEffect, useState, useMemo } from 'react';
import { Cart, CartItem, Product, ProductVariantColor, ProductVariantSpec } from '../types';
import { api } from '../services/api';

interface CartContextType {
  cart: Cart;
  itemCount: number;
  isCartDrawerOpen: boolean;
  openCartDrawer: () => void;
  closeCartDrawer: () => void;
  toggleCartDrawer: () => void;
  addItem: (
    product: Product,
    selectedColor?: ProductVariantColor,
    selectedSpec?: ProductVariantSpec,
    quantity?: number
  ) => void;
  updateQuantity: (itemId: string, quantity: number) => void;
  toggleItemSelection: (itemId: string) => void;
  toggleSelectAll: () => void;
  allSelected: boolean;
  removeItem: (itemId: string) => void;
  clearCart: () => void;
  appliedPromo: Cart['appliedPromo'];
  promoError: string | null;
  applyPromoCode: (code: string) => Promise<boolean>;
  removePromoCode: () => void;
  wishlist: string[];
  toggleWishlist: (productId: string) => void;
  isWishlisted: (productId: string) => boolean;
  freeShippingThresholdBDT: number;
  freeShippingRemainingBDT: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const STORAGE_CART_ITEMS = 'nexus_cart_items_bdt';
const STORAGE_WISHLIST = 'nexus_wishlist';
const FREE_SHIPPING_THRESHOLD_BDT = 2500; // Free shipping over ৳2,500

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

  const [isCartDrawerOpen, setIsCartDrawerOpen] = useState(false);
  const [appliedPromo, setAppliedPromo] = useState<Cart['appliedPromo']>(undefined);
  const [promoError, setPromoError] = useState<string | null>(null);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_CART_ITEMS, JSON.stringify(items));
    } catch (e) {
      console.warn('LocalStorage error saving cart:', e);
    }
  }, [items]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_WISHLIST, JSON.stringify(wishlist));
    } catch (e) {
      console.warn('LocalStorage error saving wishlist:', e);
    }
  }, [wishlist]);

  // Calculations for selected items (AliExpress style)
  const selectedItems = useMemo(() => items.filter((i) => i.selected), [items]);

  const subtotalBDT = useMemo(() => {
    return selectedItems.reduce((sum, item) => sum + item.unitPriceBDT * item.quantity, 0);
  }, [selectedItems]);

  const discountBDT = useMemo(() => {
    if (!appliedPromo) return 0;
    return appliedPromo.discountBDT;
  }, [appliedPromo]);

  const shippingBDT = useMemo(() => {
    if (selectedItems.length === 0) return 0;
    return subtotalBDT >= FREE_SHIPPING_THRESHOLD_BDT ? 0 : 120; // ৳120 standard courier inside BD
  }, [subtotalBDT, selectedItems.length]);

  const totalBDT = useMemo(() => {
    return Math.max(0, subtotalBDT - discountBDT + shippingBDT);
  }, [subtotalBDT, discountBDT, shippingBDT]);

  const cart: Cart = {
    items,
    subtotalBDT,
    discountBDT,
    shippingBDT,
    totalBDT,
    appliedPromo,
  };

  const itemCount = useMemo(() => {
    return items.reduce((count, item) => count + item.quantity, 0);
  }, [items]);

  const allSelected = useMemo(() => {
    return items.length > 0 && items.every((i) => i.selected);
  }, [items]);

  const freeShippingRemainingBDT = Math.max(0, FREE_SHIPPING_THRESHOLD_BDT - subtotalBDT);

  const addItem = (
    product: Product,
    selectedColor?: ProductVariantColor,
    selectedSpec?: ProductVariantSpec,
    quantity: number = 1
  ) => {
    const activeColor = selectedColor || product.colors[0];
    const unitPrice = product.priceBDT + (selectedSpec?.surchargeBDT || 0);
    const instanceKey = `${product.id}_${activeColor.name}_${selectedSpec?.name || 'default'}`;

    setItems((prev) => {
      const existingIndex = prev.findIndex((i) => i.id === instanceKey);
      if (existingIndex > -1) {
        const next = [...prev];
        next[existingIndex] = {
          ...next[existingIndex],
          quantity: next[existingIndex].quantity + quantity,
          selected: true,
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
          selectedSpec,
          quantity,
          unitPriceBDT: unitPrice,
          selected: true,
        },
      ];
    });

    setIsCartDrawerOpen(true);
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

  const toggleItemSelection = (itemId: string) => {
    setItems((prev) =>
      prev.map((item) => (item.id === itemId ? { ...item, selected: !item.selected } : item))
    );
  };

  const toggleSelectAll = () => {
    const nextState = !allSelected;
    setItems((prev) => prev.map((item) => ({ ...item, selected: nextState })));
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
    const res = await api.promos.validateCode(code, subtotalBDT);
    if (res.valid && res.discountBDT !== undefined) {
      setAppliedPromo({
        code: code.toUpperCase().trim(),
        discountBDT: res.discountBDT,
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
        isCartDrawerOpen,
        openCartDrawer: () => setIsCartDrawerOpen(true),
        closeCartDrawer: () => setIsCartDrawerOpen(false),
        toggleCartDrawer: () => setIsCartDrawerOpen((prev) => !prev),
        addItem,
        updateQuantity,
        toggleItemSelection,
        toggleSelectAll,
        allSelected,
        removeItem,
        clearCart,
        appliedPromo,
        promoError,
        applyPromoCode,
        removePromoCode,
        wishlist,
        toggleWishlist,
        isWishlisted,
        freeShippingThresholdBDT: FREE_SHIPPING_THRESHOLD_BDT,
        freeShippingRemainingBDT,
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
