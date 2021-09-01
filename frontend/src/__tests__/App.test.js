import {MemoryRouter} from 'react-router-dom';
import {render, screen} from '@testing-library/react'
import React from 'react';
import App from '../App';

test('full app Dashboard', () => {
  render(<App />, {wrapper: MemoryRouter})

  // verify page content for expected route
  expect(screen.getByText(/Dashboard/i)).toBeInTheDocument;
})


it('renders Dashboard', () => {
  render(<App />);
  expect(screen.getByText('Dashboard')).toBeInTheDocument;
});