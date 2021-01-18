import React from 'react'
import { StyleSheet, SafeAreaView, Dimensions } from 'react-native'
import { connect } from 'react-redux'
import { FlatGrid } from 'react-native-super-grid'
import { TouchableOpacity } from 'react-native'

import { PublicationEnum } from '../utils/constants'
import { DiscoveryCell, SearchBar } from '../components'
const DP_SECTIONS = require('../json/discover/dp.json')
const STREET_SECTIONS = require('../json/discover/street.json')

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingBottom: 20,
  },
})

const width = Dimensions.get('window').width
const height = Dimensions.get('window').height

const DiscoveryView = ({ navigation, publication }) => {
  const navigateToSectionScreen = (section, slug) => {
    navigation.navigate('Section', {
      sectionName: section,
      slug,
    })
  }

  let SECTIONS = []

  switch (publication) {
    case PublicationEnum.dp:
      SECTIONS = DP_SECTIONS
      break
    case PublicationEnum.street:
      SECTIONS = STREET_SECTIONS
      break
  }

  if (SECTIONS) {
    return (
      <FlatGrid
        // ListHeaderComponent={
        //   <SectionHeader
        //     title="Top Sections"
        //     publication={publicationState.currPublication}
        //   />
        // }
        // ListHeaderComponentStyle={styles.container}
        itemDimension={width / 2 - 40}
        spacing={13}
        data={SECTIONS}
        renderItem={({ item, i }) => (
          <TouchableOpacity
            activeOpacity={1}
            onPress={() => navigateToSectionScreen(item.name, item.slug)}
            style={styles.item}
            key={i}
          >
            <DiscoveryCell category={item.name} imageURL={item.img} />
          </TouchableOpacity>
        )}
      />
    )
  }

  return <Text>Generate a random article for UTB bro</Text>
}

const DiscoveryScreenComp = ({ navigation, publication }) => (
  <SafeAreaView style={styles.container}>
    <SearchBar navigation={navigation} publication={publication} />
    <DiscoveryView navigation={navigation} publication={publication} />
  </SafeAreaView>
)

const mapStateToProps = ({ publication }) => ({ publication })

export const DiscoveryScreen = connect(mapStateToProps)(DiscoveryScreenComp)
