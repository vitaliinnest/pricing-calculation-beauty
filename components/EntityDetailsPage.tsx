import { StyleSheet, View, ScrollView, StatusBar } from "react-native";
import { PropsWithChildren } from "react";
import Button from "./Button";
import alert from "../alert";

type Props = PropsWithChildren<{
  onSubmit?: () => void;
  onDelete?: () => void;
}>;

export default function EntityDetailsPage({
  children,
  onSubmit,
  onDelete,
}: Props) {
  const handleDeletePress = () => {
    alert(
      "Видалення",
      "Ви впеврені, що хочете видалити?",
      [
        {
          text: "Скасувати",
          style: "cancel",
        },
        {
          text: "Видалити",
          style: "destructive",
          onPress: onDelete,
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
      {(onDelete || onSubmit) && (
        <View style={styles.buttonsContainer}>
          {onDelete && (
            <Button
              title="Видалити"
              onPress={handleDeletePress}
              style={styles.button}
            />
          )}
          {onSubmit && (
            <Button title="Зберегти" onPress={onSubmit} style={styles.button} />
          )}
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#faf8e3",
  },
  scrollContent: {
    padding: 10,
    paddingBottom: 65,
  },
  button: {
    flexGrow: 1,
  },
  buttonsContainer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "#fff",
    padding: 10,
    display: "flex",
    flexDirection: "row",
    gap: 10,
    borderTopColor: "lightgrey",
    borderTopWidth: 3,
  },
});
