import { HaloReel } from "@/components/ui/halo-reel";

const WORK_STILLS = [
  { src: "/work/work-01.mp4", alt: "Video work 1" },
  { src: "/work/work-02.mp4", alt: "Video work 2" },
  { src: "/work/work-03.mp4", alt: "Video work 3" },
  { src: "/work/work-08.mp4", alt: "Video work 4" },
  { src: "/work/work-09.mp4", alt: "Video work 5" },
];

export default function Work() {
  return (
    <section id="work">
      <HaloReel
        items={WORK_STILLS}
        aria-label="Selected work"
        centerLabel={
          <span className="text-[3.4vw] font-medium tracking-tight text-foreground">
            Selected works
          </span>
        }
        cardWidth={280}
        cardHeight={380}
        minScale={0.4}
        radiusYRatio={0.36}
        holdDuration={1000}
        stepDuration={700}
        className="h-[100dvh] bg-background"
      />
    </section>
  );
}