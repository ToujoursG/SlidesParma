import { useState, useEffect } from 'react';
import { Heart, ShoppingCart } from 'lucide-react';
import { Header } from '@/components/Header';
import { ProductGrid } from '@/components/ProductGrid';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Product } from '@/components/ProductCard';
import { mockProducts } from '@/data/mockData';
import { useCart } from '@/context/CartContext';
import { useToast } from '@/hooks/use-toast';

const Favorites = () => {
  const [favorites, setFavorites] = useState<Product[]>([]);
  const { addItem } = useCart();
  const { toast } = useToast();

  useEffect(() => {
    // Mock favorites - em um app real, isso viria do localStorage ou API
    const mockFavorites = mockProducts.slice(0, 3);
    setFavorites(mockFavorites);
  }, []);

  const handleRemoveFromFavorites = (productId: string) => {
    setFavorites(favorites.filter(p => p.id !== productId));
    toast({
      title: "Removido dos favoritos",
      description: "O produto foi removido da sua lista de desejos",
    });
  };

  const handleAddToCart = (product: Product) => {
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

  return (
    <div className="min-h-screen bg-background">
      <Header onSearchChange={() => {}} onMenuToggle={() => {}} isMobileMenuOpen={false} />
      
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center space-x-3 mb-8">
          <Heart className="w-8 h-8 text-red-500 fill-red-500" />
          <h1 className="text-3xl font-bold text-foreground">Meus Favoritos</h1>
        </div>

        {favorites.length === 0 ? (
          <Card className="text-center py-12">
            <CardContent>
              <Heart className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
              <h2 className="text-xl font-semibold text-foreground mb-2">
                Nenhum favorito ainda
              </h2>
              <p className="text-muted-foreground mb-6">
                Adicione produtos aos seus favoritos para vê-los aqui
              </p>
              <Button onClick={() => window.location.href = '/'}>
                Explorar Produtos
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-6">
            <p className="text-muted-foreground">
              {favorites.length} produto{favorites.length !== 1 ? 's' : ''} na sua lista de desejos
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {favorites.map((product) => (
                <Card key={product.id} className="group">
                  <CardContent className="p-4">
                    <div className="aspect-square bg-secondary rounded-lg mb-3 overflow-hidden relative">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-cover"
                      />
                      <Button
                        size="icon"
                        variant="ghost"
                        className="absolute top-2 right-2 bg-white/80 hover:bg-white text-red-500"
                        onClick={() => handleRemoveFromFavorites(product.id)}
                      >
                        <Heart className="w-4 h-4 fill-red-500" />
                      </Button>
                    </div>
                    
                    <h3 className="font-medium text-foreground mb-2 line-clamp-2">
                      {product.name}
                    </h3>
                    
                    <p className="text-lg font-bold text-primary mb-3">
                      {new Intl.NumberFormat('pt-BR', {
                        style: 'currency',
                        currency: 'BRL'
                      }).format(product.price)}
                    </p>
                    
                    <div className="space-y-2">
                      <Button 
                        className="w-full" 
                        onClick={() => handleAddToCart(product)}
                      >
                        <ShoppingCart className="w-4 h-4 mr-2" />
                        Adicionar ao Carrinho
                      </Button>
                      <Button 
                        variant="outline" 
                        className="w-full"
                        onClick={() => window.location.href = `/product/${product.id}`}
                      >
                        Ver Detalhes
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Favorites;