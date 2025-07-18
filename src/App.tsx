import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { HashRouter, Routes, Route } from "react-router-dom";
import { CartProvider } from "@/context/CartContext";
import { FavoritesProvider } from "@/context/FavoritesContext";
import Index from "./pages/Index";
import { Cart } from "./pages/Cart";
import ProductDetail from "./pages/ProductDetail";
import Favorites from "./pages/Favorites";
import NotFound from "./pages/NotFound";
import Novos from "./pages/Novos";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <CartProvider>
      <FavoritesProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          {/* TROCA BrowserRouter por HashRouter */}
          <HashRouter>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/product/:id" element={<ProductDetail />} />
              <Route path="/favorites" element={<Favorites />} />
              <Route path="/novos" element={<Novos />} />
              {/* Catch-all route */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </HashRouter>
        </TooltipProvider>
      </FavoritesProvider>
    </CartProvider>
  </QueryClientProvider>
);

export default App;