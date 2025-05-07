export function About() {
  return (
    <section className="section" role="region" aria-labelledby="about-title">
      <div className="container content">
        
        <h1 id="about-title" className="subtitle mt-5">
          Fonctionnalités supplémentaires à apporter au projet
        </h1>
        <ul aria-describedby="about-desc-1">
          <li>Je ne sais pas quoi mettre comme fonctionnalités de plus</li>
          <li>Idée 2</li>
          <li>Idée 3</li>
        </ul>
        

        <h1 className="subtitle mt-5" id="course-title">
          Améliorations à apporter au cours
        </h1>
        <ul aria-describedby="about-desc-2">
          <li>Le cours est pas mal bon, pas vraiment besoin d'améliorations</li>
          <li>Selon moi, il devrait peut-être avoir une section sur Léa avec les exercices corrigés ou les TP</li>
          <li>Idée 3</li>
        </ul>
        

      </div>
    </section>
  );
}
