import { StyleSheet } from "react-native";



export default StyleSheet.create({
    container: {
      flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'white',
    },
    functionButton: {
      marginTop: 40,
      backgroundColor: 'red',
      height: 70,
      width: 70,
      borderRadius: 50,
      marginHorizontal: 15,
      justifyContent: 'center',
      alignItems: 'center',
      elevation:5
    },
    saveButton: {
      width: '95%',
      backgroundColor: '#452fb5',
      height: 45,
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: 20,
      elevation: 5
    },
    strokeColorButton: {
      marginHorizontal: 2.5, marginVertical: 8, width: 30, height: 30, borderRadius: 15,
    },
    strokeWidthButton: {
      marginHorizontal: 2.5, marginVertical: 8, width: 30, height: 30, borderRadius: 15,
      justifyContent: 'center', alignItems: 'center', backgroundColor: '#39579A'
    },
    modalText: {
      color: 'white',
      fontSize: 20
    },
    modalView: {
      backgroundColor: '#5753db',
      width: '70%',
      justifyContent: 'center',
      alignItems: 'center',
      padding: 25,
      borderRadius: 30,
      elevation: 50
    },
    centeredView: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#452fb5'
    },
    usernameStyle: {
      marginTop: 10,
      backgroundColor: 'white',
      width: '100%',
      borderRadius: 20,
      elevation: 10
    },
    userageStyle: {
      marginTop: 10,
      backgroundColor: 'white',
      width: '100%',
      borderRadius: 20,
      elevation: 10,
      marginBottom: 15
    },

    userDetailsSavebutton: {
      marginTop: 20,
      backgroundColor: '#27cbb3',
      width: '100%',
      padding: 10,
      borderRadius: 15,
      alignItems: 'center',
      elevation: 20
  
    },
    modalHideStyle:{
      color: 'black'
    },
  
  
  
    fourLetters: {
      flexDirection: 'row',
      marginTop: 20,
    
    },
    letterContainer: {
      width: 60,
      height: 60,
      backgroundColor: '#452fb5',
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 20,
      marginHorizontal: 5,

    },
    letter: {
      color: 'white',
      fontSize: 25
    }
  });