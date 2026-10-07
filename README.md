# Primeiras Issues

Crie o mockup de um site chamado "Primeira Issue", um buscador de "good first issue" do GitHub para quem está começando em open source. Interface em português do Brasil. Estilo pop art / cartoon divertido, com modo claro e modo escuro (botão de alternar tema no header).

PALETA (roxos + branco)
Modo escuro:
- Fundo: #08060a, superfícies/cards: #10081d
- Contornos grossos e sombras duras: #000000 e #4c3a5f
- Roxo de destaque: #a06fe0, roxo saturado para botões e selos: #8940e9
- Textos: títulos #e4dde8, corpo #cdb8dd, secundário #ac96c0
Modo claro:
- Fundo: #ffffff, superfícies: #f4ecfb
- Contornos e sombras duras: #10081d
- Roxo de destaque: #8940e9, roxo suave para fundos de tag: #cdb8dd
- Textos: títulos #10081d, corpo #29193d, secundário #4c3a5f
Use branco como cor de respiro e para balões/etiquetas. Evite outras cores de destaque.

ESTILO VISUAL
- Contornos pretos grossos (3px) em cards, botões e campos
- Sombras duras deslocadas (ex.: 6px 6px 0 sem blur), sem sombras suaves
- Textura de pontos de meio-tom (halftone) em roxo, em faixas do fundo e atrás do hero
- Balões de quadrinhos, explosões "POW!" e etiquetas levemente inclinadas (-2° a 3°) como elementos decorativos
- Cantos arredondados generosos (16–24px) e ícones grossos e simpáticos (lucide, strokeWidth 2.5)
- Tipografia: Chakra Petch bold nos títulos, Spline Sans leve no corpo
- Hover: cards sobem 4px e a sombra dura aumenta; transições de 200–300ms

LAYOUT (página única, com rolagem)
1. Header fixo: logo "primeira.issue" à esquerda, menu (buscar, como funciona, favoritos), botão de tema e botão "Entrar com GitHub". Transparente no topo e com fundo de vidro ao rolar.
2. Hero: título grande "Sua primeira contribuição começa aqui" com palavra destacada em balão, subtítulo curto, barra de busca grande com contorno grosso e botão "Buscar issues", mascote cartoon simples (um gatinho com óculos de dev) ao lado.
3. Filtros: chips clicáveis para linguagem (JavaScript, TypeScript, Python, PHP...), tema (acessibilidade, frontend, proteção animal, impacto social), idioma, e toggle "sem responsável".
4. Resultados: grade de cards de issue com título, repositório, linguagem, tempo desde a última atualização, labels como tags, e um selo "saúde do projeto" (ex.: "Ativo", "Responde rápido") em formato de adesivo. Cada card tem botão de favoritar (estrela) e botão "Ver no GitHub".
5. Seção "Como funciona": 3 passos em cards numerados com ícones (buscar, escolher, abrir PR).
6. Chamada final em faixa roxa com halftone: "Pronto para abrir seu primeiro PR?".
7. Rodapé centralizado: "Feito por Evy © ano".

Mostre o mockup em desktop e mobile, nos dois temas. Responsivo e com bom contraste em ambos os modos.

This project was built with [Lovable](https://lovable.dev).

**Live app**: https://good-first-look.lovable.app

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/4d3b3801-1d56-43a5-b801-fb8ba57bb014).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
