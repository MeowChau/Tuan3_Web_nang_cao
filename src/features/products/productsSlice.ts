import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { Product } from '../../types';

interface ProductsState {
  items: Product[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: ProductsState = {
  items: [],
  status: 'idle',
  error: null,
};

// Fetch products from a mock API (simulated for MMA gloves)
export const fetchProducts = createAsyncThunk('products/fetchProducts', async () => {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 800));
  
  const mmaGloves: Product[] = [
    {
      id: 1,
      title: "Găng tay MMA Venum Challenger",
      price: 1250000,
      description: "Găng tay MMA chất lượng cao từ thương hiệu Venum, bảo vệ tối đa xương bàn tay.",
      image: "/venum.jpg",
      category: "Găng MMA thi đấu"
    },
    {
      id: 2,
      title: "Găng tay MMA Everlast Pro Style",
      price: 850000,
      description: "Thiết kế thoải mái, độ bền cao, phù hợp cho người mới bắt đầu tập luyện.",
      image: "/everlast.jpg",
      category: "Găng MMA tập luyện"
    },
    {
      id: 3,
      title: "Găng MMA Fairtex FGV15",
      price: 1950000,
      description: "Găng Fairtex FGV15 chính hãng Thái Lan, da thật 100%, đệm mút cao cấp.",
      image: "/fairtex.jpg",
      category: "Găng MMA chuyên nghiệp"
    },
    {
      id: 4,
      title: "Găng MMA Hayabusa T3",
      price: 2450000,
      description: "Công nghệ hỗ trợ cổ tay tốt nhất, thiết kế ergonomic ôm trọn bàn tay.",
      image: "/hayabusa.jpg",
      category: "Găng MMA cao cấp"
    }
  ];
  
  return mmaGloves;
});

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Failed to fetch products';
      });
  },
});

export default productsSlice.reducer;
