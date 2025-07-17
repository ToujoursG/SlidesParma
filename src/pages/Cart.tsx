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

    // Fundo escuro (preto bem escuro)
    doc.setFillColor(20, 20, 20);
    doc.rect(0, 0, pageWidth, pageHeight, 'F');

    const margin = 40;
    let y = margin;

    const orderId = `PED-${Date.now()}`;
    const date = new Date().toLocaleString('pt-BR');

    const orderData = {
      id: orderId,
      date,
      items: state.items,
      total: finalTotal
    };

    const orderHash = CryptoJS.SHA256(JSON.stringify(orderData)).toString();

    // Marca d’água quase invisível, cinza claro transparente
    doc.setFontSize(80);
    doc.setTextColor(255, 255, 255, 0.05); // branco com alfa 5%
    const wmText = 'PARMA OFICIAL';
    for (let i = -100; i < pageHeight + 100; i += 120) {
      doc.text(wmText, pageWidth / 2, i, { angle: 45, align: 'center' });
    }

    // Cor Parma para títulos: rgb(43%,72%,53%) → #6ED284 (hex) → rgb(110, 210, 132)
    const parmaRGB = [220, 167, 52];

    // Cabeçalho
    doc.setFontSize(22);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(...parmaRGB);
    doc.text('Loja Parma - Pedido Oficial', pageWidth / 2, y, { align: 'center' });
    y += 30;

    // Linha de separação suave (verde claro transparente)
    doc.setDrawColor(110, 210, 132, 60);
    doc.setLineWidth(1);
    doc.line(margin, y, pageWidth - margin, y);
    y += 20;

    // Informações principais
    doc.setFontSize(12);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(230); // branco quase total
    doc.text(`ID do Pedido: ${orderId}`, margin, y);
    y += 18;
    doc.text(`Data/Hora: ${date}`, margin, y);
    y += 25;

    // Hash de segurança
    doc.setFontSize(9);
    doc.setTextColor(150); // cinza claro
    doc.text(`Hash de Verificação:`, margin, y);
    y += 14;
    doc.setFontSize(8);
    doc.setTextColor(130);
    doc.text(orderHash.substring(0, 64), margin, y);
    y += 12;
    doc.text(orderHash.substring(64), margin, y);
    y += 25;

    // Itens do pedido - título
    doc.setFontSize(14);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(...parmaRGB);
    doc.text('Itens do Pedido:', margin, y);
    y += 20;

    doc.setFontSize(11);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(230);

    // Listagem dos itens com nome à esquerda e preço alinhado à direita
    state.items.forEach((item) => {
      if (y > pageHeight - margin - 50) {
        doc.addPage();
        y = margin;
      }
      doc.text(`• ${item.name}`, margin, y);
      doc.text(formatPrice(item.price), pageWidth - margin, y, { align: 'right' });
      y += 18;
    });

    y += 15;

    // Desconto
    if (state.discount > 0) {
      doc.setTextColor(230, 100, 100);
      doc.setFont('helvetica', 'bold');
      doc.text(`Desconto aplicado: ${state.discount}%`, margin, y);
      y += 25;
    }

    // Total
    doc.setFontSize(16);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(...parmaRGB);
    doc.text(`Total com desconto: ${formatPrice(finalTotal)}`, margin, y);
    y += 40;

    // Linha final de separação
    doc.setDrawColor(80);
    doc.setLineWidth(0.7);
    doc.line(margin, y, pageWidth - margin, y);
    y += 30;

    // Rodapé com mensagem clara
    doc.setFontSize(10);
    doc.setFont('helvetica', 'italic');
    doc.setTextColor(180);
    doc.text('Este PDF contém marcas d’água.', margin, y);
    y += 14;
    doc.text('Alterações manuais invalidam sua autenticidade.', margin, y);
    y += 14;

    // Exporta o PDF
    const fileName = `${orderId}.pdf`;
    const pdfBlob = doc.output('blob');
    const blobUrl = URL.createObjectURL(pdfBlob);

    // Tenta abrir em nova aba (funciona melhor em celular)
    const downloadWindow = window.open(blobUrl, '_blank');

    if (!downloadWindow) {
      // Fallback: força download
      const a = document.createElement('a');
      a.href = blobUrl;
      a.download = fileName;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(blobUrl);
    }

    // Mensagem WhatsApp
    const message =
      `*🛍️ Novo Pedido - Loja SlidesParma*\n\n` +
      `*📄 ID:* ${orderId}\n` +
      `*📆 Data:* ${date}\n\n` +
      `*Produtos comprados:*\n${itemsText}\n` +
      (state.discount > 0
        ? `*🔖 Desconto aplicado:* ${state.discount}%\n`
        : '') +
      `*💰 Total com desconto:* ${formatPrice(finalTotal)}\n\n` +
      `──────────────\n` +
      `📎 *Anexe o PDF baixado e envie esta mensagem para confirmar seu pedido.*\n` +
      `Obrigado por comprar com o *Grupo Parma*! `;


    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/5518991555926?text=${encodedMessage}`;
    setTimeout(() => {
      window.open(whatsappUrl, '_blank');
    }, 5000);

    toast({
      title: "Pedido gerado com proteção!",
      description: "PDF baixado e WhatsApp aberto. Envie com o arquivo.",
    });

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
                      Envie o PDF gbaixado para nos no WhatsApp para ajudar a previnir furtos.
                      Teste: DESCONTO10, PROMO15, SAVE20
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