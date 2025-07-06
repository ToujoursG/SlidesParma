import { ProductCard, Product } from './ProductCard';

interface ProductGridProps {
  products: Product[];
  isLoading?: boolean;
}

export const ProductGrid = ({ products, isLoading }: ProductGridProps) => {
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
        {Array.from({ length: 10 }).map((_, index) => (
          <div key={index} className="bg-card border border-border rounded-lg p-4 animate-pulse">
            <div className="aspect-square bg-secondary rounded-lg mb-3"></div>
            <div className="h-4 bg-secondary rounded mb-2"></div>
            <div className="h-3 bg-secondary rounded mb-3 w-1/2"></div>
            <div className="flex justify-between items-center">
              <div className="h-5 bg-secondary rounded w-1/3"></div>
              <div className="h-8 bg-secondary rounded w-16"></div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground text-lg">Nenhum produto encontrado</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4 sm:gap-6">
      {products.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
        />
      ))}
    </div>
  );
};