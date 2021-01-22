import { useIsFocused } from '@react-navigation/native'
import React from 'react'
import { StatusBar } from 'react-native'

export const DefaultStatusBar = () => {
  const isFocused = useIsFocused()
  return isFocused ? (
    <StatusBar barStyle={'dark-content'} backgroundColor={'#EEE'} />
  ) : null
}
