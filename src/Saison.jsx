import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { svrURL } from './constants';
import { AffichageEpisode } from './AffichageEpisode';
import { Pagination } from './Pagination';

export function Saison() {
  const { seasonId } = useParams();
  const [seasonDetails, setSeasonDetails] = useState(null);
  const [episodes, setEpisodes] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8; // Always 8 episodes per page
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
        {/* Center titles */}
        <div className="has-text-centered mb-4">
          <h1 className="title is-2">{showName}</h1>
          <h2 className="title is-3">Saison {seasonNumber}</h2>
        </div>

        {seasonDetails && <p className="mb-6">{seasonDetails.description}</p>}

        <div className="columns is-multiline">
          {currentEpisodes.map(ep => (
            <AffichageEpisode key={ep.episodeId} episode={ep} />
          ))}
        </div>

        {/* Pagination without items-per-page selector */}
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
