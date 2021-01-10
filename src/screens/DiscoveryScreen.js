import React, { Component, useState, useRef } from 'react'
import { useQuery } from '@apollo/client'
import {
  StyleSheet,
  ScrollView,
  View,
  TextInput,
  SafeAreaView,
  Keyboard,
  Button,
  Animated,
  Dimensions,
} from 'react-native'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { FlatGrid } from 'react-native-super-grid'
import { TouchableOpacity } from 'react-native'

import { ARTICLES_SEARCH, SECTIONS } from '../utils/constants'
import {
  SectionHeader,
  SearchArticleList,
  DiscoveryCell,
  ActivityIndicator
} from '../components/shared'
import {
  PARTIAL_NAVIGATE,
  NAVIGATE_TO_ARTICLE_SCREEN
} from '../utils/helperFunctions'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingVertical: 20,
  }
})

class DiscoveryView extends Component {
  constructor(props) {
    super(props)
    this.state = { offset: 0 }
    this.navigateToSectionScreen = this.navigateToSectionScreen.bind(this)
  }

  navigateToSectionScreen(section, slug) {
    this.props.navigation.navigate('Section', {
      sectionName: section,
      slug
    })
  }

  render() {
    const handleScroll = scrollData => {
      var newOffset = scrollData.nativeEvent.contentOffset.y
      this.setState({ offset: newOffset })
    }

    return (
      <FlatGrid
        ListHeaderComponent={
          <>
            <SectionHeader
              title={'Top Sections'}
              publication={this.props.publicationState.currPublication}
            />
          </>
        }
        ListHeaderComponentStyle={styles.container}
        data={SECTIONS}
        renderItem={({ item, i }) => (
          <TouchableOpacity
            activeOpacity={1}
            onPress={() => this.navigateToSectionScreen(item.name, item.slug)}
            style={styles.item}
            key={i}
          >
            <DiscoveryCell category={item.name} imageURL={item.image} />
          </TouchableOpacity>
        )}
      />
    )
  }
}

const SearchView = ({ filter, publication, navigation }) => {
  const [offset, setOffset] = useState(0)

  const { loading, error, data } = useQuery(ARTICLES_SEARCH, {
    variables: { filter },
    pollInterval: 2000
  })

  if (loading) return <ActivityIndicator />

  const handleScroll = scrollData => {
    let newOffset = scrollData.nativeEvent.contentOffset.y
    setOffset(newOffset)
  }

  const { searchArticles: results } = data

  return (
    <ScrollView
      onScroll={event => handleScroll(event)}
      scrollEventThrottle={16}
      keyboardShouldPersistTaps='handled'
      keyboardDismissMode='on-drag'
    >
      <SectionHeader title="Sections" />
      <SectionHeader title="Articles" />
      <SearchArticleList
        articles={results}
        navigateToArticleScreen={PARTIAL_NAVIGATE(
          navigation,
          publication,
          'SectionArticle',
          NAVIGATE_TO_ARTICLE_SCREEN
        )}
      />
    </ScrollView>
  )
}

const { width } = Dimensions.get('window')

const SearchBar = ({ setFilter }) => {

  const textInput = useRef();
  const searchWidth = new Animated.Value(width - 30)
  const cancelOpacity = new Animated.Value(0)

  const [currSearchText, setCurrSearchText] = useState('');

  const startAnimation = () => {
    Animated.timing(searchWidth, {
      toValue: width - 30 - 80,
      duration: 300,
    }).start()
    Animated.timing(cancelOpacity, {
      toValue: 1,
      duration: 700,
    }).start()
  }

  const endAnimation = () => {
    Animated.timing(cancelOpacity, {
      toValue: 0,
      duration: 450,
    }).start()
    Animated.timing(searchWidth, {
      toValue: width - 30,
      duration: 200,
    }).start()
  }

  const inputAnimatedStyle = {
    width: searchWidth,
  }

  const cancelAnimatedStyle = {
    opacity: cancelOpacity,
  }

  return (
    <View style={{ flexDirection: 'row', marginHorizontal: 15 }}>
      <Animated.View style={[SearchBarStyles.container, inputAnimatedStyle]} >
        <Ionicons
          name="search"
          size={20}
          style={SearchBarStyles.icon}
          color="#666"
        />
        <TextInput
          onChangeText={text => {
            setFilter(text)
            //setCurrSearchText(text)
          }}
          ref={textInput}
          placeholder="Search"
          autoCorrect={false}
          autoCapitalize="none"
          style={SearchBarStyles.textInput}
          clearButtonMode="always"
          returnKeyType="search"
          onFocus={startAnimation}
          //onEndEditing={endAnimation}
          placeholderTextColor="#666"
        />
      </Animated.View>
      <Animated.View style={[SearchBarStyles.button, cancelAnimatedStyle]}>
        <Button title="Cancel" onPress={() => {
          endAnimation();
          textInput.current.clear();
          textInput.current.blur();
          //setFilter('');
        }}
          color='#000' />
      </Animated.View>
    </View>
  )
}

const SearchBarStyles = StyleSheet.create({
  container: {
    backgroundColor: '#f8f4f4',
    borderRadius: 13,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  icon: {
    paddingVertical: 10,
    paddingHorizontal: 10
  },
  textInput: {
    fontSize: 18,
    color: '#000',
    flex: 1
  },
  button: {
    backgroundColor: '#fff',
    justifyContent: 'center',
    width: 80,
  }
})

export const DiscoveryScreen = ({ navigation, screenProps }) => {
  const [filter, setFilter] = useState('')

  const publicationState = screenProps.state

  return (
    <SafeAreaView style={styles.container}>
      <SearchBar setFilter={setFilter} />
      {Boolean(filter) && (
        <SearchView
          filter={filter}
          publication={publicationState}
          navigation={navigation}
        />
      )}
      {!filter && (
        <DiscoveryView
          navigation={navigation}
          publicationState={publicationState}
        />
      )}
    </SafeAreaView>
  )
}
