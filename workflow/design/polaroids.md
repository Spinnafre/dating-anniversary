### 1. Design System Tokens (Polaroid Card)

| Token / Propriedade | Valor Padrão / Recomendado | Descrição / Detalhe |
| --- | --- | --- |
| **Dimensões do Card** | `300px × 360px` (Aspect ratio ~ `1:1.2`) | Proporção clássica Polaroid (600 / SX-70) |
| **Área da Foto** | `260px × 260px` (`1:1` quadrado) | Foto centralizada com `object-fit: cover` |
| **Padding Superior / Laterais** | `20px` (ou `16px` para telas menores) | Margem uniforme no topo, esquerda e direita |
| **Padding Inferior (Lip)** | `80px` (espaço para a legenda manual) | A aba inferior mais espessa típica do filme |
| **Cor de Fundo do Card** | `#fdfbf7` ou `#ffffff` | Branco com tom sutilmente aquecido ("papel fotográfico") |
| **Bordas / Arredondamento** | `border-radius: 4px` | Cantos suavemente arredondados |
| **Sombra (Elevação)** | `box-shadow: 0 10px 25px rgba(0,0,0,0.15), 0 4px 6px rgba(0,0,0,0.08)` | Cria a sensação física de profundidade no baralho |
| **Tipografia (Legenda)** | `'Caveat'`, `'Reenie Beanie'` ou `'Indie Flower'` | Fonte estilo manuscrita à caneta |
| **Cor da Fonte** | `#222222` ou `#2c3e50` | Grafite/tinta preta suave (evite preto 100% puro) |
| **Tamanho da Fonte** | `1.25rem` (~`20px` - `22px`), `font-weight: 500` | Legível e com aspecto orgânico |

---

### 2. Especificação em HTML & CSS

```html
<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <title>Polaroid Deck Design System</title>
  <!-- Fonte manuscrita do Google Fonts -->
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Caveat:wght@500;700&display=swap" rel="stylesheet">

  <style>
    :root {
      --polaroid-bg: #fcfbf9;
      --polaroid-shadow: 0 12px 24px -6px rgba(0, 0, 0, 0.18), 0 4px 8px -2px rgba(0, 0, 0, 0.08);
      --polaroid-radius: 4px;
      --polaroid-padding-x: 20px;
      --polaroid-padding-top: 20px;
      --polaroid-padding-bottom: 70px;
      --polaroid-font-family: 'Caveat', cursive, sans-serif;
      --polaroid-font-color: #2b2b2b;
      --polaroid-font-size: 24px;
    }

    body {
      background-color: #e9ecef;
      display: flex;
      justify-content: center;
      align-items: center;
      min-height: 100vh;
      margin: 0;
    }

    /* Container do baralho */
    .photo-deck {
      position: relative;
      width: 320px;
      height: 420px;
    }

    /* O Card Polaroid */
    .photo-deck__card {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      box-sizing: border-box;
      background-color: var(--polaroid-bg);
      padding: var(--polaroid-padding-top) var(--polaroid-padding-x) var(--polaroid-padding-bottom);
      border-radius: var(--polaroid-radius);
      box-shadow: var(--polaroid-shadow);
      cursor: grab;
      user-select: none;
      transition: transform 0.3s cubic-bezier(0.2, 0.8, 0.2, 1);
    }

    /* Formato retrato / foto quadrada */
    .photo-deck__card--portrait .polaroid-image-wrapper {
      width: 100%;
      aspect-ratio: 1 / 1;
      overflow: hidden;
      background-color: #111;
      border-radius: 2px;
    }

    .photo-deck__card--portrait img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      display: block;
    }

    /* Legenda manuscrita na parte inferior */
    .photo-deck__caption {
      font-family: var(--polaroid-font-family);
      color: var(--polaroid-font-color);
      font-size: var(--polaroid-font-size);
      text-align: center;
      margin-top: 18px;
      line-height: 1.2;
    }

    /* Efeito de baralho bagunçado via nth-child (para visualização estática) */
    .photo-deck__card:nth-child(1) { transform: rotate(-3deg) translate(-2px, 0); z-index: 3; }
    .photo-deck__card:nth-child(2) { transform: rotate(4deg) translate(3px, 4px); z-index: 2; }
    .photo-deck__card:nth-child(3) { transform: rotate(-1.5deg) translate(-4px, 8px); z-index: 1; }
  </style>
</head>
<body>

  <div class="photo-deck">
    <!-- Card do topo -->
    <div class="photo-deck__card photo-deck__card--portrait">
      <div class="polaroid-image-wrapper">
        <img src="https://images.unsplash.com/photo-1517841905240-472988babdf9?w=600&auto=format&fit=crop" alt="Foto">
      </div>
      <div class="photo-deck__caption">Viagem 2026 ✨</div>
    </div>

    <!-- Card 2 -->
    <div class="photo-deck__card photo-deck__card--portrait">
      <div class="polaroid-image-wrapper">
        <img src="https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=600&auto=format&fit=crop" alt="Foto">
      </div>
      <div class="photo-deck__caption">A tarde na praia</div>
    </div>

    <!-- Card 3 -->
    <div class="photo-deck__card photo-deck__card--portrait">
      <div class="polaroid-image-wrapper">
        <img src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=600&auto=format&fit=crop" alt="Foto">
      </div>
      <div class="photo-deck__caption">Bons momentos</div>
    </div>
  </div>

</body>
</html>

```

---

### 3. Como mapear para o React Native

Para reproduzir o efeito de baralho desorganizado, swipe para descartar e reset cíclico:

1. **Tokens em StyleSheet:**

```typescript
const styles = StyleSheet.create({
  card: {
    width: 320,
    backgroundColor: '#FCFBF9',
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 70,
    borderRadius: 4,
    // Sombras React Native:
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.15,
    shadowRadius: 15,
    elevation: 8, // Android
    position: 'absolute',
  },
  image: {
    width: '100%',
    aspectRatio: 1,
    borderRadius: 2,
  },
  caption: {
    fontFamily: 'Caveat-Medium', // carregada via expo-font ou react-native.config.js
    fontSize: 22,
    color: '#2B2B2B',
    textAlign: 'center',
    marginTop: 16,
  }
});

```

1. **Física e Gestos com `react-native-reanimated` + `Gesture.Pan()`:**
rgba(0,0,0,0.15)`).

* Aplique rotações leves e aleatórias em CSS (`transform: rotate(-2deg)`, `rotate(3deg)`) para dar o ar artesanal.
* Adicione elementos visuais em pseudo-elementos (`::before` / `::after`): fitas adesivas translúcidas (washi tape) prendendo as bordas das fotos e adesivos ilustrados.

* **Baralho Desorganizado:** Atribua um ângulo determinístico fixo ou pseudo-aleatório baseado no índice (`angles = [-3, 4, -2, 3]`), interpolando `rotateZ: '${angle}deg'`.
* **Arrastar e Descartar:** No card ativo (topo), mapeie o `translationX` do pan gesture para `translateX` e adicione uma rotação proporcional ao deslocamento (`translateX / 20 + 'deg'`).
* **Término do Swipe:** Se `Math.abs(translationX) > 150`, use `withTiming()` jogando o card para fora da tela (`±SCREEN_WIDTH * 1.5`).
* **Reset do Deck:** No callback de animação (`runOnJS(nextCard)`), incremente o ponteiro de foto. Quando o ponteiro atingir o total do array (`currentIndex === photos.length`), volte para `0`, resetando os offsets e renderizando a pilha original novamente.
