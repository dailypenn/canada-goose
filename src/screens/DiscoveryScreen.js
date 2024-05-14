import React, { useContext } from 'react'
import {
  StyleSheet,
  SafeAreaView,
  Dimensions,
  TouchableOpacity,
  Platform,
  View,
} from 'react-native'
import { connect } from 'react-redux'
import { FlatGrid } from 'react-native-super-grid'
import { PublicationEnum } from '../utils/constants'
import {
  DiscoveryCell,
  SearchBar,
  RandomButton,
  InteractiveHomeComponent,
  ThemeContext
} from '../components'

const DP_SECTIONS = require('../json/discover/dp.json')
const STREET_SECTIONS = require('../json/discover/street.json')

const createStyles = (theme) => StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.backgroundColor,
    paddingTop: Platform.OS == 'android' ? 10 : 0,
  },
  rngButtonView: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignContent: 'center',
  }
});

const width = Dimensions.get('window').width

const DiscoveryView = ({ navigation, publication }) => {
  const theme = useContext(ThemeContext);
  const styles = createStyles(theme);

  const navigateToSectionScreen = (section, slug) => {
    navigation.navigate('Section', {
      sectionName: section,
      slug,
    })
  }

  const onButtonPress = () => {
    navigation.navigate('SectionArticle', { article: null, isUTBRandom: true })
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

  if (publication != PublicationEnum.utb) {
    return (
      <FlatGrid
        contentContainerStyle={{
          top: 5,
        }}
        itemDimension={width / 2 - 40}
        spacing={13}
        data={SECTIONS}
        renderItem={({ item, i }) => (
          <InteractiveHomeComponent
            touchOpacProps={{
              activeOpacity: 1,
              onPress: () => navigateToSectionScreen(item.name, item.slug),
            }}
            key={i}
          >
            <DiscoveryCell category={item.name} imageURL={item.img} />
          </InteractiveHomeComponent>
        )}
      />
    )
  }

  return (
    <View
      style={styles.rngButtonView}
    >
      <RandomButton onButtonPress={onButtonPress} />
    </View>
  )
}

const DiscoveryScreenComp = ({ navigation, currPublication }) => {
  const theme = useContext(ThemeContext);
  const styles = createStyles(theme);

  return (
    <SafeAreaView style={styles.container}>
      <SearchBar navigation={navigation} publication={currPublication} />
      <DiscoveryView navigation={navigation} publication={currPublication} />
    </SafeAreaView>
  )
}

const mapStateToProps = ({ publication }) => {
  const { currPublication } = publication

  return { currPublication }
}

export const DiscoveryScreen = connect(mapStateToProps)(DiscoveryScreenComp)
