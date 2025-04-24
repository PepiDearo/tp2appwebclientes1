import { ActeurCard } from './ActeurCard';

export function AfficherActeurs({ roles }) {
  if (!roles || roles.length === 0) return null;

  return (
    <div className="mt-6">
      <h2 className="title is-4">Acteurs et Actrices</h2>
      <div 
        className="is-flex"
        style={{
          overflowX: 'auto',
          paddingBottom: '1rem'
        }}
      >
        {roles.map((role) => (
          <ActeurCard key={role.id} role={role} />
        ))}
      </div>
    </div>
  );
}
