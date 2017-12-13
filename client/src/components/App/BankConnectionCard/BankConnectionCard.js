import React, { Component } from 'react';
import './BankConnectionCard.css'
// import { Collapse, Button, } from 'reactstrap';
import { Collapse, Button, CardBody, Card } from 'reactstrap';

export default class Example extends Component {
  constructor(props) {
    super(props);
    this.toggle = this.toggle.bind(this);
    this.state = { collapse: false };
  }

  toggle() {
    this.setState({ collapse: !this.state.collapse });
  }

  render() {
    return (
      <div>
        <Button color="primary" onClick={this.toggle} style={{ marginBottom: '1rem' }}>Toggle</Button>
        <Collapse isOpen={this.state.collapse}>
          <Card>
            <CardBody>
              Anim pariatur cliche reprehenderit,
              enim eiusmod high life accusamus terry richardson ad squid. Nihil
              anim keffiyeh helvetica, craft beer labore wes anderson cred
              nesciunt sapiente ea proident.
            </CardBody>
          </Card>
        </Collapse>
      </div>
    );
  }
}
//
// export default class BankConnectionCard extends Component {
//
//   handleBankConnectionDelete () {
//     this.props.deleteBankConnection(this.props.connection.id);
//   }
//
//   render() {
//     const { connection, isCollapsed, toggleCollapse, } = this.props;
//     return (
//       <div className="alert alert-light" role="alert">
//         {connection.bankName}
//         <Button id="editBankConnection" outline size={"sm"} color="light" onClick={toggleCollapse}>
//           <i className="fa fa-bars" aria-hidden="true" />
//         </Button>
//         <Collapse isOpen={isCollapsed} cssModule={{transition: 'none'}}>
//           <Button size={"sm"} color={"dark"} >
//             <i className="fa fa-pencil" aria-hidden="true" />
//           </Button>
//           <br/>
//           <Button size={"sm"} color={"dark"} onClick={this.handleBankConnectionDelete.bind(this)} >
//             <i className="fa fa-times" aria-hidden="true" />
//           </Button>
//         </Collapse>
//       </div>
//     );
//   }
// }
