import React, { Component } from 'react';
import { connect } from 'react-redux'
import { addPost } from '../store/actions/actionPosts'
import * as ImagePicker from 'expo-image-picker'
//import { Formik } from 'formik';
//import { Button, TextInput } from 'react-native-paper';
import {View, Text, StyleSheet, TouchableOpacity,TextInput, Image, Dimensions, Platform, ScrollView, Alert} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome'
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view'

import Header from '../components/Header'

const noUser = 'Vous devez vous connecter pour ajouter une image '

class AddPhoto extends Component {
    state = {
        image: null,
        comment: '',
    }

    componentDidUpdate = prevProps => {
        if (prevProps.loading && !this.props.loading) {
            this.setState({
                image: null,
                comment: ''
            })
            this.props.navigation.navigate('Feed')
        }        
    }

    pickLocalImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            base64: true,
        });

        console.log(result);

        if (!result.cancelled) {
            this.setState({ image: result.uri });
        }
    }

    pickCameraImage = async () => {
        let result = await ImagePicker.launchCameraAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
        });

        console.log(result);

        if (!result.cancelled) {
            this.setState({ image: result.uri });
        }
    }
    
    save = async () => {
        if (!this.props.name) {
            Alert.alert('Erreur!', noUser)
            return
        }
        this.props.onAddPost({
            id: Math.random(),
            nickname: this.props.name,
            email: this.props.email,
            image: this.state.image,
            comments: [{
                nickname: this.props.name,
                comment: this.state.comment,
            }]
        })
        /* this.setState({ image: null, comment: ''})
        this.props.navigation.navigate('Feed') */
    }

    render() {
        return(
            <KeyboardAwareScrollView 
                enableOnAndroid={true}
                enableAutomaticScroll={true}
                keyboardOpeningTime={0} >
            <ScrollView>
                <Header />
                <View style={styles.container}>
                    <Text style={styles.title}>Partagez une photo</Text>
                    <View style={styles.imageContainer}>
                        <Image source={{ uri: this.state.image }} style={styles.image} />
                    </View>
                    <TextInput placeholder='Un commentaire pour ta photo?...'
                        style={styles.input} value={this.state.comment}
                        editable={this.props.name != null}
                        onChangeText={comment => this.setState({ comment })}>
                    </TextInput>      
                    <View style={styles.choicesContainer}> 
                        <Text style={styles.butttomText}>Postez une photo</Text>

                        <View style={styles.buttonsContainer}>
                            <TouchableOpacity style={{alignItems:'center'}} 
                                onPress={this.pickLocalImage}  >
                                <Icon name='folder' size={30} color="#000" />
                                <Text > stockage</Text>
                            </TouchableOpacity>  

                            <TouchableOpacity style={{alignItems:'center'}} 
                                onPress={this.pickCameraImage}  >
                                <Icon name='camera' size={30} color="#000" />
                                <Text >camera</Text>
                            </TouchableOpacity> 

                            <TouchableOpacity style={[styles.buttom ,this.props.loading ? styles.buttomDisabled : null]}
                                    onPress={this.save} 
                                    disabled={this.props.loading}>
                                <Icon name={this.props.loading ? 'spinner' :'share'} size={30} color="#000"/>  
                                    <Text >share</Text>
                            </TouchableOpacity>
                        </View>
                    </View>     
                </View>
            </ScrollView>
            </KeyboardAwareScrollView>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
    },
    title: {
        fontSize: 20,
        marginTop: Platform.OS === 'ios' ? 30 : 10,
        fontWeight: 'bold',
    },
    imageContainer: {
        width: '90%',
        height: Dimensions.get('window').width /2,
        backgroundColor: '#000',
        marginTop: 10,
    },
    image: {
        width: '100%',
        height: Dimensions.get('window').width /2,
        resizeMode: 'center',
    },
    buttom: {
        alignItems:'center',
        backgroundColor: '#4286F4',
        
    },
    buttomDisabled: {
        alignItems:'center',
        backgroundColor: '#AAA'
    },
    choicesContainer:{
        flexDirection: 'column',
        alignContent: 'center',
        width: '90%',
        marginTop: 30,
        padding: 5,
        backgroundColor: '#4286F4',
       
    },
    buttonsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: 'auto',
        padding: 10,
    },
    butttomText: {
        textAlign: 'center',
        fontSize: 20,
        color: '#FFF'
    },
    input: {
        marginTop: 20,
        width: '90%',
    }
})

//export default AddPhoto

const mapStateToProps = ({ user, posts }) => {
    return {
        email: user.email,
        name: user.name,
        loading: posts.isUpLoading
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onAddPost: post => dispatch(addPost(post))
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(AddPhoto)