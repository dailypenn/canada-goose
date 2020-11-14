import { StatusBar } from "expo-status-bar"
import React from "react"
import { StyleSheet, SafeAreaView } from "react-native"
import PictureHeadline from "./src/components/shared/PictureHeadline"
import Tagline from "./src/components/shared/Tagline"

const App = () => (
  <SafeAreaView style={styles.container}>
    <PictureHeadline
      headline="Students slam Penn’s decision to slash spring break, brace for future schedule changes"
      category="News"
      time="12 hrs ago"
      imageUrl={"https://picsum.photos/seed/lights/1000/1000"}
    />
    <Tagline tagline='Penn administrators wrote that the decision to modify spring break was made in an effort to "discourage travel during the pandemic," similar to the reason they canceled fall break this semester. But students want more time off during the spring semester to recover from a heavy courseload.' />
  </SafeAreaView>
)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },

  text1: {
    color: "#fff",
  },
});

export default App
