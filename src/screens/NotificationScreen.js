import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Switch } from "react-native-gesture-handler";

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
  },

  cell: {
    paddingHorizontal: 15,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
    flexDirection: "row",
    paddingVertical: 10,
    borderBottomColor: "#d4d4d4",
    borderBottomWidth: 0.6,
  },

  spacer: {
    flex: 1,
    flexDirection: "row",
  },

  description: {
    paddingHorizontal: 15,
    paddingVertical: 8,
    fontSize: 12,
    color: "#808080",
  },
});

const notifications = [
  {
    title: "Breaking news notifications",
    description:
      "Receive push notifications when breaking news articles are published. Includes the headline and first couple sentences of the article.",
  },
  {
    title: "Newsletter notifications",
    description:
      "Receive a push notification every day upon the release of the newsletter",
  },
];

const NotificationCell = ({ info }) => {
  const [isEnabled, setIsEnabled] = useState(true);
  const toggleSwitch = () => setIsEnabled((previousState) => !previousState);

  return (
    <View>
      <View style={styles.cell}>
        <Text>{info.title}</Text>
        <View style={styles.spacer} />
        <Switch
          onValueChange={toggleSwitch}
          value={isEnabled}
          style={styles.toggle}
        />
      </View>
      <Text style={styles.description}>{info.description}</Text>
    </View>
  );
};

export const NotificationScreen = () => {
  return (
    <View style={styles.container}>
      {notifications.map((l, i) => (
        <NotificationCell info={l} />
      ))}
    </View>
  );
};
