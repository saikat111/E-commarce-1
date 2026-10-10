import React from 'react';
import { Home, LayoutGrid, Scale, ShoppingCart, User, Heart } from 'lucide-react';
import { PageRoute, ProductCategory } from '../../types';
import { useCart } from '../../context/CartContext';
import { useCompare } from '../../context/CompareContext';

interface MobileBottomNavProps {
  currentPage: PageRoute;
  onNavigate: (page: PageRoute, category?: ProductCategory, productId?: string) => void;
}

export const MobileBottomNav: React.FC<MobileBottomNavProps> = ({
  currentPage,
  onNavigate,
}) => {
  const { itemCount, openCartDrawer } = useCart();
  const { comparedProducts, openCompareModal } = useCompare();

  const navItems = [
    {
      id: 'home' as PageRoute,
      label: 'Home',
      icon: Home,
      action: () => onNavigate('home'),
      isActive: currentPage === 'home',
    },
    {
      id: 'category' as PageRoute,
      label: 'Categories',
      icon: LayoutGrid,
      action: () => onNavigate('category', 'all'),
      isActive: currentPage === 'category',
    },
    {
      id: 'compare',
      label: 'Compare',
      icon: Scale,
      action: () => {
        if (comparedProducts.length > 0) {
          openCompareModal();
        } else {
          onNavigate('category', 'all');
        }
      },
      badge: comparedProducts.length > 0 ? comparedProducts.length : undefined,
      badgeColor: 'bg-neutral-900',
      isActive: false,
    },
    {
      id: 'cart' as PageRoute,
      label: 'Cart',
      icon: ShoppingCart,
      action: () => openCartDrawer(),
      badge: itemCount > 0 ? itemCount : undefined,
      badgeColor: 'bg-red-600',
      isActive: currentPage === 'cart',
    },
    {
      id: 'dashboard' as PageRoute,
      label: 'Account',
      icon: User,
      action: () => onNavigate('dashboard'),
      isActive: currentPage === 'dashboard',
    },
  ];

  return (
    <nav 
      aria-label="Mobile Bottom App Bar"
      className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-neutral-200/90 shadow-[0_-4px_20px_rgba(0,0,0,0.06)] px-2 py-1 safe-area-pb"
    >
      <div className="grid grid-cols-5 items-center justify-around h-14">
        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <button
              key={item.label}
              type="button"
              onClick={item.action}
              className={`flex flex-col items-center justify-center h-full relative cursor-pointer select-none transition-all duration-150 active:scale-95 ${
                item.isActive 
                  ? 'text-red-600 font-bold' 
                  : 'text-neutral-500 hover:text-neutral-900 font-medium'
              }`}
            >
              {/* Active Tab Top Indicator Pill */}
              {item.isActive && (
                <span className="absolute top-0 w-8 h-1 bg-red-600 rounded-b-full shadow-xs" />
              )}

              <div className="relative mt-1">
                <Icon className={`w-5 h-5 transition-transform ${item.isActive ? 'scale-110' : ''}`} />
                {item.badge !== undefined && (
                  <span className={`absolute -top-1.5 -right-2.5 min-w-[17px] h-[17px] ${item.badgeColor} text-white text-[10px] font-black rounded-full flex items-center justify-center px-1 font-mono shadow-xs border-2 border-white`}>
                    {item.badge}
                  </span>
                )}
              </div>
              
              <span className={`text-[10px] mt-0.5 tracking-tight ${item.isActive ? 'font-bold text-red-600' : 'text-neutral-600'}`}>
                {item.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};
