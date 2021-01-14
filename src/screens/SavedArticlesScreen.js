import React, { useEffect, useState } from 'react'
import { Text, View, StyleSheet } from 'react-native'
import { FlatList, TouchableOpacity } from 'react-native-gesture-handler'
import { RightSwipeDeleteRow } from '../components/RightSwipeDeleteRow'

import { DISPLAY_SERIF_BOLD, GEOMETRIC_REGULAR } from '../utils/fonts'
import { SAVED_ARTICLES_KEY, Storage } from '../utils/storage'
import { NAVIGATE_TO_ARTICLE_SCREEN, TIME_AGO } from '../utils/helperFunctions'

const styles = StyleSheet.create({
  cell: {
    padding: 20,
    backgroundColor: '#fff',
    borderBottomColor: '#c4c4c4',
    borderBottomWidth: 0.6,
  },

  title: {
    fontFamily: DISPLAY_SERIF_BOLD,
    fontSize: 18,
    lineHeight: 22,
  },

  subText: {
    color: '#888',
    fontFamily: GEOMETRIC_REGULAR,
    fontSize: 12,
    paddingTop: 10,
  },

  rightSwipeItem: {
    justifyContent: 'center',
    backgroundColor: 'red',
  },
})

const SavedArticleCell = ({ title, savedAt }) => {
  const timeAgo = 'Saved ' + TIME_AGO(new Date(savedAt))
  return (
    <View style={styles.cell}>
      <View style={styles.textContainer}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.subText}>{timeAgo}</Text>
      </View>
    </View>
  )
}

const SwipeableRow = ({ item, navigationHandler, deleteHandler }) => (
  <RightSwipeDeleteRow deleteHandler={() => deleteHandler(item)}>
    <TouchableOpacity onPress={() => navigationHandler(item)} activeOpacity={1}>
      <SavedArticleCell title={item.headline} savedAt={item.saved_at} />
    </TouchableOpacity>
  </RightSwipeDeleteRow>
)

export const SavedArticlesScreen = ({ navigation }) => {
  const [savedArticles, setSavedArticles] = useState([])

  const loadSavedArticles = async () => {
    let data = await Storage.getItem(SAVED_ARTICLES_KEY)
    if (data != null) setSavedArticles(data)
  }

  useEffect(() => {
    loadSavedArticles()
  }, [])

  const navigationHandler = async item => {
    let article = await Storage.getItem(item.slug)
    NAVIGATE_TO_ARTICLE_SCREEN(
      navigation,
      'SettingsArticle',
      article,
      item.publicationState
    )
  }

  const deleteHandler = async item => {
    const slug = item.slug
    let successful = await Storage.removeItem(item.slug)
    if (successful) {
      const remainingArticles = savedArticles.filter(item => item.slug !== slug)
      await Storage.setItem(SAVED_ARTICLES_KEY, remainingArticles)
      setSavedArticles(remainingArticles)
    }
  }

  return (
    <FlatList
      data={savedArticles}
      showsVerticalScrollIndicator={false}
      showsHorizontalScrollIndicator={false}
      keyExtractor={(_, index) => index}
      renderItem={({ item }) => (
        <SwipeableRow
          item={item}
          navigationHandler={navigationHandler}
          deleteHandler={deleteHandler}
        />
      )}
    />
  )
}
