// About Screen: Bios of developers and information about the app
import React from 'react'
import { Dimensions, Image, StyleSheet, Text, View } from 'react-native'
import { FlatGrid } from 'react-native-super-grid'

import { GEOMETRIC_BOLD, GEOMETRIC_REGULAR } from '../utils/fonts'

const PEOPLE = require('../json/members.json')
const GOOSE_LOGO = require('../static/logos/goose_from_canada_logo.png')

const { width, height } = Dimensions.get('window')
const PROFILE_PIC_SIZE = width / 5
const PROFILE_PIC_CELL_SIZE = width / 4

const TEAM_INTRO =
  "Hi, we're the tech department at the DP: a team of student software engineers!"
const MISSION =
  'Our MISSION statement is xxx xxx xxx xxx xxx xxx xxx xxx xxx xxx xxx xxx xxx xxx xxx xxx xxx xxx xxx xxx xxx xxx xxx xxx xxx \n\nOur ultimate goal is xxx xxx xxx xxx xxx xxx xxx xxx xxx xxx xxx xxx xxx xxx xxx xxx xxx xxx xxx xxx xxx xxx xxx xxx xxx'

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: '#eee',
  },

  logo: {
    width: 300,
    height: 300,
  },

  sectionContainer: {
    flexGrow: 1,
    flexDirection: 'row',
  },

  intro: {
    paddingHorizontal: 45,
    paddingBottom: 30,
    fontFamily: GEOMETRIC_BOLD,
  },

  mission: {
    paddingHorizontal: 60,
    fontSize: 12,
    fontFamily: GEOMETRIC_REGULAR,
  },

  meetTeam: {
    fontSize: 22,
    fontFamily: GEOMETRIC_BOLD,
    marginTop: 20,
    paddingVertical: 20,
  },

  profilePicImage: {
    paddingHorizontal: 20,
    width: PROFILE_PIC_SIZE,
    height: PROFILE_PIC_SIZE,
    borderRadius: PROFILE_PIC_SIZE / 2,
  },

  profilePicCell: {
    alignItems: 'center',
  },

  profileName: {
    fontSize: 12,
    color: '#808080',
    fontFamily: GEOMETRIC_REGULAR,
  },
})

const ProfileCell = ({ name, pic }) => (
  <View style={styles.profilePicCell}>
    <Image
      source={require('../static/logos/default_profile_pic.png')}
      style={styles.profilePicImage}
    />
    <Text style={styles.profileName}>{name}</Text>
  </View>
)

export const AboutScreen = () => (
  <FlatGrid
    ListHeaderComponent={
      <>
        <Image source={GOOSE_LOGO} style={styles.logo} />
        <Text style={styles.intro}>{TEAM_INTRO}</Text>
        <Text style={styles.mission}>{MISSION}</Text>
        <Text style={styles.meetTeam}>Meet the Team</Text>
      </>
    }
    ListHeaderComponentStyle={styles.container}
    itemDimension={PROFILE_PIC_CELL_SIZE}
    data={PEOPLE}
    renderItem={({ item }) => <ProfileCell name={item.name} image={item.pic} />}
  />
)
