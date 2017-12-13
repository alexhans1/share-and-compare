import React, { Component } from 'react';
import { Table  } from 'reactstrap';
import Pagination from "./Pagination/Pagination";

class BanksList extends Component {

  render() {
    const { connection, banksData, handleBankSelection } = this.props;
    let pagination;
    if (banksData.paging && banksData.paging.pageCount > 1) {
      pagination = <Pagination banksData={banksData} />;
    }
    return (
      <div>
        <Table hover bordered>
          <tbody>
          {banksData.banks.map((bank) => {
            return <tr key={bank.id} style={{cursor: 'pointer'}}
                       onClick={handleBankSelection(bank.id, bank.name, connection.id)}>
              <td>{bank.name} - {bank.city}</td>
            </tr>;
          })}
          </tbody>
        </Table>
        {pagination}
      </div>
    );
  }
}

export default BanksList;
