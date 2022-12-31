import React, { useState } from 'react'
import { StyleSheet, Text, View, Modal, Pressable, FlatList } from 'react-native'
import { Button } from 'react-native-elements'
import { connect } from 'react-redux'

import { GEOMETRIC_BOLD } from '../utils/fonts'
import { WebView } from 'react-native-webview';
import { BlurView } from 'expo-blur'

//temporary data
const DATA = [
    {
      date: "12-09-2020",
      url: "https://www.antennahouse.com/hubfs/xsl-fo-sample/pdf/basic-link-1.pdf",
    },
    {
      date: "12-10-2020",
      url: 'https://www.africau.edu/images/default/sample.pdf',
    },
    {
      date: "12-11-2020",
      url: "https://www.clickdimensions.com/links/TestPDFfile.pdf",
    },
  ];

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 20,
    },
    dates: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingTop: 20,
    },
    pdf: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'flex-start',
    },
    modalView: {
        backgroundColor: 'rgba(0,0,0,0.5)',
        // backgroundColor: "white",
        flex: 1,
        justifyContent: "flex-end",
        // marginTop: '50%',
        // height: '50%',
        // paddingHorizontal: 20,
        // borderRadius: 6
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
export const PrintIssueScreenComp = ({ navigation, publication, settings }) => {
    const [modalVisible, setModalVisible] = useState(false);
    const [url, updateUrl] = useState(DATA[DATA.length-1].url);
    const [date, updateDate] = useState(DATA[DATA.length-1].date);

    return (
        <View style={styles.container}>
            <Modal
            animationType="slide"
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
            <Button
                title="ARCHIVES"
                onPress={() => setModalVisible(true)}
                >
            </Button>
            <Text style={{ fontFamily: GEOMETRIC_BOLD, textAlign: 'left', fontSize: 25 }}>
                {date}
            </Text>
            <WebView 
                originWhitelist={['*']}
                javaScriptEnabled={true}
                source={{ uri: url}} />
        </View>
    )
}

const mapStateToProps = ({ publication, settings }) => ({
    publication,
    settings,
})
  
export const PrintIssueScreen = connect(mapStateToProps)(PrintIssueScreenComp)





