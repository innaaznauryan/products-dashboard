import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { getProductsThunk, createProductsThunk, updateProductsThunk, removeProductsThunk } from './productThunk';
import { Product, ProductState } from '../types/types';

const initialState: ProductState = {
    data: [],
    loading: false,
    error: null
};

const productSlice = createSlice({
    name: 'products',
    initialState,
    extraReducers: (builder) => {
        builder
            .addCase(getProductsThunk.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getProductsThunk.fulfilled, (state, action: PayloadAction<Product[]>) => {
                state.loading = false;
                state.data = action.payload;
            })
            .addCase(getProductsThunk.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || "Failed to fetch Products";
            })
            .addCase(createProductsThunk.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(createProductsThunk.fulfilled, (state, action: PayloadAction<Product>) => {
                state.loading = false;
                state.data.push(action.payload);
            })
            .addCase(createProductsThunk.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || "Failed to create a Product";
            })
            .addCase(updateProductsThunk.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(updateProductsThunk.fulfilled, (state, action: PayloadAction<Product>) => {
                state.loading = false;
                const index = state.data.findIndex(product => product.id === action.payload.id);
                state.data.splice(index, 1, action.payload);
            })
            .addCase(updateProductsThunk.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || "Failed to update a Product";
            })
            .addCase(removeProductsThunk.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(removeProductsThunk.fulfilled, (state, action: PayloadAction<Product>) => {
                state.loading = false;
                state.data = state.data.filter(product => product.id !== action.payload.id);
            })
            .addCase(removeProductsThunk.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || "Failed to delete a Product";
            });
    },
    reducers: {}
})

export default productSlice.reducer;
