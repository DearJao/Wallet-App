import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { actionCurrency, actionExpenses } from '../redux/actions';

const alimento = 'Alimentação';

const INNITIAL_STATE = {
  id: 0,
  value: '0',
  currency: 'USD',
  method: 'Dinheiro',
  tag: alimento,
  description: '',
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

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({
      [name]: value,
    });
  };

  clearState = () => {
    const sumNum = 1;
    let { id } = this.state;
    this.setState({
      id: id += sumNum,
      value: '0',
      currency: 'USD',
      method: 'Dinheiro',
      tag: alimento,
      description: '',
    });
  };

  handleExpensesForm = () => {
    const { expensesInfo } = this.props;
    expensesInfo(this.state);
    this.clearState();
  }

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
        <form className="form-wallet">
          <label htmlFor="value-input" className="form-sections">
            Valor:
            <input
              data-testid="value-input"
              type="number"
              name="value"
              id="value-input"
              value={ value }
              onChange={ this.handleChange }
            />
          </label>

          <label htmlFor="currency-input" className="form-sections">
            Moeda
            <select
              data-testid="currency-input"
              name="currency"
              id="currency-input"
              value={ currency }
              onChange={ this.handleChange }
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
              onChange={ this.handleChange }
            >
              <option value="Dinheiro"> Dinheiro </option>
              <option value="Cartão de crédito"> Cartão de crédito </option>
              <option value="Cartão de débito"> Cartão de débito </option>
            </select>
          </label>

          <label htmlFor="tag-input" className="form-sections">
            Categoria:
            <select
              data-testid="tag-input"
              name="tag"
              id="tag-input"
              value={ tag }
              onChange={ this.handleChange }
            >
              <option value={ alimento }> Alimentação </option>
              <option value="Lazer"> Lazer </option>
              <option value="Trabalho"> Trabalho </option>
              <option value="Transporte"> Transporte </option>
              <option value="Saúde"> Saúde </option>
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
              onChange={ this.handleChange }
              placeholder="Descrição da despesa"
            />
          </label>

          <button
            type="button"
            className="form-button"
            onClick={ this.handleExpensesForm }
          >
            Adicionar despesa
          </button>

        </form>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  currencies: state.wallet.currencies,
});

const mapDispatchToProps = (dispatch) => ({
  currencyCoin: () => dispatch(actionCurrency()),
  expensesInfo: (payload) => dispatch(actionExpenses(payload)),
});

WalletForm.propTypes = {
  currencies: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
  currencyCoin: PropTypes.func.isRequired,
  expensesInfo: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(WalletForm);
