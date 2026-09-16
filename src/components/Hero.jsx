import Navbar from "@/components/Navbar";

export default function Hero() {
  const services = [
    { num: "# 01", title: "Motion Design" },
    { num: "# 02", title: "Video Editing" },
    { num: "# 03", title: "Color Grading" },
    { num: "# 04", title: "SaaS Visuals" }
  ];

  return (
    <section className="hero-card-wrapper" id="home">
      <div className="hero-card">
        {/* Background Image & Lighting */}
        <div className="hero-image-container">
          <img
            src="/hero-image.png"
            alt="Creative Director portrait"
            className="hero-bg-image"
          />
          <div className="hero-gradient-left" />
          <div className="hero-gradient-bottom" />
        </div>

        {/* Top Navbar */}
        <Navbar />

        {/* Hero Middle Content */}
        <div className="hero-body">
          {/* Left Title Group */}
          <div className="hero-left-content">
            <p className="hero-intro">Hey, I&apos;m a</p>
            <h1 className="hero-heading">
              Motion
              <br />
              Designer
            </h1>
          </div>

          {/* Right Statement Group */}
          <div className="hero-right-content">
            <h2 className="hero-subheading">
              Every frame
              <br />
              tells a story.
            </h2>
            <p className="hero-subtext">
              From kinetic typography to cinematic edits,
              <br />
              I craft visuals that move people.
            </p>
          </div>
        </div>

        {/* Bottom Services Row */}
        <div className="hero-services-footer">
          {services.map((service) => (
            <div key={service.num} className="service-col">
              <span className="service-number">{service.num}</span>
              <p className="service-title">{service.title}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
