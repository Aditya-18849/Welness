import { useEffect, useState } from "react";
import { MagneticButton } from "@/components/unlumen-ui/magnetic-button";
import { WHATSAPP_URL } from "@/data";
import { cn } from "@/lib/utils";

const GLYPH =
  "M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z";

function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden className={className}>
      <path d={GLYPH} />
    </svg>
  );
}

const LABEL = "Chat on WhatsApp";

/** Without a number the button explains itself for a moment instead of linking anywhere. */
function usePending() {
  const [pending, setPending] = useState(false);
  const explain = () => {
    setPending(true);
    setTimeout(() => setPending(false), 2200);
  };
  return { label: pending ? "Number coming soon" : LABEL, explain };
}

const GREEN = "bg-[#25d366] text-deep hover:bg-[#3ee07a] font-semibold";

/** Inline WhatsApp button. The wrapper lets the floating button know one is already on screen. */
export function WhatsAppButton({ className }: { className?: string }) {
  const { label, explain } = usePending();
  return (
    <span data-whatsapp className="inline-block">
      <MagneticButton
        href={WHATSAPP_URL ?? undefined}
        onClick={WHATSAPP_URL ? undefined : explain}
        size="lg"
        className={cn(GREEN, "cursor-pointer px-6", className)}
      >
        <WhatsAppIcon className="size-5" />
        {label}
      </MagneticButton>
    </span>
  );
}

/** Stays in the corner for the whole page, stepping aside only while an inline button is visible. */
export function WhatsAppFloat() {
  const [hidden, setHidden] = useState(true);
  const { label, explain } = usePending();

  useEffect(() => {
    const seen = new Set<Element>();
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.intersectionRatio >= 0.98) seen.add(e.target);
          else seen.delete(e.target);
        }
        setHidden(seen.size > 0);
      },
      { threshold: 0.98 },
    );
    document.querySelectorAll("[data-whatsapp]").forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  const Tag = WHATSAPP_URL ? "a" : "button";
  const action = WHATSAPP_URL
    ? { href: WHATSAPP_URL, target: "_blank", rel: "noopener noreferrer" }
    : { type: "button" as const, onClick: explain };

  return (
    <Tag
      {...action}
      className={cn(
        GREEN,
        "fixed right-[max(16px,env(safe-area-inset-right))] bottom-[max(16px,env(safe-area-inset-bottom))] z-50 inline-flex h-14 rounded-full cursor-pointer items-center gap-2.5 px-5 text-base shadow-[0_6px_24px_rgb(18_48_44/0.28)] transition-[opacity,transform,visibility,background-color] duration-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-paper",
        hidden ? "invisible translate-y-4 opacity-0" : "visible translate-y-0 opacity-100",
      )}
    >
      <WhatsAppIcon className="size-6" />
      {label}
    </Tag>
  );
}
