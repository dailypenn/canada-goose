import React, { useEffect, useState } from 'react'
import { Text, View, StyleSheet } from 'react-native'
import { FlatList, TouchableOpacity } from 'react-native-gesture-handler'
import { RightSwipeDeleteRow } from '../components/RightSwipeDeleteRow'
import { Ionicons } from '@expo/vector-icons'

import { DISPLAY_SERIF_BOLD, GEOMETRIC_REGULAR } from '../utils/fonts'
import { SAVED_ARTICLES_KEY, Storage } from '../utils/storage'
import { NAVIGATE_TO_ARTICLE_SCREEN, TIME_AGO } from '../utils/helperFunctions'
import { connect } from 'react-redux'
import { unsaveArticle } from '../actions'

const styles = StyleSheet.create({
  cell: {
    padding: 20,
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderBottomColor: '#c4c4c4',
    borderBottomWidth: 0.6,
  },

  textContainer: {
    // backgroundColor: 'red',
    width: '95%',
  },

  chevron: {
    justifyContent: 'center',
  },

  spacer: {
    flex: 1,
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
    paddingBottom: 10,
  },

  rightSwipeItem: {
    justifyContent: 'center',
    backgroundColor: 'red',
  },
})

const SavedArticleCell = ({ title, savedAt, category, publication }) => {
  // const timeAgo = 'Saved ' + TIME_AGO(new Date(savedAt))
  return (
    <View style={styles.cell}>
      <View style={{ flexDirection: 'column' }}>
        <View style={{ flexDirection: 'row' }}>
          <Text style={styles.subText}>{publication} • </Text>
          <Text style={{ ...styles.subText, textTransform: 'uppercase' }}>
            {category}
          </Text>
          <View style={styles.spacer} />
        </View>
        <View style={styles.textContainer}>
          <Text style={styles.title}>{title}</Text>
        </View>
      </View>
      <View style={styles.spacer} />
      <View style={styles.chevron}>
        <Ionicons name="chevron-forward" size={20} color="#c4c4c4" />
      </View>
    </View>
  )
}

const SwipeableRow = ({ item, navigationHandler, deleteHandler }) => {
  const { _, article, saved_at } = item
  return (
    <RightSwipeDeleteRow deleteHandler={() => deleteHandler(item)}>
      <TouchableOpacity
        onPress={() => navigationHandler(item)}
        activeOpacity={1}
      >
        <SavedArticleCell
          title={article.headline}
          savedAt={saved_at}
          category={article.tag}
          publication={item.publication}
        />
      </TouchableOpacity>
    </RightSwipeDeleteRow>
  )
}

const SavedArticlesScreenComp = ({ navigation, settings, dispatch }) => {
  const savedArticles = settings.savedArticles ? settings.savedArticles : []

  // console.log('SAVED ARTICLES SCREEN COMP', savedArticles)

  if (settings.savedArticles != null) {
    settings.savedArticles.forEach(element => {
      console.log(element.article.headline)
    })
  } else {
    console.log('settings. savedarticles is null')
  }

  const navigationHandler = async item => {
    NAVIGATE_TO_ARTICLE_SCREEN(
      navigation,
      'SettingsArticle',
      item.article,
      item.publicationState
    )
  }

  const deleteHandler = async item => {
    const slug = item.slug
    const remainingArticles = savedArticles.filter(item => item.slug !== slug)
    let saved_successfully = await Storage.setItem(
      SAVED_ARTICLES_KEY,
      remainingArticles
    )
    if (saved_successfully) dispatch(unsaveArticle(item))
  }

  return (
    <FlatList
      data={savedArticles}
      showsVerticalScrollIndicator={false}
      showsHorizontalScrollIndicator={false}
      keyExtractor={(_, index) => index}
      renderItem={({ item }) => {
        return (
          <SwipeableRow
            item={item}
            navigationHandler={navigationHandler}
            deleteHandler={deleteHandler}
          />
        )
      }}
    />
  )
}

const mapStateToProps = ({ publication, settings }) => ({
  publication,
  settings,
})

export const SavedArticlesScreen = connect(mapStateToProps)(
  SavedArticlesScreenComp
)
