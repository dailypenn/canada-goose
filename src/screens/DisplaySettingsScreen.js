import React from 'react'
import {
  Text,
  View,
  SafeAreaView,
  FlatList,
  TouchableOpacity,
  StyleSheet,
} from 'react-native'
import { Ionicons } from '@expo/vector-icons';
import { connect } from 'react-redux'
import { updateDisplayPref } from "../actions"
import { GEOMETRIC_BOLD, GEOMETRIC_REGULAR } from '../utils/fonts'
import { DISPLAY_OPTIONS } from '../utils/constants'

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
    backgroundColor: '#d4d4d4'
  },
  spacer: {
    flex: 1,
    flexDirection: 'row'
  },
})

const renderHeader = () => (
  <Text style={styles.headerLabel}>Display Theme</Text>
);

const DisplayCell = ({currPref, dispatch, item}) => (
  <TouchableOpacity key={item.id} onPress={() => dispatch(item.id)}>
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

const DisplaySettingsScreenComp = ({displayPreference, updatePreference}) => {
  return (
    <SafeAreaView style={{flex: 1}}>
      <FlatList
        data = {DISPLAY_OPTIONS}
        ListHeaderComponent={renderHeader}
        renderItem={({item}) =>
          (<DisplayCell currPref={displayPreference}
                        dispatch={updatePreference}
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
