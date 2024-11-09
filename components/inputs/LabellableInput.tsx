import { PropsWithChildren } from "react";
import { StyleSheet, View, Text, StyleProp, ViewStyle } from "react-native";

type Props = PropsWithChildren<{
  label: string;
  style?: StyleProp<ViewStyle>;
}>;

export function LabellableInput({ label, children, style }: Props) {
  return (
    <View style={[styles.container, style]}>
      <Text style={styles.label}>{label}</Text>
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
    marginBottom: 10,
    backgroundColor: 'white',
    borderRadius: 10,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    paddingBottom: 5,
    paddingLeft: 3,
  },
});
