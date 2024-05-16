import React, { useContext } from 'react'
import { View, StyleSheet } from 'react-native'

import { PublicationPrimaryColor } from '../utils/branding'
import { ThemeContext } from "./ThemeProvider";

const createStyles = (theme) => StyleSheet.create({
  view: {
    paddingHorizontal: 20,
    marginTop: 5,
    paddingTop: 0,
    flexDirection: 'row',
  },
  coloredLine: {
    width: 120,
    height: 4,
  },
  uncoloredLine: {
    borderTopColor: theme.borderColor,
    borderTopWidth: 2,
    flex: 1,
  }
})

const lineStyle = publication => {
  const theme = useContext(ThemeContext)
  const styles = createStyles(theme)

  return {
    ...{ backgroundColor: PublicationPrimaryColor(publication) },
    ...styles.coloredLine,
  }
}

export const HeaderLine = ({ publication }) => {
  const theme = useContext(ThemeContext)
  const styles = createStyles(theme)

  return (
    <View style={styles.view}>
      <View style={lineStyle(publication)}/>
      <View
        style={styles.uncoloredLine}
      />
    </View>
  )
}
