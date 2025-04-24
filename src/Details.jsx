import { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { svrURL } from './constants';
import { AfficherActeurs } from './AffichageActeur';
import { AfficherSaison } from './Saison';

export function Details() {
  const { id } = useParams();
  const [show, setShow] = useState(null);
  const audioRef = useRef(null);

  async function getTvShowsDetails() {
    const rep = await fetch(svrURL + `/tvshow/?tvshowId=${id}`);
    if (rep.ok) {
      const show = await rep.json();
      setShow(show);
    }
  };

  useEffect(() => {
    getTvShowsDetails();
  }, [id]);

  useEffect(() => {
    if (show && audioRef.current) {
      audioRef.current.play();
    }
  }, [show]);




  return (
    <section className="section">
      <div className="container">
        {show && (
          <div className="columns">
            <div className="column is-one-third">
              <figure className="image">
                <img
                  src={show.imgURL}
                  alt={show.title}
                  className="has-ratio"
                  style={{ width: '100%', height: 'auto' }}
                />
              </figure>
            </div>

            <div className="column">
              <h1 className="title is-2">{show.title}</h1>

              <div className="content">
                <div className="mb-4">
                  <span className="has-text-weight-bold">Year: </span>
                  <span>{show.year}</span>
                </div>

                <div className="mb-4">
                  <span className="has-text-weight-bold">Episode count: </span>
                  <span>{show.episodeCount}</span>
                </div>

                <div className="mb-4">
                  <span className="has-text-weight-bold">Guideline: </span>
                  <span>{show.tvParentalGuideline}</span>
                </div>

                <div className="mb-4">
                  <span className="has-text-weight-bold">Genres: </span>
                  <span>{show.genres?.map(g => g.name).join(', ')}</span>
                </div>

                <div className="mb-4">
                  <span className="has-text-weight-bold">Studio: </span>
                  <span>{show.studio.name}</span>
                </div>

                <div className="mb-4">
                  <span className="has-text-weight-bold"> </span>
                  <span>{show.plot}</span>
                </div>

                {show.audioURL && (
                  <audio ref={audioRef} controls autoPlay className="mt-4">
                    <source src={show.audioURL} type="audio/ogg" />
                    Your browser does not support the audio element.
                  </audio>
                )}



              </div>
            </div>
          </div>
        )}



        {show && <AfficherActeurs roles={show.roles} />}

        {show && <AfficherSaison seasons={show.seasons} />}




        {/* Back button */}
        <div className="has-text-centered mt-6">
          <button
            className="button is-primary"
            onClick={() => window.history.back()}
          >

            Back to Shows
          </button>
        </div>
      </div>
    </section>
  );
}
