import React from "react"
import { View, StyleSheet, Text } from "react-native"

const styles = StyleSheet.create({
  title: {
    color: "#A61E21",
    fontFamily: "HelveticaNeue-CondensedBold",
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 0,
    marginTop: 0,
    lineHeight: 35,
  },
  view: {
    color: "#040",
    flexDirection: "row",
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
})

export const SectionHeader = ({ title }) => (
  <View style={styles.view}>
    <Text style={styles.title}>{title}</Text>
  </View>
)
