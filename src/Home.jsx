import { useState, useEffect } from 'react';
import { TvShow } from './TvShow';
import { StudioDropdown } from './StudioDropdown';

export function Home() {
  const [tvShows, setTvShows] = useState([]);
  const [studios,setStudios] = useState([]);
  const [selectedStudio, setSelectedStudio] = useState("");

  
    async function getTvShows() {
      const rep = await fetch('https://tvshowdbapi.herokuapp.com/tvshows');
      if (rep.ok) {
        const tvshow_data = await rep.json();
        setTvShows(tvshow_data);
      }
    };

    async function getStudios() {
        const rep = await fetch('https://tvshowdbapi.herokuapp.com/studios');
        if (rep.ok) {
          const studio_data = await rep.json();
          setStudios(studio_data);
        }
      };
    


  useEffect(() => {
    getTvShows();
    getStudios();
}, []);



  function showFiltre(){
    let showFF=tvShows;
    if (selectedStudio){
        showFF = showFF.filter(show => show.studio.name === selectedStudio);
    }
    return showFF


}



return (
    <section className="section">
      <div className="container">
        <h1 className="title has-text-centered">TV Shows</h1>
        
        {/* Studio Dropdown */}
        <div className="columns is-centered">
          <div className="column is-half">
            <StudioDropdown 
              studios={studios.map(studio => studio.name)} 
              selectedStudio={selectedStudio}
              onStudioChange={setSelectedStudio}
            />
          </div>
        </div>

        {/* Affichage de Teleseries */}
        <div className="columns is-multiline">
          {showFiltre().map((show) => (
            <TvShow key={show.tvshowId} tvShow={show} />
          ))}
        </div>
      </div>
    </section>
  );
}
