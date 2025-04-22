import { useState, useEffect } from 'react';
import { TvShow } from './TvShow';

export function Home() {
  const [tvShows, setTvShows] = useState([]);

  useEffect(() => {
    async function getTvShows() {
      const rep = await fetch('https://tvshowdbapi.herokuapp.com/tvshows');
      if (rep.ok) {
        const data = await rep.json();
        setTvShows(data);
      }
    };
    getTvShows();
  }, []);

  return (
    <section className="section">
      <div className="container">
        <h1 className="title has-text-centered">TV Shows</h1>
        <div className="columns is-multiline">
          {tvShows.map((show) => {
            return <TvShow key={show.tvshowId} tvShow={show} />})}
        </div>
      </div>
    </section>
  );
}