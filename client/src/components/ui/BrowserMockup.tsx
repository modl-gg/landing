import { useRef, useEffect, useState, type ReactNode } from "react";
import { ImageIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import ImageLightbox from "./ImageLightbox";

interface BrowserMockupProps {
  title?: string;
  children?: ReactNode;
  className?: string;
  tilt?: boolean;
  label?: string;
  previewSrc?: string;
  previewAlt?: string;
}

function ScreenshotPlaceholder({ label }: { label?: string }) {
  return (
    <div className="w-full min-h-[200px] flex items-center justify-center p-8">
      <div className="text-center">
        <div className="w-14 h-14 mx-auto mb-3 rounded-lg border-2 border-dashed border-primary/15 flex items-center justify-center">
          <ImageIcon className="w-5 h-5 text-primary/20" />
        </div>
        <p className="text-muted-foreground/25 text-xs font-mono">{label || "screenshot.png"}</p>
      </div>
    </div>
  );
}

export default function BrowserMockup({ title, children, className, tilt = false, label, previewSrc, previewAlt }: BrowserMockupProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [lightboxOpen, setLightboxOpen] = useState(false);

  useEffect(() => {
    if (!tilt) return;
    const el = ref.current;
    if (!el) return;

    const handleMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      el.style.transform = `perspective(1000px) rotateY(${x * 8}deg) rotateX(${-y * 8}deg) scale(1.01)`;
    };

    const handleLeave = () => {
      el.style.transform = "";
    };

    el.addEventListener("mousemove", handleMove, { passive: true });
    el.addEventListener("mouseleave", handleLeave);

    return () => {
      el.removeEventListener("mousemove", handleMove);
      el.removeEventListener("mouseleave", handleLeave);
    };
  }, [tilt]);

  const clickable = !!previewSrc;

  return (
    <>
      <div
        className={cn("relative", clickable && "cursor-zoom-in", className)}
        onClick={clickable ? () => setLightboxOpen(true) : undefined}
      >
        <div
          ref={ref}
          className="rounded-xl overflow-hidden border border-white/[0.08] bg-card shadow-xl shadow-black/20"
          style={{ transition: "transform 0.15s ease-out, box-shadow 0.3s ease" }}
        >
          <div className="px-4 py-2.5 flex items-center gap-2 border-b border-white/[0.05] bg-muted/40">
            <div className="flex gap-1.5">
              <div className="w-2.5 h-2.5 rounded-full bg-white/[0.07]" />
              <div className="w-2.5 h-2.5 rounded-full bg-white/[0.07]" />
              <div className="w-2.5 h-2.5 rounded-full bg-white/[0.07]" />
            </div>
            <div className="flex-1 mx-6">
              <div className="bg-white/[0.04] rounded-md px-3 py-1 text-[11px] text-muted-foreground/40 font-mono text-center">
                {title || "panel.modl.gg"}
              </div>
            </div>
          </div>
          <div className="bg-gradient-to-br from-primary/[0.03] via-transparent to-accent/[0.02]">
            {children || <ScreenshotPlaceholder label={label} />}
          </div>
        </div>
        <div className="absolute -inset-4 bg-primary/[0.03] rounded-2xl blur-xl -z-10" />
      </div>

      {previewSrc && (
        <ImageLightbox
          src={previewSrc}
          alt={previewAlt || "Screenshot preview"}
          open={lightboxOpen}
          onClose={() => setLightboxOpen(false)}
        />
      )}
    </>
  );
}
