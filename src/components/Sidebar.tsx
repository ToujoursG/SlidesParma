import { cn } from '@/lib/utils';

export interface Category {
  id: string;
  name: string;
  count: number;
}

interface SidebarProps {
  categories: Category[];
  selectedCategory: string | null;
  onCategorySelect: (categoryId: string | null) => void;
  isOpen: boolean;
  onClose: () => void;
}

export const Sidebar = ({ 
  categories, 
  selectedCategory, 
  onCategorySelect, 
  isOpen, 
  onClose 
}: SidebarProps) => {
  const handleCategorySelect = (categoryId: string | null) => {
    onCategorySelect(categoryId);
    // Close mobile menu after selection
    if (window.innerWidth < 1024) {
      onClose();
    }
  };

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={onClose}
        />
      )}
      
      {/* Sidebar */}
      <aside className={cn(
        "fixed lg:static top-16 left-0 h-[calc(100vh-4rem)] lg:h-full w-64 bg-secondary border-r border-border p-4 z-50 transition-transform duration-300 ease-in-out overflow-y-auto",
        isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
      )}>
        <h2 className="text-lg font-semibold text-foreground mb-4">Categorias</h2>
        
        <div className="space-y-2">
          <button
            onClick={() => handleCategorySelect(null)}
            className={cn(
              "w-full text-left px-3 py-3 rounded-lg transition-all duration-200 hover:scale-105",
              selectedCategory === null
                ? "bg-primary text-primary-foreground shadow-lg"
                : "hover:bg-spotify-hover text-muted-foreground hover:text-foreground"
            )}
          >
            Todos os produtos
          </button>
          
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => handleCategorySelect(category.id)}
              className={cn(
                "w-full text-left px-3 py-3 rounded-lg transition-all duration-200 flex justify-between items-center hover:scale-105",
                selectedCategory === category.id
                  ? "bg-primary text-primary-foreground shadow-lg"
                  : "hover:bg-spotify-hover text-muted-foreground hover:text-foreground"
              )}
            >
              <span>{category.name}</span>
              <span className={cn(
                "text-sm px-2 py-1 rounded-full transition-colors",
                selectedCategory === category.id
                  ? "bg-primary-foreground/20 text-primary-foreground"
                  : "bg-muted text-muted-foreground"
              )}>
                {category.count}
              </span>
            </button>
          ))}
        </div>
      </aside>
    </>
  );
};