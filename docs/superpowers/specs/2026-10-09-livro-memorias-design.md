# Livro de Memórias Interativo — Design Spec

**Data:** 2026-10-09
**Status:** aprovado em conversa, aguardando revisão escrita
**Fontes de referência visual:** `plan.md`, `workflow/pages/*.md`, `workflow/design/polaroids.md`

---

## 1. Objetivo e contexto

Presente de aniversário de 1 ano de namoro: um app Android que simula um livro de memórias (scrapbook) com 8 páginas, viradas com animação 3D. O app roda **100% offline**, com todas as fotos e fontes embutidas, e é entregue como **APK** instalado diretamente no celular dela.

**Critérios de sucesso**
- As 8 páginas funcionam no aparelho real em modo avião, sem tela branca e sem flicker.
- Animações fluidas (virada, raspagem, swipe da pilha, envelope, digitação).
- Todo conteúdo pessoal (textos, nomes, data, fotos) é editável sem mexer em lógica: textos em `src/content/story.ts`, fotos substituindo arquivos de mesmo nome em `assets/photos/`.

**Fora de escopo**
- iOS, web, publicação em loja.
- Virada de página por arraste (decisão: **somente setas**).
- Layout de página dupla / tablets.
- Backend, contas, sincronização.

---

## 2. Decisões tomadas

| Tema | Decisão |
|---|---|
| Plataforma | Android, APK via EAS (`preview`, `buildType: apk`) ou build local |
| Abordagem técnica | Views + Reanimated; Skia apenas na foto raspável; SVG para formas; `expo-linear-gradient` para degradês |
| Navegação | Somente setas no rodapé (sem gesto de virar página) |
| Quiz | 1 página, 4 perguntas em sequência; **sem trava** sobre a carta |
| Conteúdo | Placeholders: imagens provisórias geradas com os nomes finais; textos/nomes/data em `story.ts` |
| Fonte da carta | Caveat (a "Smoth Kiwi" citada no spec não existe) |
| Idioma | Textos estilizados em inglês da capa/contracapa mantidos (editáveis); restante em português |

### Desvios intencionais do `plan.md`
1. `assets/` fica na **raiz** do projeto (convenção Expo), não em `src/assets/`.
2. O modelo genérico `PageType`/`BookPage` foi substituído por uma **lista ordenada de componentes de página** (`src/book/pages.ts`) + conteúdo tipado por seção. Cada página tem layout único; um renderizador genérico não traz ganho.
3. `storyContent.ts` e `storyData.ts` viram um único `src/content/story.ts`.
4. `@expo-google-fonts/playfair-display` removida (não usada). Adicionadas Cinzel, Cormorant Garamond e Nunito, usadas nos specs das páginas.
5. `canvas-confetti` (web-only) substituído pelo componente `HeartShower` (Reanimated).
6. A "página dupla" da carta final vira página única.
7. `backdrop-filter: blur` dos itens de lista é removido (fundo branco translúcido sem blur).

---

## 3. Stack

- Expo (SDK mais recente), template `blank-typescript`, **sem expo-router**.
- `react-native-reanimated`, `react-native-gesture-handler`, `@shopify/react-native-skia`, `react-native-svg`, `expo-linear-gradient`, `expo-image`, `expo-asset`, `expo-font`, `expo-splash-screen`, `react-native-safe-area-context`.
- Fontes: `@expo-google-fonts/cinzel`, `@expo-google-fonts/cormorant-garamond`, `@expo-google-fonts/caveat`, `@expo-google-fonts/nunito`.
- Testes: `jest-expo`, `@testing-library/react-native`.
- `app.json`: `orientation: "portrait"`.

---

## 4. Estrutura de pastas

```txt
assets/photos/              # imagens provisórias com nomes finais
src/
├── App.tsx                 # fontes + preload + splash + <BookFlipper/>
├── theme/tokens.ts         # cores e famílias de fonte
├── content/
│   ├── story.ts            # todos os textos editáveis, START_DATE, nomes, quiz, carta
│   └── photos.ts           # dicionário de require() estáticos
├── book/
│   ├── BookFlipper.tsx     # estado de navegação + animação de virada + BookContext
│   ├── BookNav.tsx         # setas ‹ › + indicador "n / 8"
│   └── pages.ts            # lista ordenada das 8 páginas
├── pages/
│   ├── CoverPage.tsx
│   ├── ThingsILovePage.tsx
│   ├── SomethingChangedPage.tsx
│   ├── ScratchPhotoPage.tsx
│   ├── PhotoDeckPage.tsx
│   ├── CoupleQuizPage.tsx
│   ├── LoveLetterPage.tsx
│   └── BackCoverPage.tsx
├── components/
│   ├── Polaroid.tsx
│   ├── TornPaper.tsx
│   ├── ListItemCard.tsx
│   ├── HeartShower.tsx
│   ├── WashiTape.tsx
│   ├── Envelope.tsx
│   ├── LetterModal.tsx
│   ├── ScratchCanvas.tsx
│   └── PageErrorBoundary.tsx
├── hooks/
│   ├── useElapsedTime.ts
│   └── useTypewriter.ts
├── logic/                  # funções puras, testadas unitariamente
│   ├── elapsed.ts          # computeElapsed(start, now)
│   ├── quizReducer.ts
│   ├── scratchCoverage.ts  # grade de cobertura
│   ├── deck.ts             # avanço cíclico da pilha
│   └── typewriter.ts       # cálculo de atrasos/pausas
└── state/BookProgress.tsx  # contexto de progresso persistente entre páginas
```

---

## 5. Conteúdo (`src/content/story.ts`)

Exporta objetos tipados por seção:

- `couple`: `{ sealInitial: string }` (placeholder `"D"`).
- `START_DATE: Date` (placeholder, editável).
- `cover`: `{ ornament, pretitle: "The Collected", title: ["MEMORIES", "OF US"], subtitle: "vol. i · an anniversary" }`.
- `thingsILove`: `{ badge, title, subtitle, listHeader, items: { emoji, text }[6], footer }` (textos do `02-chapter-1.md`).
- `somethingChanged`: mesma forma, 8 itens (textos do `03-chapter-2.md`).
- `scratchPhoto`: `{ badge, title, hint, photo, note, date }`.
- `photoDeck`: `{ badge, title, hint, photos: { source, caption }[5] }`.
- `quiz`: `{ title, wrongMessages: string[], finale, questions: QuizQuestion[4] }`, onde
  `QuizQuestion = { question, options: string[], correctIndex, rewardPhoto, rewardCaption, feedbackSuccess }`.
- `letter`: `{ greeting: "Meu amor,", paragraphs: string[], signoff: "Feliz nosso dia!" }` (texto do `07-carta-final.md`).
- `backCover`: `{ meta, titleLines, subtitle, dedication, timerLabel, loveButton, replayButton, footer }` (textos do `08-contracapa.md`).

`src/content/photos.ts` centraliza os `require()` estáticos:
`cover`, `favorite`, `deck01`..`deck05`, `quiz01`..`quiz04`. As imagens provisórias são JPGs simples (fundo colorido + rótulo) com esses nomes.

---

## 6. Livro, virada e navegação

**Tela:** retrato, página única em tela cheia, respeitando safe areas. Uma lombada fina (degradê escuro) fica sempre visível na borda esquerda.

**Estado (`BookFlipper`)**
- `currentIndex: number`, `flip: { from, to, direction } | null`.
- `BookContext` expõe `goNext()`, `goPrev()`, `goTo(index)`, `currentIndex`, `pageCount`.
- Chamadas durante uma virada em andamento são ignoradas.

**Animação (Reanimated, ~700 ms, `Easing.inOut(Easing.cubic)`)**
- **Avançar:** a página de destino fica embaixo, estática. A página atual fica por cima e gira `rotateY` de 0° até −90° com `transformOrigin` na borda esquerda e `perspective: 1200`. Durante a virada:
  - um degradê escuro sobre a folha que vira aumenta de opacidade com o ângulo (curvatura);
  - uma sombra sobre a página de baixo vai de ~0.35 a 0.
- **Voltar:** coreografia inversa; a página anterior entra por cima, de −90° a 0°.
- **`goTo(i)`:** uma única virada direta (usada por "Rever nossa história").
- Ao final da animação, `runOnJS` atualiza `currentIndex` e limpa `flip`.

**Montagem:** só a página atual fica montada, mais a de destino durante a virada. As animações de entrada repetem a cada abertura. O estado que precisa sobreviver fica em `BookProgress`.

**`BookNav`**
- Botões redondos semitransparentes no rodapé + indicador "n / 8".
- Capa: só "Abrir ›", em dourado. Contracapa: só "‹".
- `BackHandler` do Android: volta uma página; na capa, comportamento padrão (sair).

**`BookProgress` (contexto)**
- `scratchRevealed: boolean`
- `quiz: QuizState` (estado do `quizReducer`)
- Mantido em memória durante a sessão (sem persistência em disco).

---

## 7. Páginas de conteúdo

### Mapeamento CSS → React Native
| CSS | RN |
|---|---|
| `linear-gradient` | `expo-linear-gradient` |
| `radial-gradient` | `RadialGradient` do `react-native-svg` |
| `clip-path` (papel rasgado) | `Path` SVG serrilhado, calculado a partir do `onLayout` |
| pauta + margem | linhas no mesmo SVG |
| `text-shadow` | `textShadowColor/Offset/Radius` |
| `:hover` | estado pressionado (`Pressable` + Reanimated) |
| `@keyframes` em cascata | `entering={FadeInDown.delay(i * 100)}` |

### Capa (`CoverPage`), ref. `01-book-cover.md`
Degradê de couro a 135° (`#38241f → #241715 → #190f0e`), lombada, moldura dourada externa (`rgba(212,175,55,0.65)`) e interna, ornamentos `✦ ❦ ✦` e `⚜`, pretítulo em Cormorant itálico, título em Cinzel 700 dourado `#d4af37`, divisor e subtítulo. Ocupa a tela inteira. Animação de entrada sutil (fade + leve escala).

### Capítulos 1 e 2 (`ThingsILovePage`, `SomethingChangedPage`), ref. `02-chapter-1.md` / `03-chapter-2.md`
Fundo radial rosa (`#ffeef2 → #f7dbe3`), `TornPaper` (fundo `#fdfaf2`, pauta `#e3edf5` a cada 32px, margem `#f7cfcf` a 46px, rotação −0.6° / −0.5°), selo, título em Caveat (`#3b2219`), subtítulo itálico, cabeçalho da lista, `ListItemCard`s em cascata (100 ms / 80 ms de atraso por item) e rodapé em Caveat. Se o conteúdo não couber, rolagem interna dentro do papel.

### Contracapa (`BackCoverPage`), ref. `08-contracapa.md`
Fundo creme `#FAF6F0` com textura pontilhada (padrão SVG, opacidade 0.035). Cartão branco com borda interna dupla (Views aninhadas `#E3D9CE`), meta "— Colophon —", fleuron ❀, título "To Be / Continued / — always —", dedicatória, divisor ornamental e placa do contador (borda tracejada) com números em `#A83232`. Botões "Eu Te Amo ❦" (dispara `HeartShower` com 45 corações) e "↺ Rever Nossa História" (`goTo(0)`). Rodapé "— fin. —".

### Componentes compartilhados
- **`TornPaper`**: `{ children, rotation?, ruled?: boolean }`.
- **`ListItemCard`**: `{ emoji, text, index }`. Fundo `rgba(255,255,255,0.72)`, borda `rgba(225,185,185,0.5)`, raio 14. Ao pressionar: escala 1.015, borda `#f2a2b1`, emoji escala 1.22 e gira 6°.
- **`Polaroid`**: `{ source, caption?, note?, date?, rotation?, width? }`. Fundo `#fcfbf9`, padding 20/20/70 (com `note`/`date`, a linha de legenda usa padding inferior menor, ref. `04-chapter-3.md`), raio 4, `elevation: 8`, legenda em Caveat 22 `#2b2b2b`, foto 1:1.
- **`HeartShower`**: `{ count, trigger }`. Camada absoluta com `pointerEvents="none"`. Dispara `count` corações (❤️ 💖 💕 ❦ 🌸 ✨) com intervalo de 65 ms, X aleatório, tamanho 16–34 px, duração 2.5–4.5 s, animando translateY/rotate/scale/opacity. Cada coração é removido ao terminar.
- **`WashiTape`**: `{ rotation?, color?, width? }`. Retângulo translúcido com pontas serrilhadas (SVG).
- **`useElapsedTime(start)`**: usa `computeElapsed(start, now)` → `{ days, hours, minutes, seconds } | null` (`null` se a data for futura, e a UI mostra "O começo da nossa história..."). Atualiza a cada 1 s; o intervalo é limpo ao desmontar.

---

## 8. Páginas interativas

### Capítulo 3: `ScratchPhotoPage` (Skia), ref. `04-chapter-3.md`
- Cabeçalho fora do card: selo "✨ Raspe para revelar" (`#ffe4e9` / `#e11d48`) e título.
- `Polaroid` com foto + linha de legenda (nota em Caveat `#374151`, data `#9f1239`).
- `ScratchCanvas` (Skia `<Canvas>`) sobreposto do mesmo tamanho, renderizado após o `onLayout`:
  - camada (`<Group layer>`) com fundo `#fce7ee` e corações `#f39bb4` em grade intercalada (passo 26, tamanho 5);
  - os traços do usuário são desenhados com `BlendMode.Clear`, `strokeWidth` 56 e pontas arredondadas, num caminho acumulado num shared value e atualizado pelo `Gesture.Pan` na thread de UI.
- **Detecção** (`logic/scratchCoverage.ts`): grade 20×20; cada ponto marca as células cujo centro está dentro do raio do pincel. Ao atingir **42%**, a embalagem anima a opacidade até 0 (600 ms) e chama `setScratchRevealed(true)`.
- O balão "Raspe aqui com o seu dedo ✨" pulsa (escala 1 ↔ 1.06, 2.2 s) e some no primeiro toque.
- Com `scratchRevealed === true`, a página abre sem a embalagem.

### Capítulo 4: `PhotoDeckPage`, ref. `05-chapter-4.md`
- Cabeçalho + dica "Arraste para o lado" + contador "n / 5".
- 5 polaroids com ângulos `[-3, 4, -2, 3, -1.5]` e pequenos deslocamentos. Só os 3 cards do topo são renderizados.
- Card do topo com `Gesture.Pan`: `translateX` livre, `translateY` amortecido (×0.2), `rotateZ = translateX / 20` graus.
- Ao soltar: se `|translationX| > 150` ou `|velocityX| > 800`, `withTiming` até `±SCREEN_WIDTH * 1.5`, depois `runOnJS(next)`. Caso contrário, `withSpring` de volta a 0.
- `logic/deck.ts`: `nextIndex(i, n) = (i + 1) % n`, ou seja, a pilha reinicia depois da última foto.

### Interlúdio: `CoupleQuizPage`, ref. `06-quizzes.md`
- Cabeçalho "Interlúdio · O quiz do casal" + card "Pergunta n de 4" + alternativas.
- **`quizReducer`**: estado `{ index, wrong: number[], answered: boolean, finished: boolean }`; ações `answer(optionIndex)`, `next()`.
  - Resposta errada: adiciona a opção a `wrong`; o botão balança (`withSequence`), fica apagado e desativado, e aparece uma mensagem sorteada de `wrongMessages`.
  - Resposta certa: `answered = true`; o botão fica rosa, `HeartShower` dispara 30 corações e a `Polaroid` de recompensa entra (fade + queda + rotação) com `WashiTape` e `feedbackSuccess`; aparece o botão "Próxima pergunta ›".
  - `next()` na última pergunta → `finished = true` → mensagem `finale`.
- O estado vive em `BookProgress` e é preservado ao navegar.
- Sem trava: a carta abre independentemente do quiz.

### Capítulo Final: `LoveLetterPage`, ref. `07-carta-final.md`
- Fundo `#faf7f2` (livro antigo). Envelope centralizado "colado" na página: sombra suave + 2 `WashiTape` nos cantos.
- **`Envelope`**: base `#dfd2c2`, bolso `#f4ebe1` e aba `#e8ded2` em SVG; selo de cera **em formato de coração** (`#c94a53`, sombra `#8f2c33`) com `couple.sealInitial` em branco.
- Ao tocar no selo:
  1. o selo encolhe e some (300 ms);
  2. a aba gira `rotateX` 0→180° com perspectiva (400 ms);
  3. a carta sobe e sai parcialmente do bolso;
  4. após ~900 ms, abre o `LetterModal`.
- **`LetterModal`**:
  - overlay `rgba(0,0,0,0.55)` com fade;
  - folha de caderno cor papel antigo, com pauta e margem rosa, entrando com escala;
  - texto em **Caveat** (`#4a3b32`) via `useTypewriter`: ~35 ms por caractere, +250 ms após `,` e +500 ms após `.`/`!`/`?`/quebra de parágrafo, com rolagem automática;
  - tocar na folha pula para o texto completo;
  - "×" ou toque no overlay fecha o modal; o envelope continua aberto;
  - tocar no envelope aberto reabre o modal já com o texto completo (a digitação acontece só na primeira abertura da sessão).

---

## 9. Carregamento e robustez

- `App.tsx`: `SplashScreen.preventAutoHideAsync()` → aguarda `useFonts` + `Asset.loadAsync(Object.values(PHOTOS))` → `hideAsync()`. Se o carregamento de fontes der erro, a splash é liberada mesmo assim (fallback para a fonte do sistema).
- `expo-image` com `cachePolicy="memory"` nas polaroids.
- `PageErrorBoundary` envolve cada página: em caso de erro, mostra um papel simples "Ops, esta página amassou 😅" e as setas continuam funcionando.
- `TornPaper`, `ScratchCanvas` e `PhotoDeck` só desenham com dimensões medidas (`onLayout`).
- Todos os timers e intervalos são limpos ao desmontar.
- Nenhuma URL remota no código.

---

## 10. Testes

**Unitários (lógica pura)**
- `computeElapsed`: diferença correta em dias/h/m/s; data futura → `null`.
- `quizReducer`: errar acumula `wrong`; acertar marca `answered`; `next` avança e reseta; a última pergunta finaliza.
- `scratchCoverage`: marcação por raio; porcentagem; limiar de 42%.
- `deck.nextIndex`: avanço e ciclo.
- `typewriter`: cálculo de atrasos com pausas; "pular" retorna o texto completo.

**Componentes (Testing Library, Reanimated mockado)**
- `BookFlipper`: setas avançam e voltam; "‹" escondida na capa e "›" escondida na contracapa; toques ignorados durante a virada; `goTo(0)` volta à capa.
- `CoupleQuizPage`: errar mostra mensagem e desativa a opção; acertar mostra polaroid e "Próxima"; o final mostra `finale`.
- `BackCoverPage`: renderiza o contador com `START_DATE` controlada (fake timers).

**Manual (no aparelho, em modo avião)**: virada nas duas direções, raspagem e revelação, swipe e ciclo da pilha, quiz completo, envelope + modal + digitação + pular, chuva de corações, "Rever nossa história", botão voltar do Android, fontes e imagens sem flicker.

---

## 11. Build e entrega

- Desenvolvimento: `npx expo run:android` (development build; o Skia não roda no Expo Go).
- APK: `eas build -p android --profile preview` com `android.buildType: "apk"` em `eas.json` (ou `--local`).
- Instalação: transferir o APK para o celular e instalar (permitir fontes desconhecidas).

---

## 12. Ordem de implementação (insumo para o plano)

1. **Fundação:** projeto Expo, dependências, `git`, tokens, `story.ts`, `photos.ts` + imagens provisórias, fontes/splash/preload, Jest configurado.
2. **Livro:** `BookFlipper`, `BookNav`, `pages.ts` (páginas stub), `BookProgress`, `PageErrorBoundary`.
3. **Conteúdo direto:** componentes compartilhados (`TornPaper`, `ListItemCard`, `Polaroid`, `HeartShower`, `WashiTape`), Capa, Capítulos 1 e 2, Contracapa + `useElapsedTime`.
4. **Interativos:** `ScratchPhotoPage`, `PhotoDeckPage`, `CoupleQuizPage`.
5. **Clímax e polimento:** `Envelope`, `LetterModal`, `useTypewriter`, `LoveLetterPage`; ajustes visuais; build APK e checklist no aparelho.
