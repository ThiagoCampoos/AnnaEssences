import React, { useState } from 'react';
import { Package, Search, Filter, Plus, Edit2, Trash2 } from 'lucide-react';

interface Product {
  id: string;
  name: string;
  sku: string;
  category: string;
  quantity: number;
  price: number;
  status: 'Em Estoque' | 'Baixo Estoque' | 'Sem Estoque';
}

const mockProducts: Product[] = [
  {
    id: '1',
    name: 'Sérum Anti-Idade Premium',
    sku: 'SERUM-ANTI-30ML',
    category: 'Cuidados Faciais',
    quantity: 45,
    price: 299.99,
    status: 'Em Estoque'
  },
  {
    id: '2',
    name: 'Base Líquida HD Cobertura Total',
    sku: 'BASE-HD-30ML',
    category: 'Maquiagem',
    quantity: 12,
    price: 89.99,
    status: 'Baixo Estoque'
  },
  {
    id: '3',
    name: 'Perfume Floral Feminino 100ml',
    sku: 'PERF-FLORAL-100',
    category: 'Perfumaria',
    quantity: 28,
    price: 189.99,
    status: 'Em Estoque'
  },
  {
    id: '4',
    name: 'Creme Hidratante Corporal Orgânico',
    sku: 'CREME-CORP-250ML',
    category: 'Cuidados Corporais',
    quantity: 0,
    price: 79.99,
    status: 'Sem Estoque'
  },
  {
    id: '5',
    name: 'Kit Shampoo e Condicionador Natural',
    sku: 'KIT-SHAMP-500ML',
    category: 'Cuidados Capilares',
    quantity: 15,
    price: 149.99,
    status: 'Em Estoque'
  },
  {
    id: '6',
    name: 'Máscara Facial Detox Argila Verde',
    sku: 'MASK-DETOX-100G',
    category: 'Cuidados Faciais',
    quantity: 32,
    price: 59.99,
    status: 'Em Estoque'
  },
  {
    id: '7',
    name: 'Batom Matte Longa Duração',
    sku: 'BATOM-MATTE-4G',
    category: 'Maquiagem',
    quantity: 67,
    price: 39.99,
    status: 'Em Estoque'
  },
  {
    id: '8',
    name: 'Óleo Essencial Lavanda Orgânico',
    sku: 'OLEO-LAV-15ML',
    category: 'Aromaterapia',
    quantity: 8,
    price: 89.99,
    status: 'Baixo Estoque'
  }
];

const Inventory: React.FC = () => {
  const [products, setProducts] = useState<Product[]>(mockProducts);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  const handleEdit = (product: Product) => {
    setEditingProduct(product);
    setIsModalOpen(true);
  };

  const handleDelete = (id: string) => {
    if (confirm('Tem certeza que deseja excluir este produto?')) {
      setProducts(products.filter(p => p.id !== id));
    }
  };

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.sku.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Em Estoque':
        return 'bg-green-100 text-green-800';
      case 'Baixo Estoque':
        return 'bg-yellow-100 text-yellow-800';
      case 'Sem Estoque':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold">Gerenciamento de Estoque</h1>
        <button 
          onClick={() => {
            setEditingProduct(null);
            setIsModalOpen(true);
          }}
          className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
        >
          <Plus className="w-4 h-4 mr-2" />
          Adicionar Produto
        </button>
      </div>

      {/* Search and Filter Bar */}
      <div className="bg-white p-4 rounded-lg shadow-sm mb-6">
        <div className="flex gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Buscar produtos..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <button className="flex items-center px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50">
            <Filter className="w-4 h-4 mr-2" />
            Filtros
          </button>
        </div>
      </div>

      {/* Products Table */}
      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Produto
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                SKU
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Quantidade
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Preço
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Ações
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredProducts.map((product) => (
              <tr key={product.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <Package className="h-10 w-10 text-gray-500 mr-3" />
                    <div>
                      <div className="text-sm font-medium text-gray-900">{product.name}</div>
                      <div className="text-sm text-gray-500">{product.category}</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {product.sku}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {product.quantity}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {product.price.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(product.status)}`}>
                    {product.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  <button
                    onClick={() => handleEdit(product)}
                    className="text-blue-600 hover:text-blue-800 mr-3"
                  >
                    <Edit2 className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => handleDelete(product.id)}
                    className="text-red-600 hover:text-red-800"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Product Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg w-full max-w-2xl">
            <h2 className="text-xl font-bold mb-4">
              {editingProduct ? 'Editar Produto' : 'Novo Produto'}
            </h2>
            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Nome do Produto</label>
                <input
                  type="text"
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                  defaultValue={editingProduct?.name}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">SKU</label>
                  <input
                    type="text"
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                    defaultValue={editingProduct?.sku}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Categoria</label>
                  <input
                    type="text"
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                    defaultValue={editingProduct?.category}
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Quantidade</label>
                  <input
                    type="number"
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                    defaultValue={editingProduct?.quantity}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Preço</label>
                  <input
                    type="number"
                    step="0.01"
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                    defaultValue={editingProduct?.price}
                  />
                </div>
              </div>
              <div className="flex justify-end space-x-3 mt-6">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                >
                  {editingProduct ? 'Salvar Alterações' : 'Criar Produto'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Inventory;