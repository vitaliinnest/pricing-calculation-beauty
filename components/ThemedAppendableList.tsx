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
import { PropsWithChildren } from "react";

type Props = PropsWithChildren<
  Pick<FlatListProps<any>, "data" | "renderItem"> & {
    onAddItem: () => void;
  }
>;

export default function ThemedAppendableList(props: Props) {
  const renderFooterContent = () => (
    <ThemedView>
      {props.children}
      <Button title="Додати" onPress={props.onAddItem} />
    </ThemedView>
  );

  if (props.data?.length === 0) {
    return (
      <ThemedView>
        <ThemedText>Список пустий</ThemedText>
        {renderFooterContent()}
      </ThemedView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        {...props}
        ListHeaderComponent={<ThemedView></ThemedView>}
        ListFooterComponent={renderFooterContent}
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
