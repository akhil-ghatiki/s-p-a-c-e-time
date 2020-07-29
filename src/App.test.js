import React from 'react';
import { render } from '@testing-library/react';
import App from './App';

test('renders rage text', () => {
  const { getByText } = render(<App />);
  const textElement = getByText(/Rage, rage against the dying of the light/i);
  expect(textElement).toBeInTheDocument();
});
