
import { ShoppingBag } from 'lucide-react';
import { useAppSelector } from './app/hooks';
import ProductList from './features/products/ProductList';
import Cart from './features/cart/Cart';
import './App.css';

function App() {
  const totalQuantity = useAppSelector((state) => state.cart.totalQuantity);

  return (
    <div className="app-container">
      <header>
        <h1>Tuan3</h1>
        <div className="cart-icon-container">
          <ShoppingBag size={24} color="var(--text-main)" />
          {totalQuantity > 0 && (
            <div className="cart-badge">{totalQuantity}</div>
          )}
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
    </div>
  );
}

export default App;
