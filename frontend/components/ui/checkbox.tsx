"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

export interface CheckboxProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  checked?: boolean | "indeterminate";
  onCheckedChange?: (checked: boolean | "indeterminate") => void;
}

const Checkbox = React.forwardRef<HTMLButtonElement, CheckboxProps>(
  ({ className, checked, onCheckedChange, disabled, ...props }, ref) => {
    const isChecked = checked === true;
    const isIndeterminate = checked === "indeterminate";

    const handleClick = (e: React.MouseEvent) => {
      e.preventDefault();
      e.stopPropagation();
      if (disabled) return;
      
      if (onCheckedChange) {
        if (isIndeterminate) {
          onCheckedChange(true);
        } else {
          onCheckedChange(!isChecked);
        }
      }
    };

    return (
      <button
        ref={ref}
        type="button"
        role="checkbox"
        aria-checked={isIndeterminate ? "mixed" : isChecked}
        disabled={disabled}
        onClick={handleClick}
        onPointerDown={(e) => e.stopPropagation()}
        className={cn(
          "relative flex size-4 shrink-0 cursor-pointer items-center justify-center rounded-sm border border-primary bg-background shadow-xs outline-none transition-all focus-visible:ring-2 focus-visible:ring-ring/50 z-10",
          // The black primary color you requested
          (isChecked || isIndeterminate) && "bg-primary text-primary-foreground border-primary",
          disabled && "cursor-not-allowed opacity-50",
          className
        )}
        {...props}
      >
        {(isChecked || isIndeterminate) && (
          <div className="flex items-center justify-center text-primary-foreground pointer-events-none">
            {isIndeterminate ? (
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="4"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="size-3"
              >
                <line x1="5" y1="12" x2="19" y2="12" />
              </svg>
            ) : (
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="4"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="size-3"
              >
                <polyline points="20 6 9 17 4 12" />
              </svg>
            )}
          </div>
        )}
      </button>
    );
  }
);

Checkbox.displayName = "Checkbox";

export { Checkbox };
