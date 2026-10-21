import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import axios from 'axios';
import App from './App';

jest.mock('axios');

test('renders event home page', async () => {
  localStorage.clear();
  axios.get.mockResolvedValue({ data: [] });

  render(
    <BrowserRouter>
      <App />
    </BrowserRouter>
  );

  expect(await screen.findByText('Sự kiện CLB')).toBeInTheDocument();
});
