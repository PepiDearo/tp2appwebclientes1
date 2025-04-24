import { useParams } from 'react-router-dom';

export function Saison() {
  const { seasonId } = useParams(); // Get the seasonId from the URL

  // You can use this `seasonId` to fetch season data if necessary
  // For now, let's just display the season number
  return (
    <section className="section">
      <div className="container">
        <h1 className="title is-2">Saison {seasonId}</h1>
        {/* You can display other details about the season here */}
        <p>Here are details for Season {seasonId}</p>
      </div>
    </section>
  );
}
