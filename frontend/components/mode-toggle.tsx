"use client";

import * as React from "react";
import { useTheme } from "@/components/theme-provider";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { useThemeToggle } from "@/components/ui/skiper-ui/skiper26";

export function ModeToggle() {
  const { theme } = useTheme();
  const [mounted, setMounted] = React.useState(false);
  const [systemIsDark, setSystemIsDark] = React.useState(false);

  const { setCrazyLightTheme, setCrazyDarkTheme, setCrazySystemTheme } = useThemeToggle({
    variant: "circle",
    start: "top-right"
  });

  React.useEffect(() => {
    setMounted(true);
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    setSystemIsDark(mediaQuery.matches);
    
    const handler = (e: MediaQueryListEvent) => setSystemIsDark(e.matches);
    mediaQuery.addEventListener("change", handler);
    return () => mediaQuery.removeEventListener("change", handler);
  }, []);

  const handleToggle = () => {
    if (theme === "light") setCrazyDarkTheme();
    else if (theme === "dark") setCrazySystemTheme();
    else setCrazyLightTheme();
  };

  if (!mounted) {
    return (
      <button className="h-9 w-9 rounded-full bg-slate-100 dark:bg-slate-800 opacity-50" />
    );
  }

  const isDarkVisual = theme === "dark" || (theme === "system" && systemIsDark);

  return (
    <button
      type="button"
      className={cn(
        "relative flex h-9 w-9 items-center justify-center rounded-full border shadow-sm transition-all duration-300 active:scale-95",
        isDarkVisual 
          ? "bg-black text-white border-slate-800" 
          : "bg-white text-black border-slate-200/40"
      )}
      onClick={handleToggle}
      title={`Current mode: ${theme}. Click to change.`}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
        fill="currentColor"
        strokeLinecap="round"
        viewBox="0 0 32 32"
        className="size-5"
      >
        <clipPath id="skiper-btn-2">
          <motion.path
            animate={{ y: isDarkVisual ? 10 : 0, x: isDarkVisual ? -12 : 0 }}
            transition={{ ease: "easeInOut", duration: 0.35 }}
            d="M0-5h30a1 1 0 0 0 9 13v24H0Z"
          />
        </clipPath>
        <g clipPath="url(#skiper-btn-2)">
          <motion.circle
            animate={{ r: isDarkVisual ? 10 : 8 }}
            transition={{ ease: "easeInOut", duration: 0.35 }}
            cx="16"
            cy="16"
          />
          <motion.g
            animate={{
              rotate: isDarkVisual ? -100 : 0,
              scale: isDarkVisual ? 0.5 : 1,
              opacity: isDarkVisual ? 0 : 1,
            }}
            transition={{ ease: "easeInOut", duration: 0.35 }}
            stroke="currentColor"
            strokeWidth="1.5"
          >
            <path d="M16 5.5v-4" />
            <path d="M16 30.5v-4" />
            <path d="M1.5 16h4" />
            <path d="M26.5 16h4" />
            <path d="m23.4 8.6 2.8-2.8" />
            <path d="m5.7 26.3 2.9-2.9" />
            <path d="m5.8 5.8 2.8 2.8" />
            <path d="m23.4 23.4 2.9 2.9" />
          </motion.g>
        </g>
      </svg>
      {theme === "system" && (
        <div className="absolute -bottom-1 -right-1 flex h-3.5 w-3.5 items-center justify-center rounded-full bg-primary text-[8px] font-bold text-primary-foreground shadow-sm">
          A
        </div>
      )}
    </button>
  );
}
