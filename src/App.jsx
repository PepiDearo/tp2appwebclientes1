import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './AuthContext';
import { HistoryProvider } from './HistoryContext'; 
import { Menu } from './Menu';
import { Home } from './Home';
import { Details } from './Details';
import { Saison } from './Saison'; 
import { Historique } from './History'; 
import { JouerEpisode } from './JouerEpisode';
import { Login } from './Login';
import { Signup } from './Signup';
import { About } from './About';
import { Profile } from './Profile';
import { Footer } from './Footer';
import 'bulma/css/bulma.min.css';

function App() {
  return (
    <AuthProvider>
      <HistoryProvider>
        <Router>
          <div className="App">
            <Menu aria-label="Navigation Menu" />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/details/:id" element={<Details />} />
              <Route path="/saison/:seasonId" element={<Saison />} />
              <Route path="/history" element={<Historique />} />
              <Route path="/jouer/:episodeId" element={<JouerEpisode />} />
              <Route path="/about" element={<About />} />
              <Route path="/profile" element={<Profile />} />
            </Routes>
            <Footer aria-label="Site footer" />
          </div>
        </Router>
      </HistoryProvider>
    </AuthProvider>
  );
}

export default App;
