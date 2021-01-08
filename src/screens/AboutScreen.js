import React from "react";
import { Image, ScrollView, StyleSheet, Text, View } from "react-native";

const teamIntro =
  "Hi, we're the tech department at the DP: a team of student software engineers!";
const mission =
  "Our mission statement is xxx xxx xxx xxx xxx xxx xxx xxx xxx xxx xxx xxx xxx xxx xxx xxx xxx xxx xxx xxx xxx xxx xxx xxx xxx \n \nOur ultimate goal is xxx xxx xxx xxx xxx xxx xxx xxx xxx xxx xxx xxx xxx xxx xxx xxx xxx xxx xxx xxx xxx xxx xxx xxx xxx";

const GOOSE_LOGO = require("../static/logos/goose_from_canada_logo.png");

// StyleSheet;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    flexDirection: "column",
    backgroundColor: "#eee",
  },

  image: {
    width: 300,
    height: 300,
  },

  sectionContainer: {
    flex: 1,
    flexDirection: "row",
  },

  intro: {
    paddingHorizontal: 45,
    paddingBottom: 30,
    fontWeight: "bold",
  },

  mission: {
    paddingHorizontal: 60,
    fontSize: 12,
  },

  meetTeam: {
    fontSize: 22,
    fontWeight: "bold",
    marginTop: 20,
    paddingVertical: 10,
  },
});

const people = [
  { name: "Peter Baile Chen", image: "" },
  { name: "Elizabeth Powell", image: "" },
  { name: "Justin Lieb", image: "" },
  { name: "Raunaq Singh", image: "" },
  { name: "Daniel Tao", image: "" },
];

export const AboutScreen = () => {
  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      contentContainerStyle={styles.container}
    >
      <Image source={GOOSE_LOGO} style={styles.image} />
      <Text style={styles.intro}>{teamIntro}</Text>
      <Text style={styles.mission}>{mission}</Text>
      <Text style={styles.meetTeam}>Meet the Team</Text>
      {people.map((l, i) => (
        <View>
          {/* <Image
              source={require("../static/logos/default_profile_pic.png")}
            /> */}
          <Text>{l.name}</Text>
        </View>
      ))}
    </ScrollView>
  );
};
