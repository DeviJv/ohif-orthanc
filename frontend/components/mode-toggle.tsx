"use client";

import * as React from "react";
import { HugeiconsIcon } from "@hugeicons/react";
import { Sun01Icon, Moon01Icon } from "@hugeicons/core-free-icons";
import { useTheme } from "@/components/theme-provider";
import { Button } from "@/components/ui/button";

export function ModeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  // Avoid hydration mismatch
  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <Button variant="ghost" size="icon" className="h-9 w-9 rounded-xl border border-slate-200/40 bg-slate-50/50">
        <HugeiconsIcon icon={Sun01Icon} className="size-[1.1rem] text-slate-400" />
      </Button>
    );
  }

  return (
    <Button
      variant="ghost"
      size="icon"
      className="h-9 w-9 rounded-xl border border-slate-200/40 bg-slate-50/50 hover:bg-white hover:border-primary/20 hover:text-primary transition-all group shadow-sm"
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      title={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
    >
      {theme === "dark" ? (
        <HugeiconsIcon icon={Moon01Icon} className="size-[1.1rem] transition-all" />
      ) : (
        <HugeiconsIcon icon={Sun01Icon} className="size-[1.1rem] transition-all" />
      )}
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
}
