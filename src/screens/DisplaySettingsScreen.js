import React, { useContext } from 'react'
import {
  Text,
  View,
  SafeAreaView,
  FlatList,
  TouchableOpacity,
  StyleSheet, Alert, ScrollView
} from 'react-native'
import { Ionicons } from '@expo/vector-icons';
import { connect } from 'react-redux'
import { updateDisplayPref } from "../actions"
import { GEOMETRIC_BOLD, GEOMETRIC_REGULAR } from '../utils/fonts'
import { DISPLAY_OPTIONS } from '../utils/constants'
import { DISPLAY_PREFS_KEY, Storage } from '../utils/storage'
import { ThemeContext } from '../components'

const createStyles = (theme) => StyleSheet.create({
  cell: {
    paddingHorizontal: 15,
    justifyContent: 'center',
    backgroundColor: theme.backgroundColor,
  },
  textView: {
    paddingVertical: 10,
    flexDirection: 'row'
  },
  regText: {
    color: theme.primaryTextColor,
    fontFamily: GEOMETRIC_REGULAR
  },
  headerLabel: {
    color: theme.primaryTextColor,
    backgroundColor: theme.backgroundColor,
    paddingTop: 10,
    paddingBottom: 5,
    paddingHorizontal: 15,
    fontFamily: GEOMETRIC_BOLD,
  },
  divider: {
    height: 0.8,
    backgroundColor: theme.borderColor,
    marginLeft: 15,
  },
  spacer: {
    flex: 1,
    flexDirection: 'row'
  },
  safeAreaView: {
    backgroundColor: theme.wallColor,
    flex: 1,
  },
});

const renderHeader = () => {
  const theme = useContext(ThemeContext)
  return (
    <Text style={createStyles(theme).headerLabel}>Display Theme</Text>
  )
}

const DisplayCell = ({ currPref, updatePreference, item }) => {
  const theme = useContext(ThemeContext);
  const styles = createStyles(theme);

  const handlePress = async () => {
    let saved_successfully = await Storage.setItem(DISPLAY_PREFS_KEY, item.id);

    if (saved_successfully) updatePreference(item.id);
    else Alert.alert('Oops', 'There was an error saving your display preference :(');
  };

  return (
    <TouchableOpacity key={item.id} onPress={handlePress}>
      <View style={styles.cell}>
        <View style={styles.textView}>
          <Text style={styles.regText}>{item.name}</Text>
          <View style={styles.spacer} />
          {currPref === item.id && (
            <Ionicons name="checkmark" size={16} color="#0a82fa" />
          )}
        </View>
      </View>
    </TouchableOpacity>
  );
};

const DisplaySection = ({ displayPreference, updatePreference, items }) => {
  const theme = useContext(ThemeContext);
  const styles = createStyles(theme);

  return (
    <View>
      {items.map((item, index) => (
        <View key={item.id}>
          <DisplayCell
            currPref={displayPreference}
            updatePreference={updatePreference}
            item={item}
          />
          <View
            style={[
              styles.divider,
              index === items.length - 1 && { marginLeft: 0 },
            ]}
          />
        </View>
      ))}
    </View>
  );
};


const DisplaySettingsScreenComp = ({ displayPreference, updatePreference }) => {
  const theme = useContext(ThemeContext);
  const styles = createStyles(theme);

  return (
    <SafeAreaView style={styles.safeAreaView}>
      <ScrollView>
        <Text style={styles.headerLabel}>Display Theme</Text>
        <DisplaySection
          displayPreference={displayPreference}
          updatePreference={updatePreference}
          items={DISPLAY_OPTIONS}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

const mapStateToProps = (state) => ({
  displayPreference: state.settings.displayPreference,
});


const mapDispatchToProps = (dispatch) => ({
  updatePreference: (newPref) => dispatch(updateDisplayPref(newPref)),
});


export const DisplaySettingsScreen = connect(mapStateToProps, mapDispatchToProps)(DisplaySettingsScreenComp)
