import React, { useContext } from 'react'
import { Text, View, StyleSheet } from 'react-native'
import { FlatList, TouchableOpacity } from 'react-native-gesture-handler'
import { connect } from 'react-redux'
import { Ionicons } from '@expo/vector-icons'
import { DISPLAY_SERIF_BOLD, GEOMETRIC_REGULAR } from '../utils/fonts'
import { SAVED_ARTICLES_KEY, Storage } from '../utils/storage'
import { NAVIGATE_TO_ARTICLE_SCREEN } from '../utils/helperFunctions'
import { RightSwipeDeleteRow } from '../components/RightSwipeDeleteRow'
import { unsaveArticle } from '../actions'
import { EmptyState, ThemeContext } from '../components'
import { EmptyStateEnum } from '../components/EmptyState'

const createStyles = (theme) => StyleSheet.create({
  container: {
    backgroundColor: theme.wallColor,
    borderTopWidth: 0.8,
    borderTopColor: theme.borderColor,
    flex: 1,
  },
  cell: {
    padding: 20,
    flexDirection: 'row',
    backgroundColor: theme.backgroundColor,
    borderBottomColor: theme.borderColor,
    borderBottomWidth: 0.8,
  },
  textContainer: {
    width: '95%',
  },
  chevron: {
    justifyContent: 'center',
  },
  spacer: {
    flex: 1,
  },
  title: {
    color: theme.primaryTextColor,
    fontFamily: DISPLAY_SERIF_BOLD,
    fontSize: 18,
    lineHeight: 22,
  },
  subText: {
    color: theme.secondaryTextColor,
    fontFamily: GEOMETRIC_REGULAR,
    fontSize: 12,
    paddingBottom: 8,
  },
  rightSwipeItem: {
    justifyContent: 'center',
    backgroundColor: 'red',
  },
})

const SavedArticleCell = ({ title, savedAt, category, publication }) => {
  const theme = useContext(ThemeContext)
  const styles = createStyles(theme)

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
        <Ionicons name="chevron-forward" size={20} color={theme.borderColor} />
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

const SavedArticlesScreenComp = ({
  navigation,
  settings,
  dispatch,
  publication,
}) => {
  const savedArticles = settings.savedArticles ? settings.savedArticles : []
  const theme = useContext(ThemeContext)
  const styles = createStyles(theme)

  const navigationHandler = async item => {
    NAVIGATE_TO_ARTICLE_SCREEN(navigation, 'SettingsArticle', {
      article: item.article,
      articlePublication: item.publication,
    })
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

  if (savedArticles.length == 0)
    return (
      <View
        style={{...styles.container, justifyContent: 'center'}}
      >
        <EmptyState
          {...{
            publication: publication.currPublication,
            type: EmptyStateEnum.empty,
            caption:
              "You don't have any bookmarks! Bookmark any article and it will appear here.",
          }}
        />
      </View>
    )

  return (
    <View style={styles.container}>
      <FlatList
        data={[...savedArticles].reverse()}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        keyExtractor={(_, index) => String(index)}
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
    </View>
  )
}

const mapStateToProps = ({ publication, settings }) => ({
  publication,
  settings,
})

export const SavedArticlesScreen = connect(mapStateToProps)(
  SavedArticlesScreenComp
)
