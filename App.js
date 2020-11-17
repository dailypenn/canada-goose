import { StatusBar } from "expo-status-bar"
import React from "react"
import { StyleSheet, SafeAreaView, ScrollView } from "react-native"
import PictureHeadline from "./src/components/shared/PictureHeadline"
import Tagline from "./src/components/shared/Tagline"
import SectionHeader from "./src/components/shared/SectionHeader"
import HorizontalArticleCell from "./src/components/shared/HorizontalArticleCell"

const App = () => (
  <SafeAreaView style={styles.container}>
    <ScrollView>
      <PictureHeadline
        headline="Students slam Penn’s decision to slash spring break, brace for future schedule changes"
        category="News"
        time="12 hrs ago"
        imageUrl={"https://picsum.photos/seed/lights/1000/1000"}
      />
      <Tagline tagline='Penn administrators wrote that the decision to modify spring break was made in an effort to "discourage travel during the pandemic," similar to the reason they canceled fall break this semester. But students want more time off during the spring semester to recover from a heavy courseload.' />
      <SectionHeader title='Top Stories'/>
      <SectionHeader title='Most Recent'/>
      <HorizontalArticleCell
        title="President and 1968 Wharton graduate Donald Trump tests positive for coronavirus"
        category="Politics"
        imageURL={"https://www.thenation.com/wp-content/uploads/2020/03/trumpbefuddled_shutterstock.jpg"}
      />
      <HorizontalArticleCell
        title="President and 1968 Wharton graduate Donald Trump tests positive for coronavirus"
        category="Politics"
        imageURL={"https://www.thenation.com/wp-content/uploads/2020/03/trumpbefuddled_shutterstock.jpg"}
      />
    </ScrollView>
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
