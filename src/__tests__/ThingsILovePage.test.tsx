import { render, screen } from '@testing-library/react-native';

import { ThingsILovePage } from '../pages/ThingsILovePage';
import { thingsILove } from '../content/story';

describe('ThingsILovePage', () => {
  it('mostra os textos do capítulo 1', () => {
    render(<ThingsILovePage />);

    expect(screen.getByText(thingsILove.title)).toBeTruthy();
    expect(screen.getByText(thingsILove.badge)).toBeTruthy();
    
    // Check for some of the items
    expect(screen.getByText(thingsILove.items[0].text)).toBeTruthy();
    expect(screen.getByText(thingsILove.items[thingsILove.items.length - 1].text)).toBeTruthy();
  });
});
