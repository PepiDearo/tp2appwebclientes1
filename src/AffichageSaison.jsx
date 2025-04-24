import { Link } from "react-router-dom";

export function AfficherSaison({ seasons }) {
    if (!seasons || seasons.length === 0) return null;
  
    return (
      <div className="mt-6">
        <div
          className="is-flex"
          style={{
            overflowX: 'auto',
            gap: '1rem',
            paddingBottom: '1rem',
          }}
        >
          {seasons.map((season) => (
            <Link to={`/saison/${season.number}`} key={season.number} style={{ textDecoration: 'none' }}>
            <div key={season.number} className="card mx-2" style={{ minWidth: '200px' }}>
              <div className="card-image">
                <figure className="image is-3by4">
                  <img
                    src={season.imgURL}
                    alt={`Saison ${season.number}`}
                    style={{
                      objectFit: 'cover',
                      width: '100%',
                      height: '100%',
                      maxHeight: '300px',
                    }}
                  />
                </figure>
              </div>
              <div className="card-content">
                <p className="title is-6">Saison {season.number}</p>
                <p className="subtitle is-7">Épisodes : {season.episodeCount}</p>
              </div>
            </div>
          </Link>
          ))}
        </div>
      </div>
    );
  }
  