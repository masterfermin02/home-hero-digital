import { render, screen } from '@testing-library/react';
import App from './App';

test('Render the header of the form', () => {
  render(<App />);
  const header = screen.getByText(/Sign up for email updates/i);
  expect(header).toBeInTheDocument();
});