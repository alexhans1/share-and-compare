import React, { Component } from 'react';
import BanksList from './BanksList/BanksList';
import Loader from '../Loader/Loader'
import './Form.css';
import { Form, FormGroup, Label, Col, Input, Button, } from 'reactstrap'

class FormComponent extends Component {

  constructor(props) {
    super(props);
    this.state = {
      showLoader: false,
    }
  }

  componentWillReceiveProps() {
    this.setState({
      showLoader: false,
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.handleSubmit();
  }

  submitTimeOut = null;
  handleBankSearchInput(e) {
    let searchString = e.target.value;
    clearTimeout(this.submitTimeOut);
    if (searchString) {
      this.setState({
        showLoader: true,
      });
      this.submitTimeOut = setTimeout(() => {
        this.props.handleChangeFor('bankSearch', this.props.connection.id, searchString)(e);
      }, 1000)
    } else {
      this.setState({
        showLoader: false,
      });
    }
  }

  render() {
    const { connection, banksData, handleBankSelection, } = this.props;

    let bankInput = null;
    if (connection.bankId && connection.bankName) {
      bankInput =
        <div>
          <h4>Step 1 - Find and select your bank</h4>
          <hr/>
          <div className="alert alert-primary" role="alert">
            {connection.bankName}
            <i id="deleteBankId"
               className="fa fa-times"
               aria-hidden="true"
               onClick={handleBankSelection('', '', connection.id)} />
          </div>
        </div>
    } else {
      bankInput =
        <FormGroup>
          <h4>Step 1 - Find and select your bank</h4>
          <hr/>
          <Label style={{display: 'none'}} for="bankSearch" sm={3}>Your bank</Label>
          <Col sm={12}>
            <Input type="text"
                   onChange={this.handleBankSearchInput.bind(this)}
                   name="bankSearch" id="bankSearch" value={connection.bankSearch}
                   placeholder="Search your bank name, IBAN or BLZ" required />
          </Col>
          <div className="mt-3" style={
            {
              height: '64px',
              display: (this.props.banksData.banks.length) ? 'none' : 'normal'
            }
          }>
            {(this.state.showLoader) ?
              <Loader dark={true}/>
              :
              null}
          </div>
        </FormGroup>;
    }

    let banksList = null;
    if (banksData.banks.length) {
      banksList =
        <BanksList banksData={banksData}
                   connection={connection}
                   handleBankSelection={handleBankSelection.bind(this)} />;
    }

    let bankingUserInput = null;
    if (connection.bankId) {
      bankingUserInput =
        <div>
          <FormGroup>
            <h4>Step 2 - Enter your bank data</h4>
            <hr/>
            <Label for="bankingUserId" sm={3}>bankingUserId</Label>
            <Col sm={12}>
              <Input type="text"
                     onChange={this.props.handleChangeFor('bankingUserId', connection.id).bind(this)}
                     name="bankingUserId" id="bankingUserId" value={connection.bankingUserId}
                     placeholder="bankingUserId" required />
            </Col>
          </FormGroup>
          <FormGroup>
            <Label for="bankingPIN" sm={3}>bankingPIN</Label>
            <Col sm={12}>
              <Input type="password"
                     onChange={this.props.handleChangeFor('bankingPIN', connection.id).bind(this)}
                     name="bankingPIN" id="bankingPIN" value={connection.bankingPIN}
                     placeholder="bankingPIN" required />
            </Col>
          </FormGroup>
        </div>;
    }

    let submitButton = null;
    if (connection.bankId && connection.bankingUserId && connection.bankingPIN) {
      submitButton =
        <Button outline color={"danger"} style={{margin: "0 15px"}} onClick={this.handleSubmit.bind(this)}>
          Submit
        </Button>
    }

    return (
      <Form id="bankConnectionForm" className="">
        <div>
          {bankInput}
          {banksList}
        </div>
        {bankingUserInput}
        {submitButton}
      </Form>
    );
  }
}

export default FormComponent;
