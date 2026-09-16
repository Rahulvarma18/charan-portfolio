export default function Contact() {
  return (
    <section className="contact-section" id="contact">
      <div className="contact-inner">
        <p className="section-kicker">/ Contact</p>

        <h2 className="contact-heading">
          Let&apos;s make
          <br />
          something move.
        </h2>

        <p className="contact-sub">
          Open to freelance edits, motion projects, and SaaS visual work.
          Based in India, working with clients everywhere.
        </p>

        <a href="mailto:hello@charan.design" className="contact-email">
          <span>hello@charan.design</span>
          <span className="cta-arrow-circle">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="5" y1="12" x2="19" y2="12" />
              <polyline points="12 5 19 12 12 19" />
            </svg>
          </span>
        </a>

        <div className="contact-meta">
          <div className="contact-meta-item">
            <span className="contact-meta-num">18 yrs</span>
            <span>Age</span>
          </div>
          <div className="contact-meta-item">
            <span className="contact-meta-num">2 yrs</span>
            <span>Experience</span>
          </div>
        </div>

        <div className="contact-socials">
          <a href="#" className="nav-link">Instagram</a>
          <a href="#" className="nav-link">Behance</a>
          <a href="#" className="nav-link">LinkedIn</a>
        </div>
      </div>
    </section>
  );
}