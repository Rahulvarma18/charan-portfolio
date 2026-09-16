export default function Navbar() {
  return (
    <header className="hero-navbar">
      {/* Brand Logo */}
      <a href="#home" className="navbar-logo">
        Charan<span className="logo-dot">.</span>
      </a>

      {/* Nav Links & CTA */}
      <div className="navbar-right">
        <nav className="navbar-menu" aria-label="Main Navigation">
          <a href="#work" className="nav-link">Work</a>
          <a href="#about" className="nav-link">About</a>
          <a href="#contact" className="nav-link">Contact</a>
        </nav>

        {/* Get in touch CTA Button */}
        <a href="#contact" className="nav-cta-btn">
          <span className="cta-text">Get in touch</span>
          <span className="cta-arrow-circle">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="5" y1="12" x2="19" y2="12" />
              <polyline points="12 5 19 12 12 19" />
            </svg>
          </span>
        </a>
      </div>
    </header>
  );
}
