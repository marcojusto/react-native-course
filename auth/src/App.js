import React, { Component } from 'react';
import { SafeAreaView, View } from 'react-native';
//import firebase from 'firebase';
import { Header, Button, Spinner } from './components/common';
import LoginForm from './components/LoginForm';


class App extends Component {
  state = { loggedIn: null };

  componentWillMount() {
    /*firebase.initializeApp({
        apiKey: 'AIzaSyAcqccDc4TOGetXMMHhpNGev--AavQMLsE',
         authDomain: 'authentication-6ce0b.firebaseapp.com',
         databaseURL: 'https://authentication-6ce0b.firebaseio.com',
         projectId: 'authentication-6ce0b',
         storageBucket: 'authentication-6ce0b.appspot.com',
         messagingSenderId: '201741515166'
    });

    firebase.auth().onAuthStateChanged((user) => {
        if (user) {
          this.setState({ loggedIn: true });
        } else {
          this.setState({ loggedIn: false });
        }
    });*/
  }

  logout() {
    console.log('logging out...');
    //firebase.auth().signOut();
  }

  renderContent() {
    switch (this.state.loggedIn) {
      case true:
        return (
            <Button
              onPress={() => { this.logout(); }}
              text="Logout"
            />
        );
      case false:
        return <LoginForm />;
      default:
        return <Spinner size="large" />;
  }
}

  render() {
    const { safeAreaStyle } = styles;
    return (
      <SafeAreaView style={safeAreaStyle}>
        <View style={safeAreaStyle}>
            <Header
              headerText='Authentication'
              headerBackgroundColor={safeAreaStyle.backgroundColor}
            />
            { this.renderContent() }
        </View>
      </SafeAreaView>
    );
  }

}

const styles = {
  safeAreaStyle: {
    flex: 1,
    backgroundColor: '#ddd'
  }
};


export default App;
