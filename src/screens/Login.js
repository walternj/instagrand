import React, {Component} from 'react'
import { connect } from 'react-redux'
import {View, Text, StyleSheet, TouchableOpacity, TextInput, ScrollView} from 'react-native'
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view'

import { login } from '../store/actions/userAction'

class Login extends Component {
  state ={
    name: 'Temporaire',
    email: '',
    password: ''
  }
  componentDidUpdate = prevProps => {
    if (prevProps.isLoading && !this.props.isLoading) {
      this.props.navigation.navigate('Profile')
    }
  }

  login = () => {
    this.props.onLogin({ ...this.state })
    // this.props.navigation.navigate('Profile')
  }

  render() {
    return (
      <View style={styles.container}>
        <KeyboardAwareScrollView contentContainerStyle={styles.keyBoardContainer}
          enableOnAndroid={true}
          enableAutomaticScroll={true}
          keyboardOpeningTime={0} >
          <ScrollView contentContainerStyle={styles.scroll}>

              {/*      <View style={{flex: 1, maxHeight: 80, alignItems:"flex-start", width: '100%'}}>
                      <Header />
                    </View>  */}
            <View style={styles.formStyle}>   
             
              <TextInput placeholder= "Email..." style={styles.input}
                autoFocus={true} keyboardType= 'email-address'
                value={this.state.email}
                onChangeText={email => this.setState({email: email})}>
              </TextInput>
              <TextInput placeholder= "Mot de passe..." style={styles.input}
                secureTextEntry={true}
                value={this.state.password}
                onChangeText={password => this.setState({password: password})}>
              </TextInput>  

              <TouchableOpacity onPress={this.login} style={styles.buttom}>
                <Text style={styles.buttomText}>Login</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => {
                this.props.navigation.navigate('Register')
              }} style={styles.buttom}>
                <Text style={styles.buttomText}>Créer un compte</Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </KeyboardAwareScrollView>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignContent: 'center',
    justifyContent: 'center',
  
  },
  keyBoardContainer: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignContent: 'center',
    width: '100%',
    alignSelf: 'center',
    top: 75,
    alignContent : 'center'
  
  },
  scroll: {
    flexDirection: 'column',
    alignContent : 'center'
 
  },
  formStyle: {
    flex: 1, 
    justifyContent: 'center',
    alignItems:"center", 
    width: '100%'
  },
  
  buttom: {
    marginTop: 30,
    padding : 10,
    backgroundColor: '#4286F4',
    borderRadius: 5,
    height: 50,
    width: 200,
    alignItems: 'center'
  },
  buttomText: {
    fontSize: 20,
    color: '#FFF',
  },
  input: {
    marginTop: 20,
    width: '90%',
    backgroundColor: '#EEE',
    height: 40,
    borderWidth: 1,
    borderColor: '#333',
    paddingHorizontal: 5,
  },
  keyboardAvoidingWrapper: {
    // position: 'absolute',
    // bottom: 0,
    height: 450,
    width: '100%',
  },
})
const mapStateToProps = ({ user }) => {
  return {
    isLoading: user.isLoading
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onLogin: user => dispatch(login(user))
  }
}

//export default Login
export default connect(mapStateToProps, mapDispatchToProps)(Login)