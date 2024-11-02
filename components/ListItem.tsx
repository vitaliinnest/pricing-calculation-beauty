import React from "react";
import {
  StyleSheet,
  TouchableOpacity,
  StyleProp,
  ViewStyle,
  Text,
  View,
} from "react-native";

export interface IWithStyle {
  style?: StyleProp<ViewStyle>;
}

type Props = IWithStyle & {
  index: number;
  title?: string;
  onPress: () => void;
};

export default function ListItem(props: React.PropsWithChildren<Props>) {
  return (
    <TouchableOpacity
      style={[styles.listItem, props.style]}
      onPress={props.onPress}
    >
      {/* Container for index and title in the same row */}
      <View style={styles.headerContainer}>
        <View style={styles.indexContainer}>
          <Text style={styles.indexText}>{props.index + 1}</Text>
        </View>
        {props.title && <Text style={styles.title}>{props.title}</Text>}
      </View>

      <View style={styles.contentContainer}>{props.children}</View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  listItem: {
    width: "100%",
    borderRadius: 16,
    padding: 16,
    margin: 5,
    backgroundColor: "#FFFFFF",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    flexDirection: "column",
    alignItems: "flex-start",
  },
  headerContainer: {
    flexDirection: "row", // Aligns index and title horizontally
    alignItems: "center", // Vertically centers the index and title
    marginBottom: 10,
  },
  indexContainer: {
    backgroundColor: "#f0f0f0",
    borderRadius: 8,
    padding: 8,
    marginRight: 10, // Space between index and title
  },
  indexText: {
    fontSize: 16,
    fontWeight: "bold",
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333", // Darker color to make it stand out
  },
  contentContainer: {
    width: "100%", // Ensures the children take full width within ListItem
  },
});
