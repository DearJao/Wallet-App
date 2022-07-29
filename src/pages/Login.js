import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { actionLogin } from '../redux/actions';

class Login extends Component {
  constructor() {
    super();

    this.state = {
      email: '',
      passwordInput: '',
      isLoginButtonDisable: true,
      logged: false,
    };
  }

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({
      [name]: value,
    }, () => {
      this.handleCheckLength();
    });
  }

  handleCheckLength = () => {
    const { passwordInput, email } = this.state;

    const minCaractersNumber = 6;

    const re = /\S+@\S+\.\S+/;

    if (passwordInput.length >= minCaractersNumber && re.test(email)) {
      this.setState({
        isLoginButtonDisable: false,
      }, () => {});
    } else {
      this.setState({
        isLoginButtonDisable: true,
      }, () => {});
    }
  };

  handleLogin = () => {
    const { actionLogin: loginAction } = this.props;
    const { email } = this.state;
    loginAction(email);
    this.setState({
      logged: true,
    });
  }

  render() {
    const { email, passwordInput, isLoginButtonDisable, logged } = this.state;

    if (logged) {
      return <Redirect to="./carteira" />;
    }

    return (
      <div data-testid="page-login">
        <h1>Login</h1>
        <form>
          <input
            data-testid="email-input"
            type="email"
            name="email"
            value={ email }
            onChange={ this.handleChange }
          />
          <br />
          <input
            data-testid="password-input"
            type="password"
            name="passwordInput"
            value={ passwordInput }
            onChange={ this.handleChange }
          />
          <br />
          <button
            data-testid="login-submit-button"
            type="button"
            disabled={ isLoginButtonDisable }
            onClick={ this.handleLogin }
          >
            Entrar
          </button>
        </form>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  actionLogin: (email) => dispatch(actionLogin(email)),
});

Login.propTypes = {
  actionLogin: PropTypes.func.isRequired,
};

export default connect(null, mapDispatchToProps)(Login);
