import { motion } from "framer-motion";
import { HaloReel } from "@/components/ui/halo-reel";
import { workItems } from "@/data/media";
import { fadeIn, defaultViewport } from "@/lib/motion";

export default function Work() {
  return (
    <motion.section
      id="work"
      variants={fadeIn}
      initial="hidden"
      whileInView="visible"
      viewport={defaultViewport}
    >
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
    </motion.section>
  );
}