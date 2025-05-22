"use client"
import * as React from "react"
import { cn } from "@/lib/utils"

const VerticalProgress = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & { value: number }
>(({ className, value, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "relative h-full w-1 bg-secondary rounded-full overflow-hidden",
      className
    )}
    {...props}
  >
    <div
      className="absolute top-0 left-0 w-full bg-primary transition-all duration-300"
      style={{ height: `${value}%` }}
    />
  </div>
))
VerticalProgress.displayName = "VerticalProgress"

export { VerticalProgress }