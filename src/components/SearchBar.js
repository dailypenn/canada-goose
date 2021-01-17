import React, { useState, useRef } from 'react'
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
} from 'react-native'
import Animated, { Easing } from 'react-native-reanimated'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { useQuery } from '@apollo/client'

import { SectionHeader } from './SectionHeader'
import { ActivityIndicator } from './ActivityIndicator'
import { ARTICLES_SEARCH } from '../utils/queries'
import {
  PARTIAL_NAVIGATE,
  NAVIGATE_TO_ARTICLE_SCREEN,
} from '../utils/helperFunctions'
import { GEOMETRIC_BOLD } from '../utils/fonts'
import { SearchArticleList } from './ArticleList'

const { Value, timing } = Animated

const width = Dimensions.get('window').width
const height = Dimensions.get('window').height

const SearchView = ({ filter, navigation, publication }) => {
  const { loading, error, data } = useQuery(ARTICLES_SEARCH, {
    variables: { filter, publication },
    fetchPolicy: 'cache-and-network',
  })

  if (!data) return <ActivityIndicator />

  const { searchArticles: results } = data

  return (
    <ScrollView
      keyboardShouldPersistTaps="handled"
      keyboardDismissMode="on-drag"
    >
      <SectionHeader title="Sections" />
      <SectionHeader title="Articles" />
      <SearchArticleList
        articles={results}
        publication={publication}
        navigateToArticleScreen={PARTIAL_NAVIGATE(
          navigation,
          'SectionArticle',
          NAVIGATE_TO_ARTICLE_SCREEN
        )}
      />
    </ScrollView>
  )
}

export const SearchBar = ({ navigation, publication }) => {
  const [focused, setFocused] = useState(false)
  const [keyword, setKeyword] = useState('')

  const [input_x_pos] = useState(new Value(width))
  const [cancel_opacity] = useState(new Value(0))
  const [content_y_pos] = useState(new Value(height))
  const [content_opacity] = useState(new Value(0))
  const [title_opacity] = useState(new Value(1))

  const input = useRef()

  const _onFocus = () => {
    const input_x_pos_anim = {
      duration: 200,
      toValue: 0,
      easing: Easing.inOut(Easing.ease),
    }
    const cancel_opacity_anim = {
      duration: 200,
      toValue: 1,
      easing: Easing.inOut(Easing.ease),
    }
    const content_y_pos_anim = {
      duration: 0,
      toValue: 0,
      easing: Easing.inOut(Easing.ease),
    }
    const content_opacity_anim = {
      duration: 200,
      toValue: 1,
      easing: Easing.inOut(Easing.ease),
    }
    const title_opacity_anim = {
      duration: 200,
      toValue: 0,
      easing: Easing.inOut(Easing.ease),
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
      easing: Easing.inOut(Easing.ease),
    }
    const cancel_opacity_anim = {
      duration: 50,
      toValue: 0,
      easing: Easing.inOut(Easing.ease),
    }
    const content_y_pos_anim = {
      duration: 200,
      toValue: height,
      easing: Easing.inOut(Easing.ease),
    }
    const content_opacity_anim = {
      duration: 200,
      toValue: 0,
      easing: Easing.inOut(Easing.ease),
    }
    const title_opacity_anim = {
      duration: 300,
      toValue: 1,
      easing: Easing.inOut(Easing.ease),
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
        <View style={styles.header}>
          <View style={styles.header_inner}>
            <Animated.View style={{ opacity: title_opacity }}>
              <Text style={styles.title}>Discover</Text>
            </Animated.View>
            <TouchableHighlight
              activeOpacity={1}
              underlayColor={'#ccd0d5'}
              onPress={_onFocus}
              style={styles.search_icon_box}
            >
              <Ionicons name="search" size={20} color="#000" />
            </TouchableHighlight>
            <Animated.View
              style={[
                styles.input_box,
                { transform: [{ translateX: input_x_pos }] },
              ]}
            >
              {/* <Animated.View style={{ opacity: cancel_opacity }}>
                <TouchableHighlight
                  activeOpacity={1}
                  underlayColor={"#ccd0d5"}
                  onPress={_onBlur}
                  style={styles.back_icon_box}
                >
                  <Ionicons name="chevron-back-outline" size={22} color="#666" />
                </TouchableHighlight>
              </Animated.View> */}
              <TextInput
                ref={input}
                placeholder="Search"
                clearButtonMode="always"
                value={keyword}
                onChangeText={value => setKeyword(value)}
                style={styles.input}
                returnKeyType="search"
                autoCapitalize='none'
                autoCorrect={false}
              />
              <Animated.View style={{ opacity: cancel_opacity }}>
                <Button title="Cancel" onPress={_onBlur} color="#333" />
              </Animated.View>
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
            <View style={styles.separator} />
            {keyword === '' ? (
              <View style={styles.image_placeholder_container}>
                <Text style={styles.image_placeholder_text}>
                  Try searching for articles or sections
                </Text>
              </View>
            ) : (
              <SearchView filter={keyword} navigation={navigation} publication={publication} />
            )}
          </View>
        </SafeAreaView>
      </Animated.View>
    </>
  )
}

const styles = StyleSheet.create({
  title: {
    fontFamily: GEOMETRIC_BOLD,
    fontSize: 28,
    lineHeight: 40,
  },
  header_safe_area: {
    zIndex: 1000,
    //marginTop: 5,
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
    backgroundColor: '#EEE',
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
    left: 0,
    backgroundColor: 'white',
    width: width - 26, //width - 32
  },
  back_icon_box: {
    width: 40,
    height: 40,
    borderRadius: 40,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 5,
  },
  input: {
    flex: 1,
    height: 40,
    backgroundColor: '#e4e6eb',
    borderRadius: 16,
    paddingHorizontal: 16,
    fontSize: 18,
  },
  content: {
    width: width,
    height: height,
    position: 'absolute',
    left: 0,
    bottom: 0,
    zIndex: 999,
  },
  content_safe_area: {
    flex: 1,
    backgroundColor: 'white',
  },
  content_inner: {
    flex: 1,
    paddingTop: 125,
  },
  separator: {
    marginTop: 5,
    marginBottom: 5,
    height: 1,
    backgroundColor: '#e6e4eb',
  },
  image_placeholder_container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    marginTop: '-50%',
  },
  image_placeholder: {
    width: 150,
    height: 113,
    alignSelf: 'center',
  },
  image_placeholder_text: {
    textAlign: 'center',
    color: 'gray',
    marginTop: 5,
  },
  search_item: {
    flexDirection: 'row',
    height: 40,
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#e6e4eb',
    marginLeft: 16,
  },
  item_icon: {
    marginRight: 15,
  },
})
