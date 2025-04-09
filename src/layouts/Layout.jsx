import { Link } from "react-router-dom";

export default function Layout({ children }) {
  return (
    <div className="min-h-screen bg-gray-50 text-gray-800">
      <header className="bg-gradient-to-r from-blue-800 to-blue-600 text-white shadow-lg">
        <div className="container mx-auto px-4 py-3">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-2">
              <div className="text-3xl font-bold">⚽</div>
              <div className="text-2xl font-bold">FútbolStats</div>
            </div>
            <nav className="hidden md:flex space-x-6">
              <Link
                to="/"
                className="font-medium hover:text-blue-200 transition duration-200"
              >
                Inicio
              </Link>
              <Link
                to="/leagues"
                className="font-medium hover:text-blue-200 transition duration-200"
              >
                Ligas
              </Link>
              <Link
                to="/teams"
                className="font-medium hover:text-blue-200 transition duration-200"
              >
                Equipos
              </Link>
              <Link
                to="/players"
                className="font-medium hover:text-blue-200 transition duration-200"
              >
                Jugadores
              </Link>
            </nav>
          </div>
        </div>
      </header>

      <main>{children}</main>

      <footer className="bg-gray-900 text-white pt-12 pb-6">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-8">
            <div>
              <h3 className="text-lg font-bold mb-4">FútbolStats</h3>
              <p className="text-gray-400 text-sm">
                Tu fuente más completa de estadísticas y análisis de fútbol con
                cobertura global y actualizaciones en tiempo real.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-bold mb-4">Enlaces Rápidos</h3>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li>
                  <a href="#" className="hover:text-white transition">
                    Inicio
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition">
                    Ligas
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition">
                    Equipos
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition">
                    Jugadores
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition">
                    Noticias
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-bold mb-4">Principales Ligas</h3>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li>
                  <a href="#" className="hover:text-white transition">
                    La Liga
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition">
                    Premier League
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition">
                    Serie A
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition">
                    Bundesliga
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition">
                    Ligue 1
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-bold mb-4">Ayuda</h3>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li>
                  <a href="#" className="hover:text-white transition">
                    FAQ
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition">
                    Contacto
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition">
                    Términos y Condiciones
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition">
                    Política de Privacidad
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-6 text-center text-gray-500 text-sm">
            <p>&copy; 2025 FútbolStats. Todos los derechos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
