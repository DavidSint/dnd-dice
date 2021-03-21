import { render, screen } from '@testing-library/react';
import App from './App';

test('renders Dice header', () => {
  render(<App />);
  const headerElement = screen.getByText(/Dice/i);
  expect(headerElement).toBeInTheDocument();
});
