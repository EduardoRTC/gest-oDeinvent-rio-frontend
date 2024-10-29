export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  quantity: number;
  imageUrl: string;
  supplierId: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Supplier {
  id: string;
  name: string;
  cnpj: string;
  contact: string;
  email: string;
  phone: string;
  address: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Customer {
  id: string;
  name: string;
  cpfCnpj: string;
  email: string;
  phone: string;
  address: string;
  isActive: boolean;
  hasTransactions: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface FilterOptions {
  search: string;
  minPrice?: number;
  maxPrice?: number;
  supplierId?: string;
  sortBy?: 'name' | 'price' | 'createdAt';
  sortOrder?: 'asc' | 'desc';
}