import React, { useState, useRef, useContext } from 'react'
import {
  SafeAreaView,
  Dimensions,
  StyleSheet,
  View,
  TextInput,
  Text,
  TouchableHighlight,
  ScrollView,
  Button,
  Animated,
  Platform,
  Image,
} from 'react-native'

import Ionicons from 'react-native-vector-icons/Ionicons'
import {
  getStatusBarHeight,
  getBottomSpace,
  isIphoneX,
} from 'react-native-iphone-x-helper'
import { useQuery } from '@apollo/client'
import { ARTICLES_SEARCH } from '../utils/queries'
import {
  PARTIAL_NAVIGATE,
  NAVIGATE_TO_ARTICLE_SCREEN,
} from '../utils/helperFunctions'
import {
  BODY_SERIF,
  DISPLAY_SERIF_BLACK,
  GEOMETRIC_BOLD,
  GEOMETRIC_REGULAR,
} from '../utils/fonts'
import { SearchArticleList } from './ArticleList'
import { PublicationEnum } from '../utils/constants'
import { LogoActivityIndicator } from './LogoActivityIndicator'
import { ThemeContext } from './ThemeProvider'

const DP_SEARCH_IMG = require('../static/empty-states/search/dp.png')
const ST_SEARCH_IMG = require('../static/empty-states/search/street.png')
const UTB_SEARCH_IMG = require('../static/empty-states/search/utb.png')

const GET_SEARCH_IMG = publication => {
  switch (publication) {
    case PublicationEnum.dp:
      return DP_SEARCH_IMG
    case PublicationEnum.street:
      return ST_SEARCH_IMG
    default:
      return UTB_SEARCH_IMG
  }
}

const DP_NORESULTS_IMG = require('../static/empty-states/error/dp.png')
const ST_NORESULTS_IMG = require('../static/empty-states/error/street.png')
const UTB_NORESULTS_IMG = require('../static/empty-states/error/utb.png')

const GET_NORESULTS_IMG = publication => {
  switch (publication) {
    case PublicationEnum.dp:
      return DP_NORESULTS_IMG
    case PublicationEnum.street:
      return ST_NORESULTS_IMG
    default:
      return UTB_NORESULTS_IMG
  }
}

const { Value, timing, Clock } = Animated

const width = Dimensions.get('window').width
const height = Dimensions.get('window').height
const screenHeight = Dimensions.get('screen').height

const topInset = getStatusBarHeight(true)
const bottomInset = getBottomSpace()
const bottomBar =
  Platform.OS === 'android' ? screenHeight - height - topInset : 0 //black bar on android

var contentHeight =
  Platform.OS === 'android'
    ? height - (49 + 50 + bottomInset) + 14
    : height - (49 + 50 + topInset + bottomInset)
if (isIphoneX()) {
  contentHeight = height - (49 + 50 + topInset + bottomInset) + 4
}

const SearchView = ({ filter, navigation, publication }) => {
  const theme = useContext(ThemeContext)
  const styles = createStyles(theme)

  const { loading, error, data } = useQuery(ARTICLES_SEARCH, {
    variables: { filter, publication },
    fetchPolicy: 'cache-and-network',
  })

  if (!data) return <LogoActivityIndicator />

  const noResultsImg = GET_NORESULTS_IMG(publication)

  const { searchArticles: results } = data

  return (
    <ScrollView
      keyboardShouldPersistTaps="handled"
      keyboardDismissMode="on-drag"
    >
      {results.length === 0 ? (
        <View style={{ height: contentHeight }}>
          <View style={styles.image_placeholder_container}>
            <Image source={noResultsImg} style={styles.image_placeholder} />
            <Text style={styles.image_placeholder_text}>No results found</Text>
          </View>
        </View>
      ) : (
        <SearchArticleList
          articles={results}
          publication={publication}
          navigateToArticleScreen={PARTIAL_NAVIGATE(
            navigation,
            'SectionArticle',
            NAVIGATE_TO_ARTICLE_SCREEN
          )}
        />
      )}
    </ScrollView>
  )
}

export const SearchBar = ({ navigation, publication }) => {
  const theme = useContext(ThemeContext)
  const styles = createStyles(theme)

  const [focused, setFocused] = useState(false)
  const [keyword, setKeyword] = useState('')
  const [input_x_pos] = useState(new Value(width))
  const [cancel_opacity] = useState(new Value(0))
  const [content_y_pos] = useState(new Value(height + 500))
  const [content_opacity] = useState(new Value(0))
  const [title_opacity] = useState(new Value(1))

  const input = useRef()

  const searchImg = GET_SEARCH_IMG(publication)

  const _onFocus = () => {
    const input_x_pos_anim = {
      duration: 200,
      toValue: 0,
      // easing: Easing.inOut(Easing.ease),
      useNativeDriver: false,
    }
    const cancel_opacity_anim = {
      duration: 200,
      toValue: 1,
      // easing: Easing.inOut(Easing.ease),
      useNativeDriver: false,
    }
    const content_y_pos_anim = {
      duration: 0,
      toValue: Platform.OS === 'android' ? topInset + 36 : topInset + 50, //topInset + 50
      // easing: Easing.inOut(Easing.ease),
      useNativeDriver: false,
    }
    const content_opacity_anim = {
      duration: 200,
      toValue: 1,
      // easing: Easing.inOut(Easing.ease),
      useNativeDriver: false,
    }
    const title_opacity_anim = {
      duration: 200,
      toValue: 0,
      // easing: Easing.inOut(Easing.ease),
      useNativeDriver: false,
    }

    if (!focused) {
      timing(input_x_pos, input_x_pos_anim).start()
      timing(cancel_opacity, cancel_opacity_anim).start()
      timing(content_y_pos, content_y_pos_anim).start()
      timing(content_opacity, content_opacity_anim).start()
      timing(title_opacity, title_opacity_anim).start()
    }

    input.current.focus()

    setFocused(true)
    setKeyword('')
  }

  const _onBlur = () => {
    const input_x_pos_anim = {
      duration: 200,
      toValue: width,
      // easing: Easing.inOut(Easing.ease),
      useNativeDriver: false,
    }
    const cancel_opacity_anim = {
      duration: 50,
      toValue: 0,
      // easing: Easing.inOut(Easing.ease),
      useNativeDriver: false,
    }
    const content_y_pos_anim = {
      duration: 300,
      toValue: height + 500,
      // easing: Easing.inOut(Easing.ease),
      useNativeDriver: false,
    }
    const content_opacity_anim = {
      duration: 300,
      toValue: 0,
      // easing: Easing.inOut(Easing.ease),
      useNativeDriver: false,
    }
    const title_opacity_anim = {
      duration: 400,
      toValue: 1,
      // easing: Easing.inOut(Easing.ease),
      useNativeDriver: false,
    }

    if (focused) {
      timing(input_x_pos, input_x_pos_anim).start()
      timing(cancel_opacity, cancel_opacity_anim).start()
      timing(content_y_pos, content_y_pos_anim).start()
      timing(content_opacity, content_opacity_anim).start()
      timing(title_opacity, title_opacity_anim).start()
    }

    input.current.blur()

    setFocused(false)
  }

  return (
    <>
      <SafeAreaView style={styles.header_safe_area}>
        <View
          style={{
            //permanent bottomBorder
            position: 'absolute',
            height: 6,
            width: '100%',
            backgroundColor: theme.backgroundColor,
            borderBottomWidth: 0.8,
            borderBottomColor: theme.borderColor,
            top: 50,
          }}
        />
        <View style={styles.header}>
          <View style={styles.header_inner}>
            <Animated.View style={{ opacity: title_opacity }}>
              <Text style={styles.title}>Discover</Text>
            </Animated.View>
            <TouchableHighlight
              activeOpacity={1}
              underlayColor={'gray'}
              onPress={_onFocus}
              style={styles.search_icon_box}
            >
              <Ionicons name="search" size={20} color={theme.primaryTextColor} />
            </TouchableHighlight>
            <Animated.View
              style={[
                styles.input_box,
                { transform: [{ translateX: input_x_pos }] },
              ]}
            >
              {Platform.OS === 'android' ? (
                <>
                  <Animated.View style={{ opacity: cancel_opacity }}>
                    <TouchableHighlight
                      activeOpacity={1}
                      underlayColor={theme.wallColor}
                      onPress={_onBlur}
                      style={styles.back_icon_box}
                    >
                      <Ionicons
                        name="chevron-back-outline"
                        size={22}
                        color="#666"
                      />
                    </TouchableHighlight>
                  </Animated.View>
                  <TextInput
                    ref={input}
                    placeholder="Search"
                    placeholderTextColor={theme.secondaryTextColor}
                    clearButtonMode="always"
                    value={keyword}
                    onChangeText={value => setKeyword(value)}
                    style={styles.input}
                    returnKeyType="search"
                    autoCapitalize="none"
                    autoCorrect={false}
                  />
                </>
              ) : (
                <>
                  <TextInput
                    ref={input}
                    placeholder="Search"
                    placeholderTextColor={theme.secondaryTextColor}
                    clearButtonMode="always"
                    value={keyword}
                    onChangeText={value => setKeyword(value)}
                    style={styles.input}
                    returnKeyType="search"
                    autoCapitalize="none"
                    autoCorrect={false}
                  />
                  <Animated.View style={{ opacity: cancel_opacity }}>
                    <Button
                      title="Cancel"
                      onPress={_onBlur}
                      color={theme.primaryTextColor}
                      titleStyle={{ fontFamily: GEOMETRIC_REGULAR }}
                    />
                  </Animated.View>
                </>
              )}
            </Animated.View>
          </View>
        </View>
      </SafeAreaView>
      <Animated.View
        style={[
          styles.content,
          {
            opacity: content_opacity,
            transform: [{ translateY: content_y_pos }],
          },
        ]}
      >
        <SafeAreaView style={styles.content_safe_area}>
          <View style={styles.content_inner}>
            {keyword === '' ? (
              <View style={styles.image_placeholder_container}>
                <Image source={searchImg} style={styles.image_placeholder} />
                <Text style={styles.image_placeholder_text}>
                  Try searching for articles
                </Text>
              </View>
            ) : (
              <SearchView
                filter={keyword}
                navigation={navigation}
                publication={publication}
              />
            )}
          </View>
        </SafeAreaView>
      </Animated.View>
    </>
  )
}

const createStyles = (theme) => StyleSheet.create({
  title: {
    color: theme.primaryTextColor,
    fontFamily: DISPLAY_SERIF_BLACK,
    fontSize: 28,
    lineHeight: 40,
  },
  header_safe_area: {
    backgroundColor: theme.backgroundColor,
    zIndex: 1000,
  },
  header: {
    height: 50,
    paddingHorizontal: 16,
  },
  header_inner: {
    flex: 1,
    overflow: 'hidden',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    position: 'relative',
  },
  search_icon_box: {
    width: 40,
    height: 40,
    borderRadius: 40,
    backgroundColor: theme.borderColor,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  input_box: {
    height: 50,
    flexDirection: 'row',
    alignItems: 'center',
    position: 'absolute',
    top: 0,
    backgroundColor: theme.backgroundColor,
    width: width - 32,
    ...Platform.select({
      ios: {
        left: 0,
      },
      android: {
        right: 0,
      },
    }),
  },
  back_icon_box: {
    width: 40,
    height: 40,
    borderRadius: 40,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 5,
    marginLeft: 5,
  },
  input: {
    color: theme.primaryTextColor,
    fontFamily: GEOMETRIC_REGULAR,
    flex: 1,
    height: 40,
    backgroundColor: theme.borderColor,
    borderRadius: 16,
    paddingHorizontal: 16,
    fontSize: 20,
  },
  content: {
    width: width,
    height: contentHeight,
    position: 'absolute',
    zIndex: 999,
  },
  content_safe_area: {
    flex: 1,
    backgroundColor: theme.backgroundColor,
  },
  content_inner: {
    flex: 1,
    paddingTop: 0,
  },
  image_placeholder_container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    marginTop: '-50%',
  },
  image_placeholder: {
    height: 160,
    resizeMode: 'contain',
    alignSelf: 'center',
  },
  image_placeholder_text: {
    textAlign: 'center',
    color: theme.secondaryTextColor,
    marginTop: 10,
    fontSize: 18,
  },
  search_item: {
    flexDirection: 'row',
    height: 40,
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: theme.borderColor,
    marginLeft: 16,
  },
  item_icon: {
    marginRight: 15,
  },
})
