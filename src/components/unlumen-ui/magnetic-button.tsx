"use client";

import * as React from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  type SpringOptions,
  type HTMLMotionProps,
} from "motion/react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const magneticButtonVariants = cva(
  "relative inline-flex items-center justify-center gap-2 rounded-full whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 select-none",
  {
    variants: {
      variant: {
        default:
          "bg-primary text-primary-foreground hover:bg-primary/90",
        destructive:
          "bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90",
        outline:
          "border border-current bg-transparent hover:bg-current/10",
        secondary:
          "bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-9 px-4 py-2",
        sm: "h-8 rounded-md px-3 text-xs",
        lg: "h-14 px-8 text-base",
        icon: "h-9 w-9",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

export interface MagneticButtonProps
  extends Omit<HTMLMotionProps<"button">, "style">,
    VariantProps<typeof magneticButtonVariants> {
  /** activation radius in px — @default 100 */
  radius?: number;
  springOptions?: SpringOptions;
  /** pull strength multiplier 0–1 — @default 0.5 */
  strength?: number;
  /** Renders an anchor instead of a button. */
  href?: string;
}

export function MagneticButton({
  children,
  radius = 100,
  springOptions = { stiffness: 150, damping: 15, mass: 0.1 },
  strength = 0.5,
  variant,
  size,
  className,
  href,
  ...props
}: MagneticButtonProps) {
  const ref = React.useRef<HTMLButtonElement>(null);

  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);

  const x = useSpring(rawX, springOptions);
  const y = useSpring(rawY, springOptions);

  const handleMouseMove = React.useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      const el = ref.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = e.clientX - cx;
      const dy = e.clientY - cy;
      const dist = Math.sqrt(dx * dx + dy * dy);

      if (dist < radius) {
        const pull = (1 - dist / radius) * strength;
        rawX.set(dx * pull);
        rawY.set(dy * pull);
      }
    },
    [radius, strength, rawX, rawY],
  );

  const handleMouseLeave = React.useCallback(() => {
    rawX.set(0);
    rawY.set(0);
  }, [rawX, rawY]);

  if (href) {
    const external = /^https?:/.test(href);
    return (
      <motion.a
        ref={ref as unknown as React.Ref<HTMLAnchorElement>}
        href={href}
        target={external ? "_blank" : undefined}
        rel={external ? "noopener noreferrer" : undefined}
        style={{ x, y }}
        className={cn(magneticButtonVariants({ variant, size }), className)}
        onMouseMove={
          handleMouseMove as unknown as React.MouseEventHandler<HTMLAnchorElement>
        }
        onMouseLeave={handleMouseLeave}
      >
        {children}
      </motion.a>
    );
  }

  return (
    <motion.button
      ref={ref}
      style={{ x, y }}
      className={cn(magneticButtonVariants({ variant, size }), className)}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      {...props}
    >
      {children}
    </motion.button>
  );
}

export { magneticButtonVariants };
