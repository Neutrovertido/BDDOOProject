import { BrowserRouter as Router, Link } from "react-router-dom";
import { Home, Users, Shield, Trophy, BarChart3 } from "lucide-react";

const Navbar = () => {
  return (
    <Router>
      <nav className="bg-gray-900 text-white p-4">
        <div className="container mx-auto flex justify-between items-center">
          <Link to="/" className="text-xl font-bold flex items-center">
            <Trophy className="w-6 h-6 mr-2" /> Estadísticas Fútbol
          </Link>
          <ul className="flex space-x-6">
            <li>
              <Link to="/equipos" className="flex items-center hover:text-gray-400">
                <Shield className="w-5 h-5 mr-1" /> Equipos
              </Link>
            </li>
            <li>
              <Link to="/jugadores" className="flex items-center hover:text-gray-400">
                <Users className="w-5 h-5 mr-1" /> Jugadores
              </Link>
            </li>
            <li>
              <Link to="/tecnicos" className="flex items-center hover:text-gray-400">
                <BarChart3 className="w-5 h-5 mr-1" /> Técnicos
              </Link>
            </li>
            <li className="relative group">
              <button className="flex items-center hover:text-gray-400">
                <Trophy className="w-5 h-5 mr-1" /> Ligas
              </button>
              <ul className="absolute left-0 hidden group-hover:block bg-gray-800 text-white mt-2 py-2 w-40 rounded-md shadow-lg">
                <li>
                  <Link to="/ligas/premier" className="block px-4 py-2 hover:bg-gray-700">Premier League</Link>
                </li>
                <li>
                  <Link to="/ligas/laliga" className="block px-4 py-2 hover:bg-gray-700">La Liga</Link>
                </li>
                <li>
                  <Link to="/ligas/bundesliga" className="block px-4 py-2 hover:bg-gray-700">Bundesliga</Link>
                </li>
                <li>
                  <Link to="/ligas/champions" className="block px-4 py-2 hover:bg-gray-700">Champions League</Link>
                </li>
              </ul>
            </li>
          </ul>
        </div>
      </nav>
    </Router>
  );
};

export default Navbar;
