import { PropsWithChildren } from "react";
import { ThemedView } from "../ThemedView";
import { ThemedText } from "../ThemedText";
import { StyleSheet } from "react-native";

type Props = PropsWithChildren<{
  label: string;
}>;

export function LabellableInput({ label, children }: Props) {
  return (
    <ThemedView style={styles.container}>
      <ThemedText>{label}</ThemedText>
      {children}
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 10,
  },
});
