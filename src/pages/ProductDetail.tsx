import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Star, Heart, Share2, Truck } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Header } from '@/components/Header';
import { Product } from '@/components/ProductCard';
import { ProductGrid } from '@/components/ProductGrid';
import { mockProducts } from '@/data/mockData';
import { mockReviews } from '@/data/reviews';
import { useCart } from '@/context/CartContext';
import { useFavorites } from '../context/FavoritesContext';
import { useToast } from '@/hooks/use-toast';

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState<Product | null>(null);
  const [selectedImage, setSelectedImage] = useState(0);
  const { addItem, isInCart } = useCart();
  const { addToFavorites, removeFromFavorites, isFavorite } = useFavorites();
  const { toast } = useToast();

  const recommendedProducts = mockProducts.filter(p => 
    p.category === product?.category && p.id !== product?.id
  ).slice(0, 4);

  const productReviews = product ? mockReviews[product.id] || [] : [];

  useEffect(() => {
    if (id) {
      const foundProduct = mockProducts.find(p => p.id === id);
      setProduct(foundProduct || null);
    }
  }, [id]);

  if (!product) {
    return (
      <div className="min-h-screen bg-background">
        <Header onSearchChange={() => {}} onMenuToggle={() => {}} isMobileMenuOpen={false} />
        <div className="flex items-center justify-center h-96">
          <p className="text-muted-foreground">Produto não encontrado</p>
        </div>
      </div>
    );
  }

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(price);
  };

  const handleAddToCart = () => {
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

  const handleToggleFavorite = () => {
    const isCurrentlyFavorite = isFavorite(product.id);
    
    if (isCurrentlyFavorite) {
      removeFromFavorites(product.id);
      toast({
        title: "Removido dos favoritos",
        description: "O produto foi removido da sua lista de desejos",
      });
    } else {
      const success = addToFavorites(product);
      if (success) {
        toast({
          title: "Adicionado aos favoritos",
          description: "O produto foi adicionado à sua lista de desejos",
        });
      }
    }
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

  const images = product.images || [product.image];
  const inCart = isInCart(product.id);
  const isProductFavorite = isFavorite(product.id);

  return (
    <div className="min-h-screen bg-background">
      <Header onSearchChange={() => {}} onMenuToggle={() => {}} isMobileMenuOpen={false} />
      
      <div className="container mx-auto px-4 py-6 space-y-8">
        {/* Breadcrumb */}
        <div className="flex items-center space-x-2 text-sm">
          <Link to="/" className="text-muted-foreground hover:text-primary">
            <ArrowLeft className="w-4 h-4 inline mr-1" />
            Voltar
          </Link>
          <span className="text-muted-foreground">/</span>
          <span className="capitalize text-muted-foreground">{product.category}</span>
          <span className="text-muted-foreground">/</span>
          <span className="text-foreground">{product.name}</span>
        </div>

        {/* Product Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Images */}
          <div className="space-y-4">
            <div className="aspect-square bg-secondary rounded-lg overflow-hidden">
              <img
                src={images[selectedImage]}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>
            
            {images.length > 1 && (
              <div className="flex space-x-2 overflow-x-auto">
                {images.map((img, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 ${
                      selectedImage === index ? 'border-primary' : 'border-transparent'
                    }`}
                  >
                    <img
                      src={img}
                      alt={`${product.name} ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold text-foreground mb-2">
                {product.name}
              </h1>
              
              {product.rating && (
                <div className="flex items-center space-x-2 mb-2">
                  <div className="flex">
                    {renderStars(product.rating)}
                  </div>
                  <span className="text-sm text-muted-foreground">
                    {product.rating} ({product.reviewCount} avaliações)
                  </span>
                </div>
              )}

              <p className="text-sm text-muted-foreground capitalize mb-4">
                Categoria: {product.category}
              </p>
            </div>

            <div className="space-y-4">
              <p className="text-4xl font-bold text-primary">
                {formatPrice(product.price)}
              </p>

              {product.description && (
                <p className="text-foreground leading-relaxed">
                  {product.description}
                </p>
              )}

              {product.tags && (
                <div className="flex flex-wrap gap-2">
                  {product.tags.map((tag, index) => (
                    <Badge key={index} variant="secondary">
                      {tag}
                    </Badge>
                  ))}
                </div>
              )}
            </div>

            {/* Actions */}
            <div className="space-y-4">
              <div className="flex space-x-3">
                <Button
                  onClick={handleAddToCart}
                  disabled={inCart}
                  className={`flex-1 h-12 text-lg ${
                    inCart 
                      ? "bg-secondary text-secondary-foreground cursor-not-allowed" 
                      : "bg-primary hover:bg-primary/90 text-primary-foreground"
                  }`}
                >
                  {inCart ? 'Já está no Carrinho' : 'Adicionar ao Carrinho'}
                </Button>
                
                <Button
                  variant="outline"
                  size="icon"
                  className="h-12 w-12"
                  onClick={handleToggleFavorite}
                >
                  <Heart className={`w-5 h-5 ${isProductFavorite ? 'fill-red-500 text-red-500' : ''}`} />
                </Button>
                
                <Button
                  variant="outline"
                  size="icon"
                  className="h-12 w-12"
                >
                  <Share2 className="w-5 h-5" />
                </Button>
              </div>

              <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                <Truck className="w-4 h-4" />
                <span>Entrega via WhatsApp</span>
              </div>
            </div>
          </div>
        </div>

        {/* Product Details Tabs */}
        <Tabs defaultValue="details" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="details">Detalhes</TabsTrigger>
            <TabsTrigger value="reviews">Avaliações</TabsTrigger>
            <TabsTrigger value="shipping">Entrega</TabsTrigger>
          </TabsList>
          
          <TabsContent value="details" className="space-y-4">
            {product.specifications && (
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold mb-4">Especificações</h3>
                  <div className="space-y-3">
                    {Object.entries(product.specifications).map(([key, value]) => (
                      <div key={key} className="flex justify-between py-2 border-b border-border last:border-0">
                        <span className="font-medium text-foreground">{key}:</span>
                        <span className="text-muted-foreground">{value}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}
          </TabsContent>
          
          <TabsContent value="reviews" className="space-y-4">
            <Card>
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold mb-4">
                  Avaliações dos Clientes ({productReviews.length})
                </h3>
                
                {productReviews.length === 0 ? (
                  <p className="text-muted-foreground">Nenhuma avaliação ainda.</p>
                ) : (
                  <div className="space-y-4">
                    {productReviews.map((review) => (
                      <div key={review.id} className="pb-4 border-b border-border last:border-0">
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center space-x-2">
                            <span className="font-medium">{review.userName}</span>
                            <div className="flex">
                              {renderStars(review.rating)}
                            </div>
                          </div>
                          <span className="text-sm text-muted-foreground">
                            {new Date(review.date).toLocaleDateString('pt-BR')}
                          </span>
                        </div>
                        <p className="text-foreground">{review.comment}</p>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="shipping" className="space-y-4">
            <Card>
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold mb-4">Informações de Entrega</h3>
                <div className="space-y-3">
                  <div className="flex items-center space-x-2">
                    <Truck className="w-5 h-5 text-primary" />
                    <span>Entrega via WhatsApp</span>
                  </div>
                  <p className="text-muted-foreground">
                    • Resposta assim que possivel<br/>
                    • Pratico e rapido<br/>
                    • 100% confiavel!
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Recommended Products */}
        {recommendedProducts.length > 0 && (
          <div className="space-y-6">
            <Separator />
            <div>
              <h2 className="text-2xl font-bold text-foreground mb-6">
                Você também pode gostar
              </h2>
              <ProductGrid products={recommendedProducts} isLoading={false} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductDetail;