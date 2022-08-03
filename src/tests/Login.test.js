import React from 'react';
import userEvent from '@testing-library/user-event';
import { screen } from '@testing-library/react';
import App from '../App';
import { renderWithRouterAndRedux } from '../tests/helpers/renderWith';

describe('verify all inputs and elements of the page Login', () => {
  it('verify if the text login apears in the first page', () => {
    renderWithRouterAndRedux(<App />);

    const login = screen.getByText(/login/i)
    expect(login).toBeInTheDocument()
  })

  it('verify if the input field have the correct format of validations', () => {
    renderWithRouterAndRedux(<App />);

    const loginInput = screen.getByRole
  })

  // it('', () => {
    
  // })
})