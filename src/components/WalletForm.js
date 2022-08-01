import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { actionCurrency } from '../redux/actions';

const INNITIAL_STATE = {
  value: '0',
  currency: 'USD',
  method: '',
  tag: '',
  text: '',
};

class WalletForm extends Component {
  constructor() {
    super();

    this.state = INNITIAL_STATE;
  }

  componentDidMount() {
    const { currencyCoin } = this.props;
    currencyCoin();
  }

  onInputChange = ({ target }) => {
    const { name, value } = target;
    this.setState({
      [name]: value,
    });
  };

  render() {
    const {
      value,
      currency,
      method,
      tag,
      description,
    } = this.state;

    const { currencies } = this.props;

    return (
      <div>
        <form className="form-wallet" action="submit">
          <label htmlFor="value-input" className="form-sections">
            Valor:
            <input
              data-testid="value-input"
              type="number"
              name="value"
              id="value-input"
              value={ value }
              onChange={ this.onInputChange }
            />
          </label>

          <label htmlFor="currency-input" className="form-sections">
            Moeda
            <select
              data-testid="currency-input"
              name="currency"
              id="currency-input"
              value={ currency }
              onChange={ this.onInputChange }
            >
              {currencies.map((coin) => (
                <option value={ coin } key={ coin }>
                  { coin }
                </option>
              ))}
            </select>
          </label>

          <label htmlFor="method-input" className="form-sections">
            Metodo de pagamento:
            <select
              data-testid="method-input"
              name="method"
              id="method-input"
              value={ method }
              onChange={ this.onInputChange }
            >
              <option value="normal"> Dinheiro </option>
              <option value="raro"> Cartão de crédito </option>
              <option value="muito raro"> Cartão de débito </option>
            </select>
          </label>

          <label htmlFor="tag-input" className="form-sections">
            Categoria:
            <select
              data-testid="tag-input"
              name="tag"
              id="tag-input"
              value={ tag }
              onChange={ this.onInputChange }
            >
              <option value="normal"> Alimentação </option>
              <option value="raro"> Lazer </option>
              <option value="muito raro"> Trabalho </option>
              <option value="normal"> Transporte </option>
              <option value="normal"> Saúde </option>
            </select>
          </label>

          <label htmlFor="description-input" className="form-sections">
            Descrição:
            <input
              data-testid="description-input"
              type="text"
              name="description"
              id="description-input"
              value={ description }
              onChange={ this.onInputChange }
            />
          </label>
        </form>
      </div>
    );
  }
}

WalletForm.propTypes = {
  currencies: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
  currencyCoin: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  currencies: state.wallet.currencies,
});

const mapDispatchToProps = (dispatch) => ({
  currencyCoin: () => dispatch(actionCurrency()),
});

export default connect(mapStateToProps, mapDispatchToProps)(WalletForm);
