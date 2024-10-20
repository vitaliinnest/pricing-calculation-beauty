import type { PropsWithChildren } from "react";
import { ScrollView, StyleSheet } from "react-native";

type Props = PropsWithChildren;

export default function ScrollPage(props: Props) {
  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      {props.children}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    flex: 1,
    margin: 10,
  },
});
