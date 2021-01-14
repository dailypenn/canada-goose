import React from 'react'
import { View, StyleSheet, Text } from 'react-native'

import { PublicationPrimaryColor } from '../utils/branding'
import { DISPLAY_SERIF_BLACK } from '../utils/fonts'

const styles = StyleSheet.create({
    view: {
        paddingHorizontal: 20,
        //paddingVertical: 10,
        paddingTop: 0,
    },
    coloredLine: {
        width: 120,
        height: 3,
    },
})

const lineStyle = publication => {
    return {
        ...{ backgroundColor: PublicationPrimaryColor(publication) },
        ...styles.coloredLine,
    }
}

export const HeaderLine = ({ publication }) => (
    <View style={styles.view}>
        <View
            style={{
                borderBottomColor: '#CCC',
                borderBottomWidth: 2,
            }}
        />
        <View style={lineStyle(publication)}/>
    </View>
)
