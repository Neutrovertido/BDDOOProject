import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./layouts/Layout";
import HomePage from "./HomePage";
import LeaguesPage from "./pages/LeaguesPage";
import TeamsPage from "./pages/TeamsPage";
import PlayersPage from "./pages/PlayersPage";

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/leagues" element={<LeaguesPage />} />
          <Route path="/teams" element={<TeamsPage />} />
          <Route path="/players" element={<PlayersPage />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
