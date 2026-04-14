import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Minus, Plus, Trash2, Send, ShoppingCart, CheckCircle, MessageCircle } from 'lucide-react';
import { useApp } from '../context/AppContext';

export default function CartPage() {
  const { products, cartItems, removeFromCart, updateCartQuantity, clearCart, getCartTotal, createOrder, settings } = useApp();
  const navigate = useNavigate();
  const [step, setStep] = useState<'cart' | 'checkout' | 'confirmed'>('cart');
  const [confirmedOrder, setConfirmedOrder] = useState<string>('');
  const [form, setForm] = useState({
    name: '', phone: '', address: '', neighborhood: '', reference: '', notes: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const cartProducts = cartItems.map(item => {
    const product = products.find(p => p.id === item.productId);
    return { ...item, product };
  }).filter(item => item.product);

  const total = getCartTotal();

  const formatPrice = (price: number) => {
    if (price === 0) return 'Consulte';
    return `R$ ${price.toFixed(2).replace('.', ',')}`;
  };

  const validate = () => {
    const e: Record<string, string> = {};
    if (!form.name.trim()) e.name = 'Nome é obrigatório';
    if (!form.phone.trim()) e.phone = 'Telefone é obrigatório';
    if (!form.address.trim()) e.address = 'Endereço é obrigatório';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleCheckout = () => {
    if (!validate()) return;
    const order = createOrder(form, form.notes);
    setConfirmedOrder(order.id);
    setStep('confirmed');

    // Build WhatsApp message
    let msg = `🛒 *NOVO PEDIDO - ${settings.storeName}*\n\n`;
    msg += `📋 *Pedido:* ${order.id}\n`;
    msg += `👤 *Cliente:* ${form.name}\n`;
    msg += `📱 *Telefone:* ${form.phone}\n`;
    msg += `📍 *Endereço:* ${form.address}`;
    if (form.neighborhood) msg += ` - ${form.neighborhood}`;
    if (form.reference) msg += ` (${form.reference})`;
    msg += `\n\n📝 *ITENS:*\n`;
    msg += `─────────────────\n`;
    order.items.forEach(item => {
      const subtotal = item.unitPrice * item.quantity;
      msg += `• ${item.quantity}x ${item.productName} - ${item.brand}`;
      if (item.unitPrice > 0) msg += `\n  ${item.quantity}x ${formatPrice(item.unitPrice)} = ${formatPrice(subtotal)}`;
      else msg += `\n  ${formatPrice(item.unitPrice)}`;
      msg += '\n';
    });
    msg += `─────────────────\n`;
    msg += `\n💰 *TOTAL: ${formatPrice(order.total)}*`;
    if (form.notes) msg += `\n\n💬 *Observações:* ${form.notes}`;
    msg += `\n\n📅 ${new Date().toLocaleString('pt-BR')}`;

    const encodedMsg = encodeURIComponent(msg);
    const whatsappUrl = `https://wa.me/${settings.whatsappNumber}?text=${encodedMsg}`;
    window.open(whatsappUrl, '_blank');
  };

  if (step === 'confirmed') {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full text-center border border-slate-100">
          <div className="w-20 h-20 bg-emerald-50 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-12 h-12 text-emerald-500" />
          </div>
          <h2 className="text-2xl font-bold text-slate-800 mb-2">Pedido Confirmado!</h2>
          <p className="text-slate-500 mb-4">Seu pedido <span className="font-bold text-blue-600">{confirmedOrder}</span> foi enviado com sucesso.</p>
          <p className="text-slate-400 text-sm mb-6">Você também receberá os detalhes via WhatsApp.</p>
          <div className="flex flex-col gap-3">
            <button
              onClick={() => { setStep('cart'); setForm({ name: '', phone: '', address: '', neighborhood: '', reference: '', notes: '' }); }}
              className="w-full bg-blue-600 text-white py-3 rounded-xl font-semibold hover:bg-blue-700 transition-colors"
            >
              Fazer Novo Pedido
            </button>
            <button
              onClick={() => navigate('/')}
              className="w-full bg-slate-100 text-slate-700 py-3 rounded-xl font-semibold hover:bg-slate-200 transition-colors"
            >
              Voltar ao Catálogo
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white border-b border-slate-200 shadow-sm">
        <div className="max-w-3xl mx-auto px-4 py-4 flex items-center gap-3">
          <button onClick={() => step === 'checkout' ? setStep('cart') : navigate('/')} className="p-2 hover:bg-slate-100 rounded-full transition-colors">
            <ArrowLeft className="w-5 h-5 text-slate-600" />
          </button>
          <div className="flex-1">
            <h1 className="text-lg font-bold text-slate-800">
              {step === 'cart' ? 'Carrinho de Compras' : 'Finalizar Pedido'}
            </h1>
            {cartProducts.length > 0 && (
              <p className="text-sm text-slate-400">{cartProducts.length} {cartProducts.length === 1 ? 'item' : 'itens'}</p>
            )}
          </div>
          {step === 'cart' && cartProducts.length > 0 && (
            <button onClick={clearCart} className="text-sm text-red-500 hover:text-red-700 font-medium">Limpar</button>
          )}
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-4 py-6">
        {cartProducts.length === 0 ? (
          <div className="text-center py-20">
            <ShoppingCart className="w-20 h-20 text-slate-200 mx-auto mb-4" />
            <h2 className="text-xl font-bold text-slate-400 mb-2">Carrinho vazio</h2>
            <p className="text-slate-400 mb-6">Adicione produtos do catálogo para começar.</p>
            <button
              onClick={() => navigate('/')}
              className="bg-blue-600 text-white px-8 py-3 rounded-xl font-semibold hover:bg-blue-700 transition-colors"
            >
              Ver Catálogo
            </button>
          </div>
        ) : step === 'cart' ? (
          <>
            {/* Cart Items */}
            <div className="space-y-3 mb-6">
              {cartProducts.map(({ productId, quantity, product }) => (
                <div key={productId} className="bg-white rounded-xl shadow-sm border border-slate-100 p-4 flex items-center gap-4">
                  <div className="w-12 h-12 bg-slate-50 rounded-xl flex items-center justify-center text-2xl shrink-0 border border-slate-100">
                    {product!.emoji}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-slate-800 text-sm truncate">{product!.name}</h3>
                    <p className="text-xs text-slate-500">{product!.brand} {product!.description && `• ${product!.description}`}</p>
                    <p className="text-sm font-bold text-slate-800 mt-0.5">{formatPrice(product!.price)}</p>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    <button
                      onClick={() => updateCartQuantity(productId, quantity - 1)}
                      className="w-8 h-8 rounded-lg bg-slate-100 hover:bg-slate-200 flex items-center justify-center transition-colors"
                    >
                      <Minus className="w-4 h-4 text-slate-600" />
                    </button>
                    <span className="w-8 text-center font-bold text-slate-800">{quantity}</span>
                    <button
                      onClick={() => updateCartQuantity(productId, quantity + 1)}
                      className="w-8 h-8 rounded-lg bg-blue-100 hover:bg-blue-200 flex items-center justify-center transition-colors"
                    >
                      <Plus className="w-4 h-4 text-blue-600" />
                    </button>
                  </div>
                  <button
                    onClick={() => removeFromCart(productId)}
                    className="p-2 hover:bg-red-50 rounded-lg transition-colors shrink-0"
                  >
                    <Trash2 className="w-4 h-4 text-red-400" />
                  </button>
                </div>
              ))}
            </div>

            {/* Total */}
            <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-4 mb-4">
              <div className="flex justify-between items-center">
                <span className="text-slate-600 font-medium">Total ({cartProducts.reduce((s, i) => s + i.quantity, 0)} itens)</span>
                <span className="text-2xl font-bold text-slate-800">{formatPrice(total)}</span>
              </div>
            </div>

            <button
              onClick={() => setStep('checkout')}
              className="w-full bg-blue-600 text-white py-4 rounded-xl font-bold text-lg hover:bg-blue-700 transition-colors flex items-center justify-center gap-2 shadow-lg shadow-blue-600/20"
            >
              Finalizar Pedido <Send className="w-5 h-5" />
            </button>
          </>
        ) : (
          /* Checkout Form */
          <div className="space-y-4">
            <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-5">
              <h3 className="font-bold text-slate-800 mb-4 text-lg">Seus Dados</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Nome completo *</label>
                  <input
                    type="text"
                    value={form.name}
                    onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                    className={`w-full px-4 py-2.5 rounded-xl border ${errors.name ? 'border-red-400 bg-red-50' : 'border-slate-200'} focus:outline-none focus:ring-2 focus:ring-blue-300`}
                    placeholder="Seu nome"
                  />
                  {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Telefone *</label>
                  <input
                    type="tel"
                    value={form.phone}
                    onChange={e => setForm(f => ({ ...f, phone: e.target.value }))}
                    className={`w-full px-4 py-2.5 rounded-xl border ${errors.phone ? 'border-red-400 bg-red-50' : 'border-slate-200'} focus:outline-none focus:ring-2 focus:ring-blue-300`}
                    placeholder="(00) 00000-0000"
                  />
                  {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Endereço de entrega *</label>
                  <input
                    type="text"
                    value={form.address}
                    onChange={e => setForm(f => ({ ...f, address: e.target.value }))}
                    className={`w-full px-4 py-2.5 rounded-xl border ${errors.address ? 'border-red-400 bg-red-50' : 'border-slate-200'} focus:outline-none focus:ring-2 focus:ring-blue-300`}
                    placeholder="Rua, número, complemento"
                  />
                  {errors.address && <p className="text-red-500 text-xs mt-1">{errors.address}</p>}
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Bairro</label>
                    <input
                      type="text"
                      value={form.neighborhood}
                      onChange={e => setForm(f => ({ ...f, neighborhood: e.target.value }))}
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-300"
                      placeholder="Bairro"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Referência</label>
                    <input
                      type="text"
                      value={form.reference}
                      onChange={e => setForm(f => ({ ...f, reference: e.target.value }))}
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-300"
                      placeholder="Ponto de referência"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-5">
              <label className="block text-sm font-medium text-slate-700 mb-1">Observações</label>
              <textarea
                value={form.notes}
                onChange={e => setForm(f => ({ ...f, notes: e.target.value }))}
                rows={3}
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-300 resize-none"
                placeholder="Alguma observação sobre o pedido?"
              />
            </div>

            {/* Order Summary */}
            <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-5">
              <h3 className="font-bold text-slate-800 mb-3">Resumo do Pedido</h3>
              <div className="space-y-2 mb-4">
                {cartProducts.map(({ productId, quantity, product }) => (
                  <div key={productId} className="flex justify-between text-sm">
                    <span className="text-slate-600">{quantity}x {product!.name} - {product!.brand}</span>
                    <span className="font-medium text-slate-800">{formatPrice(product!.price * quantity)}</span>
                  </div>
                ))}
              </div>
              <div className="border-t border-slate-100 pt-3 flex justify-between items-center">
                <span className="font-bold text-slate-800 text-lg">Total</span>
                <span className="font-bold text-slate-800 text-2xl">{formatPrice(total)}</span>
              </div>
            </div>

            <button
              onClick={handleCheckout}
              className="w-full bg-emerald-600 text-white py-4 rounded-xl font-bold text-lg hover:bg-emerald-700 transition-colors flex items-center justify-center gap-2 shadow-lg shadow-emerald-600/20"
            >
              <MessageCircle className="w-5 h-5" /> Enviar Pedido via WhatsApp
            </button>
            <p className="text-center text-xs text-slate-400 pb-4">
              Ao clicar, seu pedido será enviado pelo WhatsApp
            </p>
          </div>
        )}
      </main>
    </div>
  );
}
