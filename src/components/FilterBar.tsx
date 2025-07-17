'use client';

import { useState, useEffect } from 'react';
import { Filter, ChevronDown, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import * as SliderPrimitive from '@radix-ui/react-slider';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Collapsible, CollapsibleContent } from '@/components/ui/collapsible';

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
  onToggle,
}: FilterBarProps) => {
  const [priceRange, setPriceRange] = useState<[number, number]>(filters.priceRange);

  // Garante que filters.priceRange seja válido na montagem e quando mudar externamente
  useEffect(() => {
    if (!filters.priceRange || filters.priceRange.length !== 2) {
      const defaultRange: [number, number] = [0, 30];
      setPriceRange(defaultRange);
      onFiltersChange({ ...filters, priceRange: defaultRange });
    } else {
      setPriceRange(filters.priceRange);
    }
  }, [filters.priceRange]);

  const sortOptions = [
    { value: 'name', label: 'Nome A-Z' },
    { value: 'price-low', label: 'Menor preço' },
    { value: 'price-high', label: 'Maior preço' },
    { value: 'rating', label: 'Melhor avaliação' },
  ];

  const handleCategoryChange = (categoryId: string, checked: boolean) => {
    const newCategories = checked
      ? [...filters.categories, categoryId]
      : filters.categories.filter((id) => id !== categoryId);
    onFiltersChange({ ...filters, categories: newCategories });
  };

  const handlePriceChange = (value: number[]) => {
    // atualiza apenas o estado visual
    if (value.length === 2 && value[0] <= value[1]) {
      setPriceRange([value[0], value[1]]);
    }
  };

  const commitPriceChange = (value: number[]) => {
    // só confirma o filtro ao soltar o thumb
    if (value.length === 2 && value[0] <= value[1]) {
      onFiltersChange({ ...filters, priceRange: [value[0], value[1]] });
    }
  };

  const clearFilters = () => {
    const defaultFilters: FilterOptions = {
      priceRange: [0, 30],
      categories: [],
      rating: 0,
      sortBy: 'name',
    };
    setPriceRange(defaultFilters.priceRange);
    onFiltersChange(defaultFilters);
  };

  const hasActiveFilters =
    filters.categories.length > 0 ||
    filters.priceRange[0] > 0 ||
    filters.priceRange[1] < 30 ||
    filters.rating > 0;

  return (
    <div className="space-y-4">
      {/* Toggle & Limpar */}
      <div className="flex items-center justify-between">
        <Button variant="outline" onClick={onToggle} className="flex items-center space-x-2">
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

      {/* Badges de filtros ativos */}
      {hasActiveFilters && (
        <div className="flex flex-wrap gap-2">
          {filters.categories.map((catId) => {
            const cat = categories.find((c) => c.id === catId);
            return (
              cat && (
                <Badge key={catId} variant="secondary">
                  {cat.name}
                  <X
                    className="w-3 h-3 ml-1 cursor-pointer"
                    onClick={() => handleCategoryChange(catId, false)}
                  />
                </Badge>
              )
            );
          })}
          {(filters.priceRange[0] > 0 || filters.priceRange[1] < 30) && (
            <Badge variant="secondary">
              R$ {filters.priceRange[0]} – R$ {filters.priceRange[1]}
              <X
                className="w-3 h-3 ml-1 cursor-pointer"
                onClick={clearFilters}
              />
            </Badge>
          )}
        </div>
      )}

      {/* Painel de filtros */}
      <Collapsible open={isOpen}>
        <CollapsibleContent>
          <Card>
            <CardContent className="p-4 space-y-6">
              {/* Ordenação */}
              <div className="space-y-3">
                <Label className="text-sm font-semibold">Ordenar por</Label>
                <select
                  value={filters.sortBy}
                  onChange={(e) => onFiltersChange({ ...filters, sortBy: e.target.value })}
                  className="w-full p-2 border border-border rounded-md bg-background text-foreground"
                >
                  {sortOptions.map((o) => (
                    <option key={o.value} value={o.value}>
                      {o.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* Faixa de Preço (Dual-thumb Radix) */}
              <div className="space-y-3">
                <Label className="text-sm font-semibold">
                  Faixa de Preço: R$ {priceRange[0]} – R$ {priceRange[1]}
                </Label>
                <SliderPrimitive.Root
                  className="relative flex items-center select-none touch-none w-full h-5"
                  value={priceRange}
                  onValueChange={handlePriceChange}
                  onValueCommit={commitPriceChange}
                  min={0}
                  max={30}
                  step={3}
                >
                  <SliderPrimitive.Track className="bg-gray-200 relative grow rounded-full h-2">
                    <SliderPrimitive.Range className="absolute bg-blue-500 h-full rounded-full" />
                  </SliderPrimitive.Track>
                  <SliderPrimitive.Thumb className="block w-4 h-4 bg-white border border-gray-400 rounded-full" />
                  <SliderPrimitive.Thumb className="block w-4 h-4 bg-white border border-gray-400 rounded-full" />
                </SliderPrimitive.Root>
              </div>

              {/* Categorias */}
              <div className="space-y-3">
                <Label className="text-sm font-semibold">Categorias</Label>
                <div className="space-y-2 max-h-40 overflow-y-auto">
                  {categories.map((cat) => (
                    <div key={cat.id} className="flex items-center space-x-2">
                      <Checkbox
                        id={cat.id}
                        checked={filters.categories.includes(cat.id)}
                        onCheckedChange={(chk) => handleCategoryChange(cat.id, chk as boolean)}
                      />
                      <Label htmlFor={cat.id} className="text-sm cursor-pointer flex-1">
                        {cat.name} ({cat.count})
                      </Label>
                    </div>
                  ))}
                </div>
              </div>

              {/* Avaliação */}
              <div className="space-y-3">
                <Label className="text-sm font-semibold">Avaliação mínima</Label>
                <div className="space-y-2">
                  {[4, 3, 2, 1].map((rating) => (
                    <div key={rating} className="flex items-center space-x-2">
                      <Checkbox
                        id={`rating-${rating}`}
                        checked={filters.rating === rating}
                        onCheckedChange={(chk) =>
                          onFiltersChange({ ...filters, rating: chk ? rating : 0 })
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