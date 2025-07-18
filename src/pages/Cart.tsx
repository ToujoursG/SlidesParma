import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Trash2, Tag } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { useCart } from '@/context/CartContext';
import { useToast } from '@/hooks/use-toast';
import jsPDF from 'jspdf';
import CryptoJS from 'crypto-js';

export const Cart = () => {
  const { state, removeItem, clearCart, applyCoupon, removeCoupon } = useCart();
  const { toast } = useToast();
  const [couponInput, setCouponInput] = useState('');

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(price);
  };

  const finalTotal = state.total - (state.total * state.discount) / 100;

  const handleApplyCoupon = () => {
    if (couponInput.trim()) {
      const success = applyCoupon(couponInput.trim());
      if (success) {
        toast({
          title: 'Cupom aplicado!',
          description: `Desconto de ${state.discount}% aplicado com sucesso.`,
        });
        setCouponInput('');
      } else {
        toast({
          title: 'Cupom inválido',
          description: 'O cupom inserido não é válido.',
          variant: 'destructive',
        });
      }
    }
  };

  const handleRemoveCoupon = () => {
    removeCoupon();
    toast({
      title: 'Cupom removido',
      description: 'O desconto foi removido do seu pedido.',
    });
  };

const handleCheckout = () => {
    const doc = new jsPDF({
      unit: 'pt',
      format: 'a4',
      putOnlyUsedFonts: true,
    });

    const pageWidth = doc.internal.pageSize.getWidth();
    const pageHeight = doc.internal.pageSize.getHeight();

    // Fundo branco (padrão)
    doc.setFillColor(255, 255, 255);
    doc.rect(0, 0, pageWidth, pageHeight, 'F');

    // Função para adicionar marca d\'água sutil
    const addWatermark = () => {
      doc.setFontSize(50);
      doc.setTextColor(250, 250, 250); // Muito sutil, quase invisível
      const wmText = 'SLIDES PARMA';
      for (let i = -50; i < pageHeight + 100; i += 120) {
        for (let j = -100; j < pageWidth + 100; j += 250) {
          doc.text(wmText, j, i, { angle: 45, align: 'center' });
        }
      }
    };

    // Adicionar marca d\'água na primeira página
    addWatermark();

    const margin = 40;
    let y = 60;

    const orderId = `PED-${Date.now()}`;
    const fileName = `SlidesParma-${orderId}.pdf`;
    const date = new Date().toLocaleDateString('pt-BR');

    const orderData = {
      id: orderId,
      date,
      items: state.items,
      total: finalTotal,
    };

    const orderHash = CryptoJS.SHA256(JSON.stringify(orderData)).toString();

    // Cores extraídas da análise visual
    const azulAcinzentado = [108, 156, 171]; // Retângulo principal
    const dourado = [184, 134, 11]; // Retângulo do ícone e textos dourados
    const roxo = [147, 112, 219]; // Linha separadora
    const rosaMagenta = [233, 30, 99]; // Seção "Importante"
    const cinzaClaro = [200, 200, 200]; // Linhas separadoras
    const cinzaTexto = [120, 120, 120]; // Textos secundários

    // ========== SEÇÃO 1: CABEÇALHO PRINCIPAL ==========

    // Retângulo principal azul-acinzentado com bordas arredondadas
    doc.setFillColor(...azulAcinzentado);
    doc.roundedRect(margin, y, pageWidth - (2 * margin), 120, 50, 50, 'F'); // Largura ajustada para preencher o espaço

    // Texto "SLIDES PARMA" no retângulo azul (centralizado na nova largura)
    doc.setFontSize(32);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(255, 255, 255); // Branco
    doc.text('SLIDES PARMA', pageWidth / 2, y + 50, { align: 'center' });

    // Texto "COMPRA DE SLIDES" no retângulo azul (centralizado na nova largura)
    doc.setFontSize(14);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(255, 255, 255); // Branco
    doc.text('COMPRA DE SLIDES', pageWidth / 2, y + 80, { align: 'center' });

    y += 150;

    // Texto "Agradecemos por comprar conosco" em dourado
    doc.setFontSize(18);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(...dourado);
    doc.text('Agradecemos por comprar conosco', margin, y);
    y += 30;

    // Linha roxa separadora
    doc.setDrawColor(...roxo);
    doc.setLineWidth(2);
    doc.line(margin, y, pageWidth - margin, y);
    y += 30;

    // ID da compra e data
    doc.setFontSize(12);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(0, 0, 0); // Preto
    doc.text(`${orderId}`, margin, y);
    doc.text(`${date}`, pageWidth - margin - 80, y);
    y += 50;

    // "Slides comprados:" em preto grande
    doc.setFontSize(24);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(0, 0, 0);
    doc.text('Slides Comprados:', margin, y);
    y += 30;

    // Lista de itens
    doc.setFontSize(12);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(0, 0, 0);

    let itemsText = '';
    state.items.forEach((item) => {
      // Verificar se precisa de nova página
      if (y > pageHeight - margin - 200) {
        doc.addPage();
        addWatermark();
        y = margin + 40;
        
        // Cabeçalho da nova página
        doc.setFontSize(16);
        doc.setFont('helvetica', 'bold');
        doc.setTextColor(0, 0, 0);
        doc.text('Slides comprados (continuação):', margin, y);
        y += 30;
        
        doc.setFontSize(12);
        doc.setFont('helvetica', 'normal');
        doc.setTextColor(0, 0, 0);
      }

      const itemText = `• ${item.name} - ${formatPrice(item.price)}`;
      doc.text(itemText, margin, y);
      itemsText += `- ${item.name} - ${formatPrice(item.price)}\n`;
      y += 20;
    });

    y += 30;

    // ========== SEÇÃO 2: VALOR TOTAL ==========

    // Verificar se precisa de nova página
    if (y > pageHeight - margin - 150) {
      doc.addPage();
      addWatermark();
      y = margin + 40;
    }

    // "Valor Total:" em dourado + valor em preto
    doc.setFontSize(18);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(...dourado);
    const valorTotalText = 'Valor Total: ';
    doc.text(valorTotalText, margin, y);
    
    // Calcular posição do valor
    const valorTotalWidth = doc.getTextWidth(valorTotalText);
    doc.setTextColor(0, 0, 0); // Preto
    doc.text(`${formatPrice(finalTotal)}`, margin + valorTotalWidth, y);
    y += 30;

    // Linha separadora cinza
    doc.setDrawColor(...cinzaClaro);
    doc.setLineWidth(1);
    doc.line(margin, y, pageWidth - margin, y);
    y += 25;

    // Detalhes de preço
    doc.setFontSize(12);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(0, 0, 0);
    
    const precoSemDesconto = finalTotal / (1 - (state.discount || 0) / 100);
    doc.text(`Preço bruto: ${formatPrice(precoSemDesconto)}`, margin, y);
    y += 18;
    
    if (state.discount > 0) {
      doc.text(`Desconto: ${state.discount}%`, margin, y);
      y += 18;
    }
    
    doc.text(`Valor descontado: ${formatPrice(finalTotal)}`, margin, y);
    y += 40;

    // ========== SEÇÃO 3: IMPORTANTE E SEGURANÇA ==========

    // Verificar se precisa de nova página
    if (y > pageHeight - margin - 250) {
      doc.addPage();
      addWatermark();
      y = margin + 40;
    }

    // "Importante" em rosa/magenta
    doc.setFontSize(20);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(...rosaMagenta);
    doc.text('Importante', margin, y);
    y += 30;

    // Linha separadora rosa/magenta
    doc.setDrawColor(...rosaMagenta);
    doc.setLineWidth(2);
    doc.line(margin, y, pageWidth - margin, y);
    y += 30;

    // "Para a compra"
    doc.setFontSize(14);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(0, 0, 0);
    doc.text('Para a compra', margin, y);
    y += 25;

    // Lista numerada
    doc.setFontSize(12);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(0, 0, 0);
    doc.text('1. Anexe este arquivo em nosso WhatsApp', margin, y);
    y += 20;
    doc.text('2. Envie a mensagem já gerada diretamente para nós, junto com o', margin, y);
    y += 15;
    doc.text('   arquivo.', margin, y);
    y += 35;

    // "Segurança"
    doc.setFontSize(14);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(0, 0, 0);
    doc.text('Segurança', margin, y);
    y += 25;

    // Hash de verificação
    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(0, 0, 0);
    doc.text('Hax de verificação:', margin, y);
    y += 15;
    
    doc.setFontSize(8);
    doc.setFont('courier', 'normal');
    doc.setTextColor(...cinzaTexto);
    doc.text(orderHash.substring(0, 64), margin, y);
    y += 12;
    doc.text(orderHash.substring(64), margin, y);
    y += 20;

    // Informações de autenticidade
    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(0, 0, 0);
    doc.text('Este PDF contém marcas d\'água', margin, y);
    y += 15;
    doc.text('Alterações manuais invalidam a autenticidade', margin, y);
    y += 30;

    // Website (canto inferior direito)
    const websiteY = pageHeight - margin - 40;
    doc.setFontSize(12);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(0, 0, 0);
    doc.text('Website', pageWidth - margin - 80, websiteY);
    
    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');
    doc.text('https://toujours.github.io/SlidesParma', pageWidth - margin - 200, websiteY + 15);

    // Exportação
    const pdfBlob = doc.output('blob');
    const blobUrl = URL.createObjectURL(pdfBlob);

    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

    // Criar link de download
    const a = document.createElement('a');
    a.href = blobUrl;
    a.download = fileName;

    a.onclick = () => {
      toast({
        title: 'PDF gerado!',
        description: 'O arquivo foi salvo. Envie para um atendente da Loja Parma via WhatsApp.',
      });
    };

    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(blobUrl);

    // Mensagem WhatsApp
    const message =
      '________________________ \n \n' +
      `🛒 *Novo Pedido - SlidesParma*\n` +
      '________________________ \n \n' +
      `📦 *ID do Pedido:* ${orderId}\n` +
      `📅 *Data:* ${date}\n` +
      ' \n________________________ \n \n' +
      `💰 *Itens adquiridos:*\n ${itemsText}\n` +
      `🧾*Total:* ${formatPrice(finalTotal)}\n` +
      '________________________ \n \n' +
      '✅Para continuar com seu pedido, por favor: \n \n' +
      `1. Anexe o arquivo *(${fileName})*\n \n` +
      `2. envie esta mensagem diretamente para nós. \n \n` +
      '🐙Agradecemos sua confiança e preferência!\n' +
      '*Grupo Parma*';

    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://api.whatsapp.com/send?phone=5518991555926&text=${encodedMessage}`;

    // Abrir WhatsApp
    setTimeout(() => {
      window.open(whatsappUrl, '_blank');
    }, isMobile ? 1000 : 1500);

    clearCart();
  };

  if (state.items.length === 0) {
    return (
      <div className="min-h-screen bg-background">
        <div className="container mx-auto px-4 py-8">
          <div className="flex items-center gap-4 mb-8">
            <Link to="/">
              <Button variant="ghost" size="icon">
                <ArrowLeft className="w-5 h-5" />
              </Button>
            </Link>
            <h1 className="text-3xl font-bold text-foreground">Carrinho</h1>
          </div>
          <div className="text-center py-16">
            <div className="w-24 h-24 mx-auto bg-secondary rounded-full flex items-center justify-center mb-6">
              <div className="w-12 h-12 border-2 border-muted-foreground rounded-full" />
            </div>
            <h2 className="text-xl font-semibold text-foreground mb-2">
              Seu carrinho está vazio
            </h2>
            <p className="text-muted-foreground mb-6">
              Adicione alguns produtos para começar suas compras
            </p>
            <Link to="/">
              <Button className="bg-primary hover:bg-primary/90">Continuar Comprando</Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center gap-4 mb-8">
          <Link to="/">
            <Button variant="ghost" size="icon">
              <ArrowLeft className="w-5 h-5" />
            </Button>
          </Link>
          <h1 className="text-3xl font-bold text-foreground">Carrinho</h1>
          <span className="text-muted-foreground">
            ({state.itemCount} {state.itemCount === 1 ? 'item' : 'itens'})
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-4">
            {state.items.map((item) => (
              <Card key={item.id} className="bg-card border-border">
                <CardContent className="p-4">
                  <div className="flex gap-4">
                    <div className="w-20 h-20 bg-secondary rounded-lg overflow-hidden flex-shrink-0">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-medium text-foreground truncate">{item.name}</h3>
                      <p className="text-sm text-muted-foreground capitalize">{item.category}</p>
                      <p className="text-lg font-bold text-primary mt-1">
                        {formatPrice(item.price)}
                      </p>
                    </div>
                    <div className="flex justify-end">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => removeItem(item.id)}
                        className="text-destructive hover:text-destructive hover:bg-destructive/10"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="lg:col-span-1">
            <Card className="bg-card border-border sticky top-8">
              <CardContent className="p-6">
                <h2 className="text-xl font-semibold text-foreground mb-4">
                  Resumo do Pedido
                </h2>

                <div className="space-y-4 mb-6">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span className="text-foreground">{formatPrice(state.total)}</span>
                  </div>

                  {state.discount > 0 && (
                    <div className="flex justify-between text-sm">
                      <div className="flex items-center gap-2">
                        <span className="text-muted-foreground">Desconto ({state.discount}%)</span>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={handleRemoveCoupon}
                          className="h-6 px-2 text-xs text-destructive hover:text-destructive"
                        >
                          Remover
                        </Button>
                      </div>
                      <span className="text-primary">
                        -{formatPrice(state.total * state.discount / 100)}
                      </span>
                    </div>
                  )}

                  <div className="border-t border-border pt-3">
                    <div className="flex justify-between font-semibold">
                      <span className="text-foreground">Total</span>
                      <span className="text-primary text-lg">{formatPrice(finalTotal)}</span>
                    </div>
                  </div>
                </div>

                {!state.couponCode && (
                  <div className="mb-6">
                    <div className="flex items-center gap-2 mb-2">
                      <Tag className="w-4 h-4 text-primary" />
                      <span className="text-sm font-medium text-foreground">Cupom de Desconto</span>
                    </div>
                    <div className="flex gap-2">
                      <Input
                        placeholder="Digite seu cupom"
                        value={couponInput}
                        onChange={(e) => setCouponInput(e.target.value)}
                        className="flex-1"
                        onKeyPress={(e) => e.key === 'Enter' && handleApplyCoupon()}
                      />
                      <Button
                        onClick={handleApplyCoupon}
                        variant="outline"
                        className="px-4"
                      >
                        Aplicar
                      </Button>
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">
                      Envie o PDF baixado para nós no WhatsApp para ajudar a prevenir fraudes.
                    </p>
                  </div>
                )}

                <Button
                  onClick={handleCheckout}
                  className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
                >
                  Finalizar Compra
                </Button>

                <Link to="/">
                  <Button variant="outline" className="w-full mt-3">
                    Continuar Comprando
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};