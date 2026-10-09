import { render, screen } from '@testing-library/react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { CoverPage } from '../pages/CoverPage';
import { cover } from '../content/story';

const metrics = {
  frame: { x: 0, y: 0, width: 360, height: 780 },
  insets: { top: 24, left: 0, right: 0, bottom: 16 },
};

function renderCover() {
  return render(
    <SafeAreaProvider initialMetrics={metrics}>
      <CoverPage />
    </SafeAreaProvider>,
  );
}

describe('CoverPage', () => {
  it('mostra os textos da capa vindos do story.ts', () => {
    renderCover();

    expect(screen.getByText(cover.ornament)).toBeTruthy();
    expect(screen.getByText(cover.pretitle)).toBeTruthy();
    expect(screen.getByText(cover.title.join('\n'))).toBeTruthy();
    expect(screen.getByText(cover.subtitle)).toBeTruthy();
    expect(screen.getAllByText('⚜')).toHaveLength(2);
  });
});
