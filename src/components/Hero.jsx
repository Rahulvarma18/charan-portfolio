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
        <div className="hero-footer-wrapper">
          <div className="hero-services-footer">
            {services.map((service) => (
              <div key={service.num} className="service-col">
                <span className="service-number">{service.num}</span>
                <p className="service-title">{service.title}</p>
              </div>
            ))}
          </div>

          {/* Social Links */}
          <div className="hero-socials-footer">
            <a href="https://www.instagram.com/charan.film?igsi=dXRtNXFtbGZqZmpl&utm_source=qr" target="_blank" rel="noopener noreferrer" className="hero-social-link" title="Instagram">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zM5.838 12a6.162 6.162 0 1 1 12.324 0 6.162 6.162 0 0 1-12.324 0zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm4.965-10.322a1.44 1.44 0 1 1 2.881.001 1.44 1.44 0 0 1-2.881-.001z" />
              </svg>
            </a>

            <a href="mailto:charannayak817@gmail.com" className="hero-social-link" title="Email">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="4" width="20" height="16" rx="2" />
                <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
              </svg>
            </a>

            <a href="tel:+919182701325" className="hero-social-link" title="Phone">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}