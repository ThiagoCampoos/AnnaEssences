import React from 'react';
import { Bell, Lock, Globe, Database } from 'lucide-react';

const Settings: React.FC = () => {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-8">Configurações</h1>

      <div className="bg-white rounded-lg shadow-sm">
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex">
            <button className="border-b-2 border-blue-500 py-4 px-6 text-sm font-medium text-blue-600">
              Geral
            </button>
            <button className="border-b-2 border-transparent py-4 px-6 text-sm font-medium text-gray-500 hover:text-gray-700 hover:border-gray-300">
              Segurança
            </button>
            <button className="border-b-2 border-transparent py-4 px-6 text-sm font-medium text-gray-500 hover:text-gray-700 hover:border-gray-300">
              Notificações
            </button>
          </nav>
        </div>

        <div className="p-6">
          <div className="max-w-3xl">
            {/* Company Information */}
            <div className="mb-8">
              <h2 className="text-lg font-medium text-gray-900 mb-4">Informações da Empresa</h2>
              <div className="grid grid-cols-1 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Nome da Empresa
                  </label>
                  <input
                    type="text"
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Nome da sua empresa"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Endereço Comercial
                  </label>
                  <textarea
                    rows={3}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Seu endereço comercial"
                  />
                </div>
              </div>
            </div>

            {/* Preferences */}
            <div className="mb-8">
              <h2 className="text-lg font-medium text-gray-900 mb-4">Preferências</h2>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <Globe className="h-5 w-5 text-gray-400 mr-3" />
                    <div>
                      <p className="text-sm font-medium text-gray-700">Idioma</p>
                      <p className="text-sm text-gray-500">Selecione seu idioma preferido</p>
                    </div>
                  </div>
                  <select className="border border-gray-300 rounded-md shadow-sm p-2">
                    <option>Português</option>
                    <option>English</option>
                    <option>Español</option>
                  </select>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <Database className="h-5 w-5 text-gray-400 mr-3" />
                    <div>
                      <p className="text-sm font-medium text-gray-700">Exportar Dados</p>
                      <p className="text-sm text-gray-500">Baixar dados do estoque</p>
                    </div>
                  </div>
                  <button className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50">
                    Exportar
                  </button>
                </div>
              </div>
            </div>

            {/* Save Button */}
            <div className="flex justify-end">
              <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
                Salvar Alterações
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;