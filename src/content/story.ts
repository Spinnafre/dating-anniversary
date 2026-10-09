import { PHOTOS } from "./photos";

// Todos os textos, nomes e a data editáveis do livro ficam aqui.

/** Início do namoro (placeholder, ajuste). Mês é 0-11. */
export const START_DATE = new Date(2025, 9, 8, 0, 0, 0);

export const couple = { sealInitial: "D" };

export const cover = {
  ornament: "✦ ❦ ✦",
  pretitle: "Coleção",
  title: ["NOSSA", "MEMÓRIA"],
  subtitle: "vol. 1 · um ano de namoro",
};

export interface ListItem {
  emoji: string;
  text: string;
}

export interface ListChapter {
  badge: string;
  title: string;
  subtitle: string;
  listHeader: string;
  items: ListItem[];
  footer: string;
}

export const thingsILove: ListChapter = {
  badge: "Capítulo 1",
  title: "Coisas que eu mais amo em você 💖",
  subtitle: '"Entre tantas coisas, essas são as que mais tocam meu coração"',
  listHeader: "Detalhes que fazem você ser única…",
  items: [
    {
      emoji: "✨",
      text: "O seu sorriso espontâneo quando você se distrai e acha algo engraçado",
    },
    {
      emoji: "🫂",
      text: "A sensação de paz e acolhimento que só o seu abraço consegue me dar",
    },
    {
      emoji: "💬",
      text: "O jeito como a gente consegue conversar por horas sem ver o tempo passar",
    },
    {
      emoji: "🥰",
      text: "O brilho e o carinho no seu olhar toda vez que nos reencontramos",
    },
    {
      emoji: "☕",
      text: "A sua parceria e companheirismo até nos dias mais comuns da rotina",
    },
    {
      emoji: "💌",
      text: "O fato de que, ao seu lado, eu posso ser 100% quem eu sou sem medo",
    },
  ],
  footer: "...e cada pequeno detalhe que descubro todo dia. ✨",
};

export const somethingChanged: ListChapter = {
  badge: "Capítulo 2",
  title: "365 Dias com Você 💖",
  subtitle: '"De repente, você virou o meu lugar favorito no mundo"',
  listHeader: "Pequenas coisas que mudaram em mim…",
  items: [
    {
      emoji: "💬",
      text: "A ansiedade boa de ouvir o barulhinho da sua mensagem",
    },
    {
      emoji: "😊",
      text: "Pegar-me sorrindo sozinho lembrando de uma fala sua",
    },
    {
      emoji: "💭",
      text: 'Ver qualquer detalhe no dia e pensar: "ela ia amar isso"',
    },
    {
      emoji: "🌙",
      text: "A calma instantânea que me dá só de deitar e conversar contigo",
    },
    {
      emoji: "✨",
      text: "O futuro deixar de ser uma dúvida e virar um plano juntos",
    },
    {
      emoji: "🎶",
      text: "Encontrar versos nossos em músicas que antes passavam batido",
    },
    {
      emoji: "📖",
      text: "Rever nossas primeiras fotos e ver o quanto já construímos",
    },
    { emoji: "☀️", text: "Começar o dia já querendo saber se você dormiu bem" },
  ],
  footer: "1 ano foi só o primeiro capítulo… ✨",
};

export const scratchPhoto = {
  badge: "✨ Raspe para revelar",
  title: "Para mim essa é a nossa foto favorita",
  hint: "Raspe aqui com o seu dedo ✨",
  photo: PHOTOS.favorite,
  note: "Melhor foto de todas ♡",
  date: "08.10.2026",
};

export const photoDeck = {
  badge: "Capítulo 4",
  title: "Momentos que a gente guarda",
  hint: "Arraste para o lado",
  photos: [
    { source: PHOTOS.deck01, caption: "Viagem 2026 ✨" },
    { source: PHOTOS.deck02, caption: "A tarde na praia" },
    { source: PHOTOS.deck03, caption: "Bons momentos" },
    { source: PHOTOS.deck04, caption: "Legenda 4" },
    { source: PHOTOS.deck05, caption: "Legenda 5" },
  ],
};

export interface QuizQuestion {
  question: string;
  options: string[];
  correctIndex: number;
  rewardPhoto: number;
  rewardCaption: string;
  feedbackSuccess: string;
}

// Perguntas e respostas são placeholders: edite com a história de vocês.
export const quiz = {
  title: "Interlúdio · O quiz do casal",
  wrongMessages: [
    "Tem certeza? Tente lembrar de novo...",
    "Hmm, não foi bem isso... 😅",
    "Quase! Mas não. Tente outra vez 💭",
  ],
  finale: "Você lembra de tudo! 💖",
  questions: [
    {
      question: "Quem demorou mais pra se arrumar no nosso primeiro encontro?",
      options: ["Eu", "Você", "Os dois", "Ninguém, chegamos cedo"],
      correctIndex: 1,
      rewardPhoto: PHOTOS.quiz01,
      rewardCaption: "Valeu a espera 💕",
      feedbackSuccess: "Acertou! 💖",
    },
    {
      question: "Qual foi a nossa primeira viagem juntos?",
      options: ["Praia", "Serra", "Cidade grande"],
      correctIndex: 0,
      rewardPhoto: PHOTOS.quiz02,
      rewardCaption: "Que viagem boa ✨",
      feedbackSuccess: "Memória de elefante! 🐘",
    },
    {
      question: "Qual foi a primeira música que a gente ouviu junto?",
      options: ["Música A", "Música B", "Música C"],
      correctIndex: 2,
      rewardPhoto: PHOTOS.quiz03,
      rewardCaption: "Nossa trilha 🎶",
      feedbackSuccess: "Essa é a nossa! 🎶",
    },
    {
      question: "Onde foi o nosso primeiro beijo?",
      options: ["Cinema", "Praça", "Em casa", "Restaurante"],
      correctIndex: 1,
      rewardPhoto: PHOTOS.quiz04,
      rewardCaption: "Pra sempre lembrado 😘",
      feedbackSuccess: "Perfeito! 😘",
    },
  ] satisfies QuizQuestion[],
};

export const letter = {
  greeting: "Meu amor,",
  paragraphs: [
    "Parece que foi ontem que tudo começou, mas já se passou 1 ano. É incrível como o tempo voa quando a gente está ao lado de quem faz a vida ser mais leve e divertida. Obrigado pela paciência, pelas risadas nos momentos mais inesperados e por ser essa pessoa fofa que transforma qualquer dia comum no melhor dia possível.",
    "Que venham muitos outros anos, planos e momentos para a gente guardar na memória nessa breve vida passageira.",
  ],
  signoff: "Feliz nosso dia!",
};

export const backCover = {
  meta: "— Colophon —",
  titleLines: ["Meu", "Primeiro", "— ano —"],
  subtitle: "",
  dedication:
    "Esta história continuará sendo escrita em cada manhã, nos pequenos detalhes e com muito amor.",
  timerLabel: "Juntos há exatamente",
  loveButton: "Eu Te Amo ❦",
  replayButton: "↺ Rever Nossa História",
  footer: "— fin. —",
};
