import React, { Component } from "react";
import { Linking } from "react-native";
import { TouchableOpacity } from "react-native";
import { Text, View, StyleSheet } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
  },

  cell: {
    paddingHorizontal: 15,
    justifyContent: "center",
    backgroundColor: "#fff",
  },

  textView: {
    paddingVertical: 10,
    borderBottomColor: "#d4d4d4",
    borderBottomWidth: 0.6,
  },

  divider: {
    paddingHorizontal: 15,
    borderColor: "#fff",
    borderWidth: 1,
  },

  sectionHeaderTitle: {
    fontFamily: "HelveticaNeue-CondensedBold",
    color: "#a1a1a1",
    fontWeight: "bold",
    marginBottom: 0,
    marginTop: 0,
    lineHeight: 35,
    textTransform: "uppercase",
  },

  sectionHeaderView: {
    flexDirection: "row",
    paddingHorizontal: 15,
  },
});

const SettingsCell = ({ item }) => {
  return (
    <View style={styles.cell}>
      <View style={styles.textView}>
        <Text>{item.name}</Text>
      </View>
      {/* <Ionicons name="right" size={20} color="black" /> */}
    </View>
  );
};

const SettingsSectionHeader = ({ title }) => (
  <View style={styles.sectionHeaderView}>
    <Text style={styles.sectionHeaderTitle}>{title}</Text>
  </View>
);

const SettingsSection = ({ name, items }) => {
  return (
    <View>
      <SettingsSectionHeader title={name} />
      {items.map((l, i) => (
        <TouchableOpacity activeOpacity={1} onPress={l.onPress}>
          <SettingsCell key={i} item={l} />
        </TouchableOpacity>
      ))}
    </View>
  );
};

class SettingsView extends Component {
  constructor(props) {
    super(props);
    this.navigateToScreen = this.navigateToScreen.bind(this);
    this.publicationState = this.props.publicationState;
    this.sections = [
      {
        name: "Account",
        items: [
          {
            name: "Notifications",
            onPress: () => {
              this.navigateToScreen("Notification");
            },
          },
          {
            name: "Privacy",
            onPress: () => {
              this.navigateToScreen("Privacy");
            },
          },
          {
            name: "Manage Feed",
            onPress: () => {
              this.navigateToScreen("ManageFeedScreen");
            },
          },
        ],
      },
      {
        name: "Features",
        items: [
          {
            name: "About",
            onPress: () => {
              this.navigateToScreen("About");
            },
          },
        ],
      },
      {
        name: "Links",
        items: [
          {
            name: "The Daily Pennsylvanian",
            onPress: () => {
              Linking.openURL("https://thedp.com");
            },
          },
          {
            name: "34th Street",
            onPress: () => {
              Linking.openURL("https://t34st.com");
            },
          },
          {
            name: "Under the Button",
            onPress: () => {
              Linking.openURL("https://underthebutton.com");
            },
          },
        ],
      },
    ];
  }

  navigateToScreen(screenName) {
    this.props.navigation.navigate(screenName);
  }

  render() {
    return (
      <View style={styles.container}>
        {this.sections.map((l, i) => (
          <SettingsSection key={i} name={l.name} items={l.items} />
        ))}
      </View>
    );
  }
}

const SettingsScreen = ({ navigation, screenProps }) => {
  const publicationState = screenProps.state;
  return (
    <SettingsView navigation={navigation} publicationState={publicationState} />
  );
};

export { SettingsScreen, SettingsSectionHeader };
