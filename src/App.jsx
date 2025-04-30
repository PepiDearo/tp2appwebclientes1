import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Home } from './Home';
import { Details } from './Details';
import { Saison } from './Saison';
import { Menu } from './Menu';
import { Signup } from './Signup';
import { Login } from './Login';
import { AuthProvider } from './AuthContext';
import { JouerEpisode } from './JouerEpisode';
import 'bulma/css/bulma.min.css';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="App">
          <Menu />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/details/:id" element={<Details />} />
            <Route path="/saison/:seasonId" element={<Saison />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login />} />
            <Route path="/jouer/:episodeId" element={<JouerEpisode />} />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
