import { useEffect, useState } from "react";
import { motion } from "motion/react";
import { img } from "@/data";

/** Cutouts of Sadiq, registered to one canvas by head and body scale. */
export const HERO_POSES = [
  { name: "Presence", alt: "Sadiq Abubakar standing at ease, looking ahead" },
  { name: "Power", alt: "Sadiq Abubakar flexing one arm" },
  // Feet off the floor: no fade at the bottom, so his hands land on the surname
  { name: "Balance", alt: "Sadiq Abubakar holding himself up on both hands, seen from behind", grounded: true },
].map((p, i) => ({
  grounded: false,
  ...p,
  src: img(`hero-${i + 1}`),
  small: img(`hero-${i + 1}-sm`),
  thumb: img(`hero-${i + 1}-thumb`),
}));

/** Loads the remaining poses after the first paint; resolves once every pose can be shown. */
export function usePosesReady() {
  const [ready, setReady] = useState(false);
  useEffect(() => {
    let live = true;
    const small = window.matchMedia("(max-width: 767px)").matches;
    Promise.all(
      HERO_POSES.map((p) => {
        const im = new Image();
        im.src = small ? p.small : p.src;
        return im.decode().catch(() => undefined);
      }),
    ).then(() => live && setReady(true));
    return () => {
      live = false;
    };
  }, []);
  return ready;
}

export function PosingFigure({ index }: { index: number }) {
  const mask = {
    maskImage: `url(${HERO_POSES[index].small})`,
    WebkitMaskImage: `url(${HERO_POSES[index].small})`,
  };
  return (
    <div data-figure className="hero-breathe relative aspect-[2400/1860] h-full">
      {HERO_POSES.map((p, i) => {
        const on = i === index;
        return (
          <motion.picture
            key={p.src}
            aria-hidden={!on}
            className={`absolute inset-0 block origin-bottom ${p.grounded ? "" : "hero-fade"}`}
            initial={false}
            animate={{ opacity: on ? 1 : 0, y: on ? "0%" : "2%" }}
            transition={{ duration: 1.1, ease: [0.4, 0, 0.2, 1] }}
          >
            <source media="(max-width: 767px)" srcSet={p.small} />
            <img
              src={p.src}
              alt={p.alt}
              width={1920}
              height={1488}
              fetchPriority={i === 0 ? "high" : "low"}
              className={`block h-full w-full max-w-none ${p.grounded ? "hero-grounded" : ""}`}
            />
          </motion.picture>
        );
      })}

      {/* Warm light that follows the pointer across him */}
      <div aria-hidden className={`absolute inset-0 ${HERO_POSES[index].grounded ? "" : "hero-fade"}`}>
        <div className="hero-torch absolute inset-0" style={mask} />
      </div>
    </div>
  );
}
