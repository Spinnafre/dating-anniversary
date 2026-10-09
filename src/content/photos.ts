// require() estáticos: o Metro precisa dos caminhos literais.
// Para trocar uma foto, substitua o arquivo de mesmo nome em assets/photos/.
export const PHOTOS = {
  cover: require('../../assets/photos/cover.jpg'),
  favorite: require('../../assets/photos/favorite.jpg'),
  deck01: require('../../assets/photos/deck01.jpg'),
  deck02: require('../../assets/photos/deck02.jpg'),
  deck03: require('../../assets/photos/deck03.jpg'),
  deck04: require('../../assets/photos/deck04.jpg'),
  deck05: require('../../assets/photos/deck05.jpg'),
  quiz01: require('../../assets/photos/quiz01.jpg'),
  quiz02: require('../../assets/photos/quiz02.jpg'),
  quiz03: require('../../assets/photos/quiz03.jpg'),
  quiz04: require('../../assets/photos/quiz04.jpg'),
} as const;
