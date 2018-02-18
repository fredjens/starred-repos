import React, { Component } from 'react';
import autoBind from 'react-autobind';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import {
  getAuthStatus,
  checkAuthentication,
} from '../ducks/authentication';

class AuthWrapper extends Component {
  checkAuth() {
    const {  authenticated, checkAuthentication } = this.props;

    if (!authenticated) {
      checkAuthentication();
    }
  }

  componentWillMount() {
    this.checkAuth();
  }

  componentDidUpdate() {
    this.checkAuth();
  }

  render() {
    const { authenticated, children } = this.props;
    return authenticated ? children : <div>unauthorized</div>;
  }
};


const mapStateToProps = state => ({
  authenticated: getAuthStatus(state),
});

const mapDispatchToProps = dispatch => bindActionCreators({
  checkAuthentication,
}, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(AuthWrapper);
