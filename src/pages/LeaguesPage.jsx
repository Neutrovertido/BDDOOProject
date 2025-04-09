import { useState, useEffect } from "react";
import { getLeagues, getTeams, getMatches } from "../../server/api";
import { Trophy, Users, Calendar, ChevronDown } from "lucide-react";

export default function LeaguesPage() {
  const [leagues, setLeagues] = useState([]);
  const [selectedLeague, setSelectedLeague] = useState(null);
  const [leagueStats, setLeagueStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  useEffect(() => {
    async function fetchData() {
      try {
        const [leaguesData, teamsData, matchesData] = await Promise.all([
          getLeagues(),
          getTeams(),
          getMatches(),
        ]);

        setLeagues(leaguesData);

        if (leaguesData.length > 0) {
          const firstLeague = leaguesData[0];
          setSelectedLeague(firstLeague);

          // Calcular estadísticas para la primera liga
          const leagueTeams = teamsData.filter(
            (team) => team.idliga === firstLeague.idliga
          );
          const leagueMatches = matchesData.filter(
            (match) => match.idliga === firstLeague.idliga
          );

          setLeagueStats({
            totalTeams: leagueTeams.length,
            totalMatches: leagueMatches.length,
            averageGoals: (
              leagueMatches.reduce(
                (acc, match) => acc + match.goles_loc + match.goles_vis,
                0
              ) / leagueMatches.length || 0
            ).toFixed(2),
            teams: leagueTeams,
          });
        }

        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  const handleLeagueChange = async (league) => {
    setSelectedLeague(league);
    setIsDropdownOpen(false);

    try {
      const [teamsData, matchesData] = await Promise.all([
        getTeams(),
        getMatches(),
      ]);

      const leagueTeams = teamsData.filter(
        (team) => team.idliga === league.idliga
      );
      const leagueMatches = matchesData.filter(
        (match) => match.idliga === league.idliga
      );

      setLeagueStats({
        totalTeams: leagueTeams.length,
        totalMatches: leagueMatches.length,
        averageGoals: (
          leagueMatches.reduce(
            (acc, match) => acc + match.goles_loc + match.goles_vis,
            0
          ) / leagueMatches.length || 0
        ).toFixed(2),
        teams: leagueTeams,
      });
    } catch (error) {
      console.error("Error fetching league stats:", error);
    }
  };

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
            Ligas de Fútbol
          </h1>
          <p className="text-xl text-blue-100 text-center mb-8">
            Explora las principales ligas y sus estadísticas
          </p>

          {/* League Selector */}
          <div className="relative max-w-md mx-auto">
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="w-full flex items-center justify-between bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg px-4 py-2 text-white hover:bg-white/20 transition-all"
            >
              <span>
                {selectedLeague ? selectedLeague.nombre : "Selecciona una liga"}
              </span>
              <ChevronDown
                className={`transform transition-transform ${
                  isDropdownOpen ? "rotate-180" : ""
                }`}
              />
            </button>

            {isDropdownOpen && (
              <div className="absolute z-10 w-full mt-2 bg-white border border-gray-200 rounded-lg shadow-lg">
                {leagues.map((league) => (
                  <button
                    key={league.idliga}
                    onClick={() => handleLeagueChange(league)}
                    className="w-full px-4 py-2 text-left text-gray-700 hover:bg-blue-50 focus:outline-none"
                  >
                    {league.nombre}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

      {selectedLeague && leagueStats && (
        <>
          {/* Stats Section */}
          <section className="py-12 bg-white">
            <div className="container mx-auto px-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white p-6 rounded-xl shadow-md">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-gray-500">Total Equipos</p>
                      <h3 className="text-2xl font-bold text-blue-900">
                        {leagueStats.totalTeams}
                      </h3>
                    </div>
                    <Users className="h-8 w-8 text-blue-500" />
                  </div>
                </div>
                <div className="bg-white p-6 rounded-xl shadow-md">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-gray-500">Partidos Jugados</p>
                      <h3 className="text-2xl font-bold text-blue-900">
                        {leagueStats.totalMatches}
                      </h3>
                    </div>
                    <Calendar className="h-8 w-8 text-blue-500" />
                  </div>
                </div>
                <div className="bg-white p-6 rounded-xl shadow-md">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-gray-500">Promedio Goles</p>
                      <h3 className="text-2xl font-bold text-blue-900">
                        {leagueStats.averageGoals}
                      </h3>
                    </div>
                    <Trophy className="h-8 w-8 text-blue-500" />
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Teams Table */}
          <section className="py-12">
            <div className="container mx-auto px-4">
              <h2 className="text-2xl font-bold mb-6 text-blue-900">
                Equipos Participantes
              </h2>
              <div className="bg-white rounded-xl shadow-md overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="min-w-full">
                    <thead>
                      <tr className="bg-gray-50 text-gray-600 text-sm">
                        <th className="py-3 px-6 text-left">Equipo</th>
                        <th className="py-3 px-6 text-left">País</th>
                        <th className="py-3 px-6 text-left">Año Fundación</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {leagueStats.teams.map((team) => (
                        <tr
                          key={team.id_equipo}
                          className="hover:bg-blue-50 transition-colors"
                        >
                          <td className="py-4 px-6 font-medium">
                            {team.nombre_equipo}
                          </td>
                          <td className="py-4 px-6">{team.pais_equipo}</td>
                          <td className="py-4 px-6">{team.año_fund}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </section>
        </>
      )}
    </div>
  );
}
