import React from 'react'
import {
  TouchableOpacity,
  Text,
  View,
  StyleSheet,
  SafeAreaView,
  Image
} from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { connect } from 'react-redux'

import { DISPLAY_SERIF_BLACK, GEOMETRIC_REGULAR } from '../utils/fonts'
import { PublicationEnum, SETTINGS_SECTIONS } from '../utils/constants'
import { ScrollView } from 'react-native-gesture-handler'

const DP_LOGO_GREY = require('../static/logos/dp-logo-small-white.png')
const STREET_LOGO_GREY = require('../static/logos/street-logo-small-white.png')
const UTB_LOGO_GREY = require('../static/logos/utb-logo-small-white.png')

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column'
  },

  title: {
    fontFamily: DISPLAY_SERIF_BLACK,
    fontSize: 28,
    lineHeight: 40
  },

  header_safe_area: {
    zIndex: 1000,
    flex: 1
  },

  header: {
    height: 50,
    paddingHorizontal: 16
  },

  header_inner: {
    flex: 1,
    overflow: 'hidden',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    position: 'relative'
  },

  pubCell: {
    marginTop: 15,
    paddingVertical: 15,
    paddingHorizontal: 15,
    backgroundColor: '#fff',
    borderTopWidth: 0.6,
    borderBottomWidth: 0.6,
    borderColor: '#c4c4c4'
  },

  cell: {
    paddingHorizontal: 15,
    justifyContent: 'center',
    backgroundColor: '#fff'
  },

  iconView: {
    justifyContent: 'center',
    paddingRight: 15
  },

  icon: {
    backgroundColor: '#68a0af',
    borderRadius: 3,
    padding: 4
  },

  pubImg: {
    flex: 1,
    width: 30,
    height: 30,
    resizeMode: 'contain'
  },

  pubView: {
    width: 60,
    height: 60,
    borderRadius: 40,
    backgroundColor: '#c4c4c4',
    justifyContent: 'center',
    alignItems: 'center'
  },

  textView: {
    paddingVertical: 10,
    flexDirection: 'row'
  },

  divider: {
    height: 0.6,
    backgroundColor: '#c4c4c4'
  },

  spacer: {
    flex: 1,
    flexDirection: 'row'
  },

  regText: {
    fontFamily: GEOMETRIC_REGULAR
  },

  pubText: {
    fontSize: 18,
    fontFamily: GEOMETRIC_REGULAR
  },

  switchText: {
    fontSize: 12,
    fontFamily: GEOMETRIC_REGULAR,
    flexShrink: 1
  },

  pubTextView: {
    paddingHorizontal: 15,
    justifyContent: 'center'
  }
})

const GET_LOGO = publication => {
  switch (publication) {
    case PublicationEnum.dp:
      return DP_LOGO_GREY
    case PublicationEnum.street:
      return STREET_LOGO_GREY
    case PublicationEnum.utb:
      return UTB_LOGO_GREY
  }
}

const PublicationCell = ({ currPublication }) => (
  <View style={styles.pubCell}>
    <View style={{ flexDirection: 'row' }}>
      <View style={styles.pubView}>
        <Image style={styles.pubImg} source={GET_LOGO(currPublication)} />
      </View>
      <View style={styles.pubTextView}>
        <Text style={styles.pubText}>{currPublication}</Text>
        <View style={{ height: 2 }} />
        <Text style={styles.switchText}>
          {`Long press bottom-left tab logo to switch!`}
        </Text>
      </View>
    </View>
  </View>
)

const SettingsCell = ({ item }) => (
  <View style={styles.cell}>
    <View style={styles.textView}>
      <View style={styles.iconView}>
        <View style={{ ...styles.icon, backgroundColor: item.color }}>
          <Ionicons name={item.icon} size={14} color="white" />
        </View>
      </View>
      <Text style={styles.regText}>{item.name}</Text>
      <View style={styles.spacer} />
      <Ionicons name="chevron-forward" size={16} color="#c4c4c4" />
    </View>
  </View>
)

const SettingsSection = ({ navigateToScreen, items }) => (
  <View>
    <View style={{ ...styles.divider, marginTop: 20 }} />
    {items.map((el, i) => (
      <TouchableOpacity
        key={el.id}
        activeOpacity={1}
        onPress={() => navigateToScreen(el.screenName, el.props)}
      >
        <View>
          <SettingsCell item={el} />
          <View
            style={{
              ...(i !== items.length - 1 ? styles.divider : {}),
              marginLeft: 45
            }}
          />
        </View>
      </TouchableOpacity>
    ))}
    <View style={styles.divider} />
  </View>
)

const SettingsScreenComp = ({ navigation, currPublication }) => (
  <SafeAreaView style={styles.header_safe_area}>
    <View style={styles.header}>
      <View style={styles.header_inner}>
        <Text style={styles.title}>Account</Text>
      </View>
    </View>
    <View style={{ flex: 1 }}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <PublicationCell currPublication={currPublication} />
        {SETTINGS_SECTIONS.map(l => (
          <SettingsSection
            key={l.id}
            items={l.items}
            navigateToScreen={(screen, props) =>
              navigation.navigate(screen, props)
            }
          />
        ))}
      </ScrollView>
    </View>
  </SafeAreaView>
)

const mapStateToProps = ({ publication, settings }) => {
  const { currPublication } = publication
  return { currPublication, settings }
}

export const SettingsScreen = connect(mapStateToProps)(SettingsScreenComp)
