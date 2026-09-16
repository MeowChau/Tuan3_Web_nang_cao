
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { removeFromCart, updateQuantity } from './cartSlice';
import { ShoppingBag, Trash2, Plus, Minus, ShoppingCart } from 'lucide-react';

const Cart: React.FC = () => {
  const dispatch = useAppDispatch();
  const { items, totalAmount, totalQuantity } = useAppSelector((state) => state.cart);

  if (items.length === 0) {
    return (
      <div className="cart-panel">
        <h2 className="cart-header">
          <ShoppingCart size={24} color="var(--primary)" />
          Giỏ hàng của bạn
        </h2>
        <div className="empty-cart">
          <ShoppingBag size={48} color="#cbd5e1" />
          <p>Giỏ hàng đang trống</p>
        </div>
      </div>
    );
  }

  return (
    <div className="cart-panel">
      <h2 className="cart-header">
        <ShoppingCart size={24} color="var(--primary)" />
        Giỏ hàng của bạn
      </h2>
      
      <div className="cart-items">
        {items.map((item) => (
          <div key={item.id} className="cart-item">
            <img src={item.image} alt={item.title} className="cart-item-image" />
            <div className="cart-item-details">
              <div className="cart-item-title" title={item.title}>
                {item.title}
              </div>
              <div className="cart-item-price">{item.price.toLocaleString('vi-VN')}₫</div>
              
              <div className="cart-item-actions">
                <div className="quantity-controls">
                  <button 
                    className="qty-btn"
                    onClick={() => dispatch(updateQuantity({ id: item.id, quantity: item.quantity - 1 }))}
                  >
                    <Minus size={14} />
                  </button>
                  <span style={{ fontSize: '0.875rem', fontWeight: 600, width: '20px', textAlign: 'center' }}>
                    {item.quantity}
                  </span>
                  <button 
                    className="qty-btn"
                    onClick={() => dispatch(updateQuantity({ id: item.id, quantity: item.quantity + 1 }))}
                  >
                    <Plus size={14} />
                  </button>
                </div>
                
                <button 
                  className="btn-remove"
                  onClick={() => dispatch(removeFromCart(item.id))}
                  title="Xóa sản phẩm"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="cart-summary">
        <div className="summary-row">
          <span>Số lượng:</span>
          <span>{totalQuantity}</span>
        </div>
        <div className="summary-row summary-total">
          <span>Tổng cộng:</span>
          <span>{totalAmount.toLocaleString('vi-VN')}₫</span>
        </div>
        <button className="btn-checkout">
          Thanh toán
        </button>
      </div>
    </div>
  );
};

export default Cart;
