import { motion } from "framer-motion";
import {
  fadeUp,
  scaleIn,
  staggerContainer,
  defaultViewport,
} from "@/lib/motion";

export default function About() {
  const stats = [
    { num: "02", label: "Years crafting motion" },
    { num: "30+", label: "Projects delivered" },
    { num: "04", label: "Core tools" },
  ];

  const tools = ["After Effects", "Premiere Pro", "DaVinci Resolve", "Figma"];

  return (
    <section className="about-section" id="about">
      <div className="about-container">
        <motion.div
          className="about-inner"
          variants={staggerContainer()}
          initial="hidden"
          whileInView="visible"
          viewport={defaultViewport}
        >
          <motion.p className="section-kicker" variants={fadeUp}>
            / About
          </motion.p>

          <motion.h2 className="about-heading" variants={fadeUp}>
            Design motion
            <br />
            with intent
          </motion.h2>

          <motion.p className="about-bio" variants={fadeUp}>
            I&apos;m Charan, an 18-year-old motion designer with two years of
            hands-on experience turning static ideas into kinetic stories.
            I care less about flashy effects and more about rhythm — the
            quiet decisions in timing and pacing that make a frame feel
            inevitable.
          </motion.p>

          <motion.div className="about-tools" variants={fadeUp}>
            <span className="about-tools-label">Toolkit</span>
            <div className="about-tools-list">
              {tools.map((tool) => (
                <span key={tool}>{tool}</span>
              ))}
            </div>
          </motion.div>

          <motion.div
            className="about-stats"
            variants={staggerContainer(0.1)}
          >
            {stats.map((stat) => (
              <motion.div
                key={stat.label}
                className="about-stat"
                variants={fadeUp}
              >
                <span className="about-stat-num">{stat.num}</span>
                <span className="about-stat-label">{stat.label}</span>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        <div className="about-media">
          <motion.div
            className="about-video-wrapper"
            variants={scaleIn}
            initial="hidden"
            whileInView="visible"
            viewport={defaultViewport}
          >
            <video
              src="/videos/about-video.mp4"
              autoPlay
              muted
              loop
              playsInline
              preload="auto"
              className="about-video"
              aria-label="Charan motion reel video"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}