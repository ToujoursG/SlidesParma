import { useState } from 'react';
import { Filter, ChevronDown, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Slider } from '@/components/ui/slider';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';

export interface FilterOptions {
  priceRange: [number, number];
  categories: string[];
  rating: number;
  sortBy: string;
}

interface FilterBarProps {
  filters: FilterOptions;
  onFiltersChange: (filters: FilterOptions) => void;
  categories: Array<{ id: string; name: string; count: number }>;
  isOpen: boolean;
  onToggle: () => void;
}

export const FilterBar = ({ 
  filters, 
  onFiltersChange, 
  categories, 
  isOpen, 
  onToggle 
}: FilterBarProps) => {
  const [priceRange, setPriceRange] = useState(filters.priceRange);

  const sortOptions = [
    { value: 'name', label: 'Nome A-Z' },
    { value: 'price-low', label: 'Menor preço' },
    { value: 'price-high', label: 'Maior preço' },
    { value: 'rating', label: 'Melhor avaliação' }
  ];

  const handleCategoryChange = (categoryId: string, checked: boolean) => {
    const newCategories = checked
      ? [...filters.categories, categoryId]
      : filters.categories.filter(id => id !== categoryId);
    
    onFiltersChange({ ...filters, categories: newCategories });
  };

  const handlePriceChange = (value: number[]) => {
    const newRange: [number, number] = [value[0], value[1]];
    setPriceRange(newRange);
    onFiltersChange({ ...filters, priceRange: newRange });
  };

  const clearFilters = () => {
    const defaultFilters: FilterOptions = {
      priceRange: [0, 2000],
      categories: [],
      rating: 0,
      sortBy: 'name'
    };
    setPriceRange(defaultFilters.priceRange);
    onFiltersChange(defaultFilters);
  };

  const hasActiveFilters = 
    filters.categories.length > 0 || 
    filters.priceRange[0] > 0 || 
    filters.priceRange[1] < 2000 || 
    filters.rating > 0;

  return (
    <div className="space-y-4">
      {/* Filter Toggle Button */}
      <div className="flex items-center justify-between">
        <Button
          variant="outline"
          onClick={onToggle}
          className="flex items-center space-x-2"
        >
          <Filter className="w-4 h-4" />
          <span>Filtros</span>
          <ChevronDown className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
        </Button>

        {hasActiveFilters && (
          <Button
            variant="ghost"
            size="sm"
            onClick={clearFilters}
            className="text-muted-foreground hover:text-foreground"
          >
            <X className="w-4 h-4 mr-1" />
            Limpar
          </Button>
        )}
      </div>

      {/* Active Filters */}
      {hasActiveFilters && (
        <div className="flex flex-wrap gap-2">
          {filters.categories.map(categoryId => {
            const category = categories.find(c => c.id === categoryId);
            return category ? (
              <Badge key={categoryId} variant="secondary">
                {category.name}
                <X 
                  className="w-3 h-3 ml-1 cursor-pointer" 
                  onClick={() => handleCategoryChange(categoryId, false)}
                />
              </Badge>
            ) : null;
          })}
          
          {(filters.priceRange[0] > 0 || filters.priceRange[1] < 2000) && (
            <Badge variant="secondary">
              R$ {filters.priceRange[0]} - R$ {filters.priceRange[1]}
              <X 
                className="w-3 h-3 ml-1 cursor-pointer" 
                onClick={() => handlePriceChange([0, 2000])}
              />
            </Badge>
          )}
        </div>
      )}

      {/* Filter Panel */}
      <Collapsible open={isOpen}>
        <CollapsibleContent>
          <Card>
            <CardContent className="p-4 space-y-6">
              {/* Sort By */}
              <div className="space-y-3">
                <Label className="text-sm font-semibold">Ordenar por</Label>
                <select
                  value={filters.sortBy}
                  onChange={(e) => onFiltersChange({ ...filters, sortBy: e.target.value })}
                  className="w-full p-2 border border-border rounded-md bg-background text-foreground"
                >
                  {sortOptions.map(option => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* Price Range */}
              <div className="space-y-3">
                <Label className="text-sm font-semibold">
                  Faixa de Preço: R$ {priceRange[0]} - R$ {priceRange[1]}
                </Label>
                <Slider
                  value={priceRange}
                  onValueChange={handlePriceChange}
                  max={2000}
                  min={0}
                  step={10}
                  className="w-full"
                />
              </div>

              {/* Categories */}
              <div className="space-y-3">
                <Label className="text-sm font-semibold">Categorias</Label>
                <div className="space-y-2 max-h-40 overflow-y-auto">
                  {categories.map(category => (
                    <div key={category.id} className="flex items-center space-x-2">
                      <Checkbox
                        id={category.id}
                        checked={filters.categories.includes(category.id)}
                        onCheckedChange={(checked) => 
                          handleCategoryChange(category.id, checked as boolean)
                        }
                      />
                      <Label 
                        htmlFor={category.id} 
                        className="text-sm cursor-pointer flex-1"
                      >
                        {category.name} ({category.count})
                      </Label>
                    </div>
                  ))}
                </div>
              </div>

              {/* Rating Filter */}
              <div className="space-y-3">
                <Label className="text-sm font-semibold">Avaliação mínima</Label>
                <div className="space-y-2">
                  {[4, 3, 2, 1].map(rating => (
                    <div key={rating} className="flex items-center space-x-2">
                      <Checkbox
                        id={`rating-${rating}`}
                        checked={filters.rating === rating}
                        onCheckedChange={(checked) => 
                          onFiltersChange({ 
                            ...filters, 
                            rating: checked ? rating : 0 
                          })
                        }
                      />
                      <Label 
                        htmlFor={`rating-${rating}`} 
                        className="text-sm cursor-pointer flex items-center space-x-1"
                      >
                        <span>{rating}</span>
                        <span className="text-yellow-400">★</span>
                        <span>ou mais</span>
                      </Label>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </CollapsibleContent>
      </Collapsible>
    </div>
  );
};