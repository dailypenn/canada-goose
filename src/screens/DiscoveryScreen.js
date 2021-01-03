import React, { Component } from 'react'
import { useQuery } from '@apollo/client'
import { HOME_PAGE_QUERY } from '../utils/constants'
import { StyleSheet, ScrollView, View, Text } from 'react-native'
import {
  SectionHeader,
  DiscoveryGrid,
} from '../components/shared'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingVertical: 20,
  },
})

const DiscoveryLoading = () => {
  return <Text> Loading... </Text>
}

class DiscoveryView extends Component {
  constructor(props) {
    super(props)
    this.state = { offset: 0 }
    this.sections = [
      { name: 'Academics', image: 'https://imagesvc.meredithcorp.io/v3/mm/image?q=85&c=sc&poi=%5B800%2C500%5D&w=1600&h=838&url=https%3A%2F%2Fstatic.onecms.io%2Fwp-content%2Fuploads%2Fsites%2F28%2F2017%2F05%2Fblue0517.jpg' },
      { name: 'Administration', image: 'https://imagesvc.meredithcorp.io/v3/mm/image?q=85&c=sc&poi=%5B800%2C500%5D&w=1600&h=838&url=https%3A%2F%2Fstatic.onecms.io%2Fwp-content%2Fuploads%2Fsites%2F28%2F2017%2F05%2Fblue0517.jpg' },
      { name: 'Identities', image: 'https://imagesvc.meredithcorp.io/v3/mm/image?q=85&c=sc&poi=%5B800%2C500%5D&w=1600&h=838&url=https%3A%2F%2Fstatic.onecms.io%2Fwp-content%2Fuploads%2Fsites%2F28%2F2017%2F05%2Fblue0517.jpg' },
      { name: 'Politics', image: 'https://imagesvc.meredithcorp.io/v3/mm/image?q=85&c=sc&poi=%5B800%2C500%5D&w=1600&h=838&url=https%3A%2F%2Fstatic.onecms.io%2Fwp-content%2Fuploads%2Fsites%2F28%2F2017%2F05%2Fblue0517.jpg' },
      { name: 'Student Life', image: 'https://imagesvc.meredithcorp.io/v3/mm/image?q=85&c=sc&poi=%5B800%2C500%5D&w=1600&h=838&url=https%3A%2F%2Fstatic.onecms.io%2Fwp-content%2Fuploads%2Fsites%2F28%2F2017%2F05%2Fblue0517.jpg' },
      { name: 'Sports', image: 'https://imagesvc.meredithcorp.io/v3/mm/image?q=85&c=sc&poi=%5B800%2C500%5D&w=1600&h=838&url=https%3A%2F%2Fstatic.onecms.io%2Fwp-content%2Fuploads%2Fsites%2F28%2F2017%2F05%2Fblue0517.jpg' },
      { name: 'Staff Editorials', image: 'https://imagesvc.meredithcorp.io/v3/mm/image?q=85&c=sc&poi=%5B800%2C500%5D&w=1600&h=838&url=https%3A%2F%2Fstatic.onecms.io%2Fwp-content%2Fuploads%2Fsites%2F28%2F2017%2F05%2Fblue0517.jpg' },
      { name: 'Opinion Columns', image: 'https://imagesvc.meredithcorp.io/v3/mm/image?q=85&c=sc&poi=%5B800%2C500%5D&w=1600&h=838&url=https%3A%2F%2Fstatic.onecms.io%2Fwp-content%2Fuploads%2Fsites%2F28%2F2017%2F05%2Fblue0517.jpg' },
    ]
    this.navigateToSectionScreen = this.navigateToSectionScreen.bind(this)
  }

  navigateToSectionScreen(section) {
    this.props.navigation.navigate('Section', { 
      sectionName: section,
    })
  }

  render() {
    const handleScroll = (scrollData) => {
      var newOffset = scrollData.nativeEvent.contentOffset.y
      this.setState({ offset: newOffset })
    }

    return (
      <View style={styles.container}>
        <ScrollView
          onScroll={(event) => handleScroll(event)}
          scrollEventThrottle={16}
          //style={{minHeight: "110%"}}
        >
          <SectionHeader
            title={"Discover " + this.props.publicationState.currPublication}
            publication={this.props.publicationState.currPublication}
          />
          <DiscoveryGrid
            sections={this.sections}
            navigateToSectionScreen={this.navigateToSectionScreen}
          />
        </ScrollView>
      </View>
    )
  }
}

export const DiscoveryScreen = ({ navigation, screenProps }) => {
  const publicationState = screenProps.state
  const { loading, error, data } = useQuery(HOME_PAGE_QUERY)

  if (loading) return <DiscoveryLoading/>

  if (error) {
    console.log(error)
    return <Text> Error </Text>
  }

  const {
    most_recent: { edges: mostRecentArticles },
    top: { edges: topArticles },
    centerpiece: { edges: centerArticles },
  } = data

  return (
    <DiscoveryView
      mostRecentArticles={mostRecentArticles}
      topArticles={topArticles}
      centerArticles={centerArticles}
      navigation={navigation}
      publicationState={publicationState}
    />
  )
}
