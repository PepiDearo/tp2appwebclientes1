import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { svrURL } from './constants';
import { AffichageEpisode } from './AffichageEpisode';
import { Pagination } from './Pagination'; // Assuming Pagination component exists

export function Saison() {
  const { seasonId } = useParams();
  const [seasonDetails, setSeasonDetails] = useState(null);
  const [episodes, setEpisodes] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(8); // Display 8 episodes per page
  const [showName, setShowName] = useState(""); // New state for the show name
  const [seasonNumber, setSeasonNumber] = useState("");

  useEffect(() => {
    const fetchSeasonDetails = async () => {
      const response = await fetch(svrURL + `/episodes?seasonId=${seasonId}`);
      const data = await response.json();
      setSeasonDetails(data);
      setEpisodes(data.episodes);
      setShowName(data.tvshowTitle); 
      setSeasonNumber(data.seasonNumber);
    };
    
    fetchSeasonDetails();
  }, [seasonId]);

  const indexOfLastEpisode = currentPage * itemsPerPage;
  const indexOfFirstEpisode = indexOfLastEpisode - itemsPerPage;
  const currentEpisodes = episodes.slice(indexOfFirstEpisode, indexOfLastEpisode);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleItemsPerPageChange = (items) => {
    setItemsPerPage(items);
  };

  return (
    <section className="section">
      <div className="container">

        {/* Centered Titles */}
        <div className="has-text-centered mb-5">
          <h1 className="title is-2">{showName}</h1>
          <h2 className="title is-3">{seasonNumber}</h2>
        </div>

        {seasonDetails && <p className="has-text-centered mb-5">{seasonDetails.description}</p>}

        <div className="columns is-multiline">
          {currentEpisodes.map((episode) => (
            <AffichageEpisode key={episode.id} episode={episode} />
          ))}
        </div>

        {/* Pagination Component */}
        <Pagination
          currentPage={currentPage}
          totalItems={episodes.length}
          itemsPerPage={itemsPerPage}
          onPageChange={handlePageChange}
          onItemsPerPageChange={handleItemsPerPageChange}
        />
      </div>
    </section>
  );
}
