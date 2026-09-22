import React from 'react';
import { useFavorites } from '../../contexts/FavoritesContext';
import { X, Trash2, HeartCrack } from 'lucide-react';
import { useAppDispatch } from '../../app/hooks';
import { addToCart } from '../cart/cartSlice';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

const FavoritesModal: React.FC<Props> = ({ isOpen, onClose }) => {
  const { state: favState, dispatch: favDispatch } = useFavorites();
  const dispatch = useAppDispatch();
  const { favorites } = favState;

  if (!isOpen) return null;

  return (
    <div style={{
      position: 'fixed',
      top: 0, left: 0, right: 0, bottom: 0,
      backgroundColor: 'rgba(0,0,0,0.5)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 1000
    }}>
      <div style={{
        backgroundColor: 'white',
        borderRadius: '12px',
        width: '90%',
        maxWidth: '500px',
        maxHeight: '80vh',
        display: 'flex',
        flexDirection: 'column',
        boxShadow: '0 10px 25px rgba(0,0,0,0.2)'
      }}>
        {/* Header */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '16px 20px',
          borderBottom: '1px solid #e5e7eb'
        }}>
          <h2 style={{ margin: 0, fontSize: '1.25rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
            Danh sách yêu thích
          </h2>
          <button onClick={onClose} style={{
            background: 'none', border: 'none', cursor: 'pointer', padding: '4px',
            display: 'flex', alignItems: 'center', justifyContent: 'center'
          }}>
            <X size={24} color="#6b7280" />
          </button>
        </div>

        {/* Content */}
        <div style={{ padding: '20px', overflowY: 'auto', flex: 1 }}>
          {favorites.length === 0 ? (
            <div style={{ textAlign: 'center', color: '#6b7280', padding: '40px 0' }}>
              <HeartCrack size={48} color="#cbd5e1" style={{ margin: '0 auto 16px' }} />
              <p>Chưa có sản phẩm yêu thích nào</p>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {favorites.map(item => (
                <div key={item.id} style={{
                  display: 'flex', gap: '16px', padding: '12px', 
                  border: '1px solid #e5e7eb', borderRadius: '8px', alignItems: 'center'
                }}>
                  <img src={item.image} alt={item.title} style={{
                    width: '60px', height: '60px', objectFit: 'contain', 
                    backgroundColor: '#f8fafc', borderRadius: '4px'
                  }} />
                  <div style={{ flex: 1 }}>
                    <div style={{ fontWeight: 600, marginBottom: '4px', display: '-webkit-box', WebkitLineClamp: 1, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>{item.title}</div>
                    <div style={{ color: '#ef4444', fontWeight: 600 }}>{item.price.toLocaleString('vi-VN')}₫</div>
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    <button 
                      onClick={() => {
                        dispatch(addToCart(item));
                      }}
                      style={{
                        padding: '6px 12px', backgroundColor: 'var(--primary)', color: 'white',
                        border: 'none', borderRadius: '4px', cursor: 'pointer', fontSize: '0.875rem'
                      }}
                    >
                      Thêm giỏ
                    </button>
                    <button 
                      onClick={() => favDispatch({ type: 'REMOVE_FAVORITE', payload: item.id })}
                      style={{
                        padding: '6px 12px', backgroundColor: '#fef2f2', color: '#ef4444',
                        border: '1px solid #fee2e2', borderRadius: '4px', cursor: 'pointer', fontSize: '0.875rem',
                        display: 'flex', justifyContent: 'center', alignItems: 'center'
                      }}
                      title="Bỏ yêu thích"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FavoritesModal;
