import React from 'react'
import { StyleSheet, Text } from 'react-native'
import { useQuery } from '@apollo/client'

import { SectionView } from '../components/shared'
import { SECTIONS_QUERY } from '../utils/constants'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
})

const SectionLoading = () => {
  return <Text> Loading... </Text>
}

export const SectionScreen = ({ route, navigation, screenProps }) => {
  const publicationState = screenProps.state
  const { slug } = route.params
  const { loading, error, data } = useQuery(SECTIONS_QUERY, {
    variables: { section: slug },
  })

  if (loading) return <SectionLoading />

  if (error) {
    console.log(error)
    return <Text> Error </Text>
  }

  const { edges: articles } = data.articles

  return (
    <SectionView
      articles={articles}
      publication={publicationState}
      navigation={navigation}
    />
  )
}
