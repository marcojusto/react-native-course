import React, { Component } from 'react';
import { Text } from 'react-native';
//import firebase from 'firebase';
//import firebase from 'react-native-firebase';
import { Button, Card, CardSection, Input, Spinner } from './common';

class LoginForm extends Component {
  state = { email: '', password: '', phone: '', error: '', loading: false };

  onLoginSuccess() {
    console.log('onSuccess');
    this.setState({
      email: '',
      password: '',
      loading: false,
      error: ''
    });
  }

  onLoginFail() {
    console.log('onError');
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
    console.log('logging in...');
    const { email, password, phone } = this.state;
    console.log(email);
    console.log(password);
    console.log(phone);
    if (phone != null) {
      firebase.auth().useDeviceLanguage();
    } else {
      firebase.auth().signInWithEmailAndPassword(email, password)
      .then(this.onLoginSuccess.bind(this))
      .catch(() => {
        firebase.auth().createUserWithEmailAndPassword(email, email)
        .then(this.onLoginSuccess.bind(this))
        .catch(this.onLoginFail.bind(this));
      });
    }
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
        OR
      </Text>

      <CardSection>
        <Input
        label='Phone number'
        placeholder='your_phone_number'
        value={this.state.phone}
        onChangeText={phone => this.setState({ phone })}
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
