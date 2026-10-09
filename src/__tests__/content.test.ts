import { PHOTOS } from '../content/photos';
import { START_DATE, quiz, thingsILove, somethingChanged } from '../content/story';

describe('conteúdo', () => {
  it('tem a estrutura esperada', () => {
    expect(START_DATE).toBeInstanceOf(Date);
    expect(thingsILove.items).toHaveLength(6);
    expect(somethingChanged.items).toHaveLength(8);
    expect(quiz.questions).toHaveLength(4);
    quiz.questions.forEach((q) => expect(q.correctIndex).toBeLessThan(q.options.length));
  });

  it('resolve todas as 11 fotos', () => {
    expect(Object.keys(PHOTOS)).toHaveLength(11);
  });
});
