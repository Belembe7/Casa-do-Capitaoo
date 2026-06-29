# Casa do Capitão — Hotel Boutique em Inhambane

Website do Hotel Casa do Capitão, inspirado na estrutura do Lasala Plaza Hotel.

## Stack

- Next.js 14 (App Router)
- Tailwind CSS
- Framer Motion
- Embla Carousel
- React Hook Form

## Desenvolvimento

```bash
npm install
npm run dev
```

Abrir [http://localhost:3000](http://localhost:3000)

## Admin

- URL: `/admin`
- Email: `admin@casadocapitao.co.mz`
- Password: `admin123`

## Estrutura

- `app/` — Páginas e rotas API
- `components/` — Componentes React
- `lib/data/` — Dados estáticos (quartos, ofertas, blog)
- `data/` — Dados dinâmicos (reservas, contactos) — gerado em runtime

## Substituir conteúdo

1. Imagens: colocar em `public/images/`
2. Vídeo hero: colocar em `public/videos/` ou alterar URL Vimeo em `HeroVideo.tsx`
3. Dados: editar ficheiros em `lib/data/`
4. Cores: editar variáveis CSS em `styles/globals.css`

## Variáveis de ambiente

Copie `.env.example` para `.env.local` e preencha os valores:

```bash
cp .env.example .env.local
```

| Variável | Obrigatória | Descrição |
|----------|-------------|-----------|
| `NEXT_PUBLIC_SUPABASE_URL` | Sim (produção) | URL do projeto Supabase |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Sim (produção) | Chave pública do Supabase |
| `SUPABASE_SERVICE_ROLE_KEY` | Sim (produção) | Chave de serviço (apenas servidor) |
| `ADMIN_EMAIL` | Não | Login admin (fallback sem Supabase) |
| `ADMIN_PASSWORD` | Não | Password admin (fallback sem Supabase) |
| `NEXT_PUBLIC_GOOGLE_MAPS_KEY` | Não | Google Maps |
| `SMTP_*` | Não | Envio de e-mails |

Sem Supabase configurado, o site funciona com dados locais e login admin simples.

## Deploy no GitHub

```bash
git init
git add .
git commit -m "Initial commit: Casa do Capitão website"
git branch -M main
git remote add origin https://github.com/Belembe7/Casa-do-Capitaoo.git
git push -u origin main
```

## Deploy na Vercel

1. Aceda a [vercel.com](https://vercel.com) e importe o repositório [Belembe7/Casa-do-Capitaoo](https://github.com/Belembe7/Casa-do-Capitaoo)
2. A Vercel deteta automaticamente **Next.js** — não é necessário `vercel.json`
3. Em **Settings → Environment Variables**, adicione as variáveis do `.env.example`
4. Clique em **Deploy**

### Supabase (recomendado para produção)

1. Crie um projeto em [supabase.com](https://supabase.com)
2. Execute o SQL em `supabase/schema.sql` no SQL Editor
3. Em **Authentication → URL Configuration**, adicione:
   - Site URL: `https://seu-dominio.vercel.app`
   - Redirect URLs: `https://seu-dominio.vercel.app/**`
4. Crie buckets de storage: `gallery`, `rooms`, `blog` (públicos)

## Requisitos Funcionais

O sistema implementa os requisitos RF02-RF40 incluindo:
- Exibição e pesquisa de quartos
- Sistema de reservas online com confirmação
- Cancelamento de reservas
- Integração de pagamentos (Visa, M-Pesa, E-mola, etc.)
- Galeria com categorias e lightbox
- Formulário de contacto e newsletter
- WhatsApp e redes sociais
- i18n PT/EN
- Área administrativa com dashboard
- SEO (sitemap, robots, meta tags, JSON-LD)
