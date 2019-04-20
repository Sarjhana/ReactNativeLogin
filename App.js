/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Platform, StyleSheet, Alert, Button, Text, View, TextInput, TouchableOpacity } from 'react-native';
import {createAppContainer, createStackNavigator } from 'react-navigation'
import { AsyncStorage, ActivityIndicator } from 'react-native';

//type Props = {};
 class LoginScreen extends React.Component {
  constructor(){
    super();
    this.state = {
      value: '',
      hasToken: false, isLoaded: false
    };
    this.handleChangeText = this.handleChangeText.bind(this);
    }

    handleChangeText(newText) {
      this.setState({
        value: newText
      });
      //Alert.alert(newText)
    }
    componentDidMount() {
      AsyncStorage.getItem('id_token').then((token) => {
        this.setState({ hasToken: token !== null, isLoaded: true })
      });
    }
    async saveItem(item, selectedValue) {
      try {
        await AsyncStorage.setItem(item, selectedValue);
      } catch (error) {
      Alert.alert('AsyncStorage error: ' + error.message);
      }
    }
 
  render() {
    if (!this.state.isLoaded){
      return (
        <ActivityIndicator />
      )
    } else {
      if (this.state.hasToken){
        this.props.navigation.navigate('HomeScreen');
      }
    return (
      
      <View style={styles.container}>
      <View style={styles.container1}>
        <Text style={styles.login}>LOGIN</Text>      
      </View>
      
      <View style={styles.textcontainer}> 
      <TextInput style={styles.gen} placeholder = "username" />
      <TextInput style={styles.gen} placeholder = "password" 
        onChangeText={this.handleChangeText} />
    </View>
    
    <View style={styles.buttoncontainer}>
    <TouchableOpacity style={styles.button}
    onPress={() => { if(this.state.value === 'svce')
      { 
        this.saveItem('id_token','1');
        this.props.navigation.navigate('Home');
        
      }
      else{
        Alert.alert('Wrong')
      }
      }   
    }>
    <Text style={styles.buttontext}>Submit</Text>
    </TouchableOpacity> 
  </View>
  </View>
    );
  }
  }
}


class HomeScreen extends React.Component {
  render() {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          <Text style={styles.ho}> HOME </Text>
      </View>
    );
  }
}

const RootStack = createStackNavigator(
  {
    Login: {
      screen: LoginScreen,
    },
    Home: {
      screen: HomeScreen,
    },
  },
  {
    initialRouteName: 'Login',
  }
);

/*class Authentication extends Component {
  async saveItem(item, selectedValue) {
    try {
      await AsyncStorage.setItem(item, selectedValue);
    } catch (error) {
    Alert.alert('AsyncStorage error: ' + error.message);
    }
  }
}
export default Authentication;

*/
const AppContainer = createAppContainer(RootStack);

export default class App extends React.Component {
  render() {
    return <AppContainer />;
  }
}

const styles = StyleSheet.create({
  container1: {
    flex: 1,
    justifyContent: 'center',
    marginBottom: 15,
    },

  container: {
    flex:1,
    backgroundColor: '#191414',
    alignItems: 'center',

 },
  login: {
    fontSize: 30,
    color: '#fff',
    textAlign: 'center',
    paddingTop: 30,
    
  },
  gen: {

    textAlign: 'center',
    color: '#fff',
    
    fontSize: 20
    
  },

ho: {
    fontSize: 30,
    color: '#000',
    textAlign: 'center',
    paddingTop: 50,
    
  },
  textcontainer: {
    flex: 2,
    justifyContent: 'center',
    paddingTop: 5,
    
    height: 20,
    alignItems: 'center',
    
  },
  button: {
    textAlign: 'center',
    backgroundColor: '#1db954',
    color: "#140606",
    fontSize: 10,
  },
  buttontext: {
    textAlign: 'center',
    color: '#fff',
    fontSize: 25
  },
  buttoncontainer: {
    padding: 20,
    alignItems: 'center',
    backgroundColor: "#1db954",
    marginBottom: 70
  }
});
