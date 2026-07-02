export interface BlogPost {
  slug: string;
  title: string;
  category: string;
  excerpt: string;
  coverImage: string;
  coverWidth?: number;
  coverHeight?: number;
  content: string;
  publishedAt: string;
}

export const blogPosts: BlogPost[] = [
  {
    slug: 'historia-maritima-inhambane',
    title: 'A História do Hotel Casa do Capitão',
    category: 'História',
    excerpt:
      'Há mais de um século, este era o lugar de onde o Capitão do Porto observava a Baía de Inhambane e orientava as embarcações que chegavam à cidade. Hoje, esse mesmo cenário recebe viajantes de todo o mundo, preservando a sua herança marítima enquanto oferece uma experiência de hospitalidade contemporânea.',
    coverImage: '/images/blog-hotel-facade.png',
    coverWidth: 1024,
    coverHeight: 699,
    content: `
Há mais de um século, este era o lugar de onde o Capitão do Porto observava a Baía de Inhambane e orientava as embarcações que chegavam à cidade. Hoje, esse mesmo cenário recebe viajantes de todo o mundo, preservando a sua herança marítima enquanto oferece uma experiência de hospitalidade contemporânea.

## Residência do Capitão do Porto (Antes de 1885)

A residência oficial do Capitão do Porto, voltada para a Baía de Inhambane.

## Clube Comodoro (1918)

O edifício torna-se um espaço de convívio para oficiais da marinha, reforçando a sua ligação ao mar.

## Reabilitação (2007)

Inicia-se a recuperação do património para dar origem a um novo capítulo da sua história.

## Nasce o Hotel Casa do Capitão (2010)

O hotel abre portas, preservando o legado histórico e oferecendo uma experiência contemporânea.

## Hoje

Um dos hotéis de referência em Inhambane, onde história, hospitalidade e a beleza da baía se encontram.
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
    coverImage: '/images/blog-gastronomia.png',
    coverWidth: 1024,
    coverHeight: 683,
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
    coverImage: '/images/blog-inhambane.png',
    coverWidth: 768,
    coverHeight: 1024,
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
