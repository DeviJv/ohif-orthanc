"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
import { HugeiconsIcon } from "@hugeicons/react"
import { Tick02Icon } from "@hugeicons/core-free-icons"

interface CheckboxProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "checked" | "onChange"> {
  checked?: boolean | "indeterminate"
  onCheckedChange?: (checked: boolean | "indeterminate") => void
}

const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(
  ({ className, checked, onCheckedChange, ...props }, ref) => {
    const innerRef = React.useRef<HTMLInputElement>(null)
    
    React.useImperativeHandle(ref, () => innerRef.current!)

    const isIndeterminate = checked === "indeterminate"

    React.useEffect(() => {
      if (innerRef.current) {
        innerRef.current.indeterminate = isIndeterminate
      }
    }, [isIndeterminate])

    return (
      <div className="relative flex items-center justify-center">
        <input
          type="checkbox"
          ref={innerRef}
          checked={checked === true}
          onChange={(e) => onCheckedChange?.(isIndeterminate ? true : e.target.checked)}
          className={cn(
            "peer size-4 shrink-0 rounded-sm border border-primary ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 appearance-none checked:bg-primary checked:border-primary data-[state=indeterminate]:bg-primary data-[state=indeterminate]:border-primary transition-colors cursor-pointer",
            className
          )}
          data-state={isIndeterminate ? "indeterminate" : checked ? "checked" : "unchecked"}
          {...props}
        />
        <div className="absolute pointer-events-none text-primary-foreground opacity-0 peer-checked:opacity-100 transition-opacity flex items-center justify-center">
          <HugeiconsIcon icon={Tick02Icon} className="size-3" strokeWidth={3} />
        </div>
        {isIndeterminate && (
            <div className="absolute pointer-events-none text-primary-foreground flex items-center justify-center">
                <div className="w-2 hs-[2px] bg-current rounded-full" />
            </div>
        )}
      </div>
    )
  }
)
Checkbox.displayName = "Checkbox"

export { Checkbox }
