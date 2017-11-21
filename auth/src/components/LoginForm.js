import React, { Component } from 'react';
import { Text } from 'react-native';
import firebase from 'firebase';
import { Button, Card, CardSection, Input, Spinner } from './common';

class LoginForm extends Component {
  state = { email: '', password: '', error: '', loading: false };

  onLoginSuccess() {
    this.setState({
      email: '',
      password: '',
      loading: false,
      error: ''
    });
  }

  onLoginFail() {
    this.setState({
      error: 'Authentication Failed',
      loading: false
    });
  }

  onButtonPress() {
    this.setState({ error: '', loading: true });
    this.login();
  }

  login() {
    const { email, password } = this.state;
    firebase.auth().signInWithEmailAndPassword(email, password)
    .then(this.onLoginSuccess.bind(this))
    .catch(() => {
      firebase.auth().createUserWithEmailAndPassword(email, email)
      .then(this.onLoginSuccess.bind(this))
      .catch(this.onLoginFail.bind(this));
    });
  }

  renderButton() {
    if (this.state.loading) {
      return <Spinner size='small' />;
    }
    return (
      <Button
      text='Log in'
      onPress={this.onButtonPress.bind(this)}
      />
    );
  }

  render() {
    const { errorTextStyle } = styles;
    return (
      <Card>
      <CardSection>
      <Input
      label='E-mail'
      placeholder='your_email@mail.com'
      value={this.state.email}
      onChangeText={email => this.setState({ email })}
      />
      </CardSection>

      <CardSection>
      <Input
      label='Password'
      placeholder='password123'
      secureEntry
      value={this.state.password}
      onChangeText={password => this.setState({ password })}
      />
      </CardSection>

      <Text style={errorTextStyle}>
      {this.state.error}
      </Text>

      <CardSection>
      { this.renderButton() }
      </CardSection>
      </Card>
    );
  }
}

const styles = {
  errorTextStyle: {
    fontSize: 20,
    alignSelf: 'center',
    color: 'red'
  }
};

export default LoginForm;
