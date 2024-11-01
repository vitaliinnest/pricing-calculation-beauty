import {
  FlatListProps,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  View,
} from "react-native";
import Button from "./Button";
import { PropsWithChildren } from "react";
import ItemsList, { ItemsListProps } from "./ItemsList";

type Props = PropsWithChildren<
  ItemsListProps & {
    onAddItem: () => void;
  }
>;

export default function AppendableList(props: Props) {
  return (
    <SafeAreaView style={styles.container}>
      <ItemsList {...props} />
      <View style={styles.buttonsContainer}>
        {props.children}
        <Button title="Додати" onPress={props.onAddItem} />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
  },
  buttonsContainer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "#fff",
    padding: 10,
    borderTopColor: "lightgrey",
    borderTopWidth: 3,
  },
});
