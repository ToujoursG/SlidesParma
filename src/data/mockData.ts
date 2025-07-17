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
    title: 'Lançamentos',
    subtitle: 'Confira os novos produtos',
    image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&h=300&fit=crop',
    buttonText: 'Ver Novidades',
    link: '/novos'
  }
];

export const mockCategories: Category[] = [
  { id: 'divertidos', name: 'Divertidos', count: 3 },
  { id: 'serios', name: 'Sérios', count: 3 },
  { id: 'criativos', name: 'Criativos', count: 3 },
];

export const mockProducts: Product[] = [
  // Divertidos
  {
    id: '1',
    name: 'Slide Tiba',
    price: 29.90,
    image: 'https://tse1.explicit.bing.net/th/id/OIP.uqnw_phWFDaBFEQzX2_7wwAAAA?rs=1&pid=ImgDetMain&o=7&rm=3',
    category: 'divertidos',
    description: 'O Slide Tiba é o melhor slide de todos, pois representa o grande Tiba',
    images: [
      'https://tse1.mm.bing.net/th/id/OIP.NVmlzq56yFODtkbp29Ei3QHaEK?rs=1&pid=ImgDetMain&o=7&rm=3',
      'https://tse4.mm.bing.net/th/id/OIF.TCLJrnWKBBqBOwVPzsbFUQ?rs=1&pid=ImgDetMain&o=7&rm=3'
    ],
    rating: 4.5,
    reviewCount: 127,
    specifications: {
      'Variações': 'Canva, Powerpoint',
      'Tamanho': '15 paginas',
      'Temas': 'Preto, Branco, Cinza',
    },
    tags: ['premium']
  },
  
  // Serios
  {
    id: '2',
    name: 'Alana Slide',
    price: 9.90,
    image: 'https://tse1.mm.bing.net/th/id/OIP.rTKDZ5bR92RCej2W-dNr1gHaEI?rs=1&pid=ImgDetMain&o=7&rm=3',
    category: 'serios',
    description: 'Slide da Alana, sim, um slide da Alana, exatamente isso',
    images: [
      'https://tse1.mm.bing.net/th/id/OIP.rTKDZ5bR92RCej2W-dNr1gHaEI?rs=1&pid=ImgDetMain&o=7&rm=3',
      'https://tse1.mm.bing.net/th/id/OIP.rTKDZ5bR92RCej2W-dNr1gHaEI?rs=1&pid=ImgDetMain&o=7&rm=3'
    ],
    rating: 4.4,
    reviewCount: 178,
    specifications: {
      'Variações': 'Canva, Powerpoint',
      'Tamanho': '15 paginas',
      'Temas': 'Preto, Branco, Cinza',
    },
    tags: ['fitness']
  },
  
  // Criativos
  {
    id: '3',
    name: 'Slide multiversal',
    price: 19.90,
    image: 'https://tse4.mm.bing.net/th/id/OIP.2W0xzGI30PJgfP57fXQ6igHaEK?rs=1&pid=ImgDetMain&o=7&rm=3',
    category: 'criativos',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam ac arcu orci. Cras eget molestie tortor, sed ultricies sapien.',
    images: [
      'https://tse4.mm.bing.net/th/id/OIP.2W0xzGI30PJgfP57fXQ6igHaEK?rs=1&pid=ImgDetMain&o=7&rm=3',
      'https://tse4.mm.bing.net/th/id/OIP.2W0xzGI30PJgfP57fXQ6igHaEK?rs=1&pid=ImgDetMain&o=7&rm=3'
    ],
    rating: 4.7,
    reviewCount: 203,
    specifications: {
      'Variações': 'Canva, Powerpoint',
      'Tamanho': '15 paginas',
      'Temas': 'Preto, Branco, Cinza',
    },
    tags: ['premium']
  },
];