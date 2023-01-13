import React, { useState } from 'react'
import { StyleSheet, Text, View, Modal, Pressable, FlatList, SafeAreaView } from 'react-native'
import { Button } from 'react-native-elements'
import { connect } from 'react-redux'

import { GEOMETRIC_BOLD } from '../utils/fonts'
import { WebView } from 'react-native-webview';
import { BlurView } from 'expo-blur'


import { DISPLAY_SERIF_BLACK } from '../utils/fonts'

//temporary data
const DATA = [
    {
      day: "Thursday",
      date: "Feb 12, 2020",
      url: "https://www.antennahouse.com/hubfs/xsl-fo-sample/pdf/basic-link-1.pdf",
    },
    {
      day: "Friday",
      date: "Feb 13, 2020",
      url: 'https://www.africau.edu/images/default/sample.pdf',
    },
    {
      day: "Saturday",
      date: "Feb 14, 2020",
      url: "https://www.clickdimensions.com/links/TestPDFfile.pdf",
    },
  ];

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // paddingHorizontal: 10,
    },
    title: {
        fontFamily: DISPLAY_SERIF_BLACK,
        fontSize: 28,
        lineHeight: 40
    },
    headerSafeArea: {
        zIndex: 1000,
        flex: 1,
    },
    header: {
        borderBottomWidth: 1,
        borderBottomColor: 'gray',
        height: 50,
        paddingHorizontal: 16
    },
    headerInner: {
        flex: 1,
        overflow: 'hidden',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        position: 'relative'
    },
    dates: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingTop: 10,
        paddingBottom: 10,
        paddingHorizontal: 20
    },
    pdf: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'flex-start',
    },
    modalView: {
        backgroundColor: 'rgba(0,0,0,0.9)',
        flex: 1,
        justifyContent: "flex-end",
    },
    modalPopUpView: {
        flex: 1,
        justifyContent: "flex-end",
        marginTop: '50%',
        paddingHorizontal: 20,
        borderRadius: 15
    },
    modalListView: {
        flex: 1,
        paddingHorizontal: 10,
        backgroundColor: "white",
        borderRadius: 25,
        borderWidth: 0.5
    },
    modalText: {
        paddingHorizontal: 10,
        marginTop: 15,
        textAlign: "center",
        borderRadius: 10,
        borderWidth: 1,
        fontSize: 25,
        backgroundColor: "blue",
        borderColor: "cyan",
        color: "white"
    }

})


//Last thing to do is to fix up how it looks in the styles, also fix publication when available
//Maybe add a day section to the JSON file?
export const PrintIssueScreenComp = ({ navigation, publication, settings }) => {
    const [modalVisible, setModalVisible] = useState(false);
    const [url, updateUrl] = useState(DATA[DATA.length-1].url);
    const [date, updateDate] = useState(DATA[DATA.length-1].date);

    return (
        <View style= {styles.container}>
            <SafeAreaView style={styles.header_safe_area}>
                <View style={styles.header}>
                    <View style={styles.header_inner}>
                        <Text style={styles.title}>Print Issue</Text>
                    </View>
                </View>
            </SafeAreaView>
            <Modal
            animationType="fade"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => {
                Alert.alert("Modal has been closed.");
                setModalVisible(!modalVisible);
            }}
            >
                <View style={styles.modalView}>
                    <View style={styles.modalPopUpView}>
                        <FlatList
                            style={styles.modalListView}
                            data={DATA}
                            renderItem={({ item }) => (
                                <Pressable onPress={() => {
                                    setModalVisible(!modalVisible),
                                    updateUrl(item.url),
                                    updateDate(item.date)
                                    }}>
                                    <Text style={styles.modalText}>{item.date}</Text>
                                </Pressable>
                            )}
                            keyExtractor={item => item.date}
                        />
                    </View>
                </View>
            </Modal>
            <View style={styles.dates}>
                <Text style={{ fontFamily: GEOMETRIC_BOLD, textAlign: 'left', fontSize: 20, justifyContent: 'flex-end' }}>
                    {date}
                </Text>
                <Button
                    title="ARCHIVES"
                    onPress={() => setModalVisible(true)}
                    >
                </Button>
            </View>
            <WebView 
                originWhitelist={['*']}
                javaScriptEnabled={true}
                source={{ uri: url}} />
        </View>
    )
}

const mapStateToProps = ({ publication, settings }) => {
    const { currPublication } = publication
    return { currPublication, settings }
}
  
export const PrintIssueScreen = connect(mapStateToProps)(PrintIssueScreenComp)





