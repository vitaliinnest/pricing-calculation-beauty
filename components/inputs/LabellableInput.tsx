import { PropsWithChildren } from "react";
import { StyleSheet, View, Text } from "react-native";

type Props = PropsWithChildren<{
  label: string;
}>;

export function LabellableInput({ label, children }: Props) {
  return (
    <View style={styles.container}>
      <Text>{label}</Text>
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
});
