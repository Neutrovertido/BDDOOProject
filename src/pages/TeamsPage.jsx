import { useState, useEffect } from "react";
import { getTeams, getPlayers, getMatches } from "../../server/api";
import { Users, Trophy, Calendar, Search } from "lucide-react";

export default function TeamsPage() {
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTeam, setSelectedTeam] = useState(null);
  const [teamStats, setTeamStats] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const [teamsData, playersData, matchesData] = await Promise.all([
          getTeams(),
          getPlayers(),
          getMatches(),
        ]);

        setTeams(teamsData);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  const handleTeamSelect = async (team) => {
    setSelectedTeam(team);
    try {
      const [playersData, matchesData] = await Promise.all([
        getPlayers(),
        getMatches(),
      ]);

      const teamPlayers = playersData.filter(
        (player) => player.id_equipo === team.id_equipo
      );
      const teamMatches = matchesData.filter(
        (match) => match.id_equipo === team.id_equipo
      );

      setTeamStats({
        totalPlayers: teamPlayers.length,
        totalMatches: teamMatches.length,
        players: teamPlayers,
        matches: teamMatches,
        winRate: (
          (teamMatches.filter((m) => m.goles_loc > m.goles_vis).length /
            teamMatches.length) *
          100
        ).toFixed(1),
      });
    } catch (error) {
      console.error("Error fetching team stats:", error);
    }
  };

  const filteredTeams = teams.filter((team) =>
    team.nombre_equipo.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-blue-900 to-blue-800 text-white py-12">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-center">
            Equipos
          </h1>
          <p className="text-xl text-blue-100 text-center mb-8">
            Explora los equipos y sus estadísticas
          </p>

          {/* Search Bar */}
          <div className="max-w-md mx-auto relative">
            <div className="flex items-center bg-white/10 backdrop-blur-sm rounded-lg px-4 py-2">
              <Search className="h-5 w-5 text-blue-200" />
              <input
                type="text"
                placeholder="Buscar equipo..."
                className="bg-transparent border-none w-full text-white placeholder-blue-200 ml-2 focus:outline-none"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Teams Grid */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredTeams.map((team) => (
              <div
                key={team.id_equipo}
                onClick={() => handleTeamSelect(team)}
                className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-all cursor-pointer"
              >
                <div className="p-6">
                  <h3 className="text-xl font-bold text-blue-900 mb-2">
                    {team.nombre_equipo}
                  </h3>
                  <p className="text-gray-600">{team.pais_equipo}</p>
                  <p className="text-sm text-gray-500">
                    Fundado en {team.año_fund}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Stats Modal */}
      {selectedTeam && teamStats && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h2 className="text-2xl font-bold text-blue-900">
                    {selectedTeam.nombre_equipo}
                  </h2>
                  <p className="text-gray-600">{selectedTeam.pais_equipo}</p>
                </div>
                <button
                  onClick={() => setSelectedTeam(null)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  ✕
                </button>
              </div>

              {/* Team Stats Grid */}
              <div className="grid grid-cols-3 gap-4 mb-6">
                <div className="bg-blue-50 p-4 rounded-lg">
                  <p className="text-sm text-gray-600">Jugadores</p>
                  <p className="text-2xl font-bold text-blue-900">
                    {teamStats.totalPlayers}
                  </p>
                </div>
                <div className="bg-blue-50 p-4 rounded-lg">
                  <p className="text-sm text-gray-600">Partidos</p>
                  <p className="text-2xl font-bold text-blue-900">
                    {teamStats.totalMatches}
                  </p>
                </div>
                <div className="bg-blue-50 p-4 rounded-lg">
                  <p className="text-sm text-gray-600">% Victoria</p>
                  <p className="text-2xl font-bold text-blue-900">
                    {teamStats.winRate}%
                  </p>
                </div>
              </div>

              {/* Players List */}
              <div className="mb-6">
                <h3 className="text-lg font-bold text-blue-900 mb-3">
                  Plantilla
                </h3>
                <div className="bg-gray-50 rounded-lg overflow-hidden">
                  <table className="min-w-full">
                    <thead>
                      <tr className="bg-gray-100">
                        <th className="py-2 px-4 text-left">Nombre</th>
                        <th className="py-2 px-4 text-left">Posición</th>
                        <th className="py-2 px-4 text-left">Edad</th>
                      </tr>
                    </thead>
                    <tbody>
                      {teamStats.players.map((player) => (
                        <tr
                          key={player.id_jugador}
                          className="border-t border-gray-200"
                        >
                          <td className="py-2 px-4">{`${player.nombre} ${player.apellido}`}</td>
                          <td className="py-2 px-4">{player.posicion}</td>
                          <td className="py-2 px-4">{player.edad}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
