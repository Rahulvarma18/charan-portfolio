import { useEffect, useState } from "react";
import ShowreelIntro from "@/components/ShowreelIntro";
import Hero from "@/components/Hero";
import Work from "@/components/Work";
import About from "@/components/About";
import Contact from "@/components/Contact";

export default function App() {
  const [loaded, setLoaded] = useState(false);
  const [showIntro, setShowIntro] = useState(true);

  useEffect(() => {
    const reveal = window.setTimeout(() => setLoaded(true), 150);
    const intro = window.setTimeout(() => setShowIntro(false), 17200);
    return () => {
      window.clearTimeout(reveal);
      window.clearTimeout(intro);
    };
  }, []);

  return (
    <main className={`app-stage ${loaded ? "is-loaded" : ""}`}>
      {showIntro && <ShowreelIntro onSkip={() => setShowIntro(false)} />}
      <Hero />
      <Work />
      <About />
      <Contact />
    </main>
  );
}