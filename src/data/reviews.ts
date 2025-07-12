import { Review } from './mockData';

export const mockReviews: Record<string, Review[]> = {
  '1': [
    {
      id: '1',
      userName: 'Ana Silva',
      rating: 5,
      comment: 'Produto excelente! Muito confortável e a qualidade do tecido é ótima.',
      date: '2024-01-15'
    },
    {
      id: '2',
      userName: 'João Santos',
      rating: 4,
      comment: 'Gostei muito do produto, chegou rapidinho e exatamente como descrito.',
      date: '2024-01-10'
    },
    {
      id: '3',
      userName: 'Maria Costa',
      rating: 5,
      comment: 'Super recomendo! Fit perfeito e material de primeira qualidade.',
      date: '2024-01-08'
    }
  ],
  '2': [
    {
      id: '4',
      userName: 'Pedro Lima',
      rating: 5,
      comment: 'Jaqueta incrível! Design moderno e muito estilosa.',
      date: '2024-01-12'
    },
    {
      id: '5',
      userName: 'Carolina Fernandes',
      rating: 4,
      comment: 'Bonita e de boa qualidade. Recomendo!',
      date: '2024-01-05'
    }
  ],
  '8': [
    {
      id: '6',
      userName: 'Lucas Oliveira',
      rating: 5,
      comment: 'Som incrível! Cancelamento de ruído funciona perfeitamente.',
      date: '2024-01-14'
    },
    {
      id: '7',
      userName: 'Fernanda Alves',
      rating: 4,
      comment: 'Muito bom, bateria dura bastante tempo.',
      date: '2024-01-11'
    },
    {
      id: '8',
      userName: 'Roberto Souza',
      rating: 5,
      comment: 'Excelente qualidade de áudio. Vale cada centavo!',
      date: '2024-01-09'
    }
  ]
};