import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { svrURL } from './constants';
import { useHistory } from './HistoryContext'; 

export function JouerEpisode() {
  const { episodeId } = useParams();
  const [videoURL, setVideoURL] = useState('');
  const [error, setError] = useState('');
  const { addToHistory } = useHistory(); 
  const token = localStorage.getItem('token');

  useEffect(() => {
    const fetchVideoData = async () => {
      if (!token) {
        setError("Vous devez vous connecter pour accéder à cette page.");
        return;
      }

      try {
        const response = await fetch(`${svrURL}/viewepisode?episodeId=${episodeId}`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        if (!response.ok) {
          throw new Error('Impossible de charger la vidéo.');
        }

        const data = await response.json();
        setVideoURL(data.videoURL);

        addToHistory(Number(episodeId));
      } catch (err) {
        setError(err.message);
      }
    };

    fetchVideoData();
  }, [episodeId, token, addToHistory]);

  if (error) {
    return (
      <div className="has-text-centered" aria-live="assertive">
        <h1 className="has-text-danger is-size-2 mb-4">{error}</h1>
        <Link to="/login" aria-label="Se connecter pour accéder à la vidéo">Se connecter</Link>
      </div>
    );
  }

  if (!videoURL) return null;

  return (
    <section className="section">
      <div className="container has-text-centered">
        <h1 className="title is-3">Lecture de l'épisode</h1>
        <video width="100%" controls aria-label="Lecteur vidéo de l'épisode">
          <source src={videoURL} type="video/mp4" />
          Votre navigateur ne supporte pas la lecture vidéo.
        </video>
      </div>
    </section>
  );
}
