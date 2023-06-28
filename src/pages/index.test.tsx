import { render } from '@testing-library/react';

import Homepage from './homepage/Homepage.page';

describe('Home Page', () => {
  it('renders without crashing', async () => {
    render(<Homepage />);
  });
});
