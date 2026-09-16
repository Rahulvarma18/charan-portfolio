export default function About() {
  const stats = [
    { num: "02", label: "Years crafting motion" },
    { num: "30+", label: "Projects delivered" },
    { num: "04", label: "Core tools" },
  ];

  const tools = ["After Effects", "Premiere Pro", "DaVinci Resolve", "Figma"];

  return (
    <section className="about-section" id="about">
      <div className="about-inner">
        <p className="section-kicker">/ About</p>

        <h2 className="about-heading">
          Design motion
          <br />
          with intent
        </h2>

        <p className="about-bio">
          I&apos;m Charan, an 18-year-old motion designer with two years of
          hands-on experience turning static ideas into kinetic stories.
          I care less about flashy effects and more about rhythm — the
          quiet decisions in timing and pacing that make a frame feel
          inevitable.
        </p>

        <div className="about-tools">
          <span className="about-tools-label">Toolkit</span>
          <div className="about-tools-list">
            {tools.map((tool) => (
              <span key={tool}>{tool}</span>
            ))}
          </div>
        </div>

        <div className="about-stats">
          {stats.map((stat) => (
            <div key={stat.label} className="about-stat">
              <span className="about-stat-num">{stat.num}</span>
              <span className="about-stat-label">{stat.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}