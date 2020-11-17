import React from "react"
import { StatusBar } from "expo-status-bar"
import { StyleSheet, SafeAreaView, ScrollView } from "react-native"
import { useQuery, gql } from '@apollo/client'
import { Text } from "react-native"

import {
  PictureHeadline,
  Tagline,
  SectionHeader,
  HorizontalArticleCell
} from '../components/shared'
import { HOME_PAGE_QUERY } from '../utils/constants'
import { IMAGE_URL } from '../utils/helperFunctions'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  text1: {
    color: "#fff",
  },
})

const CHAPTERS_QUERY = gql`
  query Chapters {
    chapters {
      id
      number
      title
    }
  }
`

const App = () => {
  const { loading, error, data } = useQuery(HOME_PAGE_QUERY)

  if (loading) {
    return (<Text> Loading... </Text>)
  }

  console.log(data)

  const { most_recent: { edges: mostRecentArticles } } = data

  return (
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
        {mostRecentArticles.map(el => {
          const { article: { headline, dominantMedia: { attachment_uuid, extension } } } = el
            return (
              <HorizontalArticleCell
                title={headline}
                category="Politics"
                imageURL={IMAGE_URL(attachment_uuid, extension)}
              />
            )
          })
        }
      </ScrollView>
    </SafeAreaView>
  )
}

export default App
