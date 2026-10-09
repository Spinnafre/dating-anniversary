# Contracapa
```html
<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Contracapa — Memórias</title>
  
  <!-- Fontes Google correspondentes ao Design System -->
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Cinzel:wght@400;600;700&family=Cormorant+Garamond:ital,wght@0,400;0,600;1,400;1,600&family=Montserrat:wght@300;400;500&display=swap" rel="stylesheet">

  <style>
    /* =========================================================
       DESIGN SYSTEM - LOVELY DESIGN (ANNIVERSARY BOOK)
       ========================================================= */
    :root {
      --bg-cream: #FAF6F0;
      --bg-card: #FFFFFF;
      --text-main: #24201E;
      --text-muted: #857D77;
      --gold-accent: #9A7B4F;
      --gold-light: #C9A96E;
      --border-vintage: #E3D9CE;
      --border-outer: #D0C4B6;
      --wine-red: #A83232;
      --font-serif-title: 'Cinzel', serif;
      --font-serif-body: 'Cormorant Garamond', Georgia, serif;
      --font-sans: 'Montserrat', sans-serif;
    }

    * {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
    }

    body {
      min-height: 100vh;
      background-color: var(--bg-cream);
      color: var(--text-main);
      font-family: var(--font-serif-body);
      display: flex;
      justify-content: center;
      align-items: center;
      padding: 24px 16px;
      overflow-x: hidden;
      position: relative;
    }

    /* Textura suave de papel */
    body::before {
      content: "";
      position: fixed;
      inset: 0;
      opacity: 0.035;
      background-image: radial-gradient(var(--text-main) 1px, transparent 0);
      background-size: 24px 24px;
      pointer-events: none;
      z-index: 0;
    }

    /* Livro / Cartão Principal (Contracapa) */
    .book-cover {
      position: relative;
      z-index: 10;
      max-width: 520px;
      width: 100%;
      background: var(--bg-card);
      border: 1px solid var(--border-vintage);
      box-shadow: 
        0 4px 6px -1px rgba(0, 0, 0, 0.04),
        0 20px 35px -5px rgba(44, 36, 33, 0.08),
        inset 0 0 0 8px var(--bg-card),
        inset 0 0 0 9px var(--border-vintage);
      padding: 48px 32px 40px;
      text-align: center;
      border-radius: 4px;
    }

    /* Tipografia de Cabeçalho */
    .tagline-meta {
      font-family: var(--font-sans);
      font-size: 0.72rem;
      letter-spacing: 0.28em;
      text-transform: uppercase;
      color: var(--text-muted);
      margin-bottom: 20px;
    }

    .fleuron {
      font-size: 2rem;
      color: var(--gold-accent);
      line-height: 1;
      margin: 8px 0 16px;
      filter: drop-shadow(0 1px 1px rgba(0,0,0,0.05));
    }

    .main-title {
      font-family: var(--font-serif-title);
      font-size: 1.65rem;
      letter-spacing: 0.18em;
      line-height: 1.45;
      font-weight: 500;
      text-transform: uppercase;
      color: var(--text-main);
      margin-bottom: 16px;
    }

    .main-title span {
      display: block;
    }

    .main-title .subtitle-dash {
      font-family: var(--font-serif-body);
      font-style: italic;
      font-size: 1.3rem;
      letter-spacing: 0.06em;
      text-transform: lowercase;
      color: var(--gold-accent);
      margin-top: 4px;
    }

    .colophon-dedication {
      font-size: 1.05rem;
      font-style: italic;
      color: var(--text-muted);
      line-height: 1.6;
      max-width: 380px;
      margin: 0 auto 28px;
    }

    /* Divisor Vintage */
    .ornament-divider {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 14px;
      margin: 24px auto;
      width: 80%;
      color: var(--gold-light);
      font-size: 0.75rem;
    }

    .ornament-divider::before,
    .ornament-divider::after {
      content: "";
      height: 1px;
      flex: 1;
      background-color: var(--border-vintage);
    }

    /* Placa do Contador em Tempo Real */
    .timer-container {
      background-color: var(--bg-cream);
      border: 1px dashed var(--border-outer);
      border-radius: 4px;
      padding: 18px 16px;
      margin: 24px 0;
    }

    .timer-label {
      font-family: var(--font-sans);
      font-size: 0.68rem;
      letter-spacing: 0.2em;
      text-transform: uppercase;
      color: var(--gold-accent);
      margin-bottom: 8px;
      font-weight: 500;
    }

    .timer-display {
      font-family: var(--font-serif-title);
      font-size: 1.08rem;
      color: var(--text-main);
      letter-spacing: 0.05em;
      line-height: 1.4;
    }

    .timer-display span.num {
      font-weight: 700;
      color: var(--wine-red);
      font-size: 1.15em;
    }

    /* Ações / Botões */
    .actions-group {
      display: flex;
      flex-direction: column;
      gap: 12px;
      align-items: center;
      margin-top: 28px;
    }

    .btn-action {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      gap: 8px;
      padding: 13px 28px;
      width: 100%;
      max-width: 280px;
      border-radius: 2px;
      font-family: var(--font-serif-title);
      font-size: 0.82rem;
      letter-spacing: 0.16em;
      text-transform: uppercase;
      cursor: pointer;
      transition: all 0.25s ease;
      text-decoration: none;
    }

    /* Botão Eu Te Amo */
    .btn-love {
      background-color: var(--text-main);
      color: #FFF;
      border: 1px solid var(--text-main);
      box-shadow: 0 4px 12px rgba(44, 36, 33, 0.15);
    }

    .btn-love:hover {
      background-color: var(--wine-red);
      border-color: var(--wine-red);
      transform: translateY(-2px);
      box-shadow: 0 6px 16px rgba(168, 50, 50, 0.25);
    }

    /* Botão Replay / Início */
    .btn-replay {
      background-color: transparent;
      color: var(--text-muted);
      border: 1px solid var(--border-vintage);
    }

    .btn-replay:hover {
      background-color: #FAF6F0;
      color: var(--text-main);
      border-color: var(--gold-accent);
      transform: translateY(-1px);
    }

    .colophon-footer {
      margin-top: 36px;
      font-family: var(--font-sans);
      font-size: 0.7rem;
      letter-spacing: 0.24em;
      color: var(--text-muted);
      text-transform: uppercase;
    }

    /* =========================================================
       ANIMAÇÃO DE CORAÇÕES CAINDO
       ========================================================= */
    #hearts-stage {
      position: fixed;
      top: 0;
      left: 0;
      width: 100vw;
      height: 100vh;
      pointer-events: none;
      z-index: 999;
      overflow: hidden;
    }

    .falling-heart {
      position: absolute;
      top: -30px;
      user-select: none;
      animation: fallDown linear forwards;
    }

    @keyframes fallDown {
      0% {
        transform: translateY(0) rotate(0deg) scale(0.6);
        opacity: 0.95;
      }
      50% {
        transform: translateY(50vh) rotate(180deg) scale(1.1);
        opacity: 0.85;
      }
      100% {
        transform: translateY(105vh) rotate(360deg) scale(0.8);
        opacity: 0;
      }
    }
  </style>
</head>
<body>

  <!-- Palco dos corações -->
  <div id="hearts-stage"></div>

  <!-- Contracapa do Livro -->
  <main class="book-cover">
    <p class="tagline-meta">— Colophon —</p>
    
    <div class="fleuron">❀</div>

    <h1 class="main-title">
      <span>To Be</span>
      <span>Continued</span>
      <span class="subtitle-dash">— always —</span>
    </h1>

    <p class="colophon-dedication">
      Esta história continuará sendo escrita em cada manhã, nos pequenos detalhes e com muito amor.
    </p>

    <div class="ornament-divider">✦ ❦ ✦</div>

    <!-- Contador em tempo real -->
    <div class="timer-container">
      <div class="timer-label">Juntos há exatamente</div>
      <div class="timer-display" id="live-timer">
        Calculando nosso tempo...
      </div>
    </div>

    <!-- Ações interativas -->
    <div class="actions-group">
      <button class="btn-action btn-love" id="btn-love" type="button">
        Eu Te Amo ❦
      </button>

      <button class="btn-action btn-replay" id="btn-replay" type="button">
        ↺ Rever Nossa História
      </button>
    </div>

    <div class="colophon-footer">— fin. —</div>
  </main>

  <script>
    /* =========================================================
       1. CONTADOR EM TEMPO REAL
       Defina aqui a data inicial do relacionamento (Ano, Mês [0-11], Dia, Hora, Minutos)
       Exemplo abaixo: 28 de Abril de 2022
       ========================================================= */
    const START_DATE = new Date(2022, 3, 28, 0, 0, 0); // Altere para a data que desejar

    function updateLiveTimer() {
      const now = new Date();
      const diffMs = now - START_DATE;

      if (diffMs < 0) {
        document.getElementById('live-timer').textContent = "O começo da nossa história...";
        return;
      }

      const totalSeconds = Math.floor(diffMs / 1000);
      const days = Math.floor(totalSeconds / 86400);
      const hours = Math.floor((totalSeconds % 86400) / 3600);
      const minutes = Math.floor((totalSeconds % 3600) / 60);
      const seconds = totalSeconds % 60;

      const timerEl = document.getElementById('live-timer');
      timerEl.innerHTML = `
        <span class="num">${days}</span> dias, 
        <span class="num">${hours}</span>h, 
        <span class="num">${minutes}</span>m e 
        <span class="num">${seconds}</span>s
      `;
    }

    setInterval(updateLiveTimer, 1000);
    updateLiveTimer();

    /* =========================================================
       2. REPLAY DA APLICAÇÃO (VOLTAR AO INÍCIO)
       ========================================================= */
    document.getElementById('btn-replay').addEventListener('click', () => {
      // Se estiver usando sistema de páginas com scroll suave até a capa:
      window.scrollTo({ top: 0, behavior: 'smooth' });

      // Se sua aplicação for em rotas ou páginas separadas, descomente:
      // window.location.href = '#page-1';
    });

    /* =========================================================
       3. CHUVA DE CORAÇÕES ("EU TE AMO")
       ========================================================= */
    const loveBtn = document.getElementById('btn-love');
    const heartsStage = document.getElementById('hearts-stage');
    const heartSymbols = ['❤️', '💖', '💕', '❦', '🌸', '✨'];

    loveBtn.addEventListener('click', () => {
      triggerHeartShower(45);
    });

    function triggerHeartShower(count = 40) {
      for (let i = 0; i < count; i++) {
        setTimeout(() => {
          createHeart();
        }, i * 65); // Dispara os corações sequencialmente
      }
    }

    function createHeart() {
      const heart = document.createElement('div');
      heart.className = 'falling-heart';
      heart.textContent = heartSymbols[Math.floor(Math.random() * heartSymbols.length)];

      // Posição horizontal aleatória (0 a 100vw)
      const posX = Math.random() * 100;
      // Duração da queda aleatória entre 2.5s e 4.5s
      const duration = 2.5 + Math.random() * 2.0;
      // Tamanho da fonte entre 16px e 34px
      const size = 16 + Math.random() * 18;

      heart.style.left = `${posX}vw`;
      heart.style.fontSize = `${size}px`;
      heart.style.animationDuration = `${duration}s`;

      heartsStage.appendChild(heart);

      // Remove o elemento após a animação
      setTimeout(() => {
        heart.remove();
      }, duration * 1000);
    }
  </script>
</body>
</html>
```