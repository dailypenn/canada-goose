import React, { Component } from 'react'
import { useQuery } from '@apollo/client'

import { StyleSheet, ScrollView, View, Text } from 'react-native'

import { ArticleList, HeadlineArticle } from '../components/shared'
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

// TODO: @raunaq turn this into a shared component
class SectionView extends Component {
  constructor(props) {
    super(props)
    this.state = { offset: 0 }
    this.navigateToArticleScreen = this.navigateToArticleScreen.bind(this)
  }

  navigateToArticleScreen(article) {
    this.props.navigation.navigate('Article', { article })
  }

  render() {
    const handleScroll = (scrollData) => {
      var newOffset = scrollData.nativeEvent.contentOffset.y
      this.setState({ offset: newOffset })
    }
    return (
      <View style={styles.container}>
        <ScrollView
          onScroll={(event) => handleScroll(event)}
          scrollEventThrottle={16}
        >
          <HeadlineArticle
            data={this.props.articles[0]}
            publication={this.props.publicationState.currPublication}
          />
          <ArticleList
            articles={this.props.articles.slice(1)}
            navigateToArticleScreen={this.navigateToArticleScreen}
            publication={this.props.publicationState.currPublication}
          />
        </ScrollView>
      </View>
    )
  }
}

export const SectionScreen = ({ route, navigation, screenProps }) => {
  const publicationState = screenProps.state
  const { sectionName: section } = route.params
  const { loading, error, data } = useQuery(SECTIONS_QUERY, {
    variables: { section }
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
      navigation={navigation}
      publicationState={publicationState}
    />
  )
}