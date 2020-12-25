import React from "react";
import { View, StyleSheet, Text } from "react-native";
import { PublicationPrimaryColor } from "../../utils/branding";

const styles = StyleSheet.create({
  tagline: {
    color: "#000",
    fontSize: 14,
    fontFamily: "HelveticaNeue-CondensedBold",
    flexShrink: 1,
    opacity: 0.5,
  },
  circle: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginTop: 4,
    marginRight: 10,
  },
  view: {
    flexDirection: "row",
    padding: 20,
  },
});

const circleStyle = (publication) => {
  return {
    ...{ color: PublicationPrimaryColor(publication) },
    ...styles.circle,
  };
};

export const Tagline = ({ tagline, publication }) => (
  <View style={styles.view}>
    <View style={circleStyle(publication)} />
    <Text style={styles.tagline}>{tagline}</Text>
  </View>
);
