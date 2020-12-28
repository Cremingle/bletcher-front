import React, { Component } from 'react';

import NavBar from 'Components/Common/NavBar';
import SignInContainer from 'Components/Sign/SignInContainer';
import RoundLoader from 'Components/Loader/Round';

class SignInPage extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <>
        <NavBar isActive="signIn" />
        <div className="signInPage">
          <div className="signInPage__header">
            <p>Welcome to Bletcher</p>
          </div>
          <SignInContainer />
          <div className="signInPage__footer">
            <span>Already have an account? </span>
            <a href="/signup">Sign Up</a>
          </div>
        </div>
        <RoundLoader />
      </>
    );
  }
}

export default SignInPage;
