import React, { useState } from 'react';
import { User, UserPlus, Mail, Shield, Edit2, Trash2, Search, Filter, Eye, EyeOff } from 'lucide-react';

interface UserData {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'manager' | 'user';
  status: 'active' | 'inactive';
  lastAccess: string;
  avatar?: string;
  department: string;
  phone: string;
}

const mockUsers: UserData[] = [
  {
    id: '1',
    name: 'João Silva',
    email: 'joao.silva@empresa.com',
    role: 'admin',
    status: 'active',
    lastAccess: 'há 2 horas',
    department: 'TI',
    phone: '(11) 99999-9999'
  },
  {
    id: '2',
    name: 'Maria Santos',
    email: 'maria.santos@empresa.com',
    role: 'manager',
    status: 'active',
    lastAccess: 'há 1 dia',
    department: 'Estoque',
    phone: '(11) 88888-8888'
  },
  {
    id: '3',
    name: 'Pedro Costa',
    email: 'pedro.costa@empresa.com',
    role: 'user',
    status: 'active',
    lastAccess: 'há 3 horas',
    department: 'Vendas',
    phone: '(11) 77777-7777'
  },
  {
    id: '4',
    name: 'Ana Oliveira',
    email: 'ana.oliveira@empresa.com',
    role: 'manager',
    status: 'inactive',
    lastAccess: 'há 1 semana',
    department: 'Compras',
    phone: '(11) 66666-6666'
  },
  {
    id: '5',
    name: 'Carlos Ferreira',
    email: 'carlos.ferreira@empresa.com',
    role: 'user',
    status: 'active',
    lastAccess: 'há 5 minutos',
    department: 'Logística',
    phone: '(11) 55555-5555'
  }
];

const Users: React.FC = () => {
  const [users, setUsers] = useState<UserData[]>(mockUsers);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingUser, setEditingUser] = useState<UserData | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleEdit = (user: UserData) => {
    setEditingUser(user);
    setIsModalOpen(true);
  };

  const handleDelete = (id: string) => {
    if (confirm('Tem certeza que deseja excluir este usuário?')) {
      setUsers(users.filter(u => u.id !== id));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    
    const userData: UserData = {
      id: editingUser?.id || Date.now().toString(),
      name: formData.get('name') as string,
      email: formData.get('email') as string,
      role: formData.get('role') as 'admin' | 'manager' | 'user',
      status: formData.get('status') as 'active' | 'inactive',
      department: formData.get('department') as string,
      phone: formData.get('phone') as string,
      lastAccess: editingUser?.lastAccess || 'Nunca'
    };

    if (editingUser) {
      setUsers(users.map(u => u.id === editingUser.id ? userData : u));
    } else {
      setUsers([...users, userData]);
    }

    setIsModalOpen(false);
    setEditingUser(null);
  };

  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.department.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'admin':
        return 'bg-red-100 text-red-800';
      case 'manager':
        return 'bg-blue-100 text-blue-800';
      case 'user':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusColor = (status: string) => {
    return status === 'active' 
      ? 'bg-green-100 text-green-800' 
      : 'bg-red-100 text-red-800';
  };

  const getRoleName = (role: string) => {
    switch (role) {
      case 'admin':
        return 'Administrador';
      case 'manager':
        return 'Gerente';
      case 'user':
        return 'Usuário';
      default:
        return role;
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold">Gerenciamento de Usuários</h1>
        <button 
          onClick={() => {
            setEditingUser(null);
            setIsModalOpen(true);
          }}
          className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
        >
          <UserPlus className="w-4 h-4 mr-2" />
          Adicionar Usuário
        </button>
      </div>

      {/* Search and Filter Bar */}
      <div className="bg-white p-4 rounded-lg shadow-sm mb-6">
        <div className="flex gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Buscar usuários..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <button className="flex items-center px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors">
            <Filter className="w-4 h-4 mr-2" />
            Filtros
          </button>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Usuário
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Função
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Departamento
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Último Acesso
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Ações
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredUsers.map((user) => (
              <tr key={user.id} className="hover:bg-gray-50 transition-colors">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="h-10 w-10 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center text-white font-semibold">
                      {user.name.split(' ').map(n => n[0]).join('').toUpperCase()}
                    </div>
                    <div className="ml-4">
                      <div className="text-sm font-medium text-gray-900">{user.name}</div>
                      <div className="text-sm text-gray-500 flex items-center">
                        <Mail className="h-3 w-3 mr-1" />
                        {user.email}
                      </div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getRoleColor(user.role)}`}>
                    <Shield className="h-3 w-3 mr-1" />
                    {getRoleName(user.role)}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {user.department}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(user.status)}`}>
                    {user.status === 'active' ? 'Ativo' : 'Inativo'}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {user.lastAccess}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  <button
                    onClick={() => handleEdit(user)}
                    className="text-blue-600 hover:text-blue-800 mr-3 transition-colors"
                  >
                    <Edit2 className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => handleDelete(user.id)}
                    className="text-red-600 hover:text-red-800 transition-colors"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* User Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <h2 className="text-xl font-bold mb-4">
              {editingUser ? 'Editar Usuário' : 'Novo Usuário'}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Nome Completo</label>
                  <input
                    type="text"
                    name="name"
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500"
                    defaultValue={editingUser?.name}
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">E-mail</label>
                  <input
                    type="email"
                    name="email"
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500"
                    defaultValue={editingUser?.email}
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Função</label>
                  <select
                    name="role"
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500"
                    defaultValue={editingUser?.role}
                    required
                  >
                    <option value="user">Usuário</option>
                    <option value="manager">Gerente</option>
                    <option value="admin">Administrador</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Status</label>
                  <select
                    name="status"
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500"
                    defaultValue={editingUser?.status}
                    required
                  >
                    <option value="active">Ativo</option>
                    <option value="inactive">Inativo</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Departamento</label>
                  <input
                    type="text"
                    name="department"
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500"
                    defaultValue={editingUser?.department}
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Telefone</label>
                  <input
                    type="tel"
                    name="phone"
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500"
                    defaultValue={editingUser?.phone}
                    required
                  />
                </div>
              </div>

              {!editingUser && (
                <div>
                  <label className="block text-sm font-medium text-gray-700">Senha Temporária</label>
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      name="password"
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 pr-10 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Digite uma senha temporária"
                      required
                    />
                    <button
                      type="button"
                      className="absolute inset-y-0 right-0 pr-3 flex items-center"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? (
                        <EyeOff className="h-4 w-4 text-gray-400" />
                      ) : (
                        <Eye className="h-4 w-4 text-gray-400" />
                      )}
                    </button>
                  </div>
                </div>
              )}

              <div className="flex justify-end space-x-3 mt-6">
                <button
                  type="button"
                  onClick={() => {
                    setIsModalOpen(false);
                    setEditingUser(null);
                  }}
                  className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                >
                  {editingUser ? 'Salvar Alterações' : 'Criar Usuário'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Users;