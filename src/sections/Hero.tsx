import { useEffect, useRef, useState } from "react";
import { ChevronDown, Pause, Play } from "lucide-react";
import {
  motion,
  useInView,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "motion/react";
import { Mark } from "@/components/mark";
import { Highlight } from "@/components/unlumen-ui/primitives/effects/velocity-highlight";
import { MagneticButton } from "@/components/unlumen-ui/magnetic-button";
import { MotionSubtitle } from "@/components/unlumen-ui/motion-subtitle";
import { WhatsAppButton } from "@/components/whatsapp";
import { LINKS } from "@/data";
import { HERO_POSES, PosingFigure, usePosesReady } from "@/sections/PosingFigure";

const NAV = [
  { label: "Wellness", href: "#services" },
  { label: "Breathe", href: "#breathe" },
  { label: "Community", href: "#results" },
  { label: "Rates", href: "#rates" },
];

export function Nav() {
  return (
    <header className="absolute inset-x-0 top-0 z-40">
      <div className="wrap flex items-center justify-between py-5">
        <a href="#top" className="flex items-center gap-2 text-xl font-semibold tracking-[0.06em]" aria-label="HONOR, back to top">
          <Mark className="h-7 w-auto" />
          HONOR
        </a>
        <nav aria-label="Main" className="hidden md:block">
          <Highlight mode="parent" hover click={false} containerClassName="flex" className="rounded-full bg-deep/10">
            {NAV.map((n) => (
              <a
                key={n.href}
                href={n.href}
                data-value={n.href}
                className="relative z-10 block px-4 py-2 text-[0.95rem] font-medium"
              >
                {n.label}
              </a>
            ))}
          </Highlight>
        </nav>
        <a
          href={LINKS.book}
          target="_blank"
          rel="noopener noreferrer"
          className="text-[0.95rem] font-semibold underline decoration-2 underline-offset-4"
        >
          Book a class
        </a>
      </div>
    </header>
  );
}

/** How long each picture is held, in ms: one full breath. */
const INHALE = 4000;
const EXHALE = 6000;
const HOLD = INHALE + EXHALE;

/** 0 at rest, 1 with full lungs. */
const breathAt = (ms: number) => {
  const t = ((ms % HOLD) + HOLD) % HOLD;
  const p = t < INHALE ? t / INHALE : 1 - (t - INHALE) / EXHALE;
  return 0.5 - Math.cos(Math.PI * p) / 2;
};

/** The hidden copy holds each letter's widest width, so breathing never moves the word. */
function BreathWord({ text, step }: { text: string; step: number }) {
  return (
    <>
      {Array.from(text).map((ch, i) => (
        <span key={i} data-letter className="inline-grid justify-items-center [&>*]:col-start-1 [&>*]:row-start-1">
          <span className="letter-ghost invisible">{ch}</span>
          <span className="letter letter-in" style={{ animationDelay: `${i * step}ms` }}>
            {ch}
          </span>
        </span>
      ))}
    </>
  );
}

/**
 * One breath drives the sun, the letters and the cue. The pointer adds a warm light and swells
 * nearby letters. Everything is written as CSS variables, so React only renders on in and out.
 */
function useBreath(ref: React.RefObject<HTMLElement | null>, active: boolean, paused: boolean, onPhase: (inhale: boolean) => void) {
  const clock = useRef(0);
  const still = useRef(paused);
  still.current = paused;
  const notify = useRef(onPhase);
  notify.current = onPhase;

  useEffect(() => {
    const el = ref.current;
    if (!el || !active) return;
    const letters = Array.from(el.querySelectorAll<HTMLElement>("[data-letter]"));
    const figure = el.querySelector<HTMLElement>("[data-figure]");
    let target: { x: number; y: number } | null = null;
    const pos = { x: window.innerWidth * 0.5, y: window.innerHeight * 0.35 };
    let raf = 0;
    let last = performance.now();
    let inhale: boolean | null = null;
    let weighed = 0;
    const drawn: number[] = [];

    const move = (e: PointerEvent) => {
      if (e.pointerType === "mouse") target = { x: e.clientX, y: e.clientY };
    };
    const leave = () => {
      target = null;
    };

    const frame = (now: number) => {
      raf = requestAnimationFrame(frame);
      if (!still.current) clock.current += Math.min(64, now - last);
      last = now;
      const t = clock.current;
      const isIn = t % HOLD < INHALE;
      if (isIn !== inhale) {
        inhale = isIn;
        notify.current(isIn);
      }
      el.style.setProperty("--breath", breathAt(t).toFixed(3));

      const b = el.getBoundingClientRect();
      const goal = target ?? { x: b.left + b.width / 2, y: b.top + Math.min(b.height, window.innerWidth * 1.2) * 0.42 };
      const k = target ? 0.12 : 0.04;
      pos.x += (goal.x - pos.x) * k;
      pos.y += (goal.y - pos.y) * k;
      el.style.setProperty("--lx", `${(pos.x - b.left).toFixed(1)}px`);
      el.style.setProperty("--ly", `${(pos.y - b.top).toFixed(1)}px`);
      if (figure) {
        const f = figure.getBoundingClientRect();
        figure.style.setProperty("--fx", `${(((pos.x - f.left) / f.width) * 100).toFixed(1)}%`);
        figure.style.setProperty("--fy", `${(((pos.y - f.top) / f.height) * 100).toFixed(1)}%`);
      }

      // Re-weighting large glyphs is the costly part: 24 times a second, and only real changes
      if (now - weighed < 41) return;
      weighed = now;
      const reach = window.innerWidth * 0.18;
      letters.forEach((l, i) => {
        let near = 0;
        if (target) {
          const r = l.getBoundingClientRect();
          near = Math.max(0, 1 - Math.hypot(pos.x - (r.left + r.width / 2), pos.y - (r.top + r.height / 2)) / reach);
        }
        const w = 410 + 150 * breathAt(t - i * 160) + 240 * near * near * (3 - 2 * near);
        const step = Math.round(w / 4) * 4;
        if (drawn[i] === step) return;
        drawn[i] = step;
        l.style.setProperty("--w", String(step));
      });
    };

    el.addEventListener("pointermove", move);
    el.addEventListener("pointerleave", leave);
    raf = requestAnimationFrame(frame);
    return () => {
      cancelAnimationFrame(raf);
      el.removeEventListener("pointermove", move);
      el.removeEventListener("pointerleave", leave);
    };
  }, [ref, active]);
}

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const reduced = useReducedMotion() ?? false;
  const inView = useInView(ref, { amount: 0.15 });
  const ready = usePosesReady();
  const [paused, setPaused] = useState(false);
  const [inhale, setInhale] = useState(true);
  const [index, setIndex] = useState(0);

  useBreath(ref, !reduced && inView, paused, setInhale);

  useEffect(() => {
    if (!ready || reduced || paused || !inView) return;
    const id = setTimeout(() => setIndex((i) => (i + 1) % HERO_POSES.length), HOLD);
    return () => clearTimeout(id);
  }, [ready, reduced, paused, inView, index]);

  // Cursor depth: the first name sits behind him, the surname in front.
  const mx = useMotionValue(0);
  const px = useSpring(mx, { stiffness: 50, damping: 20, mass: 0.8 });
  const backX = useTransform(px, (v) => v * 22);
  const sunX = useTransform(px, (v) => v * 38);
  const figX = useTransform(px, (v) => v * -14);
  const frontX = useTransform(px, (v) => v * -28);

  const onMove = (e: React.PointerEvent) => {
    if (reduced || e.pointerType !== "mouse") return;
    mx.set((e.clientX / window.innerWidth - 0.5) * 2);
  };

  // Scroll depth: the sun rises and the names pull apart.
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const backY = useTransform(scrollYProgress, [0, 1], ["0%", reduced ? "0%" : "38%"]);
  const sunY = useTransform(scrollYProgress, [0, 1], ["0%", reduced ? "0%" : "-30%"]);
  const figScale = useTransform(scrollYProgress, [0, 1], [1, reduced ? 1 : 1.1]);
  const frontY = useTransform(scrollYProgress, [0, 1], ["0%", reduced ? "0%" : "-45%"]);

  return (
    <section
      ref={ref}
      id="top"
      onPointerMove={onMove}
      onPointerLeave={() => mx.set(0)}
      className="hero-sky relative isolate flex flex-col overflow-hidden lg:block lg:h-[max(640px,min(100svh,58vw))]"
    >
      <h1 className="sr-only">Sadiq Abubakar, wellness coach and founder of HONOR in Montauk and the Hamptons</h1>
      <div aria-hidden className="hero-glow absolute inset-0 -z-10" />

      <div className="relative h-[128vw] max-h-[820px] overflow-x-clip sm:h-[105vw] sm:max-h-none lg:absolute lg:inset-0 lg:h-auto">
        <motion.div
          aria-hidden
          style={{ x: sunX, y: sunY }}
          className="absolute inset-x-0 top-[22%] flex justify-center lg:top-[9%]"
        >
          <motion.div
            initial={reduced ? false : { y: "45%", opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 2.2, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="hero-sun" />
          </motion.div>
        </motion.div>

        <motion.div
          aria-hidden
          style={{ x: backX, y: backY }}
          className="hero-first font-display absolute inset-x-0 top-[15vw] text-center text-[27vw] leading-none whitespace-nowrap text-deep uppercase sm:top-[8vw] lg:top-[2.4vw]"
        >
          <BreathWord text="SADIQ" step={110} />
        </motion.div>

        <div className="pointer-events-none absolute inset-0">
          <motion.div
            style={{ x: figX, scale: figScale, transformOrigin: "50% 100%" }}
            className="absolute inset-x-0 bottom-0 flex h-[88%] justify-center lg:h-[98%]"
          >
            <motion.div
              className="h-full shrink-0"
              initial={reduced ? false : { y: "8%", opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 1.6, ease: [0.16, 1, 0.3, 1] }}
            >
              <PosingFigure index={index} />
            </motion.div>
          </motion.div>
        </div>

        <motion.div
          aria-hidden
          style={{ x: frontX, y: frontY }}
          className="hero-surname font-display absolute inset-x-0 bottom-[-0.06em] text-center text-[14.6vw] leading-none whitespace-nowrap text-deep uppercase"
        >
          <BreathWord text="ABUBAKAR" step={60} />
        </motion.div>
      </div>

      <div className="wrap relative z-20 flex flex-col gap-10 py-10 lg:pointer-events-none lg:absolute lg:inset-x-0 hero-copy-row lg:flex-row lg:items-start lg:justify-between lg:py-0">
        <div className="hero-copy pointer-events-auto max-w-[18rem]">
          <p className="text-xl leading-snug font-medium">
            Strong body, quiet mind. I coach both, for people who expect more of themselves.
          </p>
          <div className="hero-actions mt-5 flex flex-col items-start gap-3">
            <WhatsAppButton />
            <MagneticButton href={LINKS.book} size="lg">
              Book a class
            </MagneticButton>
          </div>
        </div>
        <div className="hero-copy pointer-events-auto max-w-[19rem] lg:pt-16 lg:text-right">
          {!reduced && (
            <>
              <div className="font-display text-[2.75rem] leading-none" aria-hidden>
                <MotionSubtitle text={inhale ? "Breathe in" : "Breathe out"} className="leading-none" />
              </div>
              <p className="mt-3 text-lg leading-snug font-medium">Follow the sun for one slow breath.</p>
            </>
          )}
          <div className="mt-4 flex items-center gap-2 lg:justify-end">
            {!reduced && (
              <button
                type="button"
                onClick={() => setPaused((p) => !p)}
                aria-label={paused ? "Play animation" : "Pause animation"}
                className="inline-flex size-11 cursor-pointer items-center justify-center rounded-full transition-colors hover:bg-deep/10"
              >
                {paused ? <Play size={18} fill="currentColor" /> : <Pause size={18} fill="currentColor" />}
              </button>
            )}
            {HERO_POSES.map((p, i) => (
              <button
                key={p.name}
                type="button"
                aria-pressed={i === index}
                onClick={() => setIndex(i)}
                aria-label={`Show ${p.name.toLowerCase()}`}
                className={`size-11 shrink-0 cursor-pointer overflow-hidden rounded-full outline-offset-2 transition-[opacity,box-shadow] duration-500 ${i === index ? "shadow-[0_0_0_3px_var(--deep)]" : "opacity-70 hover:opacity-100"}`}
              >
                <img src={p.thumb} alt="" width={128} height={128} className="h-full w-full object-cover" />
              </button>
            ))}
          </div>
          <a
            href="#proof"
            className="mt-1 flex w-max items-center gap-2 py-2 text-base font-semibold underline decoration-transparent underline-offset-4 hover:decoration-current lg:ml-auto"
          >
            Scroll to unlock
            <ChevronDown size={20} strokeWidth={2.5} className="scroll-nudge" aria-hidden />
          </a>
        </div>
      </div>
    </section>
  );
}
