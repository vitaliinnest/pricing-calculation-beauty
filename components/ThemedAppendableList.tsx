import { FlatList } from "react-native-reanimated/lib/typescript/Animated";
import { ThemedView } from "./ThemedView";
import {
  FlatListProps,
  SafeAreaView,
  StatusBar,
  StyleSheet,
} from "react-native";
import Button from "./Button";

type Props = Pick<FlatListProps<any>, "data" | "renderItem"> & {
  onAddItem: () => void;
};

export default function ThemedAppendableList(props: Props) {
  return (
    <ThemedView>
      <SafeAreaView style={styles.container}>
        <FlatList {...props} />
      </SafeAreaView>
      {/* <ThemedView>
        <Button title="Додати" onPress={props.onAddItem} />
      </ThemedView> */}
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
  },
});
