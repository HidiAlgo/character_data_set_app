import React, {useRef, useEffect} from 'react';
import {StyleSheet, View, Text, TouchableOpacity} from 'react-native';
import axios from 'axios';

import { SketchCanvas } from '@terrylinla/react-native-sketch-canvas';

const App = () => {

  const canvas = useRef(null)

  const clear = () => {
    canvas.current.clear();
  }

  const undo = () => {
    canvas.current.undo();
  }

  const save = () => {
    canvas.current.getBase64('jpg', false, false, false, false,(err,res) => {
      axios.post('http://192.168.8.100:3333/', {"base64": res})
        .then(response => {
          console.log(response.data);
        }).catch(err => {
          console.log(err);
        })
    });
  }

  return (
    <View style={styles.container}>
      <View style={{ flex: 1, flexDirection: 'row', backgroundColor: 'green', width: '100%' }}>
        <TouchableOpacity onPress={save} style={styles.functionButton}><Text style={{color: 'white'}}>Save</Text></TouchableOpacity>
        <TouchableOpacity onPress={clear} style={styles.functionButton}><Text style={{color: 'white'}}>Clear</Text></TouchableOpacity>
        <TouchableOpacity onPress={undo} style={styles.functionButton}><Text style={{color: 'white'}}>Undo</Text></TouchableOpacity>
      </View>

        <View style={{ flex: 2, flexDirection: 'row' }}>
          <SketchCanvas 
              ref={canvas}
              style={{ flex: 1 }}
              strokeColor={'black'}
              strokeWidth={5}
            />
        </View>
        <View style= {{flex:1, backgroundColor: 'green', width: '100%' }}></View>
      </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#F5FCFF',
  },
  functionButton: {
    marginHorizontal: 2.5, marginVertical: 8, height: 30, width: 60,
    backgroundColor: '#39579A', justifyContent: 'center', alignItems: 'center', borderRadius: 5,
  },
  strokeColorButton: {
    marginHorizontal: 2.5, marginVertical: 8, width: 30, height: 30, borderRadius: 15,
  },
  strokeWidthButton: {
    marginHorizontal: 2.5, marginVertical: 8, width: 30, height: 30, borderRadius: 15,
    justifyContent: 'center', alignItems: 'center', backgroundColor: '#39579A'
  },
});

export default App;
