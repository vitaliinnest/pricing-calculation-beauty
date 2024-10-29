import {
  FlatList,
  FlatListProps,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  View,
  Text,
} from "react-native";
import Button from "./Button";
import { PropsWithChildren } from "react";
import Ionicons from "@expo/vector-icons/Ionicons";

type Props = PropsWithChildren<
  Pick<FlatListProps<any>, "data" | "renderItem"> & {
    onAddItem: () => void;
  }
>;

export default function AppendableList(props: Props) {
  const isEmpty = !props.data || props.data.length === 0;

  return (
    <SafeAreaView style={styles.container}>
      {isEmpty ? (
        <View style={styles.emptyContainer}>
          <Ionicons name="search" size={80} color="#333" />
          <Text style={styles.emptyMessage}>Список порожній</Text>
        </View>
      ) : (
        <FlatList contentContainerStyle={styles.scrollContent} {...props} />
      )}
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
    backgroundColor: "#fff",
    padding: 10,
    borderTopColor: "lightgrey",
    borderTopWidth: 1,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  emptyMessage: {
    fontSize: 18,
    color: "#333",
    textAlign: "center",
    marginTop: 10,
  },
});
