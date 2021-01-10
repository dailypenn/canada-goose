import React, { Component, useState } from 'react'
import { useQuery } from '@apollo/client'
import { StyleSheet, ScrollView, View, SafeAreaView } from 'react-native'
import { FlatGrid } from 'react-native-super-grid'
import { TouchableOpacity } from 'react-native'

import { ARTICLES_SEARCH, SECTIONS } from '../utils/constants'
import {
  SectionHeader,
  SearchArticleList,
  DiscoveryCell,
  DiscoveryGrid,
  ActivityIndicator,
  SearchBar
} from '../components'
import {
  PARTIAL_NAVIGATE,
  NAVIGATE_TO_ARTICLE_SCREEN
} from '../utils/helperFunctions'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingBottom: 10
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
          <SectionHeader
            title={'Top Sections'}
            publication={this.props.publicationState.currPublication}
          />
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

    // return (
    //   <ScrollView
    //     onScroll={event => handleScroll(event)}
    //     scrollEventThrottle={16}
    //     //style={{minHeight: "110%"}}
    //   >
    //     <SectionHeader
    //       title={'Top Sections'}
    //       publication={this.props.publicationState.currPublication}
    //     />
    //     <DiscoveryGrid
    //       navigateToSectionScreen={this.navigateToSectionScreen}
    //     />
    //   </ScrollView>
    // )
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
      keyboardShouldPersistTaps="handled"
      keyboardDismissMode="on-drag"
      //style={{minHeight: "110%"}}
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

/*

<TouchableOpacity
          activeOpacity={1}
          onPress={clearSearchBar}
        >
          <Ionicons name="close-circle" size={20} style={SearchBarStyles.icon} color = '#AAA'/>
        </TouchableOpacity>



      <View style={SearchBarStyles.container}>
        <Ionicons name="search" size={20} style={SearchBarStyles.icon} />
        <TextInput
          onChangeText={text => setFilter(text)}
          placeholder="Search"
          autoCorrect={false}
          autoCapitalize="none"
          style={SearchBarStyles.textInput}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
        />
        {/* <Button title="Cancel" style={SearchBarStyles.button} />}
        </View>
        {/* {focused &&  } }
*/
