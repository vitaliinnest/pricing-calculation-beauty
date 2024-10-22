import {
  FlatList,
  FlatListProps,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  View,
} from "react-native";
import Button from "./Button";
import { PropsWithChildren } from "react";

type Props = PropsWithChildren<
  Pick<FlatListProps<any>, "data" | "renderItem"> & {
    onAddItem: () => void;
  }
>;

export default function AppendableList(props: Props) {
  return (
    <SafeAreaView style={styles.container}>
      <FlatList contentContainerStyle={styles.scrollContent} {...props} />
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
  scrollContent: {
    paddingRight: 10,
    paddingBottom: 130,
  },
  button: {
    marginBottom: 10,
  },
  buttonsContainer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#fff',
    padding: 10,
  },
});
