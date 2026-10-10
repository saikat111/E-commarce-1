import { PriceDropAlert, Product } from '../types';

export const STORAGE_PRICE_ALERTS = 'nexus_price_drop_alerts_v1';
export const EVENT_PRICE_DROP_TRIGGERED = 'nexus_price_drop_event';

export function getPriceAlerts(): PriceDropAlert[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem(STORAGE_PRICE_ALERTS);
    if (!raw) return [];
    return JSON.parse(raw);
  } catch {
    return [];
  }
}

export function savePriceAlert(alert: Omit<PriceDropAlert, 'id' | 'createdAt' | 'status'>): PriceDropAlert {
  const alerts = getPriceAlerts();
  
  // Check if alert already exists for this product
  const existingIndex = alerts.findIndex((a) => a.productId === alert.productId);
  
  const newAlert: PriceDropAlert = {
    ...alert,
    id: `alert_${alert.productId}_${Date.now()}`,
    createdAt: Date.now(),
    status: 'active',
  };

  if (existingIndex >= 0) {
    alerts[existingIndex] = newAlert;
  } else {
    alerts.unshift(newAlert);
  }

  try {
    localStorage.setItem(STORAGE_PRICE_ALERTS, JSON.stringify(alerts));
  } catch {
    // Ignore storage errors in restricted context
  }

  return newAlert;
}

export function removePriceAlert(alertId: string): void {
  const alerts = getPriceAlerts();
  const updated = alerts.filter((a) => a.id !== alertId);
  try {
    localStorage.setItem(STORAGE_PRICE_ALERTS, JSON.stringify(updated));
  } catch {
    // Ignore
  }
}

export function hasPriceAlertForProduct(productId: string): PriceDropAlert | undefined {
  const alerts = getPriceAlerts();
  return alerts.find((a) => a.productId === productId);
}

/**
 * Simulate an instant price drop event for testing and demonstration
 */
export function simulatePriceDrop(productId: string, dropDiscountPct: number = 20): PriceDropAlert | null {
  const alerts = getPriceAlerts();
  const alertIndex = alerts.findIndex((a) => a.productId === productId);
  if (alertIndex < 0) return null;

  const targetAlert = alerts[alertIndex];
  const newDroppedPrice = Math.round(targetAlert.currentPriceBDT * (1 - dropDiscountPct / 100));

  targetAlert.status = 'triggered';
  targetAlert.triggeredPriceBDT = newDroppedPrice;

  try {
    localStorage.setItem(STORAGE_PRICE_ALERTS, JSON.stringify(alerts));
  } catch {
    // Ignore
  }

  // Dispatch global window event
  if (typeof window !== 'undefined') {
    const event = new CustomEvent(EVENT_PRICE_DROP_TRIGGERED, {
      detail: {
        alert: targetAlert,
        newPrice: newDroppedPrice,
        savings: targetAlert.currentPriceBDT - newDroppedPrice,
      },
    });
    window.dispatchEvent(event);
  }

  return targetAlert;
}
