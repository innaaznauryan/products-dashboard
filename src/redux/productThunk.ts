import { createAsyncThunk } from '@reduxjs/toolkit';
import { apiClient } from '../axios/axiosInstance';
import { Product } from '../types/types';

export const getProductsThunk = createAsyncThunk<Product[]>(
    "products/get",
    async () => {
        const response = await apiClient.get<Product[]>("/products");
        return response.data;
    }
)

export const createProductsThunk = createAsyncThunk<Product, Product>(
    "products/post",
    async (product) => {
        const response = await apiClient.post<Product>("/products", product);
        return response.data;
    }
)

export const updateProductsThunk = createAsyncThunk<Product, Product>(
    "products/put",
    async (product) => {
        const response = await apiClient.put<Product>(`/products/${product.id}`, product);
        return response.data;
    }
)

export const removeProductsThunk = createAsyncThunk<Product, Product>(
    "products/delete",
    async (product) => {
        const response = await apiClient.delete(`/products/${product.id}`);
        return response.data;
    }
)
