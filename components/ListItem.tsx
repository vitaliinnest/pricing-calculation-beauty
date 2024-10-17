import React from "react";
import {
  StyleSheet,
  TouchableOpacity,
  StyleProp,
  ViewStyle,
} from "react-native";

export interface IWithStyle {
  style?: StyleProp<ViewStyle>;
}

type Props = IWithStyle & {
  onPress: () => void;
};

const ListItem = (props: React.PropsWithChildren<Props>) => {
  return (
    <TouchableOpacity
      style={[styles.listItem, props.style]}
      onPress={props.onPress}
    >
      {props.children}
    </TouchableOpacity>
  );
};

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
  },
});

export default ListItem;
