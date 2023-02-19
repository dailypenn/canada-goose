import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, View, Modal, Pressable, FlatList, SafeAreaView, Image, TouchableOpacity } from 'react-native'
import { connect } from 'react-redux'
import {Calendar, CalendarList, Agenda, LocaleConfig, AgendaList} from 'react-native-calendars';

import { PublicationEnum } from '../utils/constants'
import { GEOMETRIC_BOLD } from '../utils/fonts'
import { WebView } from 'react-native-webview';
import { BlurView } from 'expo-blur'


import { DISPLAY_SERIF_BLACK } from '../utils/fonts'
import { getCalendarDateString } from 'react-native-calendars/src/services';

//temporary data, switch for real json
//'YYYY-MM-DD': {}
const DATA = [
    {
        day: "NEVER LOAD",
        date: "2017-01-01",
        preview: "https://thumbs.dreamstime.com/b/news-newspapers-folded-stacked-word-wooden-block-puzzle-dice-concept-newspaper-media-press-release-42301371.jpg",
        url: "https://www.clickdimensions.com/links/TestPDFfile.pdf",
    },
    {
        day: "Thursday",
        date: "2020-01-01",
        preview: "https://www.shutterstock.com/image-vector/breaking-news-background-world-global-260nw-719766118.jpg",
        url: "https://www.antennahouse.com/hubfs/xsl-fo-sample/pdf/basic-link-1.pdf",
    },
    {
        day: "Friday",
        date: "2020-01-02",
        preview: "https://static.vecteezy.com/system/resources/thumbnails/004/216/831/original/3d-world-news-background-loop-free-video.jpg",
        url: 'https://www.africau.edu/images/default/sample.pdf',
    },
    {
        day: "Friday",
        date: "2020-01-02",
        preview: "https://thumbs.dreamstime.com/b/news-newspapers-folded-stacked-word-wooden-block-puzzle-dice-concept-newspaper-media-press-release-42301371.jpg",
        url: "https://www.clickdimensions.com/links/TestPDFfile.pdf",
    },
    {
        day: "Saturday",
        date: "2020-01-03",
        preview: "https://thumbs.dreamstime.com/b/news-newspapers-folded-stacked-word-wooden-block-puzzle-dice-concept-newspaper-media-press-release-42301371.jpg",
        url: "https://www.clickdimensions.com/links/TestPDFfile.pdf",
    },
    {
        day: "IDK",
        date: "2020-01-04",
        preview: "https://www.shutterstock.com/image-vector/breaking-news-background-world-global-260nw-719766118.jpg",
        url: "https://www.antennahouse.com/hubfs/xsl-fo-sample/pdf/basic-link-1.pdf",
    },
    {
        day: "IDK",
        date: "2020-01-05",
        preview: "https://www.shutterstock.com/image-vector/breaking-news-background-world-global-260nw-719766118.jpg",
        url: "https://www.antennahouse.com/hubfs/xsl-fo-sample/pdf/basic-link-1.pdf",
    },
    {
        day: "IDK",
        date: "2020-01-14",
        preview: "https://www.shutterstock.com/image-vector/breaking-news-background-world-global-260nw-719766118.jpg",
        url: "https://www.antennahouse.com/hubfs/xsl-fo-sample/pdf/basic-link-1.pdf",
    }
  ];
  const MONTH_ARR = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"
  ];

const styles = StyleSheet.create({
    container: {
        flex: 1,
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
        alignItems: 'center',
        paddingTop: 10,
        paddingBottom: 10,
        paddingHorizontal: 10
    },
    pdf: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'flex-start',
    },
    modalView: {
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
        backgroundColor: "red",
        borderColor: "white",
        color: "white"
    },
    buttonText: {
        color: "white",
        fontSize: 20,
        marginHorizontal: 10,
        fontFamily: GEOMETRIC_BOLD,
        textAlign: 'center'
    },
    calendarView: {
        flex: 1,
        justifyContent: "flex-start",
        // paddingTop: 50,
    },
    closeButton: {
        justifyContent: "flex-start",
        paddingTop: 50,
        alignItems: 'flex-end',
        paddingRight: 10
    },
    tempText: {
        fontFamily: GEOMETRIC_BOLD,
        textAlign: 'left',
        fontSize: 20,
        justifyContent: 'flex-end' 
    },
    preview: {
        flex: 1,
        width: 200,
        height: 200,
        resizeMode: 'contain'
    },
    buttonGroup: {
        flexDirection: 'column',
        justifyContent: 'space-between',
        // paddingTop: 10,
        // paddingBottom: 10,
        // paddingHorizontal: 20

    }

})

//Finish up CONNECTING CALENDAR TO DATA
//FIX JSON DATA
export const PrintIssueScreenComp = ({currPublication, settings }) => {
    const [modalVisible, setModalVisible] = useState(false);
    const [searchModalVisible, setSearchModalVisible] = useState(false);
    const [url, updateUrl] = useState(DATA[DATA.length-1].url);
    const [date, updateDate] = useState(DATA[DATA.length-1].date);

    const convertToDate = (d, m, y) => {
        return MONTH_ARR[m-1] + " " + d.toString() + ", " + y.toString();
    }

    const updateDateText = (pub) => {
        switch (pub) {
            case PublicationEnum.dp:
                return {
                    color: '#D72E25',
                    fontFamily: GEOMETRIC_BOLD, 
                    textAlign: 'left', 
                    fontSize: 20, 
                    justifyContent: 'flex-end'
                }
            case PublicationEnum.street:
                return {
                    color: '#25B7B6',
                    fontFamily: GEOMETRIC_BOLD, 
                    textAlign: 'left', 
                    fontSize: 20, 
                    justifyContent: 'flex-end' 
                }
            case PublicationEnum.utb:
                return {
                    color: '#3964A6',
                    fontFamily: GEOMETRIC_BOLD, 
                    textAlign: 'left', 
                    fontSize: 20, 
                    justifyContent: 'flex-end' 
                }
        }
        return {
            fontFamily: GEOMETRIC_BOLD, 
            textAlign: 'left', 
            fontSize: 20, 
            justifyContent: 'flex-end' 
        }
    }

    const updateButton = (pub) => {
        switch (pub) {
            case PublicationEnum.dp:
                return {
                    backgroundColor: '#D72E25',
                    borderWidth: 1,
                    borderColor: "black",
                    borderRadius: 5
                }
            case PublicationEnum.street:
                return {
                    backgroundColor: '#25B7B6',
                    borderWidth: 1,
                    borderColor: "black",
                    borderRadius: 5
                }
            case PublicationEnum.utb:
                return {
                    backgroundColor: '#3964A6',
                    borderWidth: 1,
                    borderColor: "black",
                    borderRadius: 5
                }
        }
        return {
            backgroundColor: "black",
            borderWidth: 1,
            borderColor: "black",
            borderRadius: 5
        }
    }

    const updateHeader = (pub) => {
        switch (pub) {
            case PublicationEnum.dp:
                return {
                    borderBottomWidth: 1, 
                    borderBottomColor: '#D72E25',
                    height: 50,
                    paddingHorizontal: 16,
                }
            case PublicationEnum.street:
                return {
                    borderBottomWidth: 1, 
                    borderBottomColor: '#25B7B6',
                    height: 50,
                    paddingHorizontal: 16,
                }
            case PublicationEnum.utb:
                return {
                    borderBottomWidth: 1, 
                    borderBottomColor: '#3964A6',
                    height: 50,
                    paddingHorizontal: 16,
                }
        }
        return {
            borderBottomWidth: 1, 
            borderBottomColor: 'black',
            height: 50,
            paddingHorizontal: 16,
        }
    }

    const getSelectedDays = (pub) => {
        let markedDates;
        switch (pub) {
            case PublicationEnum.dp:
                markedDates = {};
                DATA.forEach(
                    d => {
                        markedDates[d.date] = {marked: true, dotColor: '#D72E25', textColor: '#FFFFFF'};
                    }
                )
                break;
            case PublicationEnum.street:
                markedDates = {};
                DATA.forEach(
                    function(d){
                        markedDates[d.date] = {marked: true, dotColor: '#25B7B6', textColor: '#FFFFFF'};
                    }
                )
                break;
            case PublicationEnum.utb:
                markedDates = {};
                DATA.forEach(
                    function(d){
                        markedDates[d.date] = {marked: true, dotColor: '#3964A6', textColor: '#FFFFFF'};
                    }
                )
                break;
        }
        return markedDates;
    };

    const getItems = (pub) => {
        let items = {};
        switch (pub) {
            case PublicationEnum.dp:
                DATA.forEach(
                    d => {
                        items[d.date] = Array.isArray(items[d.date]) ? items[d.date]: []
                        items[d.date].push({preview: d.preview, url: d.url});
                    }
                )
                break;
            case PublicationEnum.street:
                DATA.forEach(
                    d => {
                        items[d.date] = Array.isArray(items[d.date]) ? items[d.date]: []
                        items[d.date].push({preview: d.preview, url: d.url});
                    }
                )
                break;
            case PublicationEnum.utb:
                DATA.forEach(
                    d => {
                        items[d.date] = Array.isArray(items[d.date]) ? items[d.date]: []
                        items[d.date].push({preview: d.preview, url: d.url});
                    }
                )
                break;
        }
        return items;
    };

    // const resetItems = (pub) => {
    //     updateItems({});
    //     switch (pub) {
    //         case PublicationEnum.dp:
    //             DATA.forEach(
    //                 d => {
    //                     items[d.date] = [];
    //                     items[d.date].push({preview: d.preview});
    //                 }
    //             )
    //             break;
    //         case PublicationEnum.street:
    //             DATA.forEach(
    //                 d => {
    //                     items[d.date] = [];
    //                     items[d.date].push({preview: d.preview});
    //                 }
    //             )
    //             break;
    //         case PublicationEnum.utb:
    //             DATA.forEach(
    //                 d => {
    //                     items[d.date] = [];
    //                     items[d.date].push({preview: d.preview});
    //                 }
    //             )
    //             break;
    //     }
    //     const newItems = {};
    //     Object.keys(items).forEach(key => {
    //         newItems[key] = items[key];
    //     });
    //     updateItems(newItems);
    //     //this code works, but doesn't rerender
    // };

    //make images clickable
    
    const renderItem = (item) => {
        return (
            <TouchableOpacity 
                onPress={() => {
                    updateUrl(item.url);
                    setModalVisible(!modalVisible);}
                }
                style = {styles.preview}
                >
                <Image source={{uri: item.preview}} 
                    style={{flex: 1}}
                    />
            </TouchableOpacity>
        )
    }

    return (
        <View style= {styles.container}>
            <SafeAreaView style={styles.header_safe_area}>
                <View style= {updateHeader(currPublication)}>
                    <View style={styles.header_inner}>
                        <Text style={styles.title}>Print Issue</Text>
                    </View>
                </View>
            </SafeAreaView>
            <Modal
            animationType="fade"
            // transparent={true}
            visible={modalVisible}
            onRequestClose={() => {
                Alert.alert("Modal has been closed.");
                setModalVisible(!modalVisible);
            }}
            >
                <View style={styles.modalView}>
                    <View style = {styles.closeButton}>
                        <Pressable onPress={() => setModalVisible(!modalVisible)}>
                            <Text style = {styles.tempText}>X</Text>
                        </Pressable>
                    </View>
                    <View style = {styles.calendarView}>
                        <Agenda
                            minDate={'2019-01-01'}
                            maxDate={'2025-01-01'}
                            selected = {date}
                            markedDates = {getSelectedDays(currPublication)}
                            items = {getItems(currPublication)}
                            onDayPress= {day => {
                                if (!(DATA.find(element => element.date === day.dateString) === undefined)) {
                                    const data = DATA.find(element => element.date === day.dateString);
                                    updateDate(convertToDate(day.day, day.month, day.year));
                                    updateUrl(data.url);
                                }
                            }}
                            showOnlySelectedDayItems = {true}
                            hideArrows={true}
                            pastScrollRange = {50}
                            futureScrollRange = {50}
                            firstDay={0}
                            scrollEnabled={true}
                            renderEmptyData = {() => {return <View/>} }
                            hideKnob = {false}
                            renderItem = {(item) => {
                                return renderItem(item)
                            }}
                            // onDayChange={(day) => {
                            //     // console.log("DAY CHANGE", day)
                            //     if (!(DATA.find(element => element.date === day.dateString) === undefined)) {
                            //         resetItems(currPublication);
                            //         const data = DATA.find(element => element.date === day.dateString);
                            //         updateDate(convertToDate(day.day, day.month, day.year));
                            //         updateUrl(data.url);
                            //     }
                            // }}
                        />
                    </View>
                </View>
            </Modal>
            
            {/* <Modal
            animationType="fade"
            visible={searchModalVisible}
            onRequestClose={() => {
                Alert.alert("Modal has been closed.");
                setSearchModalVisible(!searchModalVisible);
            }}
            >
                <View style={styles.modalView}>
                    <View style = {styles.closeButton}>
                        <Pressable onPress={() => setSearchModalVisible(!searchModalVisible)}>
                            <Text style = {styles.tempText}>X</Text>
                        </Pressable>
                    </View>
                    <View style = {styles.calendarView}>
                        
                    </View>
                </View>
            </Modal> */}

            <View style={styles.dates}>
                <Text style={updateDateText(currPublication)}>
                    {date}
                </Text>
                {/* <View style={styles.buttonGroup}> */}
                    <Pressable
                        style = {updateButton(currPublication)}
                        onPress={() => setModalVisible(true)}
                        >
                        <Text style={styles.buttonText}>ARCHIVES</Text>
                    </Pressable>
                    {/* <Pressable
                        style = {updateButton(currPublication)}
                        onPress={() => setSearchModalVisible(true)}
                        >
                        <Text style={styles.buttonText}>SEARCH</Text>
                    </Pressable> */}
                {/* </View> */}
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





