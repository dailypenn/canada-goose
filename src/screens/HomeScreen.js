import React, { Component } from 'react'
import { useQuery } from '@apollo/client'
import { HOME_PAGE_QUERY } from '../utils/constants'
import { StyleSheet, ScrollView, View, Text } from 'react-native'
import {
  CustomHeader,
  SectionHeader,
  HeadlineArticle,
  HorizontalArticleCarousel,
  ArticleList,
} from '../components/shared'
import AsyncStorage from '@react-native-community/async-storage'

import { TouchableOpacity } from 'react-native-gesture-handler'
// import { Storage } from '../../Storage'
import { HOME_FEED_ORDER_KEY } from '../utils/storageKeys'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  text1: {
    color: '#fff',
  },
})

const HomeLoading = () => {
  return <Text> Loading... </Text>
}

class HomeView extends Component {
  constructor(props) {
    super(props)
    this.state = { offset: 0 }
    this.sections = [
      { name: 'In Other News', articles: props.mostRecentArticles },
      { name: 'In Other Opinion', articles: props.mostRecentArticles },
      { name: 'In Other Sports', articles: props.mostRecentArticles },
      { name: 'In Other Multimedia', articles: props.mostRecentArticles },
    ]
    this.navigateToArticleScreen = this.navigateToArticleScreen.bind(this)
  }

  navigateToArticleScreen(article) {
    this.props.navigation.navigate('Article', { article })
  }

  render() {
    const handleScroll = scrollData => {
      var newOffset = scrollData.nativeEvent.contentOffset.y
      this.setState({ offset: newOffset })
    }

    return (
      <View style={styles.container}>
        <ScrollView
          onScroll={event => handleScroll(event)}
          scrollEventThrottle={16}
        >
          <TouchableOpacity
            activeOpacity={1}
            onPress={() =>
              this.navigateToArticleScreen(this.props.centerArticles[0])
            }
          >
            <HeadlineArticle
              data={this.props.centerArticles[0]}
              publication={this.props.publicationState.currPublication}
              onPress={() => {
                this.props.centerArticles[0]
              }}
            />
          </TouchableOpacity>

          <SectionHeader
            title="Top Stories"
            publication={this.props.publicationState.currPublication}
          />
          <HorizontalArticleCarousel
            articles={this.props.topArticles}
            navigateToArticleScreen={this.navigateToArticleScreen}
            publication={this.props.publicationState.currPublication}
          />

          {this.sections.map(el => {
            const { name, articles } = el
            return (
              <View>
                <SectionHeader
                  title={name}
                  publication={this.props.publicationState.currPublication}
                />
                <ArticleList
                  articles={articles}
                  navigateToArticleScreen={this.navigateToArticleScreen}
                  publication={this.props.publicationState.currPublication}
                />
              </View>
            )
          })}
        </ScrollView>
        <CustomHeader
          publicationState={this.props.publicationState}
          contentOffset={this.state.offset}
        />
      </View>
    )
  }
}

export const HomeScreen = ({ navigation, screenProps }) => {
  const publicationState = screenProps.state
  const { loading, error, data } = useQuery(HOME_PAGE_QUERY)

  if (loading) return <HomeLoading />

  if (error) {
    console.log(error)
    return <Text> Error </Text>
  }

  const getData = async () => {
    console.log('==========getting local data=========')
    try {
      console.log(HOME_FEED_ORDER_KEY)
      const jsonValue = await AsyncStorage.getItem(HOME_FEED_ORDER_KEY)
      const val = jsonValue != null ? JSON.parse(jsonValue) : null
      console.log(val)
    } catch (e) {
      console.log(e)
    }
  }

  getData()

  const {
    most_recent: { edges: mostRecentArticles },
    top: { edges: topArticles },
    centerpiece: { edges: centerArticles },
  } = data

  return (
    <HomeView
      mostRecentArticles={mostRecentArticles}
      topArticles={topArticles}
      centerArticles={centerArticles}
      navigation={navigation}
      publicationState={publicationState}
    />
  )
}
