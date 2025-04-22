import { Link } from "react-router-dom";

export function TvShow(props) {
  return (
    <div className="column is-3-desktop is-4-tablet is-6-mobile">
      <Link to={`/details/${props.tvShow.tvshowId}`}>
        <div className="card">
          <div className="card-image">
            <figure className="image is-square">
              <img 
                src={props.tvShow.imgURL} 
                alt={props.tvShow.title} 
              />
            </figure>
          </div>
          <div className="card-content">
            <div className="content">
              <h3 className="title is-3 has-text-centered">
                {props.tvShow.title}
              </h3>
              <div className="mb-0">
                <span className="has-text-weight-bold">Studio: </span>
                <span>{props.tvShow.studio.name}</span>
              </div>
              <div className="mb-0">
                <span className="has-text-weight-bold">Genres: </span>
                <span>{props.tvShow.genres.map((p)=>p.name).join(", ")}</span>
              </div>
              
              
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
}