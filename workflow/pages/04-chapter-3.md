
Formato Polaroid: O card agora possui a proporção e as bordas de uma foto instantânea (bordas laterais/topo finas e uma margem inferior mais larga em branco).

Área de Legenda / Data: Abaixo da foto, no espaço em branco inferior da Polaroid, foi adicionada a anotação com a fonte Caveat (Google Fonts) em estilo caligrafia manuscrita e legível.

Embalagem cobrindo a Polaroid inteira: O Canvas cobre todo o conjunto (foto + moldura branca da Polaroid), simulando que a cartinha/foto inteira está embalada para presente. Conforme o usuário raspa, revela tanto a imagem quanto a anotação feita à mão.

```html
<!DOCTYPE html>
<html lang="pt-BR">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>ScratchImage - Polaroid Reveal</title>

    <!-- Fonte Cursiva Caligráfica (Caveat) e Sans-Serif moderna -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link
        href="https://fonts.googleapis.com/css2?family=Caveat:wght@600;700&family=Plus+Jakarta+Sans:wght@500;600;700&display=swap"
        rel="stylesheet">

    <style>
        * {
            box-sizing: border-box;
            margin: 0;
            padding: 0;
        }

        body {
            font-family: 'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, sans-serif;
            background: #faf4f6;
            display: flex;
            justify-content: center;
            align-items: center;
            min-height: 100vh;
            padding: 28px 16px;
            color: #1f2937;
        }

        /* Container Principal */
        .scratch-wrapper {
            width: 100%;
            max-width: 360px;
            display: flex;
            flex-direction: column;
            align-items: center;
            text-align: center;
        }

        /* 1. Header fora do Card */
        .scratch-header {
            margin-bottom: 22px;
        }

        .scratch-badge {
            display: inline-flex;
            align-items: center;
            gap: 6px;
            background-color: #ffe4e9;
            color: #e11d48;
            font-size: 12px;
            font-weight: 700;
            padding: 5px 14px;
            border-radius: 9999px;
            text-transform: uppercase;
            letter-spacing: 0.05em;
            margin-bottom: 10px;
        }

        .scratch-title {
            font-size: 22px;
            font-weight: 700;
            color: #1f2937;
            margin-bottom: 6px;
            line-height: 1.3;
        }

        .scratch-subtitle {
            font-size: 14px;
            color: #6b7280;
            line-height: 1.45;
        }

        /* 2. Container Polaroid + Embalagem */
        .polaroid-container {
            position: relative;
            width: 100%;
            background: #ffffff;
            border-radius: 12px;
            padding: 14px 14px 22px 14px;
            /* Margem inferior maior estilo Polaroid */
            box-shadow:
                0 14px 35px rgba(225, 29, 72, 0.09),
                0 4px 14px rgba(0, 0, 0, 0.04);
            user-select: none;
            touch-action: none;
            /* Previne scroll no mobile durante a raspagem */
            overflow: hidden;
        }

        /* Foto interna da Polaroid */
        .polaroid-photo-wrapper {
            width: 100%;
            aspect-ratio: 1 / 1;
            border-radius: 6px;
            overflow: hidden;
            background: #f0edf0;
        }

        .polaroid-image {
            width: 100%;
            height: 100%;
            object-fit: cover;
            display: block;
            pointer-events: none;
        }

        /* Área inferior branca com a Data / Nota Manuscrita */
        .polaroid-caption {
            margin-top: 14px;
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 0 4px;
        }

        .polaroid-note {
            font-family: 'Caveat', cursive;
            font-size: 22px;
            color: #374151;
            font-weight: 700;
            letter-spacing: 0.02em;
        }

        .polaroid-date {
            font-family: 'Caveat', cursive;
            font-size: 20px;
            color: #9f1239;
            font-weight: 700;
        }

        /* 3. Embalagem de Presente (Canvas por cima de tudo) */
        .scratch-canvas {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            border-radius: 12px;
            cursor: grab;
            z-index: 2;
            transition: opacity 0.6s ease-out;
        }

        .scratch-canvas:active {
            cursor: grabbing;
        }

        /* 4. Dica de Instrução Flutuante com Pulsação */
        .scratch-hint {
            position: absolute;
            top: 45%;
            left: 50%;
            transform: translate(-50%, -50%);
            z-index: 3;
            background: rgba(255, 240, 245, 0.95);
            color: #9f1239;
            padding: 9px 18px;
            border-radius: 9999px;
            font-size: 13px;
            font-weight: 600;
            pointer-events: none;
            box-shadow: 0 4px 16px rgba(225, 29, 72, 0.16);
            backdrop-filter: blur(4px);
            transition: opacity 0.4s ease-out;
            animation: gentle-pulse 2.2s ease-in-out infinite;
            white-space: nowrap;
        }

        @keyframes gentle-pulse {

            0%,
            100% {
                transform: translate(-50%, -50%) scale(1);
            }

            50% {
                transform: translate(-50%, -50%) scale(1.06);
            }
        }

        /* Estado de Revelação */
        .is-revealed {
            opacity: 0 !important;
            pointer-events: none !important;
        }
    </style>
</head>

<body>

    <div class="scratch-wrapper" data-component-type="ScratchImage">
        <!-- Cabeçalho fora da Polaroid -->
        <header class="scratch-header">
            <div class="scratch-badge">✨ Raspe para revelar</div>
            <h2 class="scratch-title">Para mim essa é a nossa foto favorita</h2>
        </header>

        <!-- Card Polaroid Envolvido pela Embalagem -->
        <div class="polaroid-container" id="polaroidContainer">
            <!-- Foto Quadrada -->
            <div class="polaroid-photo-wrapper">
                <img src="https://images.unsplash.com/photo-1518199266791-5375a83190b7?auto=format&fit=crop&w=700&q=80"
                    alt="Momento especial" class="polaroid-image" />
            </div>

            <!-- Área inferior da Polaroid com caligrafia cursiva -->
            <div class="polaroid-caption">
                <span class="polaroid-note">Melhor foto de todas ♡</span>
                <span class="polaroid-date">08.10.2026</span>
            </div>

            <!-- Canvas da embalagem de papel de presente -->
            <canvas class="scratch-canvas" id="scratchCanvas"></canvas>

            <!-- Instrução com texto animado -->
            <div class="scratch-hint" id="scratchHint">
                Raspe aqui com o seu dedo ✨
            </div>
        </div>
    </div>

    <script>
        const canvas = document.getElementById('scratchCanvas');
        const ctx = canvas.getContext('2d');
        const container = document.getElementById('polaroidContainer');
        const hint = document.getElementById('scratchHint');

        let isDrawing = false;
        let isRevealed = false;
        let hasInteracted = false;
        const BRUSH_RADIUS = 28;
        const REVEAL_THRESHOLD = 42; // Porcentagem para revelar tudo

        // Desenha mini coração para o padrão da embalagem
        function drawHeart(c, x, y, size, color) {
            c.save();
            c.translate(x, y);
            c.beginPath();
            c.moveTo(0, -size / 2);
            c.bezierCurveTo(size / 2, -size, size, -size / 3, 0, size);
            c.bezierCurveTo(-size, -size / 3, -size / 2, -size, 0, -size / 2);
            c.fillStyle = color;
            c.fill();
            c.restore();
        }

        function initPackaging() {
            const rect = container.getBoundingClientRect();
            const dpr = window.devicePixelRatio || 1;

            canvas.width = rect.width * dpr;
            canvas.height = rect.height * dpr;
            ctx.scale(dpr, dpr);

            // 1. Fundo de papel de presente rosa pastel
            ctx.fillStyle = '#fce7ee';
            ctx.fillRect(0, 0, rect.width, rect.height);

            // 2. Estampa de corações intercalados
            const step = 26;
            const heartSize = 5;
            const heartColor = '#f39bb4';

            for (let x = 13; x < rect.width; x += step) {
                for (let y = 13; y < rect.height; y += step) {
                    const offsetX = ((y / step) % 2 === 0) ? 0 : step / 2;
                    drawHeart(ctx, x + offsetX, y, heartSize, heartColor);
                }
            }
        }

        function scratch(x, y) {
            if (isRevealed) return;

            if (!hasInteracted) {
                hasInteracted = true;
                hint.classList.add('is-revealed');
            }

            // Efeito de apagar os pixels da embalagem
            ctx.globalCompositeOperation = 'destination-out';
            ctx.beginPath();
            ctx.arc(x, y, BRUSH_RADIUS, 0, Math.PI * 2, false);
            ctx.fill();

            scheduleCheck();
        }

        let checkTimer;
        function scheduleCheck() {
            if (checkTimer || isRevealed) return;
            checkTimer = setTimeout(() => {
                calculateRevealed();
                checkTimer = null;
            }, 100);
        }

        function calculateRevealed() {
            const w = canvas.width;
            const h = canvas.height;
            const imageData = ctx.getImageData(0, 0, w, h);
            const data = imageData.data;
            let erasedPixels = 0;
            const stride = 20; // Amostragem de pixels para leveza

            for (let i = 3; i < data.length; i += 4 * stride) {
                if (data[i] === 0) erasedPixels++;
            }

            const totalChecked = data.length / (4 * stride);
            const percentage = (erasedPixels / totalChecked) * 100;

            if (percentage >= REVEAL_THRESHOLD) {
                isRevealed = true;
                canvas.classList.add('is-revealed');
                hint.classList.add('is-revealed');
            }
        }

        function getCoords(e) {
            const rect = canvas.getBoundingClientRect();
            const clientX = e.touches ? e.touches[0].clientX : e.clientX;
            const clientY = e.touches ? e.touches[0].clientY : e.clientY;
            return {
                x: clientX - rect.left,
                y: clientY - rect.top
            };
        }

        // Eventos Desktop
        canvas.addEventListener('mousedown', (e) => {
            isDrawing = true;
            const { x, y } = getCoords(e);
            scratch(x, y);
        });

        canvas.addEventListener('mousemove', (e) => {
            if (!isDrawing) return;
            const { x, y } = getCoords(e);
            scratch(x, y);
        });

        window.addEventListener('mouseup', () => { isDrawing = false; });

        // Eventos Mobile / Touch
        canvas.addEventListener('touchstart', (e) => {
            isDrawing = true;
            const { x, y } = getCoords(e);
            scratch(x, y);
        }, { passive: true });

        canvas.addEventListener('touchmove', (e) => {
            if (!isDrawing) return;
            const { x, y } = getCoords(e);
            scratch(x, y);
        }, { passive: true });

        window.addEventListener('touchend', () => { isDrawing = false; });

        window.addEventListener('load', initPackaging);
        window.addEventListener('resize', initPackaging);
    </script>
</body>

</html>
```

### Mapeamento para o React Native:
Fonte Manuscrita: Utilize a lib @expo-google-fonts/caveat (ou adicione Caveat-Bold.ttf na pasta assets/fonts/ e configure no react-native.config.js). Na Text style basta usar fontFamily: 'Caveat-Bold'.

Layout Polaroid: Estruture um <View '#fff', 12 14, 22, backgroundColor: borderRadius: padding: paddingBottom: style="{{" }}> com a imagem quadrada no topo e uma linha flex horizontal para a nota e data logo abaixo. Use o próprio componente já criado Polaroid, para evitar repetir código.


Ao invés de usar a imagem diretamente do Unsplash, deixe o código aberto para aceitar um link direto par um arquivo estático na pasta de fotos do repositório do projeto. Crie uma pasta dentro do repositório focada apenas em arquivos de fotos usadas no projeto inteiro.
