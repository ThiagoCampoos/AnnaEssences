import React from 'react';
import { Outlet, Link, useNavigate } from 'react-router-dom';
import { LayoutDashboard, Package, TrendingUp, Users, Settings, LogOut, Brain, User } from 'lucide-react';


const Layout: React.FC = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/login');
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-md">
        <div className="p-4">
          <div className="flex items-center space-x-2">
            <h1 className="text-2xl font-bold text-blue-600">AnaEssence</h1>
            <div className="flex items-center space-x-1 bg-purple-100 px-2 py-1 rounded-full">
              <Brain className="h-3 w-3 text-purple-600" />
              <span className="text-xs text-purple-600 font-medium">IA</span>
            </div>
          </div>
        </div>
        <nav className="mt-8">
          <Link to="/" className="flex items-center px-6 py-3 text-gray-700 hover:bg-blue-50 transition-colors">
            <LayoutDashboard className="w-5 h-5 mr-3" />
            Painel
          </Link>
          <Link to="/inventory" className="flex items-center px-6 py-3 text-gray-700 hover:bg-blue-50 transition-colors">
            <Package className="w-5 h-5 mr-3" />
            Estoque
          </Link>
          <Link to="/analytics" className="flex items-center px-6 py-3 text-gray-700 hover:bg-blue-50 transition-colors">
            <TrendingUp className="w-5 h-5 mr-3" />
            Análises
          </Link>
          <Link to="/users" className="flex items-center px-6 py-3 text-gray-700 hover:bg-blue-50 transition-colors">
            <Users className="w-5 h-5 mr-3" />
            Usuários
          </Link>
          <Link to="/profile" className="flex items-center px-6 py-3 text-gray-700 hover:bg-blue-50 transition-colors">
            <User className="w-5 h-5 mr-3" />
            Perfil
          </Link>
          <Link to="/settings" className="flex items-center px-6 py-3 text-gray-700 hover:bg-blue-50 transition-colors">
            <Settings className="w-5 h-5 mr-3" />
            Configurações
          </Link>
        </nav>
        <div className="absolute bottom-0 w-64 p-4">
          <button 
            onClick={handleLogout}
            className="flex items-center px-6 py-3 text-gray-700 hover:bg-red-50 w-full transition-colors rounded-lg"
          >
            <LogOut className="w-5 h-5 mr-3" />
            Sair
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto">
        <div className="p-8">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default Layout;