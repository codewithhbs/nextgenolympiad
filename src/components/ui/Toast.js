"use client";
import { createContext, useContext, useState, useCallback } from "react";
import { CheckCircle2, AlertCircle, X } from "lucide-react";

const ToastCtx = createContext(null);
export const useToast = () => useContext(ToastCtx);

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);
  const push = useCallback((message, type = "success") => {
    const id = Date.now() + Math.random();
    setToasts((t) => [...t, { id, message, type }]);
    setTimeout(() => setToasts((t) => t.filter((x) => x.id !== id)), 4000);
  }, []);
  return (
    <ToastCtx.Provider value={{ success: (m) => push(m, "success"), error: (m) => push(m, "error") }}>
      {children}
      <div className="fixed bottom-6 right-6 z-[60] flex flex-col gap-2">
        {toasts.map((t) => (
          <div key={t.id} className={`flex items-center gap-2 rounded-xl px-4 py-3 text-sm font-medium text-white shadow-soft animate-fade-up ${t.type === "error" ? "bg-cherry" : "bg-leaf"}`}>
            {t.type === "error" ? <AlertCircle className="w-4 h-4" /> : <CheckCircle2 className="w-4 h-4" />}
            {t.message}
          </div>
        ))}
      </div>
    </ToastCtx.Provider>
  );
}
