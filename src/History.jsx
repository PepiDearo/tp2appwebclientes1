import { useEffect, useState } from 'react';
import { useAuth } from './AuthContext'; // Import the useAuth hook
import { Link } from 'react-router-dom';
import { svrURL } from './constants';
import { Pagination } from './Pagination';

export function Historique() {
  const { token } = useAuth(); // Access token from AuthContext
  const [history, setHistory] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  useEffect(() => {
    const fetchHistory = async () => {
      if (!token) return; // If no token, return early

      try {
        const response = await fetch(`${svrURL}/user/history`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error('Impossible de récupérer l\'historique');
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
    <section className="section">
      <div className="container">
        <h1 className="title is-2 has-text-centered">Historique de visionnement</h1>

        <div className="columns is-multiline">
          {currentHistory.map((episode) => (
            <div key={episode.episodeId} className="column is-4-tablet is-6-mobile">
              <div className="card">
                <div className="card-image">
                  <figure className="image is-16by9">
                    <Link to={`/jouer/${episode.episodeId}`}>
                      <img src={episode.imgURL} alt={episode.title} />
                    </Link>
                  </figure>
                </div>
                <div className="card-content">
                  <h3 className="title is-5">{episode.title}</h3>
                  <p>{episode.number}</p>
                  <p>
                    <Link to={`/show/${episode.showId}`}>Série: {episode.tvshowTitle}</Link>
                  </p>
                  <p>
                    <Link to={`/season/${episode.seasonId}`}>Saison {episode.seasonNumber}</Link>
                  </p>
                  <p>
                    <Link to={`/jouer/${episode.episodeId}`}>Voir l'épisode</Link>
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
