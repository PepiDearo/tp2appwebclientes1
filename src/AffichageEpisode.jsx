import { Link } from 'react-router-dom';

export function AffichageEpisode({ episode, isWatched }) {
  return (
    <div
      className="column is-3-desktop is-4-tablet is-6-mobile"
      role="listitem"
      aria-describedby={`desc-${episode.episodeId}`}
    >
      <Link to={`/jouer/${episode.episodeId}`} aria-label={`Lire l'épisode ${episode.title}`}>
        <div
          className="card"
          style={{
            height: '100%',
            filter: isWatched ? 'grayscale(100%) brightness(0.6)' : 'none',
            pointerEvents: 'auto',
          }}
        >
          <div className="card-image">
            <figure className="image is-16by9">
              <img
                src={episode.imgUrl}
                alt={`Image de l'épisode ${episode.title}`}
              />
            </figure>
          </div>
          <div className="card-content">
            <h3 className="title is-5">{episode.title}</h3>
            <p id={`desc-${episode.episodeId}`}>{episode.number}</p>
          </div>
        </div>
      </Link>
    </div>
  );
}