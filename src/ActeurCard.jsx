export function ActeurCard({ role }) {
    return (
      <div className="card mx-2" style={{ minWidth: '200px' }}>
        <div className="card-image">
          <figure className="image">
            <img 
              src={role.imgURL} 
              alt={role.name} 
              style={{ objectFit: 'cover', width: '100%', height: 'auto' }} 
            />
          </figure>
        </div>
        <div className="card-content">
          <p className="title is-6">{role.name}</p>
          <p className="subtitle is-7">Rôle : {role.character}</p>
        </div>
      </div>
    );
  }
  