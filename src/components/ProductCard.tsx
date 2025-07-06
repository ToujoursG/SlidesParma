import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { useCart } from '@/context/CartContext';
import { useToast } from '@/hooks/use-toast';

export interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  category: string;
  description?: string;
}

interface ProductCardProps {
  product: Product;
}

export const ProductCard = ({ product }: ProductCardProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const { addItem, isInCart } = useCart();
  const { toast } = useToast();

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

  const inCart = isInCart(product.id);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Card 
          className="bg-card border-border hover:bg-spotify-hover transition-all duration-300 group cursor-pointer transform hover:scale-105 hover:shadow-lg"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
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
      </DialogTrigger>
      
      <DialogContent className="max-w-2xl bg-card border-border">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="aspect-square bg-secondary rounded-lg overflow-hidden">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover"
            />
          </div>
          
          <div className="space-y-4">
            <div>
              <h2 className="text-2xl font-bold text-foreground mb-2">
                {product.name}
              </h2>
              <p className="text-muted-foreground capitalize">
                Categoria: {product.category}
              </p>
            </div>
            
            {product.description && (
              <p className="text-foreground">
                {product.description}
              </p>
            )}
            
            <div className="space-y-4">
              <p className="text-3xl font-bold text-primary">
                {formatPrice(product.price)}
              </p>
              
              <Button
                onClick={handleAddToCart}
                disabled={inCart}
                className={`w-full ${
                  inCart 
                    ? "bg-secondary text-secondary-foreground cursor-not-allowed" 
                    : "bg-primary hover:bg-primary/90 text-primary-foreground"
                }`}
              >
                {inCart ? 'Já está no Carrinho' : 'Adicionar ao Carrinho'}
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};