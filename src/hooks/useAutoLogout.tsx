"use client";

import { useEffect, useRef } from "react";

import federatedLogout from "@/lib/federatedLogout";

export function useAutoLogout(inactivityTime = 5 * 60 * 1000) {
  const timerRef = useRef<number | null>(null);

   const resetTimer = () => {
    if (timerRef.current) clearTimeout(timerRef.current);

    timerRef.current = window.setTimeout(() => {
      federatedLogout(); 
    }, inactivityTime);
  };

  useEffect(() => {
    const events = ["mousemove", "keydown", "click"];
    events.forEach((event) => window.addEventListener(event, resetTimer));
    resetTimer();

    return () => {
      events.forEach((event) => window.removeEventListener(event, resetTimer));
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);
}
