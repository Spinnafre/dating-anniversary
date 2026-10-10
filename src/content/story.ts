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
      text: "A sensação de paz e acolhimento que o seu abraço consegue me dar",
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
      text: "A calma instantânea que me dá só de conversar contigo",
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
  note: "Combinando no look ♡",
  date: "21.08.2026",
};

export const photoDeck = {
  badge: "Capítulo 4",
  title: "Momentos que a gente guarda",
  hint: "Arraste para o lado",
  photos: [
    { source: PHOTOS.deck01, caption: "Bem na hora da merendinha ✨" },
    { source: PHOTOS.deck02, caption: "Em Guaramiranga" },
    { source: PHOTOS.deck03, caption: "Foto na pracinha" },
    { source: PHOTOS.deck04, caption: "Bem na hora do pôr do sol" },
    { source: PHOTOS.deck05, caption: "Gatinha fofinha" },
    { source: PHOTOS.deck06, caption: "Fotinha em canoa quebrada" },
    { source: PHOTOS.deck07, caption: "Muito fofinha :)" },
  ],
};

export interface QuizQuestion {
  question: string;
  options: string[];
  correctIndex: number;
  rewardPhoto?: number | null;
  rewardCaption?: string | null;
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
      question: "Aonde comemoramos o nosso primeiro mês de namoro?",
      options: ["Cinema", "Cafeteria", "Pastelaria", "Ninguém, chegamos cedo"],
      correctIndex: 1,
      rewardPhoto: PHOTOS.quiz01,
      rewardCaption: "Valeu a espera 💕",
      feedbackSuccess: "Acertou! 💖",
    },
    {
      question: "Qual foi a nossa primeira viagem para praia que fomos?",
      options: ["Beira Mar", "Iracema", "Águas Belas", "Canoa Quebrada"],
      correctIndex: 2,
      rewardPhoto: PHOTOS.quiz02,
      rewardCaption: "Que viagem boa ✨",
      feedbackSuccess: "Memória de elefante! 🐘",
    },
    {
      question: "Qual o primeiro filme que assistimos no cinema?",
      options: [
        "Avatar",
        "Homem Aranha: um novo dia",
        "Superman",
        "Diabo veste prada 2",
      ],
      correctIndex: 2,
      rewardPhoto: null,
      rewardCaption: null,
      feedbackSuccess: "'Cause I'm a punk rocker, yes, I am ! 🎶",
    },
    {
      question: "Onde foi realizado o pedido de namoro?",
      options: [
        "Moranguinho",
        "Caminhada",
        "Na casa do Rei Davi",
        "Na casinha da Lulu",
      ],
      correctIndex: 1,
      rewardPhoto: null,
      rewardCaption: null,
      feedbackSuccess: "Eu estava bastante nervoso 🫣",
    },
    {
      question: "Onde foi o nosso primeiro beijo?",
      options: ["Cinema", "Shopping", "Em casa", "Restaurante"],
      correctIndex: 1,
      rewardPhoto: null,
      rewardCaption: null,
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
