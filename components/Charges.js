import React, { Component, Fragment } from 'react';
import { connect } from "react-redux";
import Content from './containers/Content';
import Navigation from './containers/Navigation';
import Header from './elements/Header';

class Charges extends Component {
  render() {
    return (
      <Fragment>
        <Header />
        <Content />
        <Navigation />
      </Fragment>
    )
  }
}

export default connect()(Charges);
