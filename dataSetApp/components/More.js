import React, {useEffect, useState} from 'react'
import { View, StyleSheet, FlatList, Text } from 'react-native'

import AsyncStorage from '@react-native-async-storage/async-storage';

export default function More(){
 
    const[Data, setData] = useState([]);
    const[total, setTotal] = useState(0);

    const getData = async () => {
        let jsonValue = await AsyncStorage.getItem('lettersCounts')
        jsonValue = jsonValue!= null ? JSON.parse(jsonValue) : [];

        let t = 0;

        jsonValue.forEach((i) => t+=i.count);
        setTotal(t);
        setData(jsonValue);

    }

    useEffect( () => {
        getData();
    }, [])
      
    return(
        <View style={styles.container}>
            <FlatList
                data={Data}
                renderItem={({item}) => (
                    <View style={styles.item}>
                        <View style={styles.letterContainer}><Text style={styles.letter}>{item.id}</Text></View>
                        <View><Text style={styles.text}>ලියු අකුරු ගණන = {item.count}</Text></View>
                    </View>
                )}
                keyExtractor={item => item.id}
            />

            <View style={styles.itemTotal}>
                <View><Text style={styles.text}>එකතුව = {total}</Text></View>
            </View>
            
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#452fb5'
    }, 
    item: {
        flexDirection: 'row',
        backgroundColor: '#5753db',
        marginTop: 10,
        alignItems: 'center',
        paddingHorizontal: 15,
        paddingVertical: 15
    },
    itemTotal: {
        flexDirection: 'row',
        backgroundColor: '#00A27A',
        marginTop: 10,
        alignItems: 'center',
        paddingHorizontal: 15,
        paddingVertical: 10
    },
    letterContainer: {
        backgroundColor: '#452fb5',
        width: 60,
        height: 60,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 20,
        marginRight: 20,
        elevation: 20
    },
    letter: {
        color: 'white',
        fontSize: 25
    }, 
    text: {
        color: 'white',
        fontSize: 20
    }
})