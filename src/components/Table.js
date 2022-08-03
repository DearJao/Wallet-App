import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Table extends Component {
  render() {
    const { expensesHistory } = this.props;

    return (
      <div>
        <table>
          <thead>
            <tr>
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
              <tr key={ item.id }>
                <td>{ item.description }</td>
                <td>{ item.tag }</td>
                <td>{ item.method }</td>
                <td>{ Number(item.value).toFixed(2) }</td>
                <td>{ item.exchangeRates[item.currency].name }</td>
                <td>{ Number(item.exchangeRates[item.currency].ask).toFixed(2) }</td>
                <td>
                  {
                    ((Number(item.value) * Number(
                      item.exchangeRates[item.currency].ask,
                    )).toFixed(2))
                  }
                </td>
                <td>Real</td>
                <td />
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}

const mapStateToProps = ({ wallet }) => ({
  expensesHistory: wallet.expenses,
});

Table.propTypes = {
  expensesHistory: PropTypes.arrayOf(PropTypes.object),
}.isRequired;

export default connect(mapStateToProps)(Table);
