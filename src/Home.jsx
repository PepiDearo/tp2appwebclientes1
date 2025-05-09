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
    
    if (selectedStudio) {
      filtered = filtered.filter(show => show.studio?.name === selectedStudio);
    }
    
    if (searchTerm) {
      filtered = filtered.filter(show => 
        show.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    return filtered;
  }

  const filteredShows = filterShows();
  const paginatedShows = filteredShows.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <main className="section" aria-labelledby="page-title">
      <div className="container">
        <h1 id="page-title" className="title has-text-centered">Les téléséries disponibles</h1>

        <div className="columns">
          <div className="column is-half">
            <ShowSelection onSearch={setSearchTerm} aria-label="Search TV shows" />
          </div>
          <div className="column is-half">
            <StudioDropdown 
              studios={studios.map(studio => studio.name)} 
              selectedStudio={selectedStudio}
              onStudioChange={setSelectedStudio}
              aria-label="Filter by studio"
            />
          </div>
        </div>

        
        <div className="columns is-multiline" role="list" aria-label="TV shows list">
          {paginatedShows.map((show) => (
            <TvShow 
              key={show.tvshowId} 
              tvShow={show}
              role="listitem" 
            />
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
    </main>
  );
}