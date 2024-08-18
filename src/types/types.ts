export interface UserSignin {
    email: string;
    password: string;
}

export interface UserAuth {
    user: {
        auth: boolean;
    };
}

export interface Product {
    id: string;
    name: string;
    description: string;
    price: number;
    category: string;
    availability: boolean;
}

export interface ProductState {
    data: Product[];
    loading: boolean;
    error: string | null;
}

export interface FormProps {
    open: boolean;
    onClose: () => void;
    product: Product | null;
    updateList: () => void;
}

export interface ConfirmProps {
    open: boolean;
    onClose: () => void;
    product: Product;
    updateList: () => void;
}