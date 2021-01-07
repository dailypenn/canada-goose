import React, { Component, useState } from 'react'
import { useQuery } from '@apollo/client'
import {
  StyleSheet,
  ScrollView,
  View,
  Text,
  TextInput,
  SafeAreaView,
  Button
} from 'react-native'
import Ionicons from 'react-native-vector-icons/Ionicons'

import { HOME_PAGE_QUERY, ARTICLES_SEARCH } from '../utils/constants'
import {
  SectionHeader,
  DiscoveryGrid,
  SearchArticleList
} from '../components/shared'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingVertical: 20
  }
})

const DiscoveryLoading = () => {
  return <Text> Loading... </Text>
}

class DiscoveryView extends Component {
  constructor(props) {
    super(props)
    this.state = { offset: 0 }
    this.navigateToSectionScreen = this.navigateToSectionScreen.bind(this)
  }

  navigateToSectionScreen(section) {
    this.props.navigation.navigate('Section', {
      sectionName: section
    })
  }

  render() {
    const handleScroll = scrollData => {
      var newOffset = scrollData.nativeEvent.contentOffset.y
      this.setState({ offset: newOffset })
    }

    return (
      <>
        <ScrollView
          onScroll={event => handleScroll(event)}
          scrollEventThrottle={16}
          //style={{minHeight: "110%"}}
        >
          <SectionHeader
            title={'Top Sections'}
            publication={this.props.publicationState.currPublication}
          />
          <DiscoveryGrid
            navigateToSectionScreen={this.navigateToSectionScreen}
          />
        </ScrollView>
      </>
    )
  }
}

const SearchView = ({ filter, publicationState, navigation }) => {
  const [offset, setOffset] = useState(0)

  const { loading, error, data } = useQuery(ARTICLES_SEARCH, {
    variables: { filter },
    pollInterval: 2000
  })
  if (loading) return <DiscoveryLoading />

  const navigateToArticleScreen = article => {
    navigation.navigate('Article', { article })
  }

  const handleScroll = scrollData => {
    let newOffset = scrollData.nativeEvent.contentOffset.y
    setOffset(newOffset)
  }

  const { searchArticles: results } = data

  return (
    <ScrollView
      onScroll={event => handleScroll(event)}
      scrollEventThrottle={16}
      //style={{minHeight: "110%"}}
    >
      <SectionHeader title="Sections" />
      <SectionHeader title="Articles" />
      <SearchArticleList
        articles={results}
        navigateToArticleScreen={navigateToArticleScreen}
        publication={publicationState}
      />
    </ScrollView>
  )
}

const SearchBar = ({ setFilter }) => {
  // TODO: add the cancel button
  const [focused, setFocused] = useState(false)

  return (
    <>
      <View style={SearchBarStyles.container}>
        <Ionicons name="search" size={20} style={SearchBarStyles.icon} />
        <TextInput
          onChangeText={text => setFilter(text)}
          placeholder="search articles"
          autoCorrect={false}
          autoCapitalize="none"
          style={SearchBarStyles.textInput}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
        />
        {/* <Button title="Cancel" style={SearchBarStyles.button} /> */}
      </View>
      {/* {focused &&  } */}
    </>
  )
}

const SearchBarStyles = StyleSheet.create({
  container: {
    backgroundColor: '#f8f4f4',
    borderRadius: 13,
    flexDirection: 'row',
    padding: 10,
    marginVertical: 10,
    marginLeft: 10
  },
  icon: {
    marginRight: 10
  },
  textInput: {
    fontSize: 18
  },
  button: {
    backgroundColor: 'white',
    marginLeft: 'auto'
  }
})

export const DiscoveryScreen = ({ navigation, screenProps }) => {
  const [filter, setFilter] = useState('')

  const publicationState = screenProps.state

  if (loading) return <DiscoveryLoading />

  if (error) {
    console.log(error)
    return <Text> Error </Text>
  }

  return (
    <SafeAreaView style={styles.container}>
      <SearchBar setFilter={setFilter} />
      {Boolean(filter) && (
        <SearchView
          filter={filter}
          publicationState={publicationState}
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
