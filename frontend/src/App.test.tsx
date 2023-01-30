import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import App from './App';

test('renders Bank App', () => {
  render(<App />);

  const titleElement = screen.getByText('Bank App');
  expect(titleElement).toBeInTheDocument();
});
