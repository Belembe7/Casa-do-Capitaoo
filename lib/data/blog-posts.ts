export interface BlogPost {
  slug: string;
  title: string;
  category: string;
  excerpt: string;
  coverImage: string;
  content: string;
  publishedAt: string;
}

export const blogPosts: BlogPost[] = [
  {
    slug: 'historia-maritima-inhambane',
    title: 'A História Marítima de Inhambane: Onde o Tempo Encontra o Mar',
    category: 'História',
    excerpt:
      'Descubra como Inhambane se tornou um dos portos mais importantes do Índico e a ligação profunda com os navegadores portugueses.',
    coverImage: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800&q=80',
    content: `
## Um Porto de Histórias

Inhambane, cuja etimologia significa "lugar de abundância de água doce", foi durante séculos um dos portos mais estratégicos do Oceano Índico. Os navegadores portugueses chegaram em 1534, atraídos pela baía protegida e pelas rotas comerciais que ligavam África, Ásia e Europa.

## A Casa do Capitão

O nosso hotel nasceu desta herança. O edifício que hoje abriga a Casa do Capitão foi outrora a residência de um capitão de mar que comandava as embarcações que cruzavam o Índico. Cada detalhe da nossa decoração honra essa memória — dos azulejos originais às vigas de madeira recuperadas dos dhows tradicionais.

## Viver a História

Hoje, convidamo-lo a fazer parte desta narrativa. Caminhe pelas ruas de Inhambane, visite a mesquita mais antiga do sul de África, e regresse à Casa do Capitão para contemplar o mesmo horizonte que fascinou navegadores há cinco séculos.
    `,
    publishedAt: '2026-01-15',
  },
  {
    slug: 'guia-praia-tofo',
    title: 'Guia Completo da Praia de Tofo: Mergulho, Surf e Sol',
    category: 'Excursão',
    excerpt:
      'A apenas 30 minutos de Inhambane, Tofo é um paraíso para mergulhadores e amantes da natureza. Saiba tudo o que precisa saber.',
    coverImage: 'https://images.unsplash.com/photo-1502680390469-be75c86b636f?w=800&q=80',
    content: `
## Como Chegar

Tofo fica a cerca de 30 minutos de carro de Inhambane. Organizamos transfers diários para os nossos hóspedes.

## O Que Fazer

- **Mergulho com tubarões-baleia** (outubro a março)
- **Snorkeling** nas águas cristalinas
- **Surf** para todos os níveis
- **Passeios de barco** ao pôr do sol

## Dicas do Capitão

Visite de manhã cedo para evitar multidões e aproveite o pequeno-almoço na praia antes de regressar ao hotel para o almoço no nosso restaurante.
    `,
    publishedAt: '2026-02-01',
  },
  {
    slug: 'gastronomia-mocambicana',
    title: 'Sabores de Moçambique: A Cozinha do Restaurante Capitão',
    category: 'Gastronomia',
    excerpt:
      'Do matapa às grelhadas de marisco fresco — explore os sabores autênticos da cozinha moçambicana no nosso restaurante.',
    coverImage: 'https://images.unsplash.com/photo-1559339352-11d035aa65de?w=800&q=80',
    content: `
## Tradição e Inovação

O Restaurante Capitão celebra a riqueza gastronómica de Moçambique, combinando receitas tradicionais com técnicas contemporâneas.

## Pratos Imperdíveis

- **Matapa de caranguejo** — prato emblemático da região
- **Gambas grelhadas** com molho piri-piri da casa
- **Camarão à Zambeziana** — receita de família
- **Pudim de coco** — sobremesa perfeita para fechar a refeição
    `,
    publishedAt: '2026-02-10',
  },
  {
    slug: 'inhambane-cidade-patrimonio',
    title: 'Inhambane: Cidade Património e Alma Moçambicana',
    category: 'Destino',
    excerpt:
      'Passeie pelas ruas coloniais, visite a mesquita histórica e descubra porque Inhambane é considerada uma das cidades mais bonitas de Moçambique.',
    coverImage: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800&q=80',
    content: `
## Arquitectura Colonial

As fachadas coloridas e os edifícios em madeira de Inhambane contam a história de séculos de comércio e cultura.

## Pontos de Interesse

- Mesquita da Baía (1854)
- Mercado Central
- Catedral de Inhambane
- Museu de História Natural
    `,
    publishedAt: '2026-02-20',
  },
  {
    slug: 'eventos-casa-capitao',
    title: 'Celebre Momentos Especiais na Casa do Capitão',
    category: 'Eventos',
    excerpt:
      'Casamentos, aniversários e eventos corporativos com vista para o Índico. Conheça os nossos espaços e pacotes.',
    coverImage: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=800&q=80',
    content: `
## Espaços para Eventos

- Terraço Rooftop (até 80 pessoas)
- Sala de Reuniões Capitão (até 30 pessoas)
- Jardim Tropical (até 120 pessoas)

## Pacotes Personalizados

Criamos experiências à medida para tornar o seu evento inesquecível.
    `,
    publishedAt: '2026-03-01',
  },
];

export function getBlogPostBySlug(slug: string): BlogPost | undefined {
  return blogPosts.find((p) => p.slug === slug);
}

export function getBlogPostsByCategory(category?: string): BlogPost[] {
  if (!category || category === 'todos') return blogPosts;
  return blogPosts.filter(
    (p) => p.category.toLowerCase() === category.toLowerCase()
  );
}
