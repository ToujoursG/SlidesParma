import { Product } from '@/components/ProductCard';
import { Category } from '@/components/Sidebar';

export const mockCategories: Category[] = [
  { id: 'roupas', name: 'Roupas', count: 15 },
  { id: 'acessorios', name: 'Acessórios', count: 12 },
  { id: 'eletronicos', name: 'Eletrônicos', count: 8 },
  { id: 'casa', name: 'Casa & Decoração', count: 10 },
  { id: 'esportes', name: 'Esportes', count: 7 },
];

export const mockProducts: Product[] = [
  // Roupas
  {
    id: '1',
    name: 'Camiseta Premium Oversized',
    price: 89.90,
    image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=300&h=300&fit=crop',
    category: 'roupas',
    description: 'Camiseta oversized de algodão premium'
  },
  {
    id: '2',
    name: 'Jaqueta Bomber Streetwear',
    price: 199.90,
    image: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=300&h=300&fit=crop',
    category: 'roupas'
  },
  {
    id: '3',
    name: 'Calça Cargo Tactical',
    price: 159.90,
    image: 'https://images.unsplash.com/photo-1506629905877-61d5c53be1d4?w=300&h=300&fit=crop',
    category: 'roupas'
  },
  {
    id: '4',
    name: 'Hoodie Minimalista',
    price: 139.90,
    image: 'https://images.unsplash.com/photo-1556821840-3a9c6dcb3fb5?w=300&h=300&fit=crop',
    category: 'roupas'
  },
  
  // Acessórios
  {
    id: '5',
    name: 'Relógio Smart Pro',
    price: 299.90,
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=300&h=300&fit=crop',
    category: 'acessorios'
  },
  {
    id: '6',
    name: 'Óculos de Sol Aviador',
    price: 179.90,
    image: 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=300&h=300&fit=crop',
    category: 'acessorios'
  },
  {
    id: '7',
    name: 'Mochila Urban Tech',
    price: 249.90,
    image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=300&h=300&fit=crop',
    category: 'acessorios'
  },

  // Eletrônicos
  {
    id: '8',
    name: 'Fones Wireless Pro',
    price: 399.90,
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=300&h=300&fit=crop',
    category: 'eletronicos'
  },
  {
    id: '9',
    name: 'Power Bank 20000mAh',
    price: 129.90,
    image: 'https://images.unsplash.com/photo-1609592846618-ac58fc5e3bb3?w=300&h=300&fit=crop',
    category: 'eletronicos'
  },
  {
    id: '10',
    name: 'Smartphone Ultra 5G',
    price: 1299.90,
    image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=300&h=300&fit=crop',
    category: 'eletronicos'
  },

  // Casa & Decoração
  {
    id: '11',
    name: 'Luminária LED Inteligente',
    price: 189.90,
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop',
    category: 'casa'
  },
  {
    id: '12',
    name: 'Vaso Decorativo Moderno',
    price: 79.90,
    image: 'https://images.unsplash.com/photo-1485955900006-10f4d324d411?w=300&h=300&fit=crop',
    category: 'casa'
  },
  {
    id: '13',
    name: 'Almofada Premium Veludo',
    price: 49.90,
    image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=300&h=300&fit=crop',
    category: 'casa'
  },

  // Esportes
  {
    id: '14',
    name: 'Tênis Running Pro',
    price: 299.90,
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=300&h=300&fit=crop',
    category: 'esportes'
  },
  {
    id: '15',
    name: 'Garrafa Térmica Sport',
    price: 69.90,
    image: 'https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=300&h=300&fit=crop',
    category: 'esportes'
  },
  {
    id: '16',
    name: 'Kit Yoga Completo',
    price: 199.90,
    image: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=300&h=300&fit=crop',
    category: 'esportes'
  }
];