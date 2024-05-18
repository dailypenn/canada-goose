import React, { useContext } from 'react'
import { View, StyleSheet, Text } from 'react-native'

import { BODY_SERIF } from '../utils/fonts'
import { ThemeContext } from "./ThemeProvider";

const createStyles = (theme) => StyleSheet.create({
  tagline: {
    color: theme.primaryTextColor,
    fontSize: 14,
    fontFamily: BODY_SERIF,
    flexShrink: 1,
    opacity: 0.6,
  },
  view: {
    flexDirection: 'row',
    padding: 20,
  },
})

export const Tagline = ({ tagline, publication }) => {
  const theme = useContext(ThemeContext)
  const styles = createStyles(theme)
  return (
      <View style={styles.view}>
        <Text style={styles.tagline}>{tagline}</Text>
      </View>
  )
}
