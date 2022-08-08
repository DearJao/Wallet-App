import React from 'react';
import userEvent from '@testing-library/user-event';
import { screen } from '@testing-library/react';
import App from '../App';
import { renderWithRouterAndRedux } from '../tests/helpers/renderWith';

describe('verify all inputs and elements of the page Login', () => {
  it('verify if the text login apears in the first page', () => {
    renderWithRouterAndRedux(<App />);

    const login = screen.getByText(/login/i)
    expect(login).toBeDefined()
  })

  it('verify if the input field have the correct format of validations', () => {
    renderWithRouterAndRedux(<App />);

    const emailInput = screen.getByTestId('email-input');
    const passwordInput = screen.getByTestId('password-input');
    const btnLogin = screen.getByRole('button', { name: /entrar/i })

    userEvent.type(emailInput, 'teste@teste.com');
    userEvent.type(passwordInput, '123456');

    expect(emailInput.value).toBe('teste@teste.com');
    // expect(passwordInput).toHaveValue('123456');
    expect(btnLogin).not.toBe();

    userEvent.type(emailInput, 'teste#teste,com');
    userEvent.type(passwordInput, '12345');

    expect(emailInput).toHaveValue('teste#teste,com');
    expect(passwordInput).toHaveValue('12345');
    expect(btnLogin).toBeDisabled();
  })

  // it('', () => {

  // })
})