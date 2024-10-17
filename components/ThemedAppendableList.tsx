import { ThemedView } from "./ThemedView";
import {
  FlatList,
  FlatListProps,
  SafeAreaView,
  StatusBar,
  StyleSheet,
} from "react-native";
import Button from "./Button";
import { ThemedText } from "./ThemedText";

type Props = Pick<FlatListProps<any>, "data" | "renderItem"> & {
  onAddItem: () => void;
};

export default function ThemedAppendableList(props: Props) {
  if (props.data?.length === 0) {
    return (
      <ThemedView>
        <ThemedText>Список пустий</ThemedText>
        <Button title="Додати" onPress={props.onAddItem} />
      </ThemedView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        {...props}
        ListHeaderComponent={<ThemedView></ThemedView>}
        ListFooterComponent={<ThemedView>
          <Button title="Додати" onPress={props.onAddItem} />
        </ThemedView>}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
  },
});
