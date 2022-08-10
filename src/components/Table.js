import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { actionErase, actionGetEditId } from '../redux/actions';

class Table extends Component {
  handleEraser = ({ target }) => {
    const { name } = target;
    const { expenseEraser } = this.props;
    expenseEraser(name);
  }

  handleEdit = (id) => {
    const { expenseEdit } = this.props;
    expenseEdit(id);
  }

  render() {
    const { expensesHistory } = this.props;
    console.log(expensesHistory);
    return (
      <div>
        <table>
          <thead>
            <tr className="tr-table1">
              <th className="th-table">Descrição</th>
              <th className="th-table">Tag</th>
              <th className="th-table">Método de pagamento</th>
              <th className="th-table">Valor</th>
              <th className="th-table">Moeda</th>
              <th className="th-table">Câmbio utilizado</th>
              <th className="th-table">Valor convertido</th>
              <th className="th-table">Moeda de conversão</th>
              <th className="th-table">Editar/Excluir</th>
            </tr>
          </thead>
          <tbody>
            {expensesHistory.map((item) => (
              <tr key={ item.id } className="tr-table2">
                <td className="td-table">{ item.description }</td>
                <td className="td-table">{ item.tag }</td>
                <td className="td-table">{ item.method }</td>
                <td className="td-table">{ Number(item.value).toFixed(2) }</td>
                <td className="td-table">{ item.exchangeRates[item.currency].name }</td>
                <td className="td-table">
                  { Number(item.exchangeRates[item.currency].ask).toFixed(2) }
                </td>
                <td className="td-table">
                  {
                    ((Number(item.value) * Number(
                      item.exchangeRates[item.currency].ask,
                    )).toFixed(2))
                  }
                </td>
                <td className="td-table">Real</td>
                <td className="td-table">
                  <button
                    type="button"
                    name={ item.id }
                    className="btn-table1"
                    data-testid="edit-btn"
                    onClick={ () => this.handleEdit(item.id) }
                  >
                    Editar
                  </button>
                  <button
                    type="button"
                    name={ item.id }
                    className="btn-table2"
                    data-testid="delete-btn"
                    onClick={ this.handleEraser }
                  >
                    Excluir
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  expenseEraser: (id) => dispatch(actionErase(id)),
  expenseEdit: (id) => dispatch(actionGetEditId(id)),
});

const mapStateToProps = ({ wallet }) => ({
  expensesHistory: wallet.expenses,
});

Table.propTypes = {
  expensesHistory: PropTypes.arrayOf(PropTypes.object),
}.isRequired;

export default connect(mapStateToProps, mapDispatchToProps)(Table);
