import React from 'react'
import { Text, View, StyleSheet } from 'react-native'

export default function FinalScreen(){
    return(
        <View style={styles.container}>
            <View style={styles.innerBox}>
                 <Text style={styles.thank}> ස්තූතියි </Text>
                 <Text style={styles.text}> ඔබ අපට අවශ්‍ය කරන සියළුම දත්ත සාර්ථකව ලබාදී අවසන්ය. </Text>
            </View>

        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#452fb5',
        justifyContent: 'center',
        alignItems: 'center'
    },
    innerBox: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#452fb5',
        paddingVertical: 40,
        borderRadius: 20,
        elevation: 10
    },
    thank: {
        fontSize: 25,
        color: 'white',
        marginBottom: 20
    },
    text: {
        color: 'white'
    }
})