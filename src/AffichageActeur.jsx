export function AfficherActeurs({ roles }) {
  if (!roles || roles.length === 0) return null;

  return (
    <section
      className="mt-6"
      aria-labelledby="acteurs-section-title"
      role="region"
    >
      <h2 id="acteurs-section-title" className="is-sr-only">
        Distribution des acteurs
      </h2>

      <div
        className="is-flex"
        style={{
          overflowX: 'auto',
          paddingBottom: '1rem',
        }}
        role="list"
        aria-label="Liste des acteurs"
      >
        {roles.map((role) => (
          <div
            key={role.id || `${role.name}-${role.character}`}
            className="card mx-2"
            style={{ minWidth: '200px' }}
            role="listitem"
            aria-labelledby={`actor-${role.id}-name actor-${role.id}-role`}
          >
            <div className="card-image">
              <figure className="image" role="presentation">
                <img
                  src={role.imgUrl}
                  alt={`Portrait de ${role.name}`}
                  style={{
                    objectFit: 'cover',
                    width: '100%',
                    height: '250px'
                  }}
                  aria-describedby={`actor-${role.id}-role`}
                />
              </figure>
            </div>
            <div className="card-content">
              <p
                className="title is-6"
                id={`actor-${role.id}-name`}
              >
                {role.name}
              </p>
              <p
                className="subtitle is-7"
                id={`actor-${role.id}-role`}
              >
                <span aria-hidden="true">Rôle : </span>
                <span className="is-sr-only">Joue le rôle de </span>
                {role.character}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}