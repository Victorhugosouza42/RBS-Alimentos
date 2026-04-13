import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { ShoppingCart, Search, ChevronUp, Plus, Minus, Store, Trash2 } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { categories } from '../data/products';

export default function CatalogPage() {
  const { products, cartItems, addToCart, removeFromCart, getCartCount, getCartTotal, settings } = useApp();
  const navigate = useNavigate();
  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState(categories[0]?.id || '');
  const [showScrollTop, setShowScrollTop] = useState(false);
  const categoryRefs = useRef<Record<string, HTMLDivElement | null>>({});
  const isScrolling = useRef(false);

  const cartCount = getCartCount();
  const cartTotal = getCartTotal();
  const activeProducts = products.filter(p => p.active);

  const filteredProducts = search
    ? activeProducts.filter(p =>
        p.name.toLowerCase().includes(search.toLowerCase()) ||
        p.brand.toLowerCase().includes(search.toLowerCase()) ||
        p.subcategory.toLowerCase().includes(search.toLowerCase()) ||
        p.description.toLowerCase().includes(search.toLowerCase())
      )
    : activeProducts;

  const scrollToCategory = (id: string) => {
    setActiveCategory(id);
    isScrolling.current = true;
    const el = categoryRefs.current[id];
    if (el) {
      const offset = 140;
      const top = el.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    }
    setTimeout(() => { isScrolling.current = false; }, 1000);
  };

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);
      if (isScrolling.current || search) return;
      for (const cat of categories) {
        const el = categoryRefs.current[cat.id];
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 180 && rect.bottom > 180) {
            setActiveCategory(cat.id);
            break;
          }
        }
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [search]);

  const formatPrice = (price: number) => {
    if (price === 0) return 'Consulte';
    return `R$ ${price.toFixed(2).replace('.', ',')}`;
  };

  const getQuantity = (productId: string) => {
    return cartItems.find(c => c.productId === productId)?.quantity || 0;
  };

  const grouped = search
    ? [{ id: 'search', name: 'Resultados da Busca', emoji: '🔍', color: 'from-indigo-500 to-purple-500', subcategories: [], products: filteredProducts }]
    : categories.map(cat => ({
        ...cat,
        products: filteredProducts.filter(p => p.category === cat.id),
      })).filter(cat => cat.products.length > 0);

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-gradient-to-r from-slate-800 via-slate-700 to-blue-900 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 py-3">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 shrink-0">
              <div className="bg-white/10 p-1.5 rounded-lg">
                <Store className="w-6 h-6 text-white" />
              </div>
              <div className="hidden sm:block">
                <h1 className="text-white font-bold text-lg leading-tight">RBS Alimentos</h1>
                <p className="text-blue-200 text-[10px] font-medium tracking-wider uppercase">Distribuidora</p>
              </div>
            </div>
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Buscar produtos, marcas..."
                value={search}
                onChange={e => setSearch(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white/95 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 placeholder-gray-400 shadow-sm"
              />
            </div>
            <button
              onClick={() => navigate('/carrinho')}
              className="relative shrink-0 bg-white/15 hover:bg-white/25 transition-colors rounded-xl p-2.5 backdrop-blur-sm"
            >
              <ShoppingCart className="w-6 h-6 text-white" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-amber-400 text-slate-800 text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </button>
          </div>
        </div>
        {/* Category Nav */}
        {!search && (
          <div className="bg-white/5 backdrop-blur-sm border-t border-white/10">
            <div className="max-w-7xl mx-auto">
              <nav className="flex overflow-x-auto py-2 px-4 gap-2 no-scrollbar">
                {categories.map(cat => (
                  <button
                    key={cat.id}
                    onClick={() => scrollToCategory(cat.id)}
                    className={`shrink-0 px-4 py-1.5 rounded-lg text-sm font-medium transition-all whitespace-nowrap ${
                      activeCategory === cat.id
                        ? 'bg-white text-slate-800 shadow-md'
                        : 'bg-white/10 text-white/80 hover:bg-white/20 hover:text-white'
                    }`}
                  >
                    {cat.emoji} {cat.name}
                  </button>
                ))}
              </nav>
            </div>
          </div>
        )}
      </header>

      {/* Products */}
      <main className="max-w-7xl mx-auto px-4 py-6 pb-28">
        {grouped.length === 0 && (
          <div className="text-center py-20 text-gray-400">
            <Search className="w-16 h-16 mx-auto mb-4 opacity-50" />
            <p className="text-xl font-medium">Nenhum produto encontrado</p>
            <p className="text-sm mt-1">Tente buscar por outro termo</p>
          </div>
        )}

        {grouped.map(cat => (
          <div
            key={cat.id}
            ref={el => { if (!search) categoryRefs.current[cat.id] = el; }}
            className="mb-10"
          >
            <div className={`flex items-center gap-3 mb-6 ${search ? '' : 'scroll-mt-32'}`}>
              <div className={`bg-gradient-to-br ${'color' in cat ? cat.color : 'from-indigo-400 to-purple-400'} rounded-xl p-2.5 shadow-md`}>
                <span className="text-2xl">{cat.emoji}</span>
              </div>
              <h2 className="text-xl font-bold text-slate-800">{cat.name}</h2>
              <div className="flex-1 h-px bg-slate-200" />
            </div>

            {'products' in cat ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
                {(cat.products as typeof products).map(product => {
                  const qty = getQuantity(product.id);
                  const itemTotal = product.price * qty;
                  return (
                    <div
                      key={product.id}
                      className={`bg-white rounded-xl border transition-all hover:shadow-lg group ${
                        qty > 0
                          ? 'border-blue-300 shadow-md ring-1 ring-blue-100'
                          : 'border-slate-100 hover:border-slate-200'
                      }`}
                    >
                      <div className="p-4">
                        <div className="flex items-start justify-between gap-2">
                          <div className="flex-1 min-w-0">
                            <p className="text-[10px] text-slate-400 font-semibold uppercase tracking-wider">{product.subcategory}</p>
                            <h3 className="font-semibold text-slate-800 text-sm mt-0.5 truncate">{product.name}</h3>
                            <p className="text-sm text-slate-500">{product.brand}</p>
                            {product.description && (
                              <p className="text-xs text-slate-400 mt-0.5">{product.description}</p>
                            )}
                          </div>
                          <div className="w-10 h-10 bg-slate-50 rounded-lg flex items-center justify-center text-xl shrink-0">
                            {product.emoji}
                          </div>
                        </div>
                        <div className="flex items-end justify-between mt-3 gap-2">
                          <div>
                            <span className={`text-lg font-bold ${product.price === 0 ? 'text-amber-600' : 'text-slate-800'}`}>
                              {formatPrice(product.price)}
                            </span>
                            {qty > 0 && product.price > 0 && (
                              <p className="text-xs text-blue-600 font-medium">
                                Subtotal: {formatPrice(itemTotal)}
                              </p>
                            )}
                          </div>
                          {qty === 0 ? (
                            <button
                              onClick={() => addToCart(product.id)}
                              className="shrink-0 flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-semibold transition-all bg-blue-600 text-white hover:bg-blue-700 active:scale-95"
                            >
                              <Plus className="w-4 h-4" /> Adicionar
                            </button>
                          ) : (
                            <div className="shrink-0 flex items-center gap-1">
                              <button
                                onClick={() => removeFromCart(product.id)}
                                className="w-8 h-8 flex items-center justify-center rounded-lg bg-red-50 text-red-500 hover:bg-red-100 transition-all active:scale-90"
                                title="Remover"
                              >
                                {qty === 1 ? <Trash2 className="w-3.5 h-3.5" /> : <Minus className="w-3.5 h-3.5" />}
                              </button>
                              <span className="w-10 text-center font-bold text-slate-800 text-sm">{qty}</span>
                              <button
                                onClick={() => addToCart(product.id)}
                                className="w-8 h-8 flex items-center justify-center rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition-all active:scale-90"
                                title="Adicionar mais"
                              >
                                <Plus className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : null}
          </div>
        ))}
      </main>

      {/* Floating Cart Bar */}
      {cartCount > 0 && (
        <div className="fixed bottom-0 left-0 right-0 z-50 p-3 sm:p-4">
          <div className="max-w-7xl mx-auto">
            <button
              onClick={() => navigate('/carrinho')}
              className="w-full flex items-center justify-between bg-slate-800 text-white px-5 py-3.5 rounded-2xl shadow-2xl hover:bg-slate-700 transition-all active:scale-[0.99] border border-slate-600/50"
            >
              <div className="flex items-center gap-3">
                <div className="relative">
                  <ShoppingCart className="w-6 h-6" />
                  <span className="absolute -top-2 -right-2.5 bg-amber-400 text-slate-800 text-[10px] font-bold rounded-full w-4.5 h-4.5 flex items-center justify-center leading-none px-1">
                    {cartCount}
                  </span>
                </div>
                <span className="font-semibold text-sm sm:text-base">
                  {cartCount} {cartCount === 1 ? 'item' : 'itens'}
                </span>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-lg font-bold text-amber-400">
                  R$ {cartTotal.toFixed(2).replace('.', ',')}
                </span>
                <span className="text-sm text-slate-300 hidden sm:inline">Ver Carrinho →</span>
              </div>
            </button>
          </div>
        </div>
      )}

      {/* Scroll to top */}
      {showScrollTop && (
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className={`fixed right-6 z-40 bg-white shadow-lg rounded-full p-3 hover:bg-slate-50 transition-all border border-slate-200 ${cartCount > 0 ? 'bottom-24' : 'bottom-6'}`}
        >
          <ChevronUp className="w-5 h-5 text-slate-500" />
        </button>
      )}

      {/* Footer */}
      <footer className="bg-slate-800 text-slate-400 text-center py-8">
        <div className="max-w-7xl mx-auto px-4">
          <p className="font-semibold text-white text-sm">{settings.storeName}</p>
          <p className="text-xs mt-1">© {new Date().getFullYear()} Todos os direitos reservados.</p>
          <p className="text-xs mt-1 text-slate-500">Preços sujeitos a alteração sem aviso prévio.</p>
        </div>
      </footer>
    </div>
  );
}
