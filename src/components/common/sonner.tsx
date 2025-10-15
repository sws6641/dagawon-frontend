"use client";

import React, { useState, useCallback, useEffect } from "react";
import { cn } from "./utils";

type Toast = {
  id: number;
  message: string;
};

type ToasterProps = {
  duration?: number; // 자동 닫힘 시간 (ms)
};

const Toaster = ({ duration = 3000 }: ToasterProps) => {
  const [toasts, setToasts] = useState<Toast[]>([]);

  // 토스트 추가
  const addToast = useCallback((message: string) => {
    const id = Date.now();
    setToasts((prev) => [...prev, { id, message }]);
    setTimeout(() => removeToast(id), duration);
  }, [duration]);

  // 토스트 제거
  const removeToast = useCallback((id: number) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  }, []);

  // 전역에서 호출할 수 있도록 window에 등록
  useEffect(() => {
    (window as any).toast = addToast;
  }, [addToast]);

  return (
    <div className="fixed bottom-4 right-4 z-50 flex flex-col gap-2">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className={cn(
            "bg-gray-800 text-white px-4 py-2 rounded shadow-md animate-fade-in-up"
          )}
        >
          {toast.message}
        </div>
      ))}
    </div>
  );
};

export { Toaster };