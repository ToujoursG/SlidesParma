import { useState, useEffect, useMemo } from 'react';
import { Header } from '@/components/Header';
import { Sidebar } from '@/components/Sidebar';
import { ProductGrid } from '@/components/ProductGrid';
import { Product } from '@/components/ProductCard';
import { mockProducts, mockCategories } from '@/data/mockData';

const Index = () => {
  const [products] = useState<Product[]>(mockProducts);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Simulate loading
  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  // Close mobile menu when screen size changes
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setIsMobileMenuOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Filter products based on category and search
  const filteredProducts = useMemo(() => {
    let filtered = products;

    if (selectedCategory) {
      filtered = filtered.filter(product => product.category === selectedCategory);
    }

    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(product =>
        product.name.toLowerCase().includes(query) ||
        product.category.toLowerCase().includes(query)
      );
    }

    return filtered;
  }, [products, selectedCategory, searchQuery]);

  const handleMenuToggle = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleSidebarClose = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header 
        onSearchChange={setSearchQuery}
        onMenuToggle={handleMenuToggle}
        isMobileMenuOpen={isMobileMenuOpen}
      />
      
      <div className="flex min-h-[calc(100vh-4rem)] relative">
        <Sidebar
          categories={mockCategories}
          selectedCategory={selectedCategory}
          onCategorySelect={setSelectedCategory}
          isOpen={isMobileMenuOpen}
          onClose={handleSidebarClose}
        />
        
        <main className="flex-1 p-4 sm:p-6 lg:ml-0 overflow-auto">
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-foreground mb-2">
              {selectedCategory 
                ? mockCategories.find(cat => cat.id === selectedCategory)?.name || 'Categoria'
                : 'Todos os produtos'
              }
            </h2>
            <p className="text-muted-foreground">
              {isLoading ? 'Carregando...' : `${filteredProducts.length} produto${filteredProducts.length !== 1 ? 's' : ''} encontrado${filteredProducts.length !== 1 ? 's' : ''}`}
            </p>
          </div>

          <ProductGrid
            products={filteredProducts}
            isLoading={isLoading}
          />
        </main>
      </div>
    </div>
  );
};

export default Index;
