import React, { Component } from 'react'
import { connect } from 'react-redux'
import {  Gravatar } from 'react-native-gravatar'
import {
    StyleSheet,
    Text,
    View,
    Platform,
    Image,
} from 'react-native'
import icon from '../../assets/imgs/icon.png'

class Header extends Component {
    render() {
        const name = this.props.name || 'Anonimous'
        const gravatar = this.props.email ?
        <Gravatar options={{ email: this.props.email, secure: true}} 
            style={styles.avatar} />
        : null
        return (
            <View style={styles.container}>
                <View style={styles.rowContainer}>
                    <Image source={icon} style={styles.image} />
                    <Text style={styles.title}>Instagrand</Text>
                </View>
                <View style={styles.userContainer}>
                    <Text syle={styles.user}>{name}</Text>
                    {gravatar}
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'space-between',
        borderBottomWidth: 1,
        borderColor: '#BBB',
        padding: 10,
        position: 'relative'
    },
    rowContainer: {
        marginTop: Platform.OS === 'ios' ? 20 : 20,
        flexDirection: 'row',
        alignItems: 'center',
    },
    image: {
        height: 30,
        width: 30,
        resizeMode: 'contain',
    },
    title: {
        color: '#000',
        fontFamily: 'sans-serif-light',
        fontWeight: 'bold' ,
        fontStyle: 'italic',
        height: 35,
        fontSize: 26,
    },
    userContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingTop: 25,
    },
    user: {
        fontSize: 10,
        color: '#888',
       
    },
    avatar: {
        width: 35,
        height: 35,
        marginLeft: 10,
        borderRadius: 5,
    }
})

const mapStateToProps = ({ user }) => {
    return {
        email: user.email,
        name: user.name,
    }
}

//export default Header
export default connect(mapStateToProps)(Header)
