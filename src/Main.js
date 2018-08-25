import React, { Component } from 'react';
import { Text, View } from 'react-native';
import firebase from 'firebase';
import Header from './ortak/Header';
import LoginForm from './LoginForm';
import CardSection from './ortak/CardSection';
import Spinner from './ortak/Spinner';
import Button from './ortak/Button';

type Props = {};
export default class App extends Component<Props> {
  state = { loggedIn: null };
  componentWillMount() {
      firebase.initializeApp({
    apiKey: 'test',
    authDomain: 'test',
    databaseURL: 'test',
    projectId: 'test',
    storageBucket: 'test',
    messagingSenderId: 'test'
  });

  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      this.setState({ loggedIn: true });
    } else {
      this.setState({ loggedIn: false });
    }
  });
  }

  clickLogout() {

      firebase.auth().signOut();
  }

  renderContent() {
    switch (this.state.loggedIn) {
      case true:
      return (
        <CardSection>
          <Button onPress={this.clickLogout.bind(this)}>Cikis</Button>
        </CardSection>
      );
      case false:
        return (
          <LoginForm />
        );
      default:
        return (
          <View>
            <Spinner size="large" />
          </View>
        );

    }
  }


  render() {
    return (
      <View>
        <Header headerText="Login Screen" />
          {this.renderContent()}
      </View>
    );
  }
}
