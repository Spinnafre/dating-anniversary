A ideia de um livro de memórias interativo (estilo *scrapbook*) com virada de página física é um presente criativo, memorável e que combina perfeitamente com interações táteis na web.

Um ponto fundamental de alinhamento antes de começar: bibliotecas como `react-pageflip` ou `page-flip` são baseadas em **DOM/HTML5 Canvas** e foram feitas para a Web. No **Expo / React Native**, a forma nativa, suave e à prova de falhas de reproduzir o efeito de livro (*3D book page flip*) é combinando **`react-native-gesture-handler`** + **`react-native-reanimated`** (com rotação 3D no eixo Y e perspectiva fixa) ou utilizando componentes como `react-native-page-flipper`.

Abaixo está o plano de implementação ponta a ponta, estruturado em fases lógicas.

---

### Setup do Ambiente e Dependências no Expo


1. **Instalação dos pacotes essenciais:**

```bash
npx expo install @shopify/react-native-skia react-native-reanimated react-native-gesture-handler expo-image expo-font @expo-google-fonts/caveat @expo-google-fonts/playfair-display

@shopify/react-native-skia: Essencial para a tela da foto raspável (Chapter 3 ./workflow/pages/04-chapter-3.md), permitindo criar máscaras de transparência (blend mode clear) de alta performance via GPU.

react-native-reanimated + gesture-handler: Controla o motor de virada do livro e o gesto de arrastar as fotos empilhadas (Chapter 4 ./workflow/pages/04-chapter-4.md).
```

### Estrutura de pastas do projeto
```txt
src/
├── assets/
│   ├── fonts/           # Caveat, PlayfairDisplay
│   ├── textures/        # leather_cover.jpg, paper_texture.jpg, scratch_foil.jpg
│   └── photos/          # Fotos locais do casal
├── components/
│   ├── book/
│   │   ├── BookFlipper.tsx       # Orquestrador de transição de páginas
│   │   └── PaperSheet.tsx        # Container com textura e sombras
│   ├── chapters/
│   │   ├── CoverScreen.tsx       # 1. Capa
│   │   ├── ThingsILove.tsx       # 2. Capítulo 1
│   │   ├── SomethingChanged.tsx  # 3. Capítulo 2
│   │   ├── ScratchPhoto.tsx      # 4. Capítulo 3 (Skia Canvas)
│   │   ├── PhotoDeck.tsx         # 5. Capítulo 4 (Swipeable Stack)
│   │   ├── CoupleQuiz.tsx        # 6. Interlúdio
│   │   ├── LoveLetter.tsx        # 7. Capítulo Final (Envelope + Typewriter)
│   │   └── BackCover.tsx         # 8. Contracapa (Timer + Mensagem)
│   └── ui/
│       └── Polaroid.tsx
├── constants/
│   ├── photos.ts                 # Dicionário estático de require()
│   └── storyContent.ts           # Textos, perguntas do quiz e itens das listas
└── App.tsx
```

---

### Organização de Assets e Estratégia de Mídia (Offline Bundle)

Como o app será 100% offline e embutido:

1. **Diretório de Mídias:**

* `assets/photos/`: Fotos comprimidas em formato `.jpg` ou `.webp` (otimize o peso antes para não inflar o app desnecessariamente).
* `assets/textures/paper_texture.jpg`: Textura de papel craft/pólen.

1. **Dicionário Estático de Fotos (`src/constants/photos.ts`):**

* Centraliza todas as fotos importadas com `require` estático:

```typescript
export const PHOTOS = {
  capa: require('../../assets/photos/capa.jpg'),
  primeiroEncontro: require('../../assets/photos/01_primeiro_encontro.jpg'),
  viagem: require('../../assets/photos/02_viagem.jpg'),
  quizRecompensa: require('../../assets/photos/quiz_recompensa.jpg'),
  // ...
} as const;

```

---

### Modelagem de Dados da Narrativa (`src/constants/storyData.ts`)

Crie uma estrutura declarativa para que a adição ou reordenação de páginas seja simples e desacoplada do layout:

```typescript
export type PageType = 'cover' | 'scrapbook' | 'quiz' | 'letter';

export interface BasePage {
  id: number;
  type: PageType;
}

export interface ScrapbookPageData extends BasePage {
  type: 'scrapbook';
  title: string;
  date: string;
  description: string;
  photos: {
    source: any;
    caption?: string;
    rotation: number; // Ex: -3deg, 4deg
  }[];
}

export interface QuizPageData extends BasePage {
  type: 'quiz';
  question: string;
  options: string[];
  correctIndex: number;
  unlockedPhoto: any;
  feedbackSuccess: string;
}

export interface LetterPageData extends BasePage {
  type: 'letter';
  title: string;
  content: string[];
}

export type BookPage = ScrapbookPageData | QuizPageData | LetterPageData | BasePage;

```


### Mecanismo de Virada de Folha (Page-Flip 3D)

Para simular o livro físico em React Native sem depender de bibliotecas legadas da web:

1. **Animação com Reanimated:**

* Cada folha possui uma transição baseada em pan gesture horizontal (`PanGestureHandler` / Gesture API).
* A folha pivota na borda esquerda:

```typescript
transform: [
  { perspective: 1200 },
  { translateX: -PAGE_WIDTH / 2 },
  { rotateY: `${rotationAngle}deg` },
  { translateX: PAGE_WIDTH / 2 },
]

```

1. **Sombra Dinâmica do Papel:**

* Uma camada semi-transparente preta cuja opacidade aumenta conforme o ângulo atinge 90° e diminui ao se aproximar de 180°, simulando a curvatura física da folha virando.

1. **Navegação Bidirecional:**

* Suporte tanto a arrastar o dedo na lateral da tela quanto a botões de seta discretos no rodapé da página.

---

### Testes, Ajustes Visuais e Build Final

1. **Ajuste de Tipografia:** Carregamento das fontes do Google via `useFonts()` no `App.tsx` com splash screen segurando até o bundle de assets estar pronto.
2. **Preload de Imagens:** Garantir que o `expo-image` pré-carregue as polaroids para evitar qualquer tela branca ou flicker durante a virada rápida de folhas.
3. **Build para Dispositivo:**

* Gerar a build local ou via EAS Build (`npx eas build -p android --profile preview` ou iOS) para testar a sensibilidade dos gestos no aparelho real em modo avião (verificando 100% do funcionamento offline).

# Ordem Recomendada de Execução
1 - Sprint 1 (Fundação e Assets): Instalação do Expo, inclusão de todas as fotos na pasta local e configuração do photos.ts e do storyContent.ts.

2 - Sprint 2 (Navegador do Livro): Montagem do contêiner BookFlipper que gerencia o índice da página atual e as transições de folha.

3 - Sprint 3 (Telas de Conteúdo Direto): Implementação da Capa, Capítulos 1, 2 e Contracapa (incluindo o hook do contador em tempo real).
    - Capa: seguir o arquivo ./workflow/pages/01-book-cover.md
    - Capítulo 1: seguir o arquivo ./workflow/pages/02-chapter-1.md
    - Capítulo 2: seguir o arquivo ./workflow/pages/03-chapter-2.md
    - Contracapa: seguir o arquivo ./workflow/pages/08-contracapa.md

4 - Sprint 4 (Módulos Interativos Complexos):

* Implementação do ScratchPhoto.tsx usando Skia (seguir o arquivo ./workflow/pages/04-chapter-3.md).

* Implementação do PhotoDeck.tsx (gestos de arrastar fotos) seguir o arquivo ./workflow/pages/05-chapter-4.md.

* Lógica de validação do CoupleQuiz.tsx, seguir o arquivo ./workflow/pages/06-quizzes.md.


5 - Sprint 5 (Clímax e Polimento): Montagem da animação do envelope e efeito typewriter da Carta de Amor (seguir ./workflow/pages/07-carta-final.md), testes de sensibilidade de toque no aparelho físico.
