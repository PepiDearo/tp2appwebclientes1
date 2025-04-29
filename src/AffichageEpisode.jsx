
export function AffichageEpisode({ episode }) {
    return (
      <div className="column is-3-desktop is-4-tablet is-6-mobile">
        <div className="card">
          <div className="card-image">
            <figure className="image is-16by9">
              <img src={episode.imgURL} alt={episode.title} />
            </figure>
          </div>
          <div className="card-content">
            <h3 className="title is-5">{episode.title}</h3>
            <p>{episode.number}</p>
          </div>
        </div>
      </div>
    );
  }
  