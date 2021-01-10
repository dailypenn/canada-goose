import React from 'react'
import { ActivityIndicator as AI, StyleSheet, View } from 'react-native'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center'
  }
})

export const ActivityIndicator = () => (
  <View style={styles.container}>
    <AI />
  </View>
)