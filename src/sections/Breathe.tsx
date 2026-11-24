import { useEffect, useRef, useState } from "react";
import { motion, useInView, useReducedMotion } from "motion/react";
import { MagneticButton } from "@/components/unlumen-ui/magnetic-button";
import { MotionSubtitle } from "@/components/unlumen-ui/motion-subtitle";
import { LINKS } from "@/data";

const IN = 4;
const OUT = 6;
const TOTAL = 60;
const R = 148;
const AROUND = 2 * Math.PI * R;

/** A one-minute guided breath over the Montauk shoreline. */
export function Breathe() {
  const ref = useRef<HTMLElement>(null);
  const video = useRef<HTMLVideoElement>(null);
  const reduced = useReducedMotion() ?? false;
  const inView = useInView(ref, { amount: 0.1 });
  const [second, setSecond] = useState<number | null>(null);

  const running = second !== null && second < TOTAL;
  const done = second === TOTAL;

  useEffect(() => {
    if (!running) return;
    const id = setTimeout(() => setSecond((s) => (s === null ? s : s + 1)), 1000);
    return () => clearTimeout(id);
  }, [running, second]);

  // The sea only moves while it is on screen
  useEffect(() => {
    const v = video.current;
    if (!v) return;
    if (inView && !reduced) v.play().catch(() => undefined);
    else v.pause();
  }, [inView, reduced]);

  const inhale = ((second ?? 0) % (IN + OUT)) < IN;
  const cue = done ? "Well done" : running ? (inhale ? "Breathe in" : "Breathe out") : "One minute";

  return (
    <section
      ref={ref}
      id="breathe"
      className="on-dark relative isolate flex min-h-[min(100svh,900px)] items-center overflow-hidden bg-room py-20"
    >
      <video
        ref={video}
        src={`${import.meta.env.BASE_URL}video/ocean.mp4`}
        muted
        loop
        playsInline
        preload="metadata"
        aria-hidden
        className="absolute inset-0 -z-20 h-full w-full object-cover"
      />
      <div aria-hidden className="sea-tint absolute inset-0 -z-10" />

      <div className="wrap grid items-center gap-12 lg:grid-cols-[5fr_6fr]">
        <div>
          <h2 className="font-display text-[clamp(2.25rem,5.2vw,4.75rem)] leading-[1.04]">
            Start with a breath.
          </h2>
          <p className="mt-6 max-w-[40ch] text-lg leading-relaxed">
            Wellness at HONOR is mind, body and soul together. Before the weights, try the quiet
            part: four seconds in, six seconds out, for one minute.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <MagneticButton
              size="lg"
              className="cursor-pointer"
              onClick={() => setSecond(running ? null : 0)}
            >
              {running ? "Stop" : done ? "Breathe again" : "Begin"}
            </MagneticButton>
            {done && (
              <MagneticButton href={LINKS.book} size="lg" variant="outline">
                Book a class
              </MagneticButton>
            )}
          </div>
        </div>

        <div className="relative mx-auto grid aspect-square w-full max-w-[520px] place-items-center">
          <motion.div
            aria-hidden
            className="col-start-1 row-start-1 size-[58%] rounded-full bg-tan"
            animate={{ scale: reduced ? 1 : running ? (inhale ? 1.55 : 0.92) : 1, opacity: running ? 0.92 : 0.8 }}
            transition={{ duration: running ? (inhale ? IN : OUT) : 1.2, ease: "easeInOut" }}
          />
          <svg viewBox="0 0 320 320" aria-hidden className="col-start-1 row-start-1 h-full w-full -rotate-90">
            <circle cx="160" cy="160" r={R} fill="none" stroke="currentColor" strokeOpacity="0.28" strokeWidth="2" />
            <motion.circle
              cx="160"
              cy="160"
              r={R}
              fill="none"
              stroke="currentColor"
              strokeWidth="3"
              strokeLinecap="round"
              strokeDasharray={AROUND}
              initial={false}
              animate={{ strokeDashoffset: AROUND * (1 - (second ?? 0) / TOTAL) }}
              transition={{ duration: running ? 1 : 0.6, ease: "linear" }}
            />
          </svg>
          <div className="col-start-1 row-start-1 z-10 text-center text-deep" role="status">
            <MotionSubtitle text={cue} className="font-display text-[clamp(1.6rem,3vw,2.5rem)] leading-tight" />
            {running && (
              <p aria-hidden className="mt-1 text-lg font-medium tabular-nums">
                {TOTAL - (second ?? 0)}
              </p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
