import { useIsFocused } from '@react-navigation/native'
import React, { useContext } from 'react'
import { StatusBar } from 'react-native'
import { ThemeContext } from './ThemeProvider'

export const DefaultStatusBar = () => {
  const theme = useContext(ThemeContext)
  const isFocused = useIsFocused()

  const barStyle = theme.mode === 'dark' ? 'light-content' : 'dark-content';

  return isFocused ? (
    <StatusBar barStyle={barStyle} backgroundColor={theme.backgroundColor} />
  ) : null
}
