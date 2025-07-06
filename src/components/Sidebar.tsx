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
}

export const Sidebar = ({ categories, selectedCategory, onCategorySelect }: SidebarProps) => {
  return (
    <aside className="w-64 bg-secondary border-r border-border p-4 h-full">
      <h2 className="text-lg font-semibold text-foreground mb-4">Categorias</h2>
      
      <div className="space-y-2">
        <button
          onClick={() => onCategorySelect(null)}
          className={cn(
            "w-full text-left px-3 py-2 rounded-lg transition-colors",
            selectedCategory === null
              ? "bg-primary text-primary-foreground"
              : "hover:bg-spotify-hover text-muted-foreground hover:text-foreground"
          )}
        >
          Todos os produtos
        </button>
        
        {categories.map((category) => (
          <button
            key={category.id}
            onClick={() => onCategorySelect(category.id)}
            className={cn(
              "w-full text-left px-3 py-2 rounded-lg transition-colors flex justify-between items-center",
              selectedCategory === category.id
                ? "bg-primary text-primary-foreground"
                : "hover:bg-spotify-hover text-muted-foreground hover:text-foreground"
            )}
          >
            <span>{category.name}</span>
            <span className="text-sm bg-muted px-2 py-1 rounded-full">
              {category.count}
            </span>
          </button>
        ))}
      </div>
    </aside>
  );
};