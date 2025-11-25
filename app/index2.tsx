//@ts-nocheck

import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    StatusBar,
    Modal,
    TouchableOpacity,
    Image,
    Alert,
} from 'react-native';
import * as Google from 'expo-auth-session/providers/google';
import { GoogleAuthProvider, signInWithCredential } from 'firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { auth } from '@/firebaseConfig';
import { StyleSheet } from 'react-native';
import { Ionicons } from "@expo/vector-icons";

export default function Home({ navigation }) {
    const [modalVisible, setModalVisible] = useState(false);

    // Configuração do login com Google
    const [request, response, promptAsync] = Google.useAuthRequest({
        clientId: '695628659011-6u2bft1d7mnb2gcranokdhvvbvrm572h.apps.googleusercontent.com', // ID Cliente OAuth do console do Google Cloud
        webClientId: '695628659011-6u2bft1d7mnb2gcranokdhvvbvrm572h.apps.googleusercontent.com',
        /*androidClientId: '695628659011-6u2bft1d7mnb2gcranokdhvvbvrm572h.apps.googleusercontent.com',
        iosClientId: '695628659011-6u2bft1d7mnb2gcranokdhvvbvrm572h.apps.googleusercontent.com',
        responseType: 'id_token',
        redirectUri,*/
    });

    useEffect(() => {
        if (response?.type === 'success') {
            const { id_token } = response.params;
            const credential = GoogleAuthProvider.credential(id_token);

            signInWithCredential(auth, credential)
                .then(async (result) => {
                    const user = result.user;
                    await AsyncStorage.setItem('@user', JSON.stringify(user)); //para cadastrar o usuário no AsyncStorage
                    setModalVisible(false);
                    navigation.replace('/menu'); // navega para a tela de questões, já que conseguiu fazer login
                })
                .catch((error) => {
                    Alert.alert('Erro', 'Falha ao autenticar com o Google.');
                    console.error(error);
                });
        }
    }, [response]);

    return (
        <View style={styles.container}>
            <StatusBar barStyle="light-content" backgroundColor="#1e1e2f" />

            <Text style={styles.title}>Centro de Treinamento Gladiadores</Text>

            <Text style={styles.description}>
                Bem-vindo ao aplicativo de gerenciamento do centro de treinamento!
            </Text>

            <TouchableOpacity
                style={styles.loginButton}
                onPress={() => setModalVisible(true)}
            >
                <Text style={styles.loginButtonText}>Fazer Login</Text>
            </TouchableOpacity>


            <Modal
                visible={modalVisible}
                transparent
                animationType="slide"
                onRequestClose={() => setModalVisible(false)}
            >
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <Text style={styles.modalTitle}>Login</Text>
                        <Text style={styles.modalText}>Escolha uma forma de login:</Text>


                        <TouchableOpacity
                            style={styles.googleButton}
                            onPress={() => promptAsync()}
                            disabled={!request}
                        >
                            <Ionicons name="logo-google" size={24} color="black" />

                        </TouchableOpacity>

                        <TouchableOpacity
                            onPress={() => setModalVisible(false)}
                            style={styles.closeButton}
                        >
                            <Text style={styles.closeButtonText}>Fechar</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        </View>
    );
}

const styles = StyleSheet.create({
  container: {
        flex: 1,
        backgroundColor: 'black',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
    },
    title: {
        fontSize: 24,
        color: 'white',
        marginBottom: 20,
        textAlign: 'center',
    },
    description: {
        fontSize: 18,
        color: 'white',
        textAlign: 'center',
        marginBottom: 15,
    },
    loginButton: {
        backgroundColor: 'gray',
        paddingVertical: 12,
        paddingHorizontal: 30,
        borderRadius: 8,
        marginTop: 30,
    },
    loginButtonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: '600',
    },
    modalContainer: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.6)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalContent: {
        backgroundColor: 'gray',
        borderRadius: 12,
        width: '80%',
        padding: 20,
        alignItems: 'center',
    },
    modalTitle: {
        color: 'white',
        fontSize: 20,
        marginBottom: 10,
    },
    modalText: {
        color: 'white',
        fontSize: 16,
        textAlign: 'center',
        marginBottom: 20,
    },
    googleButton: {
        backgroundColor: '#fff',
        borderRadius: 8,
        padding: 12,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 15,
    },
    googleLogo: {
        width: 40,
        height: 40,
        resizeMode: 'contain',
    },
    closeButton: {
        backgroundColor: '#555',
        borderRadius: 8,
        paddingVertical: 10,
        paddingHorizontal: 25,
    },
    closeButtonText: {
        color: '#fff',
    },
});
