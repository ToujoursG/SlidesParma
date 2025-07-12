import { Product } from '@/components/ProductCard';
import { Category } from '@/components/Sidebar';

export interface Review {
  id: string;
  userName: string;
  rating: number;
  comment: string;
  date: string;
}

export interface Banner {
  id: string;
  title: string;
  subtitle: string;
  image: string;
  buttonText: string;
  link: string;
}

export const mockBanners: Banner[] = [
  {
    id: '1',
    title: 'Super Oferta!',
    subtitle: 'Até 50% OFF em produtos selecionados',
    image: 'https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=800&h=300&fit=crop',
    buttonText: 'Ver Ofertas',
    link: '/ofertas'
  },
  {
    id: '2',
    title: 'Lançamentos',
    subtitle: 'Confira os novos produtos da semana',
    image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&h=300&fit=crop',
    buttonText: 'Ver Novidades',
    link: '/novidades'
  }
];

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
    description: 'Camiseta oversized de algodão premium com corte moderno e confortável. Perfeita para o dia a dia ou para compor looks casuais.',
    images: [
      'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500&h=500&fit=crop',
      'https://images.unsplash.com/photo-1503341504253-dff4815485f1?w=500&h=500&fit=crop',
      'https://images.unsplash.com/photo-1618354691373-d851c5c3a990?w=500&h=500&fit=crop'
    ],
    rating: 4.5,
    reviewCount: 127,
    specifications: {
      'Material': '100% Algodão',
      'Tamanhos': 'P, M, G, GG',
      'Cores': 'Preto, Branco, Cinza',
      'Cuidados': 'Lavar à máquina até 30°C'
    },
    tags: ['premium', 'oversized', 'confort']
  },
  {
    id: '2',
    name: 'Jaqueta Bomber Streetwear',
    price: 199.90,
    image: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=300&h=300&fit=crop',
    category: 'roupas',
    description: 'Jaqueta bomber com design streetwear moderno. Tecido resistente e acabamento premium.',
    images: [
      'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=500&h=500&fit=crop',
      'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=500&h=500&fit=crop'
    ],
    rating: 4.8,
    reviewCount: 89,
    specifications: {
      'Material': 'Nylon e Poliéster',
      'Tamanhos': 'P, M, G, GG',
      'Cores': 'Preto, Verde Militar',
      'Forro': 'Forrado'
    },
    tags: ['bomber', 'streetwear', 'inverno']
  },
  {
    id: '3',
    name: 'Calça Cargo Tactical',
    price: 159.90,
    image: 'https://images.unsplash.com/photo-1506629905877-61d5c53be1d4?w=300&h=300&fit=crop',
    category: 'roupas',
    description: 'Calça cargo tática com múltiplos bolsos e design urbano moderno.',
    images: [
      'https://images.unsplash.com/photo-1506629905877-61d5c53be1d4?w=500&h=500&fit=crop'
    ],
    rating: 4.3,
    reviewCount: 56,
    specifications: {
      'Material': '65% Algodão, 35% Poliéster',
      'Tamanhos': '38 ao 48',
      'Cores': 'Preto, Verde Militar, Caqui',
      'Bolsos': '8 bolsos funcionais'
    },
    tags: ['cargo', 'tactical', 'urbano']
  },
  {
    id: '4',
    name: 'Hoodie Minimalista',
    price: 139.90,
    image: 'https://images.unsplash.com/photo-1556821840-3a9c6dcb3fb5?w=300&h=300&fit=crop',
    category: 'roupas',
    description: 'Moletom com capuz de design minimalista e conforto superior.',
    images: [
      'https://images.unsplash.com/photo-1556821840-3a9c6dcb3fb5?w=500&h=500&fit=crop'
    ],
    rating: 4.6,
    reviewCount: 89,
    specifications: {
      'Material': '80% Algodão, 20% Poliéster',
      'Tamanhos': 'P, M, G, GG',
      'Cores': 'Preto, Cinza, Branco',
      'Características': 'Capuz ajustável, bolso canguru'
    },
    tags: ['hoodie', 'minimalista', 'casual']
  },
  
  // Acessórios
  {
    id: '5',
    name: 'Relógio Smart Pro',
    price: 299.90,
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=300&h=300&fit=crop',
    category: 'acessorios',
    description: 'Smartwatch com monitoramento completo de saúde e fitness.',
    images: [
      'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&h=500&fit=crop',
      'https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?w=500&h=500&fit=crop'
    ],
    rating: 4.4,
    reviewCount: 178,
    specifications: {
      'Tela': '1.4" AMOLED',
      'Bateria': 'Até 7 dias',
      'Resistência': 'À água IP68',
      'Conectividade': 'Bluetooth 5.0'
    },
    tags: ['smartwatch', 'fitness', 'saúde']
  },
  {
    id: '6',
    name: 'Óculos de Sol Aviador',
    price: 179.90,
    image: 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=300&h=300&fit=crop',
    category: 'acessorios',
    description: 'Óculos aviador clássico com proteção UV400 e design atemporal.',
    images: [
      'https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=500&h=500&fit=crop'
    ],
    rating: 4.2,
    reviewCount: 92,
    specifications: {
      'Proteção': 'UV400 100%',
      'Material': 'Armação metal, lentes policarbonato',
      'Cores': 'Dourado, Prata, Preto',
      'Estilo': 'Aviador clássico'
    },
    tags: ['aviador', 'clássico', 'proteção']
  },
  {
    id: '7',
    name: 'Mochila Urban Tech',
    price: 249.90,
    image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=300&h=300&fit=crop',
    category: 'acessorios',
    description: 'Mochila urbana com compartimento para laptop e design moderno.',
    images: [
      'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500&h=500&fit=crop'
    ],
    rating: 4.7,
    reviewCount: 134,
    specifications: {
      'Capacidade': '25 litros',
      'Laptop': 'Até 15.6"',
      'Material': 'Nylon impermeável',
      'Características': 'Porta USB, bolsos organizadores'
    },
    tags: ['urbana', 'laptop', 'impermeável']
  },

  // Eletrônicos
  {
    id: '8',
    name: 'Fones Wireless Pro',
    price: 399.90,
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=300&h=300&fit=crop',
    category: 'eletronicos',
    description: 'Fones de ouvido sem fio com cancelamento de ruído ativo e qualidade de áudio superior.',
    images: [
      'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&h=500&fit=crop',
      'https://images.unsplash.com/photo-1484704849700-f032a568e944?w=500&h=500&fit=crop',
      'https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=500&h=500&fit=crop'
    ],
    rating: 4.7,
    reviewCount: 203,
    specifications: {
      'Conectividade': 'Bluetooth 5.0',
      'Bateria': 'Até 30h de reprodução',
      'Cancelamento': 'Ruído ativo',
      'Cores': 'Preto, Branco'
    },
    tags: ['wireless', 'premium', 'cancelamento']
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