import React, { Component } from 'react';
import './Loader.css';

class Loader extends Component {

  render() {

    return (
      <div className="spinner">
        <div className="bounce1" style={ (this.props.dark) ? {backgroundColor: 'var(--dark)'} : null } />
        <div className="bounce2" style={ (this.props.dark) ? {backgroundColor: 'var(--dark)'} : null } />
        <div className="bounce3" style={ (this.props.dark) ? {backgroundColor: 'var(--dark)'} : null } />
      </div>
    )
  }
}

export default Loader;


