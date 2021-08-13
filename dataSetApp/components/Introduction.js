import React from 'react'
import { Text, View, StyleSheet, ScrollView, TouchableNativeFeedback, TouchableOpacity } from 'react-native'

export default function Introduction({nextButton}){
    return (
        <ScrollView style={styles.scroll}>
        <View style={styles.container}>
            <Text style={styles.title}>ආයුබෝවන්</Text>
            <View style={styles.sectionOne}>
                <Text style={styles.text}>
                    මෙම යෙදුම නිර්මාණය කර ඇත්තේ පර්යේෂණ ව්‍යාපෘතියක් සදහා අවශ්‍ය කරන දත්තයන් රැස් කිරීම සදහා වේ. 
                    ඒ අනුව ඔබ සිදු කල යුත්තේ ඉදිරියේදී දිස්නය වන ඩිජිටල් ලියනය තුල පහත සදහන් සිංහල අකුරු 19 ලිවීමයි. 
                    එහිදී ඔබ එක් අකුරක් පැහැදිලිව ලියු පසුව අකුරු ලියන කොටසට පහලින් ඇති 'Save' බොත්තම එබීමේන් ඔබ ලබාදුන් අකුර අප වෙත ලැබෙන ඇත.
                </Text> 
            </View>
            <View style={styles.sectionTwo}>
                <Text style={styles.text} >
                     ඔබ ඇතුලත් කර යුතු අකුරු 19 මෙසේය.
                </Text>
            </View>
            <View style={styles.sectionThree}>
                <View style={styles.fourLetters}>
                    <View style={styles.letterContainer}>
                        <Text style={styles.letter}>ක</Text>
                    </View>
                    <View style={styles.letterContainer}>
                        <Text style={styles.letter}>ග</Text>
                    </View >
                    <View style={styles.letterContainer}> 
                        <Text style={styles.letter}>ජ</Text>
                    </View >
                    <View style={styles.letterContainer}>
                        <Text style={styles.letter}>ට</Text>
                    </View>
                </View>
                <View style={styles.fourLetters}>
                    <View style={styles.letterContainer}>
                        <Text style={styles.letter}>ඩ</Text>
                    </View>
                    <View style={styles.letterContainer}>
                        <Text style={styles.letter}>ණ</Text>
                    </View >
                    <View style={styles.letterContainer}> 
                        <Text style={styles.letter}>ත</Text>
                    </View >
                    <View style={styles.letterContainer}>
                        <Text style={styles.letter}>ද</Text>
                    </View>
                </View>
                <View style={styles.fourLetters}>
                    <View style={styles.letterContainer}>
                        <Text style={styles.letter}>න</Text>
                    </View>
                    <View style={styles.letterContainer}>
                        <Text style={styles.letter}>ප</Text>
                    </View >
                    <View style={styles.letterContainer}> 
                        <Text style={styles.letter}>බ</Text>
                    </View >
                    <View style={styles.letterContainer}>
                        <Text style={styles.letter}>ම</Text>
                    </View>
                </View>
                <View style={styles.fourLetters}>
                    <View style={styles.letterContainer}>
                        <Text style={styles.letter}>ය</Text>
                    </View>
                    <View style={styles.letterContainer}>
                        <Text style={styles.letter}>ර</Text>
                    </View >
                    <View style={styles.letterContainer}> 
                        <Text style={styles.letter}>ල</Text>
                    </View >
                    <View style={styles.letterContainer}>
                        <Text style={styles.letter}>ව</Text>
                    </View>
                </View>
                <View style={styles.fourLetters}>
                    <View style={styles.letterContainer}>
                        <Text style={styles.letter}>ස</Text>
                    </View>
                    <View style={styles.letterContainer}>
                        <Text style={styles.letter}>හ</Text>
                    </View >
                    <View style={styles.letterContainer}> 
                        <Text style={styles.letter}>ළ</Text>
                    </View >
                </View>
            </View>
            <View style={styles.sectionTwo}>
                <Text style={styles.text} >
                    ඔබ ඉහත දක්වා ඇති අකුරු 19, එක් අකුරකින් අකුරු 10ක් වන පරිදි සම්පූර්ණ අකුරු 190ක් අවම වශයෙන් ඇතුලත් කරන මෙන් කාරුණිකව ඉල්ල සිටිමු.
                </Text>
            </View>
            <TouchableOpacity onPress={() => nextButton(true)} style={styles.nextButton}>
                <View>
                    <Text style={styles.text}>
                        ඉදිරියට යමු  >>>
                    </Text>
                </View>
            </TouchableOpacity>
        </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    scroll: {flex: 1, backgroundColor: '#452fb5'},
    container: {
        backgroundColor: '#452fb5',
        flex: 1,
        padding: 20,
        justifyContent: 'center',
        alignItems: 'center'
    },
    sectionOne: {
        backgroundColor: '#5753db',
        elevation: 30,
        padding: 20,
        borderRadius: 20,
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center'
    },
    text: {
        color: 'white',
        fontSize: 15,
        textAlign: 'justify'
    },
    sectionTwo: {
        backgroundColor: '#009CA7',
        elevation: 30,
        padding: 20,
        borderRadius: 20,
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20
    },
    sectionThree: {
        backgroundColor: '#452fb5',
        elevation: 40,
        padding: 20,
        borderRadius: 20,
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20
    }, 
    fourLetters: {
        flexDirection: 'row',
        marginTop: 20
    },
    letterContainer: {
        width: 60,
        height: 60,
        backgroundColor: '#5753db',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 20,
        marginHorizontal: 5,
        elevation: 10
    },
    letter: {
        color: 'white',
        fontSize: 25
    },
    nextButton: {
        backgroundColor: 'tomato',
        alignSelf: 'flex-end',
        padding: 15,
        marginTop: 20,
        borderRadius: 20,
        elevation: 20
    },
    title: {
        color: 'white',
        fontSize: 30,
        marginBottom: 20
    }
})