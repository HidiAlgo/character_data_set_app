import React, {useRef, useEffect, useState} from 'react';
import {
  StyleSheet, 
  View, 
  Text, 
  TouchableOpacity, 
  Modal, 
  Alert, 
  TextInput,
  TouchableNativeFeedback,
  AppState
} from 'react-native';

import axios from 'axios';

import { SketchCanvas } from '@terrylinla/react-native-sketch-canvas';
import BouncyCheckbox from "react-native-bouncy-checkbox";
import AsyncStorage from '@react-native-async-storage/async-storage';

import Introduction from './components/Introduction';
import FinalScreen from './components/FinalScreen';
import More from './components/More';
import styles from './styles/App.component.style';



const App = () => {

  const canvas = useRef(null);

  const [modalVisible, setModalVisible] = useState(false);
  const [userDetailsModal, setUserDetailsModal] = useState(false);

  const [username, onChangeUsername] = useState("");
  const [age, onChangeAge] = useState("");


  const [userDetails, setUserDetails] = useState({})

  const [isDetailsApproved, setDetailsApproved] = useState(false);


  const [isIntroductionOn, setIntroductionOn] = useState(false);

  const [selectedLetter, setSelectedLetter] = useState('ග');

  const [lettersToWrite, setLettersToWrite] = useState(10);
  const [letters, setLetters] = useState([{id:'ග',count: 10 }, {id:'ජ',count: 10 }, {id:'ට',count: 10 }, {id:'ඩ',count: 10 } ,{id:'ණ',count: 10 }
  , {id:'ත',count: 10 }, {id:'ද',count: 10 }, {id:'න',count: 10 }, {id:'ප',count: 10 }, {id:'බ',count: 10 }, {id:'ම',count: 10 }
  , {id:'ය',count: 10 }, {id:'ර',count: 10 } ,{id:'ල',count: 10 }, {id:'ව',count: 10 }, {id:'ස',count: 10 } ,{id:'හ',count: 10 }
  , {id:'ළ',count: 10 }, {id:'ක',count: 10 }]);

  const [finalScreenVisible, setFinalScreenVisible] = useState(false);

  const clear = () => {
    canvas.current.clear();
  }

  const undo = () => {
    canvas.current.undo();
  }



  // This is to save the total number of letter counts
  const saveLettersCount = async () => {
    try {
      let jsonValue = await AsyncStorage.getItem('lettersCounts')
      jsonValue = jsonValue!= null ? JSON.parse(jsonValue) : null;

      for(let i = 0; i<jsonValue.length; i++){
        if(jsonValue[i].id == selectedLetter){
          jsonValue[i].count = jsonValue[i].count + 1;
          break;
        }
      }

      const out = JSON.stringify(jsonValue);
      await AsyncStorage.setItem('lettersCounts', out);
    }catch(error){
      console.log(error);
    }

  }


  // This is to save the letters that is needed to be write down
  const saveLettersToWriteList = async (filtered = null) => {
    if(filtered === null){
      try{

        letters[0].count = lettersToWrite - 1;
  
        let out = JSON.stringify(letters);
        await AsyncStorage.setItem('lettersToWriteList', out)
      }catch(error){
        console.log(error)
      }
    }else{
      try{
        let out = JSON.stringify(filtered);
        await AsyncStorage.setItem('lettersToWriteList', out);
      }catch(error){
        console.log(error);
      }
    }

  }

  const save = async () => {

    canvas.current.getBase64('jpg', false, false, false, false,(err,res) => {
      axios.post('http://192.168.8.101:3333/', {"base64": res, "letter": selectedLetter, "details": userDetails})
        .then(async (response) => {
          setLettersToWrite(lettersToWrite-1);
          saveLettersCount();

          if(lettersToWrite - 1 === 0){
            Alert.alert(
              "නියමයි",
              "ඔබ සාර්ථකව '"+selectedLetter+"' අකුර 10 වතාවක් ලියා ඇත",
              [
                { text: "OK", onPress: () => console.log("OK Pressed") }
              ]
            );

            let filteredLetters = letters.filter(i => i.id !== selectedLetter);
            
            if(filteredLetters.length !== 0){
              setLetters(filteredLetters);
              setSelectedLetter(filteredLetters[0].id);
              setLettersToWrite(filteredLetters[0].count);  

              saveLettersToWriteList(filteredLetters);
            }else{
              setFinalScreenVisible(true)
              try{
                await AsyncStorage.setItem('isFinal', "true");
              }catch(error){
                console.log(error);
              }
            }

            console.log(filteredLetters);
          
            return;
        }


        saveLettersToWriteList();
      })
      
      .catch(error => {
        console.log(error)
      })
    });
    clear();        
  }


  const saveUserDetails = async () => {
    if(username.trim() === "" || age.trim() === "" || !isDetailsApproved){
      Alert.alert(
        "සමාවෙන්න",
        "ඉදිරියට යෑමටනම් ඔබගේ නම, වයස සහා ස්ත්‍රී පුරුෂ භාවය සදහන් කර හරි ලකුණ ලබාදෙන්න.",
        [
          { text: "OK", onPress: () => console.log("OK Pressed") }
        ]
      );
    }else{
      let details = {};
      details["username"] = username;
      details["age"] = age;
      
      const jsonValue = JSON.stringify(details)
      await AsyncStorage.setItem('userDetails', jsonValue)

      setUserDetails(details);
      setUserDetailsModal(false);
    }
  }


  const getUserDetails = async () => {
    let jsonValue = await AsyncStorage.getItem('userDetails')
    jsonValue = jsonValue!= null ? JSON.parse(jsonValue) : null;

    if(jsonValue == null){
      setUserDetailsModal(true);
    }else{
      setUserDetails(jsonValue);
      console.log(jsonValue);
    }
  }

  
  
  const addLetterCounts = async () => {
    let jsonValue = await AsyncStorage.getItem('lettersCounts')
    jsonValue = jsonValue!= null ? JSON.parse(jsonValue) : null;

    if(jsonValue == null) {
      let letterCounts = [{id:'ග',count: 0 }, {id:'ජ',count: 0 }, {id:'ට',count: 0 }, {id:'ඩ',count: 0 } ,{id:'ණ',count: 0 }
      , {id:'ත',count: 0 }, {id:'ද',count: 0 }, {id:'න',count: 0 }, {id:'ප',count: 0 }, {id:'බ',count: 0 }, {id:'ම',count: 0 }
      , {id:'ය',count: 0 }, {id:'ර',count: 0 } ,{id:'ල',count: 0 }, {id:'ව',count: 0 }, {id:'ස',count: 0 } ,{id:'හ',count: 0 }
      , {id:'ළ',count: 0 }, {id:'ක',count: 0 }];

      const jsonValue = JSON.stringify(letterCounts)
      await AsyncStorage.setItem('lettersCounts', jsonValue)
    }
  }

  const addLettersToWriteList = async () => {

    try{
      let jsonValue = await AsyncStorage.getItem('lettersToWriteList')
      jsonValue = jsonValue!= null ? JSON.parse(jsonValue) : null;

      if(jsonValue == null) {
        let lettersToWrite = [{id:'ග',count: 10 }, {id:'ජ',count: 10 }, {id:'ට',count: 10 }, {id:'ඩ',count: 10 } ,{id:'ණ',count: 10 }
        , {id:'ත',count: 10 }, {id:'ද',count: 10 }, {id:'න',count: 10 }, {id:'ප',count: 10 }, {id:'බ',count: 10 }, {id:'ම',count: 10 }
        , {id:'ය',count: 10 }, {id:'ර',count: 10 } ,{id:'ල',count: 10 }, {id:'ව',count: 10 }, {id:'ස',count: 10 } ,{id:'හ',count: 10 }
        , {id:'ළ',count: 10 }, {id:'ක',count: 10 }];

        const jsonValue = JSON.stringify(lettersToWrite)
        await AsyncStorage.setItem('lettersToWriteList', jsonValue)
      }else{
        setSelectedLetter(jsonValue[0].id)
        setLettersToWrite(jsonValue[0].count)
        setLetters(jsonValue);

        console.log(jsonValue)
      }
    }catch(error){
      console.log(error)
    }
  }

  // this will create the main screen to show 
  const setMainScreen = async () => {
    setIntroductionOn(true);
    try{
      let final = await AsyncStorage.getItem('isFinal');
      if(final === "true"){
        setFinalScreenVisible(true);
      }
    }catch(error){
      console.log(error);
    }
    
  }

  useEffect(() =>{
    getUserDetails();
    addLetterCounts();
    addLettersToWriteList();
  }, []);

  if(finalScreenVisible === true){
    return <FinalScreen />
  }
  else if(isIntroductionOn === false){
    return <Introduction nextButton={setMainScreen} />
  }else{
    return (

      <View style={styles.container}>
          <View style={{flex: 1,flexDirection: 'row', backgroundColor: 'white', width: '100%', alignItems: 'center'}}>
            <View style={styles.letterContainer}>
              <Text style={styles.letter}>{selectedLetter}</Text>
            </View>
            <Text>අකුර පහතින් ලියන්න</Text>
            <Text style={{position: 'absolute', right: 20, fontSize: 25}}>{lettersToWrite}</Text>
          </View>
          <View style={{ flex: 5, flexDirection: 'row', width: '100%', marginTop: 5}}>
            <SketchCanvas 
                ref={canvas}
                style={{ flex: 5, backgroundColor: 'white',  }}
                strokeColor={'black'}
                strokeWidth={5}
              />
          </View>

          <View style={{ flex: 3, backgroundColor: 'white', width: '100%', alignItems: 'center', justifyContent: 'center' }}>
            <TouchableOpacity onPress={save} style={styles.saveButton}><Text style={{color: 'white', elevation: 6, fontSize: 20}}>Save</Text></TouchableOpacity>

            <View style={{flexDirection: 'row'}}>
              <TouchableOpacity onPress={clear} style={[styles.functionButton, {backgroundColor: 'tomato'}]}><Text style={{color: 'white'}}>Clear</Text></TouchableOpacity>
              <TouchableOpacity onPress={undo} style={[styles.functionButton, {backgroundColor: 'dodgerblue'}]}><Text style={{color: 'white'}}>Undo</Text></TouchableOpacity>
              <TouchableOpacity onPress={() => setModalVisible(true)} style={[styles.functionButton, {backgroundColor: 'green'}]}><Text style={{color: 'white'}}>More</Text></TouchableOpacity>      
            </View>
        </View>
          
          
          <Modal
              animationType="slide"
              transparent={true}
              visible={modalVisible}
              onRequestClose={() => {
                setModalVisible(!modalVisible);
              }}
            >
              <More />
          </Modal>

          <Modal
              animationType="slide"
              transparent={true}
              visible={userDetailsModal}
              onRequestClose={() => {
                setUserDetailsModal(!modalVisible);
              }}
            >
                <View style={styles.centeredView}>
                  <View style={styles.modalView}>
                    <Text style={styles.modalText}>ආයුබෝවන්</Text>
                    <TextInput
                      style={styles.usernameStyle}
                      onChangeText={onChangeUsername}
                      value={username}
                      placeholder="Enter your name here"
                    />
                    <TextInput
                      style={styles.userageStyle}
                      onChangeText={onChangeAge}
                      value={age}
                      placeholder="Enter your age here"
                      keyboardType="numeric"
                    />
                    <BouncyCheckbox
                      size={20}
                      text="ඉහත සදහන් විස්තර නිවැරදියි"
                      fillColor="red"
                      unfillColor="#FFFFFF"
                      textStyle={{color: 'white', textDecorationLine: "none", fontSize: 12}}
                      iconStyle={{ borderColor: "#452fb5" }}
                      onPress={(checked) => setDetailsApproved(checked)}
                    />
                    
                    <TouchableNativeFeedback onPress={saveUserDetails}>
                      <View style={styles.userDetailsSavebutton}>
                        <Text style={styles.modalHideStyle}>ඉදිරියට යන්න</Text>
                      </View>
                    </TouchableNativeFeedback>
                  </View>
                </View>
          </Modal>
        </View>
    );
  }
      
};


export default App;
