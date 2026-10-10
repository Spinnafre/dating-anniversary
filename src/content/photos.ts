// O require.context permite carregar os arquivos de forma dinâmica no Metro
const ctx = (require as any).context("../../assets/photos", false, /\.(webp|jpg)$/);

function getPhoto(name: string) {
  const webp = `./${name}.webp`;
  const jpg = `./${name}.jpg`;
  const keys = ctx.keys();

  // Prioriza o formato .webp (foto real), faz fallback para .jpg (mock)
  if (keys.includes(webp)) {
    return ctx(webp);
  }
  if (keys.includes(jpg)) {
    return ctx(jpg);
  }

  console.warn(`Foto não encontrada: ${name}`);
  return null;
}

export const PHOTOS = {
  cover: getPhoto("cover"),
  favorite: getPhoto("favorite"),
  deck01: getPhoto("deck01"),
  deck02: getPhoto("deck02"),
  deck03: getPhoto("deck03"),
  deck04: getPhoto("deck04"),
  deck05: getPhoto("deck05"),
  deck06: getPhoto("deck06"),
  deck07: getPhoto("deck07"),
  quiz01: getPhoto("quiz01"),
  quiz02: getPhoto("quiz02"),
} as const;
