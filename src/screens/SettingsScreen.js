import React from 'react'
import { TouchableOpacity, Text, View, StyleSheet } from 'react-native'
import { Ionicons } from '@expo/vector-icons'

import { DISPLAY_SERIF_BLACK, GEOMETRIC_REGULAR } from '../utils/fonts'
import { SafeAreaView } from 'react-native'
import { SETTINGS_SECTIONS } from '../utils/constants'

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
  },

  title: {
    fontFamily: DISPLAY_SERIF_BLACK, //GEOMETRIC_BOLD,
    fontSize: 28,
    lineHeight: 40,
  },
  header_safe_area: {
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

  cell: {
    paddingHorizontal: 15,
    justifyContent: 'center',
    backgroundColor: '#fff',
  },

  iconView: {
    justifyContent: 'center',
    paddingRight: 15,
  },

  icon: {
    backgroundColor: '#68a0af',
    borderRadius: 3,
    padding: 4,
  },

  textView: {
    paddingVertical: 10,
    flexDirection: 'row',
  },

  divider: {
    height: 0.6,
    backgroundColor: '#d4d4d4',
  },

  spacer: {
    flex: 1,
    flexDirection: 'row',
  },

  regText: {
    fontFamily: GEOMETRIC_REGULAR,
  },
})

const SettingsCell = ({ item }) => {
  return (
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
}

const SettingsSectionHeader = ({ title }) => (
  <View style={styles.sectionHeaderView}></View>
)

const SettingsSection = ({ navigateToScreen, name, items }) => (
  <View>
    <View style={{ ...styles.divider, marginTop: 20 }} />
    <SettingsSectionHeader title={name} />
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
              ...(i != items.length - 1 ? styles.divider : {}),
              marginLeft: 45,
            }}
          />
        </View>
      </TouchableOpacity>
    ))}
    <View style={styles.divider} />
  </View>
)

export const SettingsScreen = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.header_safe_area}>
      <View style={styles.header}>
        <View style={styles.header_inner}>
          <Text style={styles.title}>Account</Text>
        </View>
      </View>
      {SETTINGS_SECTIONS.map((l, i) => (
        <SettingsSection
          key={l.id}
          name={l.name}
          items={l.items}
          navigateToScreen={(screen, props) =>
            navigation.navigate(screen, props)
          }
        />
      ))}
    </SafeAreaView>
  )
}
