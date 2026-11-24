"use client";

import * as React from "react";
import { motion } from "motion/react";

import { cn } from "@/lib/utils";

export interface HoverExpandItem {
  label: string;
  /** e.g. country, year, category */
  sublabel?: string;
  image: string;
  imageAlt?: string;
  /** short descriptor shown when expanded */
  description?: string;
}

export interface HoverExpandProps {
  items: HoverExpandItem[];
  /**
   * Row height when collapsed, in pixels.
   * @default 68
   */
  collapsedHeight?: number;
  /**
   * Row height when expanded, in pixels.
   * @default 320
   */
  expandedHeight?: number;
  /** Row open at rest. @default null */
  defaultIndex?: number | null;
  className?: string;
}

export function HoverExpand({
  items,
  collapsedHeight = 68,
  expandedHeight = 320,
  defaultIndex = null,
  className,
}: HoverExpandProps) {
  const [hoveredIndex, setHoveredIndex] = React.useState<number | null>(
    defaultIndex,
  );

  return (
    <div className={cn("flex flex-col w-full", className)}>
      <div className="w-full border-t border-current opacity-15" />

      {items.map((item, i) => {
        const isHovered = hoveredIndex === i;
        const isOtherHovered = hoveredIndex !== null && !isHovered;

        return (
          <React.Fragment key={i}>
            <motion.div
              role="button"
              tabIndex={0}
              aria-expanded={isHovered}
              onFocus={() => setHoveredIndex(i)}
              onClick={() => setHoveredIndex(i)}
              className="relative w-full overflow-hidden rounded-[24px] cursor-default focus-visible:outline-2 focus-visible:outline-offset-2"
              animate={{
                height: isHovered ? expandedHeight : collapsedHeight,
                opacity: isOtherHovered ? 0.75 : 1,
              }}
              transition={{
                height: {
                  type: "spring",
                  stiffness: 280,
                  damping: 32,
                  mass: 0.9,
                },
                opacity: { duration: 0.22, ease: "easeOut" },
              }}
              onHoverStart={() => setHoveredIndex(i)}
              onHoverEnd={() => setHoveredIndex(defaultIndex)}
            >
              <motion.div
                className="absolute inset-0 w-full h-full"
                initial={false}
                animate={{
                  opacity: isHovered ? 1 : 0,
                  scale: isHovered ? 1 : 1.06,
                }}
                transition={{
                  opacity: { duration: 0.45, ease: [0.23, 1, 0.32, 1] },
                  scale: { duration: 0.55, ease: [0.23, 1, 0.32, 1] },
                }}
              >
                <img
                  src={item.image}
                  alt={item.imageAlt ?? ""}
                  className="w-full h-full object-cover object-[50%_10%]"
                  loading="lazy"
                  decoding="async"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/15 to-transparent" />
              </motion.div>

              <div className="absolute inset-0 flex items-end px-4 pb-4 sm:px-5">
                <div className="flex w-full items-end justify-between gap-4">
                  <div className="flex items-baseline gap-5 min-w-0">
                    <motion.span
                      className="font-display display-small truncate pb-[0.1em]"
                      style={{ fontSize: "clamp(1.02rem, 3.4vw, 2.75rem)" }}
                      animate={{
                        color: isHovered ? "#ffffff" : "currentColor",
                      }}
                      transition={{ duration: 0.2 }}
                    >
                      {item.label}
                    </motion.span>

                    {item.description && (
                      <motion.span
                        className="text-base text-white/90 truncate hidden md:block"
                        initial={{ opacity: 0, x: -8 }}
                        animate={{
                          opacity: isHovered ? 1 : 0,
                          x: isHovered ? 0 : -8,
                        }}
                        transition={{
                          duration: 0.3,
                          delay: isHovered ? 0.12 : 0,
                          ease: [0.23, 1, 0.32, 1],
                        }}
                      >
                        {item.description}
                      </motion.span>
                    )}
                  </div>

                  {item.sublabel && (
                    <motion.span
                      className="font-display display-small shrink-0 pb-[0.1em] text-[clamp(1.02rem,3.4vw,2.75rem)]"
                      animate={{
                        color: isHovered
                          ? "#ffffff"
                          : "currentColor",
                        opacity: 1,
                      }}
                      transition={{ duration: 0.2 }}
                    >
                      {item.sublabel}
                    </motion.span>
                  )}
                </div>
              </div>
            </motion.div>

            <div className="w-full border-t border-current opacity-15" />
          </React.Fragment>
        );
      })}
    </div>
  );
}
