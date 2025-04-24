import { Link } from "react-router-dom";

export function TvShow(props) {
  return (
    <div className="column is-3-desktop is-4-tablet is-6-mobile">
      <Link to={`/details/${props.tvShow.tvshowId}`}>
        <div className="card" style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
          <div className="card-image">
            <figure className="image is-3by4">
              <img 
                src={props.tvShow.imgURL} 
                alt={props.tvShow.title}
                style={{
                  objectFit: 'cover',
                  width: '100%',
                  height: '100%',
                }} 
              />
            </figure>
          </div>
          <div className="card-content" style={{ flexGrow: 1 }}>
            <div className="content">
              <h3 className="title is-5 has-text-centered">
                {props.tvShow.title}
              </h3>
              <div className="mb-1">
                <span className="has-text-weight-bold">Studio: </span>
                <span>{props.tvShow.studio.name}</span>
              </div>
              <div className="mb-1">
                <span className="has-text-weight-bold">Genres: </span>
                <span>{props.tvShow.genres.map((p) => p.name).join(", ")}</span>
              </div>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
}
