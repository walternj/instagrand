import React, {Component} from 'react'
import { View, Text, StyleSheet, TouchableOpacity, TextInput, ScrollView} from 'react-native'
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view'
class Register extends Component {
  state = {
    name: '',
    email: '',
    password: '',
  }

  render(){
    return(
      <View style={styles.container}>
         <KeyboardAwareScrollView contentContainerStyle=              {styles.keyBoardContainer}
            enableOnAndroid={true}
            enableAutomaticScroll={true}
            keyboardOpeningTime={0} >
          <ScrollView contentContainerStyle={styles.scroll}>
            <View style={styles.formStyle}> 
              <TextInput placeholder='Nom' style={styles.input}
                autoFocus={true} value={this.state.name} 
                onChangeText={name => this.setState({name})}/>
              <TextInput placeholder='Email' style={styles.input}
                keyboardType = 'email-address' value={this.state.email}
                onChangeText={email => this.setState({email})}/>  
                <TextInput placeholder='Mot de passe' style={styles.input}
                secureTextEntry={true} value={this.state.password} 
                onChangeText={password => this.setState({password})}/>
                <TouchableOpacity onPress={() => {}} style={styles.buttom}>
                  <Text style={styles.buttomText}>Sauvegarder</Text>
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
    padding: 10,
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
    paddingHorizontal: 5
  }
})

export default Register