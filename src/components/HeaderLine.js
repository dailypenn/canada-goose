import React from 'react'
import { View, StyleSheet, Text } from 'react-native'

import { PublicationPrimaryColor } from '../utils/branding'
import { DISPLAY_SERIF_BLACK } from '../utils/fonts'

const styles = StyleSheet.create({
    view: {
        paddingHorizontal: 20,
        //paddingVertical: 10,
        paddingTop: 0,
        flexDirection: 'row',
    },
    coloredLine: {
        width: 120,
        height: 4,
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
        <View style={lineStyle(publication)}/>
        <View
            style={{
                borderTopColor: '#CCC',
                borderTopWidth: 2,
                flex: 1,
            }}
        />
    </View>
)
