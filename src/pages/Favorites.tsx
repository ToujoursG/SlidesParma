import { Link } from 'react-router-dom';
import { Heart, ShoppingCart, ArrowLeft } from 'lucide-react';
import { Header } from '@/components/Header';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Product } from '@/components/ProductCard';
import { useCart } from '@/context/CartContext';
import { useFavorites } from '../context/FavoritesContext';
import { useToast } from '@/hooks/use-toast';

const Favorites = () => {
  const { state: favoritesState, removeFromFavorites } = useFavorites();
  const { addItem } = useCart();
  const { toast } = useToast();

  const handleRemoveFromFavorites = (productId: string) => {
    removeFromFavorites(productId);
    toast({
      title: "Removido dos favoritos",
      description: "O produto foi removido da sua lista de desejos",
    });
  };

  const handleAddToCart = (product: Product) => {
    const success = addItem(product);
    toast({
      title: success ? "Produto adicionado!" : "Item já está no carrinho",
      description: success
        ? `${product.name} foi adicionado ao carrinho`
        : "Este produto já foi adicionado ao seu carrinho",
      variant: success ? undefined : "destructive",
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center gap-4 mb-8">
          <Link to="/">
            <Button variant="ghost" size="icon">
              <ArrowLeft className="w-5 h-5" />
            </Button>
          </Link>
          <h1 className="text-3xl font-bold text-foreground">Favoritos</h1>
        </div>

        {favoritesState.items.length === 0 ? (
          <Card className="text-center py-12">
            <CardContent>
              <Heart className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
              <h2 className="text-xl font-semibold text-foreground mb-2">
                Nenhum favorito ainda
              </h2>
              <p className="text-muted-foreground mb-6">
                Adicione produtos aos seus favoritos para vê-los aqui
              </p>
              <Link to="/">
                <Button>Explorar Produtos</Button>
              </Link>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-6">
            <p className="text-muted-foreground">
              {favoritesState.itemCount} produto{favoritesState.itemCount !== 1 ? 's' : ''} na sua lista de desejos
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {favoritesState.items.map((product) => (
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
                      <Button className="w-full" onClick={() => handleAddToCart(product)}>
                        <ShoppingCart className="w-4 h-4 mr-2" />
                        Adicionar ao Carrinho
                      </Button>
                      <Link to={`/product/${product.id}`}>
                        <Button variant="outline" className="w-full">
                          Ver Detalhes
                        </Button>
                      </Link>
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