import { films, projects } from "@/data/media";
import ReelVideo from "@/components/ReelVideo";

export default function FilmStack({ active }) {
  return (
    <div className="film-stack" aria-hidden="true">
      {films.map((film, index) => (
        <ReelVideo
          key={`${film}-${index}`}
          src={film}
          alt={`${projects[index]} editing workspace`}
          className={`film-image ${active === index ? "is-active" : ""}`}
        />
      ))}
      <div className="film-haze" />
      <div className="film-grain" />
    </div>
  );
}
