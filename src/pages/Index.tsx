import { useState, useEffect, useMemo } from 'react';
import { Header } from '@/components/Header';
import { Sidebar } from '@/components/Sidebar';
import { ProductGrid } from '@/components/ProductGrid';
import { Banner } from '@/components/Banner';
import { FilterBar, FilterOptions } from '@/components/FilterBar';
import { Product } from '@/components/ProductCard';
import { mockProducts, mockCategories, mockBanners } from '@/data/mockData';

const Index = () => {
  const [products] = useState<Product[]>(mockProducts);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [filters, setFilters] = useState<FilterOptions>({
    priceRange: [0, 2000],
    categories: [],
    rating: 0,
    sortBy: 'name'
  });

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

  // Filter and sort products
  const filteredProducts = useMemo(() => {
    let filtered = products;

    // Category filter (from sidebar)
    if (selectedCategory) {
      filtered = filtered.filter(product => product.category === selectedCategory);
    }

    // Category filter (from filter bar)
    if (filters.categories.length > 0) {
      filtered = filtered.filter(product => filters.categories.includes(product.category));
    }

    // Search filter
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(product =>
        product.name.toLowerCase().includes(query) ||
        product.category.toLowerCase().includes(query)
      );
    }

    // Price range filter
    filtered = filtered.filter(product => 
      product.price >= filters.priceRange[0] && product.price <= filters.priceRange[1]
    );

    // Rating filter
    if (filters.rating > 0) {
      filtered = filtered.filter(product => 
        product.rating && product.rating >= filters.rating
      );
    }

    // Sort products
    filtered.sort((a, b) => {
      switch (filters.sortBy) {
        case 'price-low':
          return a.price - b.price;
        case 'price-high':
          return b.price - a.price;
        case 'rating':
          return (b.rating || 0) - (a.rating || 0);
        case 'name':
        default:
          return a.name.localeCompare(b.name);
      }
    });

    return filtered;
  }, [products, selectedCategory, searchQuery, filters]);

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
          {/* Banners - only show on home page */}
          {!selectedCategory && !searchQuery && (
            <div className="mb-8 space-y-6">
              {mockBanners.map((banner) => (
                <Banner key={banner.id} banner={banner} />
              ))}
            </div>
          )}

          {/* Filters */}
          <div className="mb-6">
            <FilterBar
              filters={filters}
              onFiltersChange={setFilters}
              categories={mockCategories}
              isOpen={isFilterOpen}
              onToggle={() => setIsFilterOpen(!isFilterOpen)}
            />
          </div>

          <div className="mb-6">
            <h2 className="text-2xl font-bold text-foreground mb-2">
              {selectedCategory 
                ? mockCategories.find(cat => cat.id === selectedCategory)?.name || 'Categoria'
                : searchQuery 
                ? `Resultados para "${searchQuery}"`
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
