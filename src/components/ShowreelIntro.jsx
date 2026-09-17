import { clips } from "@/data/clips";
import ReelVideo from "@/components/ReelVideo";

const reelClips = [clips[0], clips[1], clips[2], clips[0]];

export default function ShowreelIntro({ onSkip }) {
  return (
    <div className="showreel" aria-hidden="true" onClick={onSkip}>
      <div className="showreel-world">
        <article className="reel-page reel-page--film">
          <ReelVideo src={reelClips[0]} alt="" />
          <div className="reel-film-copy">
            <b>
              Motion is
              <br />
              not decoration
            </b>
            <small>It is intention</small>
          </div>
        </article>

        <article className="reel-page reel-page--statement">
          <strong>
            [ Every frame
            <br />
            has a purpose ]
          </strong>
          <ReelVideo src={reelClips[1]} alt="" />
        </article>

        <article className="reel-page reel-page--portrait">
          <ReelVideo src={reelClips[3]} alt="" />
          <strong>
            Story moves
            <br />
            between the keys
          </strong>
        </article>

        <article className="reel-page reel-page--manifest">
          <div className="manifest-images">
            <ReelVideo src={reelClips[0]} alt="" />
            <ReelVideo src={reelClips[2]} alt="" />
            <ReelVideo src={reelClips[1]} alt="" />
          </div>
          <strong>Charan</strong>
        </article>

        <article className="reel-page reel-page--index">
          <ReelVideo src={reelClips[0]} alt="" />
          <p>
            <span>After Effects</span>
            <span>DaVinci</span>
            <span>SaaS</span>
            <span>Premier Pro</span>
          </p>
          <div>
            {reelClips.map((clip, index) => (
              <ReelVideo src={clip} alt="" key={`${clip}-idx-${index}`} />
            ))}
          </div>
        </article>
      </div>
    </div>
  );
}