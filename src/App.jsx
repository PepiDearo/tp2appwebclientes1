import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Home } from './Home';
import { Details } from './Details';
import {Saison} from './Saison'
import 'bulma/css/bulma.min.css';


function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/details/:id" element={<Details />} />
          <Route path="/saison/:seasonId" element={<Saison />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;



