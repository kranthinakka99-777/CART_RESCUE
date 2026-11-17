"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { Product, Products } from "@/lib/products";
import { runRescueEngine } from "@/lib/api";

export interface CartItem {
  product: Product;
  quantity: number;
}

interface StoreContextType {
  cart: CartItem[];
  addToCart: (product: Product, quantity?: number) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  cartTotal: number;
  itemCount: number;
  shippingFee: number;
  setShippingFee: (fee: number) => void;
  
  // Telemetry & Behavior State
  sessionId: string;
  customerName: string;
  setCustomerName: (name: string) => void;
  customerSegment: string;
  setCustomerSegment: (seg: string) => void;
  timeOnCheckoutSec: number;
  tabSwitchCount: number;
  paymentErrorTriggered: boolean;
  setPaymentErrorTriggered: (err: boolean) => void;
  couponFailedAttempts: number;
  incrementCouponFailed: () => void;
  mouseExitIntent: boolean;
  
  // Rescue Engine Integration
  latestRescueData: any;
  activeNotification: any;
  dismissNotification: () => void;
  runEngine: (overrideParams?: Partial<any>) => Promise<any>;
  triggerDemoScenario: (scenario: "PAYMENT_FAIL" | "SHIPPING_COST" | "PRICE_COMPARE" | "RETURNING_VIP") => void;
}

const StoreContext = createContext<StoreContextType | undefined>(undefined);

export function StoreProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([
    { product: Products.list[0], quantity: 1 },
    { product: Products.list[4], quantity: 1 }
  ]);
  
  const [sessionId] = useState<string>(() => `sess_shopper_${Math.random().toString(36).substring(2, 7)}`);
  const [customerName, setCustomerName] = useState<string>("Samantha Reed");
  const [customerSegment, setCustomerSegment] = useState<string>("VIP Shopper");
  const [shippingFee, setShippingFee] = useState<number>(15.0);
  
  const [timeOnCheckoutSec, setTimeOnCheckoutSec] = useState<number>(45);
  const [tabSwitchCount, setTabSwitchCount] = useState<number>(1);
  const [paymentErrorTriggered, setPaymentErrorTriggered] = useState<boolean>(false);
  const [couponFailedAttempts, setCouponFailedAttempts] = useState<number>(0);
  const [mouseExitIntent, setMouseExitIntent] = useState<boolean>(false);
  
  const [latestRescueData, setLatestRescueData] = useState<any>(null);
  const [activeNotification, setActiveNotification] = useState<any>(null);

  // Tab switch & Exit intent event listeners
  useEffect(() => {
    function handleVisibilityChange() {
      if (document.hidden) {
        setTabSwitchCount((prev) => prev + 1);
      }
    }

    function handleMouseLeave(e: MouseEvent) {
      if (e.clientY <= 5) {
        setMouseExitIntent(true);
      }
    }

    window.addEventListener("visibilitychange", handleVisibilityChange);
    document.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      window.removeEventListener("visibilitychange", handleVisibilityChange);
      document.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  // Checkout timer tracking
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeOnCheckoutSec((prev) => prev + 1);
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const cartTotal = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const itemCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  function addToCart(product: Product, quantity = 1) {
    setCart((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id ? { ...item, quantity: item.quantity + quantity } : item
        );
      }
      return [...prev, { product, quantity }];
    });
  }

  function removeFromCart(productId: string) {
    setCart((prev) => prev.filter((item) => item.product.id !== productId));
  }

  function updateQuantity(productId: string, quantity: number) {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setCart((prev) =>
      prev.map((item) => (item.product.id === productId ? { ...item, quantity } : item))
    );
  }

  function clearCart() {
    setCart([]);
  }

  function incrementCouponFailed() {
    setCouponFailedAttempts((prev) => prev + 1);
  }

  function dismissNotification() {
    setActiveNotification(null);
  }

  async function runEngine(overrideParams?: Partial<any>) {
    const telemetry = {
      session_id: sessionId,
      customer_id: `cust_${sessionId}`,
      customer_name: customerName,
      customer_segment: customerSegment,
      cart_value: cartTotal,
      item_count: itemCount,
      shipping_fee: shippingFee,
      time_on_checkout_sec: timeOnCheckoutSec,
      tab_switch_count: tabSwitchCount,
      mouse_exit_intent: mouseExitIntent,
      payment_error_triggered: paymentErrorTriggered,
      coupon_failed_attempts: couponFailedAttempts,
      shipping_cost_viewed: shippingFee > 0,
      device: "Desktop",
      items: cart.map((item) => ({
        id: item.product.id,
        name: item.product.name,
        price: item.product.price,
        quantity: item.quantity,
        category: item.product.category
      })),
      ...overrideParams
    };

    try {
      const res = await runRescueEngine(telemetry);
      setLatestRescueData(res);
      if (res.notification_preview && res.final_recommended_action !== "DO_NOTHING") {
        setActiveNotification(res.notification_preview);
      } else {
        setActiveNotification(null);
      }
      return res;
    } catch (err) {
      console.error("Rescue engine execution failed:", err);
    }
  }

  // Preset scenarios trigger
  function triggerDemoScenario(scenario: "PAYMENT_FAIL" | "SHIPPING_COST" | "PRICE_COMPARE" | "RETURNING_VIP") {
    if (scenario === "PAYMENT_FAIL") {
      setCustomerName("David Chen");
      setCustomerSegment("Standard");
      setPaymentErrorTriggered(true);
      setTabSwitchCount(1);
      setCouponFailedAttempts(0);
      setTimeOnCheckoutSec(85);
      runEngine({ payment_error_triggered: true });
    } else if (scenario === "SHIPPING_COST") {
      setCustomerName("Elena Rostova");
      setCustomerSegment("Standard");
      setShippingFee(25.0);
      setPaymentErrorTriggered(false);
      setTabSwitchCount(2);
      runEngine({ shipping_fee: 25.0, cart_value: 38.0 });
    } else if (scenario === "PRICE_COMPARE") {
      setCustomerName("Sarah Jenkins");
      setCustomerSegment("Price Sensitive");
      setTabSwitchCount(6);
      setCouponFailedAttempts(3);
      setPaymentErrorTriggered(false);
      runEngine({ tab_switch_count: 6, coupon_failed_attempts: 3 });
    } else if (scenario === "RETURNING_VIP") {
      setCustomerName("Marcus Vance");
      setCustomerSegment("VIP Shopper");
      setPaymentErrorTriggered(false);
      setTabSwitchCount(0);
      setCouponFailedAttempts(0);
      runEngine({ customer_segment: "VIP Shopper", tab_switch_count: 0, cart_value: 890.0 });
    }
  }

  return (
    <StoreContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        cartTotal,
        itemCount,
        shippingFee,
        setShippingFee,
        sessionId,
        customerName,
        setCustomerName,
        customerSegment,
        setCustomerSegment,
        timeOnCheckoutSec,
        tabSwitchCount,
        paymentErrorTriggered,
        setPaymentErrorTriggered,
        couponFailedAttempts,
        incrementCouponFailed,
        mouseExitIntent,
        latestRescueData,
        activeNotification,
        dismissNotification,
        runEngine,
        triggerDemoScenario
      }}
    >
      {children}
    </StoreContext.Provider>
  );
}

export function useStore() {
  const context = useContext(StoreContext);
  if (!context) {
    throw new Error("useStore must be used within a StoreProvider");
  }
  return context;
}
