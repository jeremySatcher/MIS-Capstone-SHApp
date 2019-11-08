/**
 * Settings Page
 *
 * @format
 * @flow
 */

import React, { Component } from 'react';
import {
    Alert,
    View,
    Text,
    StyleSheet,
    Image,
} from 'react-native';

import AsyncStorage from '@react-native-community/async-storage';
import { TouchableHighlight } from 'react-native-gesture-handler';
import ImagePicker from 'react-native-image-picker';
export class SettingsScreen extends Component {
    constructor(props) {
        super(props);
        this.state = { photo: null,};
        console.log("Something");
    }
    handleChoosePhoto = () => {
        const options = {noData: true, };
        console.log("Trying...");
        ImagePicker.launchImageLibrary(options, response => {
            console.log(response);
            if (response.uri) {
                this.setState({photo: response.uri})
            }
            const getData = async () => {
                try {
                    let dataUri = 'data:';
                    dataUri += response.type;
                    dataUri += ';base64'
                    dataUri += response.data;
                    await AsyncStorage.setItem('@ProfilePicture', response.uri);
                    console.log("Stored image persistently as @ProfilePicture")
                } catch (error) {
                    alert(JSON.stringify(error));
                    alert(error.message);
                }
            }
            getData();
        })
    }
    render() {
        const {photo} = this.state;
        return (
            <View style={styles.mainContainer}>
                <TouchableHighlight onPress={ this.handleChoosePhoto } style={styles.button}>
                    <Text style={styles.loginButtonText}>This is a sample page</Text>
                </TouchableHighlight>
                <TouchableHighlight onPress={
                    async () => {
                        try {
                            const value = await AsyncStorage.getItem('@ProfilePicture');
                            if (value !== null) {
                                console.log(value);
                                this.setState({photo: value})
                            }
                        } catch (error) {
                            console.log(error);
                        }
                    }
                } style={styles.button}>
                    <Text style={styles.loginButtonText}>Check for photo</Text>
                </TouchableHighlight>
                { photo &&
                    <Image source={{uri: photo}} style={{width: 100, height: 100}}/>
                }
            </View>
        );
    }
    
};
export default SettingsScreen;


const styles = StyleSheet.create({
    mainContainer: {
        backgroundColor: 'rgb(244,244,244)',
        height: '100%',
        flexDirection: 'column',
        padding: 20,
        alignItems: 'center',
    },
    loginButtonText: {
		color: 'black',
		fontSize: 16,
		fontWeight: 'bold'
    },
    button: {
        backgroundColor: 'crimson',
		alignSelf: 'center',
		justifyContent: 'center',
		alignItems: 'center',
		width: '60%',
		height: 40,
		borderRadius: 3,
		marginTop: 30,
	},
  });
  