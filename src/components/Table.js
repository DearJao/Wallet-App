import React, { Component } from 'react';

export default class Table extends Component {
  render() {
    return (
      <div>
        <table>
          <th className="th-table">Descrição</th>
          <th className="th-table">Tag</th>
          <th className="th-table">Método de pagamento</th>
          <th className="th-table">Valor</th>
          <th className="th-table">Moeda</th>
          <th className="th-table">Câmbio utilizado</th>
          <th className="th-table">Valor convertido</th>
          <th className="th-table">Moeda de conversão</th>
          <th className="th-table">Editar/Excluir</th>
        </table>
      </div>
    );
  }
}
