import { useRef, useState } from "react";
import { ChevronDown, Lock, LockOpen } from "lucide-react";
import { motion, useMotionValueEvent, useScroll } from "motion/react";
import { AnimateDigits } from "@/components/unlumen-ui/animate-digits";
import { MotionSubtitle } from "@/components/unlumen-ui/motion-subtitle";
import ScrollRevealImage from "@/components/unlumen-ui/scroll-reveal-image";
import { img } from "@/data";

const MONTHS = 20;

export function Proof() {
  const ref = useRef<HTMLDivElement>(null);
  const [month, setMonth] = useState(0);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    // Hold at both ends so each state can be read.
    const t = Math.min(1, Math.max(0, (v - 0.15) / 0.6));
    setMonth(Math.round(t * MONTHS));
  });

  const open = month === MONTHS;
  const label = open ? "Sessions delivered" : month === 0 ? "First client" : "By referral";
  const when = month === 0 ? "MVP launch" : `Month ${month}`;

  return (
    <section id="proof">
      <div ref={ref} className="relative h-[300vh]">
        <motion.div
          animate={{ backgroundColor: open ? "#f6c892" : "#12302c", color: open ? "#12302c" : "#f6f8f5" }}
          initial={false}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="sticky top-0 flex h-screen flex-col justify-between overflow-hidden pt-[clamp(24px,5vh,56px)] pb-[92px]"
        >
          <div className="wrap flex flex-col justify-between gap-4 md:flex-row md:items-start">
            <h2 className="font-display max-w-[14ch] text-[clamp(2rem,4.6vw,4.25rem)] leading-[1.02]">
              Wellness that travels by word of mouth.
            </h2>
            <p className="max-w-[34ch] text-lg leading-relaxed">
              No paid ads. About 20 months, more than $500,000 in client spending, and one client
              telling the next.
            </p>
          </div>

          <div className="wrap flex items-end justify-between gap-6">
            <div className="sr-only" aria-live="polite">
              {open ? "About 2,500 sessions delivered" : "Scroll to see sessions delivered"}
            </div>
            <div aria-hidden className="font-display -ml-[0.04em] leading-[0.8]">
              <AnimateDigits
                value={open ? "2500" : "0000"}
                gap={0}
                direction="up"
                enterY={120}
                enterBlur={24}
                enterDamping={18}
                className="text-[min(31vw,44vh)] leading-[0.8] md:text-[min(21.5vw,50vh)]"
              />
            </div>
            <div aria-hidden className="hidden pb-4 text-right md:block">
              <MotionSubtitle
                text={label}
                className="font-display text-[clamp(1.1rem,2.1vw,2.1rem)] leading-tight"
              />
              <div className="text-lg tabular-nums">{when}</div>
            </div>
          </div>

          <div className="wrap">
            <p className="mb-4 flex items-center gap-2.5 text-lg font-semibold md:text-xl">
              {open ? (
                <>
                  <LockOpen size={22} strokeWidth={2.25} aria-hidden />
                  Unlocked
                </>
              ) : (
                <>
                  <Lock size={22} strokeWidth={2.25} aria-hidden />
                  {month === 0 ? "Scroll to unlock" : "Keep scrolling to unlock"}
                  <ChevronDown size={24} strokeWidth={2.5} className="scroll-nudge" aria-hidden />
                </>
              )}
            </p>
            <div aria-hidden className="mb-3 flex justify-between text-base font-medium md:hidden">
              <span>{label}</span>
              <span className="tabular-nums">{when}</span>
            </div>
            <div className="flex gap-1 md:gap-1.5">
              {Array.from({ length: MONTHS + 1 }, (_, i) => (
                <div
                  key={i}
                  className={`h-2 flex-1 rounded-full transition-opacity duration-300 ${i <= month ? "opacity-100" : "opacity-20"}`}
                  style={{ background: "currentColor" }}
                />
              ))}
            </div>
            <div className="mt-3 flex justify-between gap-6 text-sm font-medium">
              <span>MVP launch</span>
              <span className="text-right">About 20 months, founder-reported</span>
            </div>
          </div>
        </motion.div>
      </div>

      <div className="bg-tan pb-[3vw]">
        <ScrollRevealImage
          src={img("reveal")}
          alt="Members pressing dumbbells overhead in an HONOR class at the Montauk Playhouse"
          height="min(86vh, 60vw)"
          fromWidth="46vw"
          toWidth="93vw"
          toRadius="36px"
          innerWidth="95vw"
          fromScale={1.35}
          imageClassName="object-[50%_0%]"
        />
      </div>
    </section>
  );
}
