import { Link } from "react-router-dom";

export function AfficherSaison({ seasons }) {
  if (!seasons || seasons.length === 0) return null;

  return (
    <section 
      className="mt-6"
      aria-labelledby="saisons-section-title"
      role="region"
    >
      <h2 
        id="saisons-section-title"
        className="is-sr-only"
      >
        Liste des saisons disponibles
      </h2>

      <div
        className="is-flex"
        style={{
          overflowX: 'auto',
          gap: '1rem',
          paddingBottom: '1rem',
        }}
        role="list"
        aria-label="Saisons de la série"
      >
        {seasons.map((season) => (
          <article 
            key={season.number}
            className="card mx-2"
            style={{ minWidth: '200px' }}
            role="listitem"
            aria-labelledby={`season-${season.number}-title season-${season.number}-episodes`}
          >
            <Link 
              to={`/saison/${season.seasonId}`}
              aria-label={`Voir les détails de la saison ${season.number}`}
              style={{ textDecoration: 'none', color: 'inherit' }}
            >
              <div className="card-image">
                <figure className="image is-3by4" role="presentation">
                  <img
                    src={season.imgUrl}
                    alt={`Couverture de la saison ${season.number}`}
                    style={{
                      objectFit: 'cover',
                      width: '100%',
                      height: '100%',
                      maxHeight: '300px',
                    }}
                    aria-describedby={`season-${season.number}-episodes`}
                  />
                </figure>
              </div>
              <div className="card-content">
                <h3 
                  className="title is-6"
                  id={`season-${season.number}-title`}
                >
                  Saison {season.number}
                </h3>
                <p 
                  className="subtitle is-7"
                  id={`season-${season.number}-episodes`}
                >
                  <span aria-hidden="true">Épisodes : </span>
                  <span className="is-sr-only">Nombre d'épisodes : </span>
                  {season.episodeCount}
                </p>
              </div>
            </Link>
          </article>
        ))}
      </div>
    </section>
  );
}