import { useState } from "react";
import { ArrowRight } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { MagneticButton } from "@/components/unlumen-ui/magnetic-button";
import { SOLUTIONS, type Audience } from "@/data";

const KEYS: Audience[] = ["clients", "trainers"];

export function Solutions() {
  const [who, setWho] = useState<Audience>("clients");
  const s = SOLUTIONS[who];

  return (
    <section id="solutions" className="on-dark bg-deep py-[clamp(72px,10vw,152px)]">
      <div className="wrap">
        <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
          <h2 className="font-display max-w-[15ch] text-[clamp(min(2.25rem,10.2vw),5.2vw,4.75rem)] leading-[1.02]">
            Well looked after, on both sides.
          </h2>
          <div role="tablist" aria-label="Who is it for" className="flex w-fit rounded-full border border-paper/30 p-1">
            {KEYS.map((k) => (
              <button
                key={k}
                id={`tab-${k}`}
                role="tab"
                type="button"
                aria-selected={who === k}
                aria-controls="solutions-panel"
                tabIndex={who === k ? 0 : -1}
                onClick={() => setWho(k)}
                onKeyDown={(e) => {
                  if (e.key !== "ArrowLeft" && e.key !== "ArrowRight") return;
                  const next = KEYS[(KEYS.indexOf(k) + 1) % KEYS.length];
                  setWho(next);
                  document.getElementById(`tab-${next}`)?.focus();
                }}
                className={`relative cursor-pointer rounded-full px-6 py-3 text-base font-semibold transition-colors duration-300 ${who === k ? "text-deep" : "text-paper"}`}
              >
                {who === k && (
                  <motion.span
                    layoutId="solutions-tab"
                    className="absolute inset-0 rounded-full bg-tan"
                    transition={{ type: "spring", stiffness: 380, damping: 34 }}
                  />
                )}
                <span className="relative">{SOLUTIONS[k].tab}</span>
              </button>
            ))}
          </div>
        </div>

        <div id="solutions-panel" role="tabpanel" aria-labelledby={`tab-${who}`} className="mt-[clamp(40px,5vw,72px)]">
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={who}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
            >
              <p className="text-xl font-medium text-flare">{s.intro}</p>
              <ul className="mt-6 border-b border-paper/25">
                {s.rows.map((r, i) => (
                  <motion.li
                    key={r.problem}
                    initial={{ opacity: 0, x: -18 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.45, delay: 0.06 * i, ease: [0.16, 1, 0.3, 1] }}
                    className="group grid gap-x-6 gap-y-2 border-t border-paper/25 py-6 md:grid-cols-[5fr_auto_6fr] md:items-center md:gap-x-10"
                  >
                    <span className="text-lg leading-snug text-paper/70">{r.problem}</span>
                    <ArrowRight
                      aria-hidden
                      className="hidden text-flare transition-transform duration-300 group-hover:translate-x-2 md:block"
                    />
                    <span className="text-xl leading-snug font-semibold md:text-2xl">{r.answer}</span>
                  </motion.li>
                ))}
              </ul>
              <div className="mt-10">
                <MagneticButton href={s.href} size="lg">
                  {s.cta}
                </MagneticButton>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
