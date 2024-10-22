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
  onPress: () => void;
};

export default function ListItem(props: React.PropsWithChildren<Props>) {
  return (
    <TouchableOpacity
      style={[styles.listItem, props.style]}
      onPress={props.onPress}
    >
      <View style={styles.indexContainer}>
        <Text style={styles.indexText}>{props.index + 1}</Text>
      </View>
      {props.children}
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
    flexDirection: "row",
    alignItems: "center",
  },
  indexContainer: {
    marginRight: 10,
    backgroundColor: "#f0f0f0",
    borderRadius: 8,
    padding: 8,
  },
  indexText: {
    fontSize: 16,
    fontWeight: "bold",
  },
});