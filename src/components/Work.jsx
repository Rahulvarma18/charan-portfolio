import { HaloReel } from "@/components/ui/halo-reel";
import { workItems } from "@/data/media";

export default function Work() {
  return (
    <section id="work">
      <HaloReel
        items={workItems}
        aria-label="Selected work"
        centerLabel={
          <span className="text-[3.4vw] font-medium tracking-tight text-foreground">
            Selected works
          </span>
        }
        cardWidth={220}
        cardHeight={300}
        minScale={0.4}
        radiusYRatio={0.36}
        holdDuration={1000}
        stepDuration={700}
        className="h-[100dvh] bg-background"
      />
    </section>
  );
}