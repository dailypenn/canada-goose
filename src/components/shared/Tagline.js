import React from "react"
import { View, StyleSheet, ImageBackground, Text } from "react-native"

const styles = StyleSheet.create({
  tagline: {
    color: "#000",
    fontSize: 14,
    fontFamily: "HelveticaNeue-Semibold",
    marginRight: 15,
    opacity: 0.5,
  },
  circle: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "darkred",
    marginTop: 4,
    marginRight: 10,
  },
  view: {
    flexDirection: "row",
    padding: 20,
  },
})

export const Tagline = ({ tagline }) => (
  <View style={styles.view}>
    <View style={styles.circle} />
    <Text style={styles.tagline}>{tagline}</Text>
  </View>
)
