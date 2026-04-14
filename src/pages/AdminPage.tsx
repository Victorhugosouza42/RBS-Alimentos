import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  ArrowLeft, Package, ShoppingCart, Settings, LogOut, Search, Lock, Eye, EyeOff,
  Edit3, Save, X, Plus, Trash2, ToggleLeft, ToggleRight, ChevronDown, ChevronUp,
  BarChart3, AlertCircle, CheckCircle
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { categories } from '../data/products';
import { OrderStatus } from '../types';

const statusLabels: Record<OrderStatus, string> = {
  pending: '⏳ Pendente',
  confirmed: '✅ Confirmado',
  preparing: '🔧 Preparando',
  out_for_delivery: '🚚 Em Entrega',
  delivered: '📦 Entregue',
  cancelled: '❌ Cancelado',
};

const statusColors: Record<OrderStatus, string> = {
  pending: 'bg-amber-50 text-amber-700 border-amber-200',
  confirmed: 'bg-blue-50 text-blue-700 border-blue-200',
  preparing: 'bg-violet-50 text-violet-700 border-violet-200',
  out_for_delivery: 'bg-orange-50 text-orange-700 border-orange-200',
  delivered: 'bg-emerald-50 text-emerald-700 border-emerald-200',
  cancelled: 'bg-red-50 text-red-700 border-red-200',
};

export default function AdminPage() {
  const {
    products, orders, settings, isAdmin,
    addProduct, updateProduct, deleteProduct,
    updateOrderStatus, deleteOrder,
    login, logout, updateSettings,
  } = useApp();
  const navigate = useNavigate();

  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loginError, setLoginError] = useState(false);
  const [activeTab, setActiveTab] = useState<'products' | 'orders' | 'settings'>('products');
  const [productSearch, setProductSearch] = useState('');
  const [editingPrice, setEditingPrice] = useState<string | null>(null);
  const [priceValue, setPriceValue] = useState('');
  const [showAddProduct, setShowAddProduct] = useState(false);
  const [newProduct, setNewProduct] = useState({
    name: '', category: 'queijos', subcategory: '', brand: '', price: 0, description: '', emoji: '📦',
  });
  const [expandedOrder, setExpandedOrder] = useState<string | null>(null);
  const [orderFilter, setOrderFilter] = useState<OrderStatus | 'all'>('all');
  const [settingsForm, setSettingsForm] = useState(settings);
  const [settingsSaved, setSettingsSaved] = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);

  const formatPrice = (price: number) => `R$ ${price.toFixed(2).replace('.', ',')}`;
  const formatDate = (date: string) => new Date(date).toLocaleString('pt-BR');

  const filteredProducts = useMemo(() => {
    if (!productSearch) return products;
    const q = productSearch.toLowerCase();
    return products.filter(p =>
      p.name.toLowerCase().includes(q) ||
      p.brand.toLowerCase().includes(q) ||
      p.subcategory.toLowerCase().includes(q) ||
      p.id.toLowerCase().includes(q)
    );
  }, [products, productSearch]);

  const filteredOrders = useMemo(() => {
    if (orderFilter === 'all') return orders;
    return orders.filter(o => o.status === orderFilter);
  }, [orders, orderFilter]);

  const orderStats = useMemo(() => ({
    total: orders.length,
    pending: orders.filter(o => o.status === 'pending').length,
    revenue: orders.filter(o => o.status !== 'cancelled').reduce((s, o) => s + o.total, 0),
  }), [orders]);

  const handleLogin = () => {
    if (login(password)) {
      setLoginError(false);
    } else {
      setLoginError(true);
    }
  };

  const handleSavePrice = (id: string) => {
    const price = parseFloat(priceValue.replace(',', '.'));
    if (!isNaN(price) && price >= 0) {
      updateProduct(id, { price });
    }
    setEditingPrice(null);
  };

  const handleAddProduct = () => {
    if (!newProduct.name || !newProduct.brand) return;
    addProduct({ ...newProduct, active: true });
    setShowAddProduct(false);
    setNewProduct({ name: '', category: 'queijos', subcategory: '', brand: '', price: 0, description: '', emoji: '📦' });
  };

  const handleSaveSettings = () => {
    updateSettings(settingsForm);
    setSettingsSaved(true);
    setTimeout(() => setSettingsSaved(false), 2000);
  };

  // Login Screen
  if (!isAdmin) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-800 to-slate-900 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-sm w-full border border-slate-100">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Lock className="w-8 h-8 text-blue-600" />
            </div>
            <h1 className="text-2xl font-bold text-slate-800">Painel Admin</h1>
            <p className="text-slate-400 text-sm mt-1">Digite a senha para acessar</p>
          </div>
          <div className="space-y-4">
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={e => { setPassword(e.target.value); setLoginError(false); }}
                onKeyDown={e => e.key === 'Enter' && handleLogin()}
                className={`w-full px-4 py-3 rounded-xl border ${loginError ? 'border-red-400' : 'border-slate-200'} focus:outline-none focus:ring-2 focus:ring-blue-300 pr-12`}
                placeholder="Senha de acesso"
              />
              <button onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600">
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
            {loginError && (
              <p className="text-red-500 text-sm flex items-center gap-1"><AlertCircle className="w-4 h-4" /> Senha incorreta</p>
            )}
            <button
              onClick={handleLogin}
              className="w-full bg-blue-600 text-white py-3 rounded-xl font-bold hover:bg-blue-700 transition-colors"
            >
              Entrar
            </button>
          </div>
          <button
            onClick={() => navigate('/')}
            className="w-full mt-4 text-slate-400 hover:text-slate-600 text-sm flex items-center justify-center gap-1"
          >
            <ArrowLeft className="w-4 h-4" /> Voltar à loja
          </button>
        </div>
      </div>
    );
  }

  // Admin Dashboard
  return (
    <div className="min-h-screen bg-slate-100">
      {/* Admin Header */}
      <header className="bg-slate-800 text-white sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button onClick={() => navigate('/')} className="p-2 hover:bg-slate-700 rounded-lg transition-colors">
              <ArrowLeft className="w-5 h-5" />
            </button>
            <div>
              <h1 className="font-bold text-lg">Painel Administrativo</h1>
              <p className="text-slate-400 text-xs">{settings.storeName}</p>
            </div>
          </div>
          <button onClick={logout} className="flex items-center gap-2 px-3 py-2 hover:bg-slate-700 rounded-lg transition-colors text-sm">
            <LogOut className="w-4 h-4" /> Sair
          </button>
        </div>
        {/* Tabs */}
        <div className="max-w-7xl mx-auto px-4">
          <nav className="flex gap-1 overflow-x-auto">
            {[
              { id: 'products' as const, icon: Package, label: 'Produtos' },
              { id: 'orders' as const, icon: ShoppingCart, label: `Pedidos${orderStats.pending > 0 ? ` (${orderStats.pending})` : ''}` },
              { id: 'settings' as const, icon: Settings, label: 'Configurações' },
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-4 py-2.5 text-sm font-medium border-b-2 transition-colors whitespace-nowrap ${
                  activeTab === tab.id
                    ? 'border-blue-400 text-white bg-slate-700/50'
                    : 'border-transparent text-slate-400 hover:text-slate-200'
                }`}
              >
                <tab.icon className="w-4 h-4" /> {tab.label}
              </button>
            ))}
          </nav>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-6">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
          <div className="bg-white rounded-xl p-4 shadow-sm border border-slate-100">
            <div className="flex items-center gap-3">
              <div className="bg-blue-50 rounded-xl p-2.5"><Package className="w-5 h-5 text-blue-600" /></div>
              <div>
                <p className="text-2xl font-bold text-slate-800">{products.length}</p>
                <p className="text-xs text-slate-400">Produtos cadastrados</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl p-4 shadow-sm border border-slate-100">
            <div className="flex items-center gap-3">
              <div className="bg-amber-50 rounded-xl p-2.5"><ShoppingCart className="w-5 h-5 text-amber-600" /></div>
              <div>
                <p className="text-2xl font-bold text-slate-800">{orderStats.pending}</p>
                <p className="text-xs text-slate-400">Pedidos pendentes</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl p-4 shadow-sm border border-slate-100">
            <div className="flex items-center gap-3">
              <div className="bg-emerald-50 rounded-xl p-2.5"><BarChart3 className="w-5 h-5 text-emerald-600" /></div>
              <div>
                <p className="text-2xl font-bold text-slate-800">{formatPrice(orderStats.revenue)}</p>
                <p className="text-xs text-slate-400">Receita total</p>
              </div>
            </div>
          </div>
        </div>

        {/* Products Tab */}
        {activeTab === 'products' && (
          <div>
            <div className="flex flex-col sm:flex-row gap-3 mb-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                  type="text"
                  placeholder="Buscar por nome, marca, subcategoria..."
                  value={productSearch}
                  onChange={e => setProductSearch(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-300 text-sm"
                />
              </div>
              <button
                onClick={() => setShowAddProduct(true)}
                className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2.5 rounded-xl font-medium hover:bg-blue-700 transition-colors shrink-0"
              >
                <Plus className="w-4 h-4" /> Novo Produto
              </button>
            </div>

            {/* Add Product Modal */}
            {showAddProduct && (
              <div className="bg-white rounded-xl shadow-lg border border-slate-200 p-5 mb-4">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="font-bold text-slate-800 text-lg">Novo Produto</h3>
                  <button onClick={() => setShowAddProduct(false)} className="p-1 hover:bg-slate-100 rounded"><X className="w-5 h-5 text-slate-400" /></button>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Nome *</label>
                    <input type="text" value={newProduct.name} onChange={e => setNewProduct(p => ({ ...p, name: e.target.value }))} className="w-full px-3 py-2 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-300 text-sm" placeholder="Ex: Mussarela Artesanal" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Marca *</label>
                    <input type="text" value={newProduct.brand} onChange={e => setNewProduct(p => ({ ...p, brand: e.target.value }))} className="w-full px-3 py-2 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-300 text-sm" placeholder="Ex: Davaca" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Categoria</label>
                    <select value={newProduct.category} onChange={e => setNewProduct(p => ({ ...p, category: e.target.value }))} className="w-full px-3 py-2 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-300 text-sm">
                      {categories.map(c => <option key={c.id} value={c.id}>{c.emoji} {c.name}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Subcategoria</label>
                    <input type="text" value={newProduct.subcategory} onChange={e => setNewProduct(p => ({ ...p, subcategory: e.target.value }))} className="w-full px-3 py-2 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-300 text-sm" placeholder="Ex: Mussarela Artesanal" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Preço (R$)</label>
                    <input type="number" step="0.01" min="0" value={newProduct.price || ''} onChange={e => setNewProduct(p => ({ ...p, price: parseFloat(e.target.value) || 0 }))} className="w-full px-3 py-2 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-300 text-sm" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Descrição</label>
                    <input type="text" value={newProduct.description} onChange={e => setNewProduct(p => ({ ...p, description: e.target.value }))} className="w-full px-3 py-2 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-300 text-sm" placeholder="Ex: 1,5kg" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Emoji</label>
                    <input type="text" value={newProduct.emoji} onChange={e => setNewProduct(p => ({ ...p, emoji: e.target.value }))} className="w-full px-3 py-2 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-300 text-sm" />
                  </div>
                </div>
                <div className="flex justify-end gap-2 mt-4">
                  <button onClick={() => setShowAddProduct(false)} className="px-4 py-2 rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-50 text-sm">Cancelar</button>
                  <button onClick={handleAddProduct} className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 text-sm font-medium">Salvar Produto</button>
                </div>
              </div>
            )}

            {/* Products Table */}
            <div className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-slate-50 border-b border-slate-100">
                      <th className="text-left px-4 py-3 font-medium text-slate-500">Produto</th>
                      <th className="text-left px-4 py-3 font-medium text-slate-500 hidden md:table-cell">Categoria</th>
                      <th className="text-left px-4 py-3 font-medium text-slate-500">Preço</th>
                      <th className="text-center px-4 py-3 font-medium text-slate-500">Status</th>
                      <th className="text-right px-4 py-3 font-medium text-slate-500">Ações</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredProducts.map(product => (
                      <tr key={product.id} className={`border-b border-slate-50 hover:bg-slate-50/50 transition-colors ${!product.active ? 'opacity-50' : ''}`}>
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-2">
                            <span className="text-lg">{product.emoji}</span>
                            <div>
                              <p className="font-medium text-slate-800">{product.name}</p>
                              <p className="text-xs text-slate-400">{product.brand} {product.description && `• ${product.description}`}</p>
                            </div>
                          </div>
                        </td>
                        <td className="px-4 py-3 text-slate-500 hidden md:table-cell">{product.subcategory}</td>
                        <td className="px-4 py-3">
                          {editingPrice === product.id ? (
                            <div className="flex items-center gap-1">
                              <span className="text-slate-400">R$</span>
                              <input
                                type="text"
                                value={priceValue}
                                onChange={e => setPriceValue(e.target.value)}
                                onKeyDown={e => { if (e.key === 'Enter') handleSavePrice(product.id); if (e.key === 'Escape') setEditingPrice(null); }}
                                autoFocus
                                className="w-20 px-2 py-1 border rounded text-sm focus:outline-none focus:ring-1 focus:ring-blue-300"
                              />
                              <button onClick={() => handleSavePrice(product.id)} className="p-1 text-emerald-600 hover:bg-emerald-50 rounded"><Save className="w-4 h-4" /></button>
                              <button onClick={() => setEditingPrice(null)} className="p-1 text-slate-400 hover:bg-slate-100 rounded"><X className="w-4 h-4" /></button>
                            </div>
                          ) : (
                            <button
                              onClick={() => { setEditingPrice(product.id); setPriceValue(product.price.toString()); }}
                              className="flex items-center gap-1 text-slate-800 font-medium hover:text-blue-600 group"
                            >
                              {product.price === 0 ? <span className="text-amber-600">Consulte</span> : formatPrice(product.price)}
                              <Edit3 className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                            </button>
                          )}
                        </td>
                        <td className="px-4 py-3 text-center">
                          <button onClick={() => updateProduct(product.id, { active: !product.active })} className="inline-flex">
                            {product.active ? (
                              <ToggleRight className="w-7 h-7 text-emerald-500 hover:text-emerald-600" />
                            ) : (
                              <ToggleLeft className="w-7 h-7 text-slate-300 hover:text-slate-400" />
                            )}
                          </button>
                        </td>
                        <td className="px-4 py-3 text-right">
                          {deleteConfirm === product.id ? (
                            <div className="flex items-center justify-end gap-1">
                              <span className="text-xs text-red-500">Confirmar?</span>
                              <button onClick={() => { deleteProduct(product.id); setDeleteConfirm(null); }} className="p-1 text-red-600 hover:bg-red-50 rounded"><Trash2 className="w-4 h-4" /></button>
                              <button onClick={() => setDeleteConfirm(null)} className="p-1 text-slate-400 hover:bg-slate-100 rounded"><X className="w-4 h-4" /></button>
                            </div>
                          ) : (
                            <button onClick={() => setDeleteConfirm(product.id)} className="p-1 text-slate-300 hover:text-red-500 rounded transition-colors">
                              <Trash2 className="w-4 h-4" />
                            </button>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              {filteredProducts.length === 0 && (
                <div className="text-center py-10 text-slate-400">
                  <Package className="w-12 h-12 mx-auto mb-2 opacity-30" />
                  <p>Nenhum produto encontrado</p>
                </div>
              )}
              <div className="bg-slate-50 px-4 py-3 text-xs text-slate-400 border-t border-slate-100">
                Mostrando {filteredProducts.length} de {products.length} produtos
              </div>
            </div>
          </div>
        )}

        {/* Orders Tab */}
        {activeTab === 'orders' && (
          <div>
            <div className="flex gap-2 mb-4 overflow-x-auto pb-2">
              <button
                onClick={() => setOrderFilter('all')}
                className={`px-3 py-1.5 rounded-lg text-sm font-medium whitespace-nowrap transition-colors ${orderFilter === 'all' ? 'bg-slate-800 text-white' : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'}`}
              >
                Todos ({orders.length})
              </button>
              {(Object.keys(statusLabels) as OrderStatus[]).map(status => {
                const count = orders.filter(o => o.status === status).length;
                return (
                  <button
                    key={status}
                    onClick={() => setOrderFilter(status)}
                    className={`px-3 py-1.5 rounded-lg text-sm font-medium whitespace-nowrap transition-colors ${orderFilter === status ? 'bg-slate-800 text-white' : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'}`}
                  >
                    {statusLabels[status]} ({count})
                  </button>
                );
              })}
            </div>

            {filteredOrders.length === 0 ? (
              <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-10 text-center text-slate-400">
                <ShoppingCart className="w-12 h-12 mx-auto mb-2 opacity-30" />
                <p>Nenhum pedido encontrado</p>
              </div>
            ) : (
              <div className="space-y-3">
                {filteredOrders.map(order => (
                  <div key={order.id} className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden">
                    <button
                      onClick={() => setExpandedOrder(expandedOrder === order.id ? null : order.id)}
                      className="w-full px-4 py-3 flex items-center justify-between hover:bg-slate-50 transition-colors"
                    >
                      <div className="flex items-center gap-3 text-left">
                        <div>
                          <p className="font-bold text-slate-800 text-sm">{order.id}</p>
                          <p className="text-xs text-slate-400">{formatDate(order.createdAt)}</p>
                        </div>
                        <span className={`px-2 py-0.5 rounded-full text-xs font-medium border ${statusColors[order.status]}`}>
                          {statusLabels[order.status]}
                        </span>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="text-right">
                          <p className="font-bold text-slate-800">{formatPrice(order.total)}</p>
                          <p className="text-xs text-slate-400">{order.items.length} itens</p>
                        </div>
                        {expandedOrder === order.id ? <ChevronUp className="w-5 h-5 text-slate-400" /> : <ChevronDown className="w-5 h-5 text-slate-400" />}
                      </div>
                    </button>

                    {expandedOrder === order.id && (
                      <div className="border-t border-slate-100 px-4 py-4">
                        {/* Customer Info */}
                        <div className="mb-4 p-3 bg-slate-50 rounded-lg">
                          <h4 className="font-semibold text-slate-700 text-sm mb-2">👤 Dados do Cliente</h4>
                          <p className="text-sm text-slate-600"><strong>Nome:</strong> {order.customer.name}</p>
                          <p className="text-sm text-slate-600"><strong>Telefone:</strong> {order.customer.phone}</p>
                          <p className="text-sm text-slate-600"><strong>Endereço:</strong> {order.customer.address}{order.customer.neighborhood ? ` - ${order.customer.neighborhood}` : ''}</p>
                          {order.customer.reference && <p className="text-sm text-slate-600"><strong>Referência:</strong> {order.customer.reference}</p>}
                          {order.notes && <p className="text-sm text-slate-600"><strong>Obs:</strong> {order.notes}</p>}
                        </div>

                        {/* Order Items */}
                        <div className="mb-4">
                          <h4 className="font-semibold text-slate-700 text-sm mb-2">📋 Itens do Pedido</h4>
                          <div className="space-y-1">
                            {order.items.map((item, idx) => (
                              <div key={idx} className="flex justify-between text-sm py-1 border-b border-slate-50 last:border-0">
                                <span className="text-slate-600">{item.quantity}x {item.productName} - {item.brand}</span>
                                <span className="font-medium text-slate-800">{formatPrice(item.unitPrice * item.quantity)}</span>
                              </div>
                            ))}
                          </div>
                          <div className="flex justify-between mt-2 pt-2 border-t-2 border-slate-200">
                            <span className="font-bold text-slate-800">Total</span>
                            <span className="font-bold text-slate-800 text-lg">{formatPrice(order.total)}</span>
                          </div>
                        </div>

                        {/* Status Actions */}
                        <div className="flex flex-wrap gap-2">
                          {(Object.keys(statusLabels) as OrderStatus[]).map(status => (
                            <button
                              key={status}
                              onClick={() => updateOrderStatus(order.id, status)}
                              disabled={order.status === status}
                              className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-colors ${
                                order.status === status
                                  ? statusColors[status]
                                  : 'bg-white text-slate-500 border-slate-200 hover:bg-slate-50'
                              }`}
                            >
                              {statusLabels[status]}
                            </button>
                          ))}
                          <button
                            onClick={() => { deleteOrder(order.id); setExpandedOrder(null); }}
                            className="px-3 py-1.5 rounded-lg text-xs font-medium bg-red-50 text-red-600 border border-red-200 hover:bg-red-100 ml-auto"
                          >
                            <Trash2 className="w-3 h-3 inline mr-1" /> Excluir
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Settings Tab */}
        {activeTab === 'settings' && (
          <div className="max-w-lg">
            <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-6">
              <h3 className="font-bold text-slate-800 text-lg mb-4 flex items-center gap-2"><Settings className="w-5 h-5" /> Configurações da Loja</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Nome da Loja</label>
                  <input
                    type="text"
                    value={settingsForm.storeName}
                    onChange={e => setSettingsForm(s => ({ ...s, storeName: e.target.value }))}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-300"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Número WhatsApp (com código do país)</label>
                  <input
                    type="text"
                    value={settingsForm.whatsappNumber}
                    onChange={e => setSettingsForm(s => ({ ...s, whatsappNumber: e.target.value }))}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-300"
                    placeholder="5573999010809"
                  />
                  <p className="text-xs text-slate-400 mt-1">Ex: 5573999010809 (sem + ou espaços)</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Senha de Administrador</label>
                  <input
                    type="text"
                    value={settingsForm.adminPassword}
                    onChange={e => setSettingsForm(s => ({ ...s, adminPassword: e.target.value }))}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-300"
                  />
                </div>
                <div className="pt-2">
                  <button
                    onClick={handleSaveSettings}
                    className={`w-full py-3 rounded-xl font-bold transition-colors flex items-center justify-center gap-2 ${
                      settingsSaved ? 'bg-emerald-600 text-white' : 'bg-blue-600 text-white hover:bg-blue-700'
                    }`}
                  >
                    {settingsSaved ? <><CheckCircle className="w-5 h-5" /> Salvo!</> : <><Save className="w-5 h-5" /> Salvar Configurações</>}
                  </button>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-6 mt-4">
              <h3 className="font-bold text-slate-800 text-lg mb-2">Sobre</h3>
              <p className="text-sm text-slate-500">Sistema de catálogo digital RBS Alimentos com painel administrativo.</p>
              <p className="text-sm text-slate-500 mt-1">Os dados são armazenados localmente no navegador (localStorage).</p>
              <p className="text-sm text-slate-500 mt-1">Senha padrão: <code className="bg-slate-100 px-1.5 py-0.5 rounded text-slate-700">admin123</code></p>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
