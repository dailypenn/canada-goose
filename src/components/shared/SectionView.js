import React from 'react'
import { StyleSheet, ScrollView, View, Text } from 'react-native'

import { HeadlineArticle } from './HeadlineArticle'
import { ArticleList } from './ArticleList'
import {
  PARTIAL_NAVIGATE,
  NAVIGATE_TO_ARTICLE_SCREEN,
} from '../../utils/helperFunctions'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
})

export const SectionView = ({ articles, publication, navigation }) => (
  <View style={styles.container}>
    <ScrollView scrollEventThrottle={16}>
      <ArticleList
        articles={articles}
        navigateToArticleScreen={PARTIAL_NAVIGATE(
          navigation,
          publication,
          'SectionArticle',
          NAVIGATE_TO_ARTICLE_SCREEN
        )}
      />
    </ScrollView>
  </View>
)
