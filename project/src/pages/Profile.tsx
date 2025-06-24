import React, { useState, useEffect } from 'react';
import { User, Mail, Phone, MapPin, Edit3, Save, X, Camera, Shield, Bell, Palette } from 'lucide-react';

interface UserProfile {
  name: string;
  email: string;
  phone: string;
  location: string;
  joinDate: string;
  role: string;
  avatar?: string;
}

const Profile: React.FC = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState<UserProfile>({
    name: 'Ana Silva',
    email: 'admin@anaessence.com',
    phone: '+55 (11) 99999-9999',
    location: 'São Paulo, SP',
    joinDate: '2024-01-15',
    role: 'Administradora'
  });
  const [editedProfile, setEditedProfile] = useState<UserProfile>(profile);

  useEffect(() => {
    // Carregar dados do usuário do localStorage ou API
    const userData = localStorage.getItem('user');
    if (userData) {
      const user = JSON.parse(userData);
      setProfile(prev => ({ ...prev, ...user }));
      setEditedProfile(prev => ({ ...prev, ...user }));
    }
  }, []);

  const handleSave = () => {
    setProfile(editedProfile);
    localStorage.setItem('user', JSON.stringify(editedProfile));
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditedProfile(profile);
    setIsEditing(false);
  };

  const handleInputChange = (field: keyof UserProfile, value: string) => {
    setEditedProfile(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      {/* Header */}
      <div className="bg-gradient-to-r from-pink-500 to-purple-600 rounded-2xl p-8 mb-8 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="relative z-10">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-3xl font-bold">Meu Perfil</h1>
            {!isEditing ? (
              <button
                onClick={() => setIsEditing(true)}
                className="bg-white/20 hover:bg-white/30 backdrop-blur-sm px-4 py-2 rounded-lg transition-colors flex items-center space-x-2"
              >
                <Edit3 className="w-4 h-4" />
                <span>Editar</span>
              </button>
            ) : (
              <div className="flex space-x-2">
                <button
                  onClick={handleSave}
                  className="bg-green-500 hover:bg-green-600 px-4 py-2 rounded-lg transition-colors flex items-center space-x-2"
                >
                  <Save className="w-4 h-4" />
                  <span>Salvar</span>
                </button>
                <button
                  onClick={handleCancel}
                  className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded-lg transition-colors flex items-center space-x-2"
                >
                  <X className="w-4 h-4" />
                  <span>Cancelar</span>
                </button>
              </div>
            )}
          </div>
          
          <div className="flex items-center space-x-6">
            <div className="relative">
              <div className="w-24 h-24 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
                <User className="w-12 h-12 text-white" />
              </div>
              <button className="absolute bottom-0 right-0 bg-white text-gray-700 p-2 rounded-full shadow-lg hover:bg-gray-50 transition-colors">
                <Camera className="w-4 h-4" />
              </button>
            </div>
            <div>
              <h2 className="text-2xl font-bold">{profile.name}</h2>
              <p className="text-white/80 flex items-center space-x-2">
                <Shield className="w-4 h-4" />
                <span>{profile.role}</span>
              </p>
              <p className="text-white/60 text-sm mt-1">
                Membro desde {new Date(profile.joinDate).toLocaleDateString('pt-BR')}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Informações Pessoais */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <h3 className="text-xl font-bold text-gray-800 mb-6 flex items-center space-x-2">
              <User className="w-5 h-5 text-pink-500" />
              <span>Informações Pessoais</span>
            </h3>
            
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Nome Completo
                  </label>
                  {isEditing ? (
                    <input
                      type="text"
                      value={editedProfile.name}
                      onChange={(e) => handleInputChange('name', e.target.value)}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500"
                    />
                  ) : (
                    <p className="p-3 bg-gray-50 rounded-lg">{profile.name}</p>
                  )}
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    E-mail
                  </label>
                  {isEditing ? (
                    <input
                      type="email"
                      value={editedProfile.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500"
                    />
                  ) : (
                    <p className="p-3 bg-gray-50 rounded-lg flex items-center space-x-2">
                      <Mail className="w-4 h-4 text-gray-500" />
                      <span>{profile.email}</span>
                    </p>
                  )}
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Telefone
                  </label>
                  {isEditing ? (
                    <input
                      type="tel"
                      value={editedProfile.phone}
                      onChange={(e) => handleInputChange('phone', e.target.value)}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500"
                    />
                  ) : (
                    <p className="p-3 bg-gray-50 rounded-lg flex items-center space-x-2">
                      <Phone className="w-4 h-4 text-gray-500" />
                      <span>{profile.phone}</span>
                    </p>
                  )}
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Localização
                  </label>
                  {isEditing ? (
                    <input
                      type="text"
                      value={editedProfile.location}
                      onChange={(e) => handleInputChange('location', e.target.value)}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500"
                    />
                  ) : (
                    <p className="p-3 bg-gray-50 rounded-lg flex items-center space-x-2">
                      <MapPin className="w-4 h-4 text-gray-500" />
                      <span>{profile.location}</span>
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Configurações e Estatísticas */}
        <div className="space-y-6">
          {/* Configurações Rápidas */}
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center space-x-2">
              <Palette className="w-5 h-5 text-purple-500" />
              <span>Configurações</span>
            </h3>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <Bell className="w-4 h-4 text-gray-500" />
                  <span className="text-sm text-gray-700">Notificações</span>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" className="sr-only peer" defaultChecked />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-pink-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-pink-500"></div>
                </label>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <Shield className="w-4 h-4 text-gray-500" />
                  <span className="text-sm text-gray-700">Modo Escuro</span>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" className="sr-only peer" />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-pink-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-pink-500"></div>
                </label>
              </div>
            </div>
          </div>

          {/* Estatísticas */}
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <h3 className="text-lg font-bold text-gray-800 mb-4">Estatísticas</h3>
            
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Produtos Cadastrados</span>
                <span className="font-bold text-pink-600">127</span>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Vendas Este Mês</span>
                <span className="font-bold text-green-600">R$ 45.230</span>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Produtos Sustentáveis</span>
                <span className="font-bold text-purple-600">89%</span>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Satisfação Cliente</span>
                <span className="font-bold text-blue-600">4.8/5</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;