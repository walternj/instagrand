import React, {Component} from 'react';
import {Modal, Text, TouchableHighlight, View, Alert} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome'

export default class ModalExample extends Component {
  state = {
    modalVisible: false,
  };

  setModalVisible(visible) {
    this.setState({modalVisible: visible});
  }

  render() {
        return (
            <View style={{marginTop: 22}}>
                <Modal
                animationType="slide"
                transparent={false}
                visible={this.state.modalVisible}
                onRequestClose={() => {
                    Alert.alert('Modal has been closed.');
                }}>
                <View style={{marginTop: 22}}>
                    <View>
                    <Text>Hello World!</Text>

                    <TouchableHighlight
                        onPress={() => {
                        this.setModalVisible(!this.state.modalVisible);
                        }}>
                        <Icon name='close' size={30} color='#F85'/>
                    </TouchableHighlight>
                    </View>
                </View>
                </Modal>

                <TouchableHighlight
                onPress={() => {
                    this.setModalVisible(true);
                }}>
                <Text>Show Modal</Text>
                </TouchableHighlight>
            </View>
        );
    }
}
