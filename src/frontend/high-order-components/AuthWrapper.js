import React, { Component } from 'react';
import autoBind from 'react-autobind';

import firebase from 'firebase';
import config from '../config';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { addUserToDatabase } from '../ducks';

import { startFirebase } from '../services/firebase';

firebase.initializeApp(config);

class AuthWrapper extends Component {
    constructor(props) {
      super(props);
      autoBind(this);
      this.state = {
        authenticated: false,
      }
    }

    componentWillMount() {
      this.checkAuthenication();
    }

    componenDidUpate() {
      this.checkAuthenication();
    }

    checkAuthenication() {
      firebase.auth().onAuthStateChanged(user => {
        if (user) {
          console.log('signed in', user);
          this.setState({ authenticated: true });
          startFirebase(user.uid, firebase);
        }

        if (!user) {
          this.setState({ authenticated: false });
          this.authenticateUser();
        }
      });
    }

    async authenticateUser() {
      const { addUserToDatabase } = this.props;

      console.log('starting authenication');
      const provider = new firebase.auth.GithubAuthProvider();

      const user = await firebase.auth().signInWithPopup(provider);
      startFirebase(user.user.uid);

      addUserToDatabase(user);

      this.setState({
        authenticated: true,
      });
    }

    render() {
      const { authenticated } = this.state;
      const { children } = this.props;

      return authenticated ? children : (<div>unauthorized</div>);
    }
  };


const mapDispatchToProps =  (dispatch) => bindActionCreators({
  addUserToDatabase,
}, dispatch);

export default connect(
  undefined,
  mapDispatchToProps,
)(AuthWrapper);
