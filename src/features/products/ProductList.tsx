import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { fetchProducts } from './productsSlice';
import { addToCart } from '../cart/cartSlice';
import { ShoppingCart, AlertCircle } from 'lucide-react';

const ProductList: React.FC = () => {
  const dispatch = useAppDispatch();
  const { items, status, error } = useAppSelector((state) => state.products);

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
      {items.map((product) => (
        <div key={product.id} className="product-card">
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
      ))}
    </div>
  );
};

export default ProductList;
