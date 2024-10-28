import { PropsWithChildren } from "react";
import { StyleSheet, View, Text } from "react-native";

type Props = PropsWithChildren<{
  label: string;
}>;

export function LabellableInput({ label, children }: Props) {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
    marginBottom: 10,
    backgroundColor: 'white'
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    paddingBottom: 5,
    paddingLeft: 3,
  },
});
