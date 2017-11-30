import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { connect } from 'react-redux';
import { emailChanged, passwordChanged, loginUser } from '../actions';
import { Card, CardSection, Input, Button, Spinner } from './common';

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

  renderButton() {
    if (this.props.loading) {
      return <Spinner size="large" />;
    }
    return (
      <Button
      text='Login'
      onPress={this.onButtonPress.bind(this)}
      />
    );
  }

  renderError() {
    if (this.props.error) {
      return (
        <View style={{ backgroundColor: 'white' }}>
        <Text style={styles.errorTextStyle}>
        {this.props.error}
        </Text>
        </View>
      );
    }
  }

  render() {
    return (
      <Card>
      <CardSection>
      <Input
      capitalize='none'
      label='Email'
      placeholder='your_email@email.com'
      onChangeText={this.onEmailChange.bind(this)}
      value={this.props.email}
      />
      </CardSection>
      <CardSection>
      <Input
      secureEntry
      label='Password'
      placeholder='password'
      onChangeText={this.onPasswordChange.bind(this)}
      value={this.props.password}
      />
      </CardSection>
      {this.renderError()}
      <CardSection>
      {this.renderButton()}
      </CardSection>
      </Card>
    );
  }
}

const styles = {
  containerStyle: {
    marginTop: -60
  },
  errorTextStyle: {
    fontSize: 20,
    alignSelf: 'center',
    color: 'red'
  }
};

const mapStateToProps = ({ auth }) => {
  const { email, password, error, loading } = auth;
  return {
    error,
    email,
    password,
    loading
  };
};

export default connect(mapStateToProps, {
  emailChanged,
  passwordChanged,
  loginUser
})(LoginForm);
