import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { svrURL } from './constants';

export function JouerEpisode() {
  const { episodeId } = useParams();
  const [videoURL, setVideoURL] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem('token');

  useEffect(() => {
    const fetchVideoData = async () => {
      if (!token) {
        setError("Vous devez être connecté pour visionner les épisodes.");
        setLoading(false);
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
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchVideoData();
  }, [episodeId, token]);

  if (loading) return <p className="has-text-centered">Chargement de la vidéo...</p>;

  if (error) {
    return (
      <div className="notification is-danger has-text-centered">
        <p>{error}</p>
        <Link to="/login" className="button is-link mt-3">Se connecter</Link>
      </div>
    );
  }

  return (
    <section className="section">
      <div className="container has-text-centered">
        <h1 className="title is-3">Lecture de l'épisode</h1>
        <video width="100%" controls>
          <source src={videoURL} type="video/mp4" />
          Votre navigateur ne supporte pas la lecture vidéo.
        </video>
      </div>
    </section>
  );
}
