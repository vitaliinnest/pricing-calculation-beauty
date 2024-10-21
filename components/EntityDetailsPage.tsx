import { StyleSheet, View, ScrollView } from "react-native";
import { PropsWithChildren } from "react";
import Button from "./Button";

type Props = PropsWithChildren<{
  onSubmit: () => void;
  onDelete?: () => void;
}>;

export default function EntityDetailsPage({
  children,
  onSubmit,
  onDelete,
}: Props) {
  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {children}
      </ScrollView>
      <View style={styles.buttonsContainer}>
        <Button title="Зберегти" onPress={onSubmit} style={styles.button} />
        {onDelete && (
          <Button title="Видалити" onPress={onDelete} />
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    padding: 10,
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
