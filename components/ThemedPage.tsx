import type { PropsWithChildren } from "react";
import { ScrollView, StyleSheet } from "react-native";

type Props = PropsWithChildren;

export default function ThemedPage(props: Props) {
  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      {props.children}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    flex: 1,
    alignItems: "center",
    margin: 10,
    backgroundColor: "red",
  },
});
