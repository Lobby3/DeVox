import { Route, Routes, Link } from 'react-router-dom';
import SummonerPage from '../pages/SummonerPage';
import { H1, H2 } from '@daohaus/ui';

export function App() {
  return (
    <div role="application">
      <div role="banner">
        <H1>DeVox [MVP]</H1>
        <hr />
        <br />
      </div>
      <div role="navigation">
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/new">New Proposal</Link>
          </li>
        </ul>
      </div>
      <Routes>
        <Route
          path="/"
          element={
            <div>
              <H2>Proposals</H2>
              <p>List of current proposals goes here.</p>
              <div role="link">
                <Link to="/new">Add a new proposal...</Link>
              </div>
            </div>
          }
        />
        <Route path="/new" element={<SummonerPage />} />
      </Routes>
    </div>
  );
}

export default App;
