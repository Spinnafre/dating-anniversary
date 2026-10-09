### Capítulo Final: A Carta de Amor

Uma página dupla especial com um envelope vermelho interativo (feito com css e html) com um selo em formato de coração que ao clicar nele irá abrir a carta (irá abrir um modal com um overlay no fundo sendo a carta), revelando a carta com efeito de digitação suave (_typewriter_). O  fundo da carta será de papel (simulando uma folha de caderno) com fonte escrita a mão (fonte Smoth Kiwi) e fundo cor de livro antigo, revelação fluida de texto.

Conteúdo da carta:

```txt
Meu amor,
Parece que foi ontem que tudo começou, mas já se passaram 1 ano. É incrível como o tempo voa quando a gente está ao lado de quem faz a vida ser mais leve e divertida. Obrigado pela paciência, pelas risadas nos momentos mais inesperados e per ser essa pessoa fofa que transforma qualquer dia comum no melhor dia possível.
Que venham muitos outros anos, planos e momentos para a gente guardar na memória nessa breve vida passageira.
Feliz nosso dia!
```

Abaixo está o design system da estrutura do envelope  (Papel Kraft / Rose Cream) e da carta. Use como base para criar o componente.

```css
@import url('https://fonts.googleapis.com/css2?family=Caveat:wght@500;700&family=Plus+Jakarta+Sans:wght@400;600&display=swap');

:root {
  /* Cores base */
  --env-base: #f4ebe1;
  --env-dark: #dfd2c2;
  --env-flap: #e8ded2;
  --seal-color: #c94a53;
  --seal-shadow: #8f2c33;
  --letter-bg: #ffffff;
  --text-primary: #4a3b32;
  --text-muted: #8c7d75;
}

* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

body {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #faf7f2;
  font-family: 'Plus Jakarta Sans', sans-serif;
}

/* Espaço vertical extra para acomodar a subida da carta */
.envelope-wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;
  padding-top: 100px;
}

/* Base do Envelope */
.envelope {
  position: relative;
  width: 290px;
  height: 185px;
  background-color: var(--env-dark);
  border: none;
  border-radius: 8px;
  cursor: pointer;
  outline: none;
  perspective: 1200px;
  box-shadow: 0 12px 28px rgba(0, 0, 0, 0.08);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.envelope:hover {
  transform: translateY(-2px);
  box-shadow: 0 16px 32px rgba(0, 0, 0, 0.12);
}

/* 1. Aba superior móvel (Flap) */
.flap {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: var(--env-flap);
  clip-path: polygon(0 0, 50% 55%, 100% 0);
  transform-origin: top center;
  z-index: 5;
  transition: transform 0.4s 0.2s ease-in-out, z-index 0.2s 0.3s;
}

/* 2. Bolso frontal (cobre as laterais e o fundo da carta) */
.pocket {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  background: var(--env-base);
  clip-path: polygon(0 0, 50% 50%, 0 100%, 100% 100%, 50% 50%, 100% 0, 100% 100%, 0 100%);
  border-radius: 8px;
  z-index: 4; /* Fica acima da carta quando ela está guardada */
}

/* 3. Selo de cera */
.wax-seal {
  position: absolute;
  top: 48%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 44px;
  height: 44px;
  background: radial-gradient(circle at 35% 35%, #e05d66, var(--seal-color));
  border-radius: 50%;
  box-shadow: 
    0 3px 6px rgba(0, 0, 0, 0.25),
    inset 0 -2px 4px var(--seal-shadow),
    inset 0 2px 2px rgba(255, 255, 255, 0.3);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 6;
  transition: transform 0.35s ease, opacity 0.3s ease;
}

.seal-initial {
  font-family: 'Plus Jakarta Sans', sans-serif;
  color: #fff;
  font-weight: 700;
  font-size: 1.1rem;
}

/* 4. Carta (Estado Padrão - Guardada dentro) */
.letter {
  position: absolute;
  bottom: 8px;
  left: 5%;
  width: 90%;
  height: 90%;
  background: var(--letter-bg);
  border-radius: 6px;
  padding: 18px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.08);
  z-index: 2; /* Começa dentro, atrás do pocket */
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  transform-origin: center center;
  animation: close-letter 0.9s cubic-bezier(0.4, 0, 0.2, 1) forwards;
}

.letter-content {
  font-family: 'Caveat', cursive;
  color: var(--text-primary);
  text-align: left;
}

.letter-greeting {
  font-size: 1.3rem;
  font-weight: 700;
  margin-bottom: 6px;
}

.letter-body {
  font-size: 1.05rem;
  line-height: 1.35;
}

.letter-heart {
  text-align: center;
  font-size: 1.3rem;
  color: var(--seal-color);
}

/* ===================================================
   ANIMAÇÃO DE ABERTURA (.open)
   =================================================== */

/* Abre a aba para trás */
.envelope.open .flap {
  transform: rotateX(180deg);
  z-index: 1;
  transition: transform 0.4s ease-in-out, z-index 0.15s 0.2s;
}

/* Oculta o selo */
.envelope.open .wax-seal {
  opacity: 0;
  transform: translate(-50%, -90%) scale(0.6);
  pointer-events: none;
}

/* Aciona a coreografia em 2 etapas da carta */
.envelope.open .letter {
  animation: pull-and-place-front 1s cubic-bezier(0.25, 1, 0.5, 1) forwards;
}

/* Keyframes: 
   0% a 45%: sobe até sair completamente pelo topo (mantendo z-index: 2, atrás do bolso)
   50%: muda o z-index para 10 (frente de tudo)
   50% a 100%: desce repousando sobre a frente do envelope com leve escala de foco
*/
@keyframes pull-and-place-front {
  0% {
    transform: translateY(0) scale(1);
    z-index: 2;
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.08);
  }
  45% {
    /* Sai completamente pelo topo do envelope */
    transform: translateY(-190px) scale(1);
    z-index: 2;
  }
  50% {
    /* Troca de camada no ponto mais alto */
    transform: translateY(-190px) scale(1.02);
    z-index: 10;
  }
  100% {
    /* Desce sobre a frente do envelope */
    transform: translateY(-40px) scale(1.05);
    z-index: 10;
    box-shadow: 0 16px 32px rgba(0, 0, 0, 0.22);
  }
}

/* Animação reversa ao fechar o envelope */
@keyframes close-letter {
  0% {
    transform: translateY(-40px) scale(1.05);
    z-index: 10;
    box-shadow: 0 16px 32px rgba(0, 0, 0, 0.22);
  }
  45% {
    transform: translateY(-190px) scale(1.02);
    z-index: 10;
  }
  50% {
    transform: translateY(-190px) scale(1);
    z-index: 2;
  }
  100% {
    transform: translateY(0) scale(1);
    z-index: 2;
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.08);
  }
}
```

Abaixo está a estrutura da do componente da carta.

```html
<div class="envelope-wrapper">
  <!-- Botão interativo com controle de estado acessível -->
  <button 
    type="button" 
    class="envelope" 
    id="envelopeBtn"
    aria-label="Open the letter" 
    aria-expanded="false"
    onclick="toggleEnvelope(this)"
  >
    <!-- Aba dobrável superior (Flap) -->
    <div class="flap"></div>

    <!-- Carta interna -->
    <div class="letter">
      <div class="letter-content">
        <p class="letter-greeting">Maya,</p>
        <p class="letter-body">Four years in November. I couldn't wait, so I made you this.</p>
        <div class="letter-heart">♡</div>
      </div>
    </div>

    <!-- Bolso frontal (cobre a carta enquanto ela sai de dentro) -->
    <div class="pocket"></div>

    <!-- Selo de cera com inicial -->
    <div class="wax-seal">
      <span class="seal-initial">D</span>
    </div>
  </button>

</div>

<script>
  function toggleEnvelope(el) {
    const isOpening = !el.classList.contains('open');
    el.classList.toggle('open');
    el.setAttribute('aria-expanded', isOpening);
  }
</script>
```

OBS:

Lembrando que a carta deve ser criada dentro da página do livro, então será necessário colocar algum efeito box-shadow para dar um realismo maior dando a ideia que a carta está colada na página, para isso pode usar também uma fita adesiva (componente de fita adesiva)