import { Button } from '@/components/ui/button';
import { Banner as BannerType } from '@/data/mockData';

interface BannerProps {
  banner: BannerType;
}

export const Banner = ({ banner }: BannerProps) => {
  return (
    <div 
      className="relative h-64 md:h-80 bg-cover bg-center rounded-lg overflow-hidden group"
      style={{ backgroundImage: `url(${banner.image})` }}
    >
      <div className="absolute inset-0 bg-black/50 group-hover:bg-black/60 transition-colors duration-300" />
      
      <div className="relative h-full flex items-center justify-center text-center p-6">
        <div className="space-y-4 text-white">
          <h2 className="text-3xl md:text-4xl font-bold">
            {banner.title}
          </h2>
          <p className="text-lg md:text-xl opacity-90 max-w-md mx-auto">
            {banner.subtitle}
          </p>
          <Button 
            size="lg"
            className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold px-8 py-3 transform hover:scale-105 transition-all duration-200"
          >
            {banner.buttonText}
          </Button>
        </div>
      </div>
    </div>
  );
};