import { StyleSheet, View, ScrollView, StatusBar, Alert } from "react-native";
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
  const handleDeletePress = () => {
    Alert.alert(
      "Confirm Deletion",
      "Are you sure you want to delete this item?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Delete",
          onPress: onDelete,
          style: "destructive",
        },
      ],
      { cancelable: true }
    );
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {children}
      </ScrollView>
      <View style={styles.buttonsContainer}>
        <Button title="Зберегти" onPress={onSubmit} style={styles.button} />
        {onDelete && (
          <Button title="Видалити" onPress={handleDeletePress} />
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
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