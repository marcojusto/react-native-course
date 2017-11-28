import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import firebase from 'firebase';
import ReduxThunk from 'redux-thunk';
import reducers from './reducers';
import Router from './Router';

class App extends Component {
  componentWillMount() {
    const config = {
      apiKey: 'AIzaSyAGWkiwFpGY3SgAs10xSAwBfpSAAjA_7r0',
      authDomain: 'manager-a8109.firebaseapp.com',
      databaseURL: 'https://manager-a8109.firebaseio.com',
      projectId: 'manager-a8109',
      storageBucket: 'manager-a8109.appspot.com',
      messagingSenderId: '41588103257'
    };
    firebase.initializeApp(config);
  }

  render() {
    const store = createStore(reducers, {}, applyMiddleware(ReduxThunk));
    return (
      <Provider store={store}>
      <Router />
      </Provider>
    );
  }
}

export default App;
