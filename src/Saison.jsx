import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { svrURL } from './constants';
import { AffichageEpisode } from './AffichageEpisode';
import { Pagination } from './Pagination';
import { useHistory } from './HistoryContext';
import { useAuth } from './AuthContext'; 

export function Saison() {
  const { history } = useHistory();
  const { seasonId } = useParams();
  const [seasonDetails, setSeasonDetails] = useState(null);
  const [episodes, setEpisodes] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;
  const [showName, setShowName] = useState('');
  const [seasonNumber, setSeasonNumber] = useState('');
  const [isLoadingHistory, setIsLoadingHistory] = useState(true);
  const { token } = useAuth();

  useEffect(() => {
    if (history) {
      setIsLoadingHistory(false);
    }
  }, [history]);

  useEffect(() => {
    const fetchSeasonDetails = async () => {
      const response = await fetch(`${svrURL}/episodes?seasonId=${seasonId}`);
      const data = await response.json();
      setSeasonDetails(data);
      setEpisodes(data.episodes || []);
      setShowName(data.tvshowTitle);
      setSeasonNumber(data.seasonNumber);
    };

    fetchSeasonDetails();
  }, [seasonId]);

  const indexOfLast = currentPage * itemsPerPage;
  const indexOfFirst = indexOfLast - itemsPerPage;
  const currentEpisodes = episodes.slice(indexOfFirst, indexOfLast);

  return (
    <section className="section">
      <div className="container">
        <div className="has-text-centered mb-4">
          <h1 className="title is-2" id="showTitle" role="heading" aria-level="1">
            {showName}
          </h1>
          <h2 className="title is-3" role="heading" aria-level="2">
            {seasonNumber}
          </h2>
        </div>

        {seasonDetails && (
          <p className="mb-6" role="region" aria-live="polite">
            {seasonDetails.description}
          </p>
        )}

        <div className="columns is-multiline" role="region" aria-live="polite" aria-label="List of episodes">
          {!isLoadingHistory &&
            currentEpisodes.map((ep) => {
              const isWatched = history.some((item) => item.episodeId === ep.episodeId);

              
              const episodeClass = token && isWatched ? 'episode-card is-watched' : 'episode-card';

              return (
                <AffichageEpisode
                  key={ep.episodeId}
                  episode={ep}
                  isWatched={isWatched}
                  className={episodeClass} 
                />
              );
            })}
        </div>

        <Pagination
          currentPage={currentPage}
          totalItems={episodes.length}
          itemsPerPage={itemsPerPage}
          onPageChange={setCurrentPage}
        />
      </div>
    </section>
  );
}
