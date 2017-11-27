import React, { Component } from 'react';
import { connect } from 'react-redux';
import { emailChanged, passwordChanged, loginUser } from '../actions';
import { Card, CardSection, Input, Button } from './common';

class LoginForm extends Component {

  onEmailChange(text) {
    this.props.emailChanged(text);
  }

  onPasswordChange(text) {
    this.props.passwordChanged(text);
  }

  onButtonPress() {
    const { email, password } = this.props;
    console.log(email);
    console.log(password);
    this.props.loginUser({ email, password });
  }

  render() {
    return (
      <Card>
      <CardSection>
      <Input
        label='Email'
        placeholder='your_email@email.com'
        onChangeText={this.onEmailChange.bind(this)}
        value={this.props.email}
      />
      </CardSection>
      <CardSection>
      <Input
        secureTexEntry
        label='Password'
        placeholder='password'
        onChangeText={this.onPasswordChange.bind(this)}
        value={this.props.password}
      />
      </CardSection>
      <CardSection>
        <Button
          text='Login'
          onPress={this.onButtonPress.bind(this)}
        />
      </CardSection>
      </Card>
    );
  }
}

const mapStateToProps = (state) => {
  const { email, password } = state.auth;
  return {
    email,
    password
  };
};

export default connect(mapStateToProps, {
  emailChanged,
  passwordChanged,
  loginUser
})(LoginForm);
