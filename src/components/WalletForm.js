import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  actionCurrency,
  actionExpenses,
  actionEditor,
} from '../redux/actions';

const alimento = 'Alimentação';

const INNITIAL_STATE = {
  id: 0,
  value: '',
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

  handleEditExp = () => {
    const { editorExpense, expenses, idEdit } = this.props;
    const indexEdit = expenses.map((expense) => expense.id).indexOf(idEdit);
    expenses[indexEdit] = {
      ...this.state,
      id: idEdit,
      exchangeRates: expenses[indexEdit].exchangeRates,
    };
    console.log(expenses);
    this.clearState();
    editorExpense(expenses);
    // editorErase(indexEdit);
  }

  clearState = () => {
    const sumNum = 1;
    let { id } = this.state;
    this.setState({
      id: id += sumNum,
      value: '',
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

    const { currencies, editing } = this.props;

    return (
      <div>
        <form className="form-wallet">
          <label htmlFor="value-input" className="form-sections">
            Valor:
            <input
              className="form-input"
              data-testid="value-input"
              type="number"
              name="value"
              id="value"
              value={ value }
              onChange={ this.handleChange }
            />
          </label>

          <label htmlFor="currency-input" className="form-sections">
            Moeda:
            <select
              className="form-input"
              data-testid="currency-input"
              name="currency"
              id="currency"
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
              className="form-input"
              data-testid="method-input"
              name="method"
              id="method"
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
              className="form-input"
              data-testid="tag-input"
              name="tag"
              id="tag"
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
              className="form-input"
              data-testid="description-input"
              type="text"
              name="description"
              id="description"
              value={ description }
              onChange={ this.handleChange }
              placeholder="Descrição da despesa"
            />
          </label>

          {editing ? (
            <button
              type="button"
              onClick={ this.handleEditExp }
            >
              Editar despesa
            </button>
          ) : (
            <button
              type="button"
              className="form-button"
              onClick={ this.handleExpensesForm }
            >
              Adicionar despesa
            </button>
          )}

        </form>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  currencies: state.wallet.currencies,
  expenses: state.wallet.expenses,
  editing: state.wallet.editing,
  idEdit: state.wallet.idEdit,
});

const mapDispatchToProps = (dispatch) => ({
  currencyCoin: () => dispatch(actionCurrency()),
  expensesInfo: (payload) => dispatch(actionExpenses(payload)),
  editorExpense: (expenses) => dispatch(actionEditor(expenses)),
  // editorErase: (id) => dispatch(actionErase(id)),
});

WalletForm.propTypes = {
  currencies: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
  currencyCoin: PropTypes.func.isRequired,
  expensesInfo: PropTypes.func.isRequired,
  editorExpense: PropTypes.arrayOf(PropTypes.string).isRequired,
  // editorErase: PropTypes.arrayOf(PropTypes.string).isRequired,
  expenses: PropTypes.objectOf.isRequired,
  idEdit: PropTypes.number.isRequired,
  editing: PropTypes.bool.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(WalletForm);
