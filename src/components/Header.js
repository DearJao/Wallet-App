import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Header extends Component {
  render() {
    const { email, expensesValue } = this.props;

    const total = expensesValue.reduce((acc, currence) => (
      acc + Number(currence.value)
      * Number(currence.exchangeRates[currence.currency].ask)
    ), 0);

    return (
      <div>
        <header data-testid="header-component">
          <p data-testid="email-field">
            { email }
          </p>

          <p data-testid="total-field">
            { total.toFixed(2) }
          </p>

          <p data-testid="header-currency-field">
            BRL
          </p>
        </header>
      </div>
    );
  }
}

const mapStateToProps = ({ user, wallet }) => ({
  email: user.email,
  expensesValue: wallet.expenses,
});

Header.propTypes = {
  email: PropTypes.string,
  expensesValue: PropTypes.arrayOf(PropTypes.object),
}.isRequired;

export default connect(mapStateToProps)(Header);
