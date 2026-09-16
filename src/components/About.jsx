import { useRef, useState } from "react";

export default function About() {
  const [isMuted, setIsMuted] = useState(true);
  const videoRef = useRef(null);

  const toggleSound = () => {
    if (videoRef.current) {
      videoRef.current.muted = !videoRef.current.muted;
      setIsMuted(videoRef.current.muted);
    }
  };

  const stats = [
    { num: "02", label: "Years crafting motion" },
    { num: "30+", label: "Projects delivered" },
    { num: "04", label: "Core tools" },
  ];

  const tools = ["After Effects", "Premiere Pro", "DaVinci Resolve", "Figma"];

  return (
    <section className="about-section" id="about">
      <div className="about-container">
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

        <div className="about-media">
          <div className="about-video-wrapper">
            <video
              ref={videoRef}
              src="/videos/about-video.mp4"
              autoPlay
              muted
              loop
              playsInline
              preload="auto"
              className="about-video"
              aria-label="Charan motion reel video"
            />
            <div className="about-video-overlay" />
            <div className="about-video-badge">
              <span className="about-video-dot" />
              <span>Showreel</span>
            </div>
            <button
              type="button"
              onClick={toggleSound}
              className="about-video-sound"
              aria-label={isMuted ? "Unmute video" : "Mute video"}
              title={isMuted ? "Unmute" : "Mute"}
            >
              {isMuted ? (
                <svg
                  className="h-4 w-4 fill-current"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M16.5 12c0-1.77-1.02-3.29-2.5-4.03v2.21l2.45 2.45c.03-.2.05-.41.05-.63zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51C20.63 14.91 21 13.5 21 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zM4.27 3L3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06c1.38-.31 2.63-.95 3.69-1.81L19.73 21 21 19.73l-9-9L4.27 3zM12 4L9.91 6.09 12 8.18V4z" />
                </svg>
              ) : (
                <svg
                  className="h-4 w-4 fill-current"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}