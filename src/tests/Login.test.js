import React from 'react';
import userEvent from '@testing-library/user-event';
import { screen } from '@testing-library/react';
import App from '../App';
import { renderWithRouterAndRedux } from '../tests/helpers/renderWith';

describe('verify all inputs and elements of the page Login', () => {
  it('', () => {
    renderWithRouterAndRedux(<App />);

    const login = screen.getByText(/login/i)

    expect(login).toHaveTextValue(/login/i)
  })
})