import React, { Component } from 'react';
import './BankConnectionCard.css'
import { Collapse, Button, } from 'reactstrap';

export default class BankConnectionCard extends Component {

  handleBankConnectionDelete () {
    this.props.deleteBankConnection(this.props.connection.id);
  }

  handleToggleCollapse() {
    this.props.toggleCollapse(this.props.connection.id);
  }

  render() {
    const { connection, } = this.props;
    return (
      <div className="alert alert-light" role="alert">
        {connection.bankName}
        <Button id="editBankConnection" outline size={"sm"} color="light"
                onClick={this.handleToggleCollapse.bind(this)}>
          <i className="fa fa-bars" aria-hidden="true" />
        </Button>
        <Collapse isOpen={connection.isCollapsed} cssModule={{transition: 'none'}}>
          <Button size={"sm"} color={"dark"} >
            <i className="fa fa-pencil" aria-hidden="true" />
          </Button>
          <br/>
          <Button size={"sm"} color={"dark"} onClick={this.handleBankConnectionDelete.bind(this)} >
            <i className="fa fa-times" aria-hidden="true" />
          </Button>
        </Collapse>
      </div>
    );
  }
}
