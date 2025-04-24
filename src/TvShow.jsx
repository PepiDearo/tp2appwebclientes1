import { Link } from "react-router-dom";

export function TvShow(props) {
  return (
    <div className="column is-3-desktop is-4-tablet is-6-mobile">
      <Link to={`/details/${props.tvShow.tvshowId}`}>
        <div className="card" style={{ height: '550px', display: 'flex', flexDirection: 'column' }}>
          <div className="card-image" style={{ height: '300px' }}>
            <figure className="image is-square" style={{ height: '100%' }}>
              <img 
                src={props.tvShow.imgURL} 
                alt={props.tvShow.title}
                style={{
                  objectFit: 'cover',
                  width: '100%',
                  height: '100%'
                }} 
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

