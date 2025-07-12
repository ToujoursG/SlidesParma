import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useCart } from '@/context/CartContext';
import { useToast } from '@/hooks/use-toast';

export interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  category: string;
  description?: string;
  images?: string[];
  rating?: number;
  reviewCount?: number;
  specifications?: Record<string, string>;
  tags?: string[];
}

interface ProductCardProps {
  product: Product;
}

export const ProductCard = ({ product }: ProductCardProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const { addItem, isInCart } = useCart();
  const { toast } = useToast();
  const navigate = useNavigate();

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(price);
  };

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    const success = addItem(product);
    
    if (success) {
      toast({
        title: "Produto adicionado!",
        description: `${product.name} foi adicionado ao carrinho`,
      });
    } else {
      toast({
        title: "Item já está no carrinho",
        description: "Este produto já foi adicionado ao seu carrinho",
        variant: "destructive",
      });
    }
  };

  const handleCardClick = () => {
    navigate(`/product/${product.id}`);
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${
          i < Math.floor(rating) 
            ? 'fill-yellow-400 text-yellow-400' 
            : 'text-gray-300'
        }`}
      />
    ));
  };

  const inCart = isInCart(product.id);

  return (
    <Card 
      className="bg-card border-border hover:bg-spotify-hover transition-all duration-300 group cursor-pointer transform hover:scale-105 hover:shadow-lg"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={handleCardClick}
    >
          <CardContent className="p-4">
            <div className="aspect-square bg-secondary rounded-lg mb-3 overflow-hidden relative">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
              {isHovered && (
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <span className="text-white text-sm font-medium bg-black/50 px-3 py-1 rounded-full">
                    Clique para ver detalhes
                  </span>
                </div>
              )}
            </div>
            
            <h3 className="font-medium text-foreground mb-1 line-clamp-2 group-hover:text-primary transition-colors">
              {product.name}
            </h3>
            
            {product.rating && (
              <div className="flex items-center space-x-1 mb-2">
                <div className="flex">
                  {renderStars(product.rating)}
                </div>
                <span className="text-xs text-muted-foreground">
                  ({product.reviewCount})
                </span>
              </div>
            )}
            
            <p className="text-sm text-muted-foreground mb-3 capitalize">
              {product.category}
            </p>
            
            <div className="flex items-center justify-between">
              <span className="text-lg font-bold text-primary">
                {formatPrice(product.price)}
              </span>
              
              <Button
                size="sm"
                onClick={handleAddToCart}
                disabled={inCart}
                className={`transition-all duration-200 ${
                  inCart 
                    ? "bg-secondary text-secondary-foreground cursor-not-allowed" 
                    : "bg-primary hover:bg-primary/90 text-primary-foreground hover:shadow-md active:scale-95"
                }`}
              >
                {inCart ? 'No Carrinho' : 'Adicionar'}
              </Button>
            </div>
          </CardContent>
        </Card>
  );
};