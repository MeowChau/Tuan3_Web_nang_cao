import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { fetchProducts } from './productsSlice';
import { addToCart } from '../cart/cartSlice';
import { ShoppingCart, AlertCircle, Heart } from 'lucide-react';
import { useFavorites } from '../../contexts/FavoritesContext';

const ProductList: React.FC = () => {
  const dispatch = useAppDispatch();
  const { items, status, error } = useAppSelector((state) => state.products);
  const { state: favState, dispatch: favDispatch } = useFavorites();

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchProducts());
    }
  }, [status, dispatch]);

  if (status === 'loading') {
    return (
      <div className="loading-state">
        <div className="spinner"></div>
        <p>Đang tải sản phẩm...</p>
      </div>
    );
  }

  if (status === 'failed') {
    return (
      <div className="error-state">
        <AlertCircle size={48} color="#ef4444" />
        <p>Lỗi: {error}</p>
      </div>
    );
  }

  return (
    <div className="products-grid">
      {items.map((product) => {
        const isFavorite = favState.favorites.some(p => p.id === product.id);

        const toggleFavorite = () => {
          if (isFavorite) {
            favDispatch({ type: 'REMOVE_FAVORITE', payload: product.id });
          } else {
            favDispatch({ type: 'ADD_FAVORITE', payload: product });
          }
        };

        return (
          <div key={product.id} className="product-card" style={{ position: 'relative' }}>
            <button
              onClick={toggleFavorite}
              style={{
                position: 'absolute',
                top: '10px',
                right: '10px',
                background: 'white',
                border: 'none',
                borderRadius: '50%',
                padding: '6px',
                cursor: 'pointer',
                boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
              title={isFavorite ? "Bỏ yêu thích" : "Thêm vào yêu thích"}
            >
              <Heart 
                size={20} 
                color={isFavorite ? "#ef4444" : "#6b7280"} 
                fill={isFavorite ? "#ef4444" : "none"} 
              />
            </button>
            <img src={product.image} alt={product.title} className="product-image" />
            <div className="product-category">{product.category}</div>
            <h3 className="product-title">{product.title}</h3>
            <div className="product-footer">
              <span className="product-price">{product.price.toLocaleString('vi-VN')}₫</span>
              <button 
                className="btn-add"
                onClick={() => dispatch(addToCart(product))}
                title="Thêm vào giỏ"
              >
                <ShoppingCart size={18} />
                Thêm
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default ProductList;
