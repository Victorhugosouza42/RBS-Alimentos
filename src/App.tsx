import { HashRouter, Routes, Route } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import CatalogPage from './pages/CatalogPage';
import CartPage from './pages/CartPage';
import AdminPage from './pages/AdminPage';

export default function App() {
  return (
    <AppProvider>
      <HashRouter>
        <Routes>
          <Route path="/" element={<CatalogPage />} />
          <Route path="/carrinho" element={<CartPage />} />
          <Route path="/admin" element={<AdminPage />} />
        </Routes>
      </HashRouter>
    </AppProvider>
  );
}
