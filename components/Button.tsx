import React from "react";
import { Text, StyleSheet, Pressable, StyleProp, ViewStyle } from "react-native";

type Props = {
  title?: string;
  disabled?: boolean;
  style?: StyleProp<ViewStyle>
  onPress: () => void;
};

export default function Button(props: Props) {
  const { title = "Save", disabled, onPress, style } = props;
  return (
    <Pressable disabled={disabled} style={[styles.button, style]} onPress={onPress}>
      <Text style={styles.text}>{title}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 4,
    elevation: 3,
    backgroundColor: "black",
  },
  text: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: "bold",
    letterSpacing: 0.25,
    color: "white",
  },
});
