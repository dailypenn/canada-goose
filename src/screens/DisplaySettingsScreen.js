import React from 'react'
import {
  Text,
  View,
  SafeAreaView,
  FlatList,
  TouchableOpacity,
  StyleSheet, Alert
} from 'react-native'
import { Ionicons } from '@expo/vector-icons';
import { connect } from 'react-redux'
import { updateDisplayPref } from "../actions"
import { GEOMETRIC_BOLD, GEOMETRIC_REGULAR } from '../utils/fonts'
import { DISPLAY_OPTIONS } from '../utils/constants'
import { DISPLAY_PREFS_KEY, Storage } from '../utils/storage'

const styles = StyleSheet.create({
  cell: {
    paddingHorizontal: 15,
    justifyContent: 'center',
    backgroundColor: '#fff'
  },
  textView: {
    paddingVertical: 10,
    flexDirection: 'row'
  },
  regText: {
    fontFamily: GEOMETRIC_REGULAR
  },
  headerLabel: {
    paddingVertical: 10,
    paddingHorizontal: 15,
    fontFamily: GEOMETRIC_BOLD,
  },
  divider: {
    height: 0.6,
    backgroundColor: '#c4c4c4'
  },
  spacer: {
    flex: 1,
    flexDirection: 'row'
  },
})


const renderHeader = () => (
  <Text style={styles.headerLabel}>Display Theme</Text>
);

const DisplayCell = ({currPref, updatePreference, item}) => {
  const handlePress = async () => {
    let saved_successfully = await Storage.setItem(DISPLAY_PREFS_KEY, item.id)

    if (saved_successfully) updatePreference(item.id)
    else Alert.alert('Oops', 'There was an error saving your display preference :(')
  };

  return (
    <TouchableOpacity key={item.id} onPress={handlePress}>
      <View style={styles.cell}>
        <View style={styles.textView}>
          <Text style={styles.regText}>{item.name}</Text>
          <View style={styles.spacer} />
          {
            currPref === item.id &&
            <Ionicons name="checkmark" size={16} color="#0a82fa" />
          }
        </View>
      </View>
    </TouchableOpacity>
  )
}

const DisplaySettingsScreenComp = ({displayPreference, updatePreference}) => {
  return (
    <SafeAreaView style={{flex: 1}}>
      <FlatList
        data = {DISPLAY_OPTIONS}
        ListHeaderComponent={renderHeader}
        renderItem={({item}) =>
          (<DisplayCell currPref={displayPreference}
                        updatePreference={updatePreference}
                        item={item}/>)}
        ItemSeparatorComponent={
          (_) =>
            <View
              style={{
                ...styles.divider,
                marginLeft: 45
              }}
            />
        }
      />
    </SafeAreaView>
  )
}

const mapStateToProps = (state) => ({
  displayPreference: state.settings.displayPreference,
});


const mapDispatchToProps = (dispatch) => ({
  updatePreference: (newPref) => dispatch(updateDisplayPref(newPref)),
});


export const DisplaySettingsScreen = connect(mapStateToProps, mapDispatchToProps)(DisplaySettingsScreenComp)
