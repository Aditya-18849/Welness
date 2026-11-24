import { useEffect, useState } from "react";
import { WhatsAppButton } from "@/components/whatsapp";
import { CursorImageTrail } from "@/components/unlumen-ui/cursor-image-trail";
import { HoverExpand } from "@/components/unlumen-ui/hover-expand";
import { MagneticButton } from "@/components/unlumen-ui/magnetic-button";
import { MotionAccordion } from "@/components/unlumen-ui/motion-faqs-accordion";
import { OrbitalImageWheel } from "@/components/unlumen-ui/orbital-image-wheel";
import { SideBySideSlide } from "@/components/unlumen-ui/side-by-side-slide";
import { TextReveal } from "@/components/unlumen-ui/text-reveal";
import { Tilt } from "@/components/unlumen-ui/tilt";
import { FAQ, LINKS, MILESTONES, MOVEMENTS, PLATFORM, RATES, RESULTS, SERVICES, STEPS, img } from "@/data";

const H2 = "font-display text-[clamp(2.25rem,5.2vw,4.75rem)] leading-[1.02]";
const link =
  "underline decoration-1 underline-offset-4 transition-[text-decoration-thickness] hover:decoration-2";
const ext = { target: "_blank", rel: "noopener noreferrer" } as const;

export function Services() {
  return (
    <section id="services" className="bg-paper py-[clamp(72px,11vw,168px)]">
      <div className="wrap">
        <TextReveal
          text="Mind, body and soul. Wellness coaching for Montauk and the Hamptons."
          className="font-display max-w-[24ch] text-[clamp(2.1rem,5.4vw,5rem)] !leading-[1.06]"
          staggerDelay={0.04}
        />
        <ul className="mt-[clamp(48px,7vw,104px)] grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {SERVICES.map((s) => (
            <li key={s.name} className="flex flex-col rounded-[28px] bg-ice p-6">
              <h3 className="font-display display-small text-3xl leading-tight">{s.name}</h3>
              <p className="mt-3 mb-5 max-w-[32ch] leading-relaxed">{s.text}</p>
              <p className="mt-auto text-lg font-semibold">{s.price}</p>
            </li>
          ))}
        </ul>
        <p className="mt-12 max-w-[60ch] text-lg leading-relaxed">
          New to HONOR? Your first session is free.{" "}
          <a className={`font-semibold ${link}`} href={LINKS.packages} {...ext}>
            See classes and packs
          </a>
        </p>
      </div>
    </section>
  );
}

export function Formats() {
  return (
    <section className="on-dark bg-room py-[clamp(64px,9vw,136px)]">
      <div className="wrap grid items-center gap-10 lg:grid-cols-[5fr_6fr] lg:gap-20">
        <div>
          <h2 className={H2}>A quiet mind. A body that keeps up.</h2>
          <p className="mt-6 max-w-[42ch] text-lg leading-relaxed">
            The calm of the East End on one side, a HONOR class on the other. The two belong together, so
            we coach them that way: focus first, then movement with a purpose.
          </p>
          <p className="mt-4 max-w-[42ch] text-lg leading-relaxed text-flare">
            Drag across the photo to go from one to the other.
          </p>
        </div>
        <SideBySideSlide
          beforeImage={img("shore")}
          afterImage={img("together")}
          beforeAlt="The shoreline at first light"
          afterAlt="HONOR class at the Montauk Playhouse"
          initialPosition={50}
          dividerColor="#f6f8f5"
          handleColor="#f6c892"
          dividerShadow="none"
          handleSize={44}
          cursor="col-resize"
          className="aspect-[4/5] w-full max-w-[640px] justify-self-end rounded-[36px]"
        />
      </div>
    </section>
  );
}

function useWide() {
  const [wide, setWide] = useState(() => window.matchMedia("(min-width: 768px)").matches);
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 768px)");
    const on = () => setWide(mq.matches);
    mq.addEventListener("change", on);
    return () => mq.removeEventListener("change", on);
  }, []);
  return wide;
}

export function Programming() {
  const wide = useWide();
  return (
    <section id="programming" className="on-dark bg-deep">
      <div className="wrap pt-[clamp(64px,9vw,136px)]">
        <h2 className={H2}>Movement that looks after you.</h2>
        <p className="mt-5 max-w-[46ch] text-lg leading-relaxed">
          Exercises chosen for longevity: joints, posture, balance and strength. Scroll to turn the
          wheel, or pick one by name.
        </p>
      </div>
      <OrbitalImageWheel
        key={wide ? "wide" : "narrow"}
        images={MOVEMENTS}
        turns={1}
        blur={3}
        dim={45}
        brightnessBoost={8}
        itemWidth={wide ? 340 : 230}
        itemHeight={wide ? 453 : 307}
        wheelSize={wide ? 1800 : 1120}
        cropRatio={wide ? 0.73 : 0.58}
        scrollSensitivity={1}
        captionOffset={wide ? 7 : 12}
        scrollLength={420}
      />
    </section>
  );
}

export function Results() {
  return (
    <section id="results" className="bg-ice py-[clamp(72px,10vw,152px)]">
      <div className="wrap">
        <h2 className={H2}>A growing wellness community</h2>
        <div className="mt-10">
          <HoverExpand items={MILESTONES} collapsedHeight={96} expandedHeight={440} defaultIndex={1} />
        </div>

        <div className="mt-[clamp(56px,7vw,104px)] grid gap-x-12 gap-y-14 lg:grid-cols-3">
          {RESULTS.map((col) => (
            <div key={col.title}>
              <h3 className="text-xl font-semibold">{col.title}</h3>
              <ul className="mt-4">
                {col.rows.map((r) => (
                  <li
                    key={r.figure + r.name}
                    className={`grid grid-cols-[7.75rem_1fr] items-center gap-4 border-t py-4 ${r.lead ? "-mx-4 rounded-[20px] border-transparent bg-tan px-4" : "border-deep/25"}`}
                  >
                    <span className="font-display display-small text-[2rem] leading-none whitespace-nowrap">
                      {r.figure}
                    </span>
                    <span>
                      <span className="block text-lg leading-snug font-semibold">{r.name}</span>
                      {r.note && <span className="block">{r.note}</span>}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <p className="mt-10 max-w-[70ch]">
          Figures are reported by HONOR and its founder, and have not been independently audited.{" "}
          <a className={link} href={LINKS.story} {...ext}>
            Read the story on LinkedIn
          </a>
        </p>
      </div>
    </section>
  );
}

export function Start() {
  return (
    <section id="start" className="bg-paper">
      <div className="grid lg:grid-cols-2">
        <img
          src={img("floor")}
          alt="Members on mats during an HONOR class at the Montauk Playhouse"
          loading="lazy"
          className="h-[110vw] w-full object-cover object-[30%_10%] lg:sticky lg:top-0 lg:h-screen"
        />
        <div className="flex flex-col justify-center px-[max(20px,5vw)] py-[clamp(64px,8vw,120px)]">
          <h2 className={H2}>Care that fits around your life.</h2>
          <ol className="mt-10">
            {STEPS.map((s, i) => (
              <li key={s.name} className="grid grid-cols-[3rem_1fr] border-t border-deep/25 py-5">
                <span className="font-display display-small text-2xl leading-tight">{i + 1}</span>
                <span>
                  <span className="block text-xl font-semibold">{s.name}</span>
                  <span className="mt-1 block max-w-[46ch] text-lg leading-relaxed">{s.text}</span>
                </span>
              </li>
            ))}
          </ol>
          <div className="mt-6 flex flex-wrap gap-3">
            <WhatsAppButton />
            <MagneticButton href={LINKS.book} size="lg">
              Book a class
            </MagneticButton>
          </div>
          <figure className="mt-12 rounded-[28px] bg-tan p-7">
            <blockquote className="font-display display-small text-2xl leading-snug">
              “Honor Fitness has transformed my health and wellness”
            </blockquote>
            <figcaption className="mt-3 font-medium">Becky B., HONOR client</figcaption>
          </figure>
          <MotionAccordion items={FAQ} className="mt-12 border-t border-deep/20" />
        </div>
      </div>
    </section>
  );
}

export function PlatformRates() {
  return (
    <section className="on-dark bg-room py-[clamp(72px,10vw,152px)]">
      <div className="wrap">
        <div className="grid items-center gap-12 lg:grid-cols-[6fr_5fr] lg:gap-20">
          <div>
            <h2 className={H2}>Human care, backed by technology.</h2>
            <p className="mt-6 max-w-[52ch] text-lg leading-relaxed">
              HONOR calls it HI-AI: human intelligence, enhanced by artificial intelligence. Software
              takes the admin. Coaches keep the coaching, the accountability and the relationship.
            </p>
            <h3 className="mt-8 text-lg font-semibold">What the platform handles</h3>
            <ul className="mt-4 flex max-w-[34rem] flex-wrap gap-2">
              {PLATFORM.map((p) => (
                <li
                  key={p}
                  className="rounded-full border border-paper/30 px-4 py-2 transition-colors duration-200 hover:border-tan hover:bg-tan hover:text-deep"
                >
                  {p}
                </li>
              ))}
            </ul>
            <div className="mt-9">
              <MagneticButton href={LINKS.clients} size="lg">
                See how it works
              </MagneticButton>
            </div>
          </div>
          <Tilt rotationFactor={7} className="w-full max-w-[520px] justify-self-end">
            <img
              src={img("personal")}
              alt="An HONOR client holding a kettlebell during a personal session"
              loading="lazy"
              className="block aspect-[4/5] w-full rounded-[36px] object-cover"
            />
          </Tilt>
        </div>

        <div id="rates" className="scroll-mt-10 pt-[clamp(56px,8vw,120px)]">
          <h2 className={H2}>Rates</h2>
          <div className="mt-8 grid gap-x-16 gap-y-14 lg:grid-cols-2">
            {RATES.map((g) => (
              <div key={g.group}>
                <h3 className="text-xl font-semibold">{g.group}</h3>
                <ul className="mt-4 border-b border-paper/25">
                  {g.rows.map((r) => (
                    <li key={r.name} className="border-t border-paper/25">
                      <a
                        href={r.href}
                        {...ext}
                        className="group flex items-center justify-between gap-4 py-4 transition-[background-color,color,padding] duration-200 hover:rounded-2xl hover:bg-tan hover:px-4 hover:text-deep focus-visible:bg-tan focus-visible:px-4 focus-visible:text-deep"
                      >
                        <span className="min-w-0">
                          <span className="block text-lg font-semibold">{r.name}</span>
                          <span className="block">{r.note}</span>
                        </span>
                        <span className="font-display display-small shrink-0 text-3xl">{r.price}</span>
                      </a>
                    </li>
                  ))}
                </ul>
                <p className="mt-4 text-ice">{g.note}</p>
              </div>
            ))}
          </div>
          <p className="mt-10 text-ice">One-time payments with no automatic renewal.</p>
        </div>
      </div>
    </section>
  );
}

const TRAIL = ["t1", "t2", "t3", "t4", "t5", "t6", "t7"].map((n) => (
  <img key={n} src={img(n)} alt="" />
));

export function Finale() {
  return (
    <footer className="bg-tan text-deep">
      <CursorImageTrail items={TRAIL} itemSize={170} trailLength={6} spawnDistance={110} rotationRange={8}>
        <div className="wrap pointer-events-none relative z-10 flex flex-col justify-between gap-16 pt-[clamp(72px,10vw,140px)] pb-24 md:min-h-[min(92vh,820px)]">
          <div>
            <p className="font-display max-w-[11ch] text-[clamp(3.25rem,10.5vw,10rem)] leading-[0.94]">
              Come as you are. Build from here.
            </p>
            <div className="pointer-events-auto mt-10 flex w-fit flex-wrap gap-3">
              <WhatsAppButton />
              <MagneticButton href={LINKS.book} size="lg">
                Book a class
              </MagneticButton>
            </div>
          </div>
          <div className="flex flex-col justify-between gap-8 md:flex-row md:items-end">
            <div className="pointer-events-auto text-lg leading-relaxed font-medium">
              <p>Montauk Playhouse, 240 Edgemere Street, Montauk, NY 11954</p>
              <p className="flex flex-wrap gap-x-6">
                <a className={link} href={LINKS.email}>sadiq@livehonor.co</a>
                <a className={link} href={LINKS.phone}>+1 (631) 405 8513</a>
              </p>
            </div>
            <ul className="pointer-events-auto flex flex-wrap gap-x-7 gap-y-3 text-lg font-medium md:justify-end md:pr-52">
              <li><a className={link} href={LINKS.instagram} {...ext}>Instagram</a></li>
              <li><a className={link} href={LINKS.linkedin} {...ext}>LinkedIn</a></li>
              <li><a className={link} href={LINKS.trainers} {...ext}>For trainers</a></li>
              <li><a className={link} href={LINKS.site} {...ext}>livehonor.co</a></li>
            </ul>
          </div>
        </div>
      </CursorImageTrail>
    </footer>
  );
}
