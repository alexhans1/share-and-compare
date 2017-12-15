import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';
// import logo from '../../../images/logo.png';

import { Collapse, Navbar, NavbarToggler, Nav, NavItem, } from 'reactstrap';

class myNavbar extends Component {

  constructor() {
    super();

    this.toggleNavbar = this.toggleNavbar.bind(this);
    this.closeToggle = this.closeToggle.bind(this);
    this.state = {
      isOpen: false,
    };
  }

  closeToggle() {
    if (this.state.isOpen){
      this.setState({
        isOpen: false,
      });
    }
  }

  toggleNavbar() {
    this.setState({
      isOpen: !this.state.isOpen,
    });
  }

  render() {
    return (
      <div className="container-fluid" id="navbar-container">
        <Navbar color="faded" light expand="md">
          <Link to={"/"} className={"navbar-brand"}>
            <img className={""} src="http://now.debating.de/static/media/logo.935afbbf.png" width="120" height="120" alt="" />
          </Link>
          <NavbarToggler onClick={this.toggleNavbar} />
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav navbar>
              <NavItem>
                <Link to={"/"} onClick={this.closeToggle} className={"nav-link"}>
                  Home
                </Link>
              </NavItem>
            </Nav>
          </Collapse>
        </Navbar>
      </div>
    )
  }
}

export default myNavbar;


