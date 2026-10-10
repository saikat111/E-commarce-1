import React, { createContext, useContext, useState, useEffect } from 'react';
import { Product } from '../types';
import { PRODUCTS_CATALOG } from '../data/products';

const STORAGE_COMPARE_KEY = 'nexus_compared_products_ids_v1';
const MAX_COMPARE_PRODUCTS = 4;

interface CompareContextType {
  comparedProducts: Product[];
  addToCompare: (product: Product) => { success: boolean; reason?: string };
  removeFromCompare: (productId: string) => void;
  clearCompare: () => void;
  isInCompare: (productId: string) => boolean;
  isCompareModalOpen: boolean;
  setIsCompareModalOpen: (open: boolean) => void;
  openCompareModal: () => void;
  closeCompareModal: () => void;
}

const CompareContext = createContext<CompareContextType | undefined>(undefined);

export const CompareProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [comparedProducts, setComparedProducts] = useState<Product[]>(() => {
    if (typeof window === 'undefined') return [];
    try {
      const raw = localStorage.getItem(STORAGE_COMPARE_KEY);
      if (!raw) return [];
      const ids: string[] = JSON.parse(raw);
      return ids
        .map((id) => PRODUCTS_CATALOG.find((p) => p.id === id))
        .filter((p): p is Product => p !== undefined);
    } catch {
      return [];
    }
  });

  const [isCompareModalOpen, setIsCompareModalOpen] = useState(false);

  // Sync to localStorage
  useEffect(() => {
    try {
      const ids = comparedProducts.map((p) => p.id);
      localStorage.setItem(STORAGE_COMPARE_KEY, JSON.stringify(ids));
    } catch {
      // Ignore
    }
  }, [comparedProducts]);

  const addToCompare = (product: Product): { success: boolean; reason?: string } => {
    if (comparedProducts.some((p) => p.id === product.id)) {
      return { success: false, reason: 'Already in comparison list' };
    }

    if (comparedProducts.length >= MAX_COMPARE_PRODUCTS) {
      return { 
        success: false, 
        reason: `Maximum ${MAX_COMPARE_PRODUCTS} products can be compared at once. Remove one first.` 
      };
    }

    setComparedProducts((prev) => [...prev, product]);
    return { success: true };
  };

  const removeFromCompare = (productId: string) => {
    setComparedProducts((prev) => prev.filter((p) => p.id !== productId));
  };

  const clearCompare = () => {
    setComparedProducts([]);
  };

  const isInCompare = (productId: string) => {
    return comparedProducts.some((p) => p.id === productId);
  };

  const openCompareModal = () => setIsCompareModalOpen(true);
  const closeCompareModal = () => setIsCompareModalOpen(false);

  return (
    <CompareContext.Provider
      value={{
        comparedProducts,
        addToCompare,
        removeFromCompare,
        clearCompare,
        isInCompare,
        isCompareModalOpen,
        setIsCompareModalOpen,
        openCompareModal,
        closeCompareModal,
      }}
    >
      {children}
    </CompareContext.Provider>
  );
};

export const useCompare = () => {
  const context = useContext(CompareContext);
  if (!context) {
    throw new Error('useCompare must be used within a CompareProvider');
  }
  return context;
};
