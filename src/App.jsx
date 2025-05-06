import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './AuthContext'; // AuthProvider context
import { HistoryProvider } from './HistoryContext'; // HistoryProvider context
import { Menu } from './Menu'; // Menu component
import { Home } from './Home'; // Home component
import { Details } from './Details'; // Details page component
import { Saison } from './Saison'; // Season page component
import { Historique } from './History'; // Watch history page component
import { JouerEpisode } from './JouerEpisode'; // Play episode page component
import 'bulma/css/bulma.min.css'; // Bulma CSS

function App() {
  return (
    <AuthProvider>
      <HistoryProvider> {/* Wrap app with HistoryProvider */}
        <Router>
          <div className="App">
            <Menu />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/details/:id" element={<Details />} />
              <Route path="/saison/:seasonId" element={<Saison />} />
              <Route path="/history" element={<Historique />} /> {/* Corrected to History */}
              <Route path="/jouer/:episodeId" element={<JouerEpisode />} />
            </Routes>
          </div>
        </Router>
      </HistoryProvider>
    </AuthProvider>
  );
}

export default App;
