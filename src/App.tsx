import { useState } from 'react';
import { ShoppingBag, Heart } from 'lucide-react';
import { useAppSelector } from './app/hooks';
import { useFavorites } from './contexts/FavoritesContext';
import ProductList from './features/products/ProductList';
import Cart from './features/cart/Cart';
import FavoritesModal from './features/favorites/FavoritesModal';
import './App.css';

function App() {
  const totalQuantity = useAppSelector((state) => state.cart.totalQuantity);
  const { state: favState } = useFavorites();
  const totalFavorites = favState.favorites.length;
  const [isFavoritesOpen, setIsFavoritesOpen] = useState(false);

  return (
    <div className="app-container">
      <header>
        <h1>Tuan3</h1>
        <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
          <div 
            className="cart-icon-container" 
            title="Sản phẩm yêu thích"
            onClick={() => setIsFavoritesOpen(true)}
            style={{ cursor: 'pointer' }}
          >
            <Heart size={24} color="var(--text-main)" />
            {totalFavorites > 0 && (
              <div className="cart-badge">{totalFavorites}</div>
            )}
          </div>
          <div className="cart-icon-container" title="Giỏ hàng">
            <ShoppingBag size={24} color="var(--text-main)" />
            {totalQuantity > 0 && (
              <div className="cart-badge">{totalQuantity}</div>
            )}
          </div>
        </div>
      </header>

      <main className="main-content">
        <div>
          <h2 style={{ marginBottom: '1.5rem', fontSize: '1.5rem', fontWeight: 700 }}>Sản phẩm nổi bật</h2>
          <ProductList />
        </div>
        <aside>
          <Cart />
        </aside>
      </main>

      <FavoritesModal 
        isOpen={isFavoritesOpen} 
        onClose={() => setIsFavoritesOpen(false)} 
      />
    </div>
  );
}

export default App;
