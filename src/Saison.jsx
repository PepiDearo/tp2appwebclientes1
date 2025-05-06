import { useEffect, useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { svrURL } from './constants';
import { AffichageEpisode } from './AffichageEpisode';
import { Pagination } from './Pagination';
import { useHistory } from './HistoryContext'; // Correct import

export function Saison() {
  const { history } = useHistory(); // Access the history from context
  const { seasonId } = useParams();
  const [seasonDetails, setSeasonDetails] = useState(null);
  const [episodes, setEpisodes] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8; // 8 episodes per page
  const [showName, setShowName] = useState('');
  const [seasonNumber, setSeasonNumber] = useState('');

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
          <h1 className="title is-2">{showName}</h1>
          <h2 className="title is-3">Saison {seasonNumber}</h2>
        </div>

        {seasonDetails && <p className="mb-6">{seasonDetails.description}</p>}

        <div className="columns is-multiline">
          {currentEpisodes.map((ep) => {
            const isWatched = history.some((item) => item.episodeId === ep.episodeId); // Check if episode is in history
            return (
              <AffichageEpisode key={ep.episodeId} episode={ep} isWatched={isWatched} />
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
