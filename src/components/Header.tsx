import { useState } from 'react';
import { Search, ShoppingCart, Menu, X } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useCart } from '@/context/CartContext';

interface HeaderProps {
  onSearchChange: (query: string) => void;
  onMenuToggle: () => void;
  isMobileMenuOpen: boolean;
}

export const Header = ({ onSearchChange, onMenuToggle, isMobileMenuOpen }: HeaderProps) => {
  const [searchQuery, setSearchQuery] = useState('');
  const { state } = useCart();

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchQuery(query);
    onSearchChange(query);
  };

  return (
    <header className="sticky top-0 z-50 bg-background border-b border-border backdrop-blur">
      <div className="container mx-auto px-4 h-16 flex items-center gap-4">
        {/* Mobile Menu Button */}
        <Button
          variant="ghost"
          size="icon"
          onClick={onMenuToggle}
          className="lg:hidden"
        >
          {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </Button>

        {/* Logo */}
        <Link to="/" className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center">
            <span className="text-primary-foreground font-bold text-sm">S</span>
          </div>
          <h1 className="text-xl font-bold text-foreground hidden sm:block">SpotShop</h1>
        </Link>
        
        {/* Search Bar */}
        <div className="flex-1 max-w-xl mx-auto relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
          <Input
            type="text"
            placeholder="Buscar produtos..."
            value={searchQuery}
            onChange={handleSearchChange}
            className="pl-10 bg-secondary border-border focus:ring-primary"
          />
        </div>

        {/* Cart Button */}
        <Link to="/cart">
          <Button variant="ghost" size="icon" className="relative">
            <ShoppingCart className="w-5 h-5" />
            {state.itemCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-primary text-primary-foreground text-xs rounded-full w-5 h-5 flex items-center justify-center animate-pulse">
                {state.itemCount}
              </span>
            )}
          </Button>
        </Link>
      </div>
    </header>
  );
};