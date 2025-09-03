import { useEffect, useState } from 'react';
import { useAuth } from './AuthContext';
import { Link } from 'react-router-dom';
import { svrURL } from './constants';
import { Pagination } from './Pagination';

export function Historique() {
  const { token } = useAuth();
  const [history, setHistory] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  useEffect(() => {
    const fetchHistory = async () => {
      if (!token) return;

      try {
        const response = await fetch(`${svrURL}/user/history`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error("Impossible de récupérer l'historique");
        }

        const data = await response.json();
        setHistory(data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchHistory();
  }, [token]);

  const indexOfLast = currentPage * itemsPerPage;
  const indexOfFirst = indexOfLast - itemsPerPage;
  const currentHistory = history.slice(indexOfFirst, indexOfLast);

  return (
    <section className="section" role="region" aria-labelledby="history-title">
      <div className="container">
        <h1 id="history-title" className="title is-2 has-text-centered">
          Historique
        </h1>

        <div className="columns is-multiline" role="list" aria-label="Liste des épisodes visionnés">
          {currentHistory.map((episode) => (
            <div
              key={episode.episodeId}
              className="column is-4-tablet is-6-mobile"
              role="listitem"
              aria-describedby={`desc-${episode.episodeId}`}
            >
              <div className="card">
                <div className="card-image">
                  <figure className="image is-16by9">
                    <Link to={`/jouer/${episode.episodeId}`} aria-label={`Rejouer l'épisode ${episode.title}`}>
                      <img
                        src={episode.imgUrl}
                        alt={`Image de l'épisode ${episode.title}`}
                      />
                    </Link>
                  </figure>
                </div>
                <div className="card-content" id={`desc-${episode.episodeId}`}>
                  <h3 className="title is-5">{episode.title}</h3>
                  <p>
                    <Link to={`/details/${episode.tvshowId}`}>
                      {episode.tvshowTitle}
                    </Link>
                  </p>
                  <p>
                    <Link to={`/saison/${episode.seasonId}`}>
                      Saison {episode.seasonNumber}
                    </Link>
                  </p>
                  <p>
                    <Link to={`/jouer/${episode.episodeId}`}>
                      {episode.episodeTitle}
                    </Link>
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <Pagination
          currentPage={currentPage}
          totalItems={history.length}
          itemsPerPage={itemsPerPage}
          onPageChange={setCurrentPage}
        />
      </div>
    </section>
  );
}
