import React, { Component } from 'react';
import { Text } from 'react-native';
import firebase from 'react-native-firebase';
import { Button, Card, CardSection, Input, Spinner } from './common';

class LoginForm extends Component {
  state = { email: '',
   password: '',
    phone: '',
     error: '',
     loading: false,
      authingPhone: false,
      verificationCode: '',
      confirmResult: null
     };

  onLoginSuccess() {
    console.log('onSuccess');
    this.setState({
      email: '',
      password: '',
      loading: false,
      error: '',
      phone: '',
      authingPhone: false,
      verificationCode: '',
      confirmResult: null
    });
  }

  onLoginFail() {
    console.log('onError');
    this.setState({
      error: 'Authentication Failed',
      loading: false,
      authingPhone: false,
      verificationCode: false,
      confirmResult: null
    });
  }

  onButtonPress() {
    if (this.state.authingPhone) {
      this.state.confirmResult.confirm(this.state.verificationCode)
      .then(user => {
        console.log(user);
        this.onLoginSuccess();
      }) // User is logged in){
      .catch(error => {
        console.log(error);
        this.onLoginFail();
      });
      return;
    }

    this.setState({ error: '', loading: true });
    this.login();
  }

  login() {
    console.log('logging in...');
    const { email, password, phone } = this.state;
    console.log(email);
    console.log(password);
    console.log(phone);
    if (phone.length > 0) {      //firebase.auth().useDeviceLanguage();
      firebase.auth().signInWithPhoneNumber(this.state.phone)
      .then(confirmResult => {
        console.log(confirmResult);
        this.setState({ confirmResult, authingPhone: true, loading: false });
        // Error with verification code);
      })// save confirm result to use with the manual verification code)
      .catch(error => {
        console.log(error);
      });
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

  renderPhoneAuth() {
    if (this.state.authingPhone) {
      return (
        <CardSection>
         <Input
        label='Verification Code'
        placeholder='your_code'
        value={this.state.verificationCode}
        onChangeText={verificationCode => this.setState({ verificationCode })}
         />
        </CardSection>
      );
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
    const { errorTextStyle, normalTextStyle } = styles;
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

      <Text style={normalTextStyle}>
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

      <Text style={errorTextStyle} >
      {this.state.error}
      </Text>

      {this.renderPhoneAuth()}

      <CardSection>
      { this.renderButton() }
      </CardSection>

      </Card>
    );
  }
}

const styles = {
  errorTextStyle: {
    marginTop: 10,
    marginBottom: 10,
    fontSize: 20,
    alignSelf: 'center',
    color: 'red'
  },
  normalTextStyle: {
    marginTop: 10,
    marginBottom: 10,
    fontSize: 20,
    fontWeight: '600',
    alignSelf: 'center',
    color: 'black'
  }
};

export default LoginForm;
