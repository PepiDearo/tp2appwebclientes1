import { useState, useEffect } from 'react';
import { TvShow } from './TvShow';
import { StudioDropdown } from './StudioDropdown';
import { ShowSelection } from './ShowSelection';
import { Pagination } from './Pagination';
import { svrURL } from './constants';

export function Home() {
  const [tvShows, setTvShows] = useState([]);
  const [studios, setStudios] = useState([]);
  const [selectedStudio, setSelectedStudio] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(() => {
    const saved = localStorage.getItem('itemsPerPage');
    return saved ? Number(saved) : 8;
  });


  useEffect(() => {
    setCurrentPage(1);
  }, [selectedStudio, searchTerm]);

  async function getTvShows() {
    const rep = await fetch(svrURL+`/tvshows`);
    if (rep.ok) {
      const tvshow_data = await rep.json();
      setTvShows(tvshow_data);
    }
  };

  async function getStudios() {
    const rep = await fetch(svrURL+`/studios`);
    if (rep.ok) {
      const studio_data = await rep.json();
      setStudios(studio_data);
    }
  };

  useEffect(() => {
    getTvShows();
    getStudios();
  }, []);

  function filterShows() {
    let filtered = tvShows;
    
    // Filtre par studio
    if (selectedStudio) {
      filtered = filtered.filter(show => show.studio?.name === selectedStudio);
    }
    
    // Filtre par recherche
    if (searchTerm) {
      filtered = filtered.filter(show => 
        show.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    return filtered;
  }

  const filteredShows = filterShows();
  const totalPages = Math.ceil(filteredShows.length / itemsPerPage);
  const paginatedShows = filteredShows.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <section className="section">
      <div className="container">
        <h1 className="title has-text-centered">TV Shows</h1>

        <div className="columns">
          <div className="column is-half">
            <ShowSelection onSearch={setSearchTerm} />
          </div>
          <div className="column is-half">
            <StudioDropdown 
              studios={studios.map(studio => studio.name)} 
              selectedStudio={selectedStudio}
              onStudioChange={setSelectedStudio}
            />
          </div>
        </div>

        <div className="columns is-multiline">
          {paginatedShows.map((show) => (
            <TvShow key={show.tvshowId} tvShow={show} />
          ))}
        </div>

        {filteredShows.length > 0 && (
          <Pagination
            currentPage={currentPage}
            totalItems={filteredShows.length}
            itemsPerPage={itemsPerPage}
            onPageChange={setCurrentPage}
            onItemsPerPageChange={(value) => {
              setItemsPerPage(value);
              localStorage.setItem('itemsPerPage', value.toString());
            }}
          />
        )}
      </div>
    </section>
  );
}