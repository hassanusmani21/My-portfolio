import { render, screen } from '@testing-library/react';
import App from './App';

test('renders portfolio section title', () => {
  render(<App />);
  const sectionTitle = screen.getByText(/portfolio/i);
  expect(sectionTitle).toBeTruthy();
});
