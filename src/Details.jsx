import { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { svrURL } from './constants';
import { AfficherActeurs } from './AffichageActeur';
import { AfficherSaison } from './AffichageSaison';

export function Details() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [show, setShow] = useState(null);
  const audioRef = useRef(null);

  useEffect(() => {
    const getTvShowsDetails = async () => {
      const rep = await fetch(`${svrURL}/tvshow/?tvshowId=${id}`);
      if (rep.ok) {
        const show = await rep.json();
        setShow(show);
      }
    };

    getTvShowsDetails();
  }, [id]);

  useEffect(() => {
    if (show && audioRef.current) {
      audioRef.current.play();
    }
  }, [show]);

  if (!show) {
    return (
      <section role="region" aria-live="polite" aria-labelledby="loading-message">
        <h2 id="loading-message">Chargement des informations...</h2>
      </section>
    );
  }

  return (
    <main className="section" aria-labelledby="serie-title">
      <div className="container">
        <div className="columns">
          <div className="column is-one-third">
            <figure className="image">
              <img
                src={show.imgUrl}
                alt={`Affiche de ${show.title}`}
                className="has-ratio"
                style={{ width: '100%', height: 'auto' }}
                aria-describedby="serie-description"
              />
            </figure>
          </div>

          <div className="column">
            <h1 id="serie-title" className="title is-2">{show.title}</h1>

            <div className="content" id="serie-description">
              <div className="mb-4">
                <span className="has-text-weight-bold">Année : </span>
                <span>{show.year}</span>
              </div>

              <div className="mb-4">
                <span className="has-text-weight-bold">Nombre d'épisodes : </span>
                <span>{show.episodeCount}</span>
              </div>

              <div className="mb-4">
                <span className="has-text-weight-bold">Classification : </span>
                <span>{show.tvParentalGuideline}</span>
              </div>

              <div className="mb-4">
                <span className="has-text-weight-bold">Genres : </span>
                <span>{show.genres?.map(g => g.name).join(', ')}</span>
              </div>

              <div className="mb-4">
                <span className="has-text-weight-bold">Studio : </span>
                <span>{show.studio.name}</span>
              </div>

              <div className="mb-4">
                <span className="has-text-weight-bold ">Resume : </span>
                <span>{show.plot}</span>
              </div>

              {show.audioUrl && (
                <audio 
                  ref={audioRef} 
                  controls 
                  aria-label="Extrait audio"
                  className="mt-4"
                >
                  <source src={show.audioUrl} type="audio/ogg" />
                  Votre navigateur ne supporte pas l'élément audio.
                </audio>
              )}
            </div>
          </div>
        </div>

        <AfficherActeurs roles={show.roles} />
        <AfficherSaison seasons={show.seasons} />

        <div className="has-text-centered mt-6">
          <button
            className="button is-primary"
            onClick={() => navigate(-1)}
            aria-label="Retour à la liste des séries"
          >
            Retour
          </button>
        </div>
      </div>
    </main>
  );
}
