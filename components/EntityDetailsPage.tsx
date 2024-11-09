import { StyleSheet, View, ScrollView } from "react-native";
import { PropsWithChildren } from "react";
import Button from "./Button";
import alert from "../alert";
import { useTranslation } from "react-i18next";

type Props = PropsWithChildren<{
  onSubmit?: () => void;
  onDelete?: () => void;
}>;

export default function EntityDetailsPage({
  children,
  onSubmit,
  onDelete,
}: Props) {
  const { t } = useTranslation();

  const handleDeletePress = () => {
    alert(
      "Видалення",
      "Ви впеврені, що хочете видалити?",
      [
        {
          text: t("cancel"),
          style: "cancel",
        },
        {
          text: t("delete"),
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
              title={t("delete")}
              onPress={handleDeletePress}
              style={styles.button}
            />
          )}
          {onSubmit && (
            <Button title={t("save")} onPress={onSubmit} style={styles.button} />
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
    paddingBottom: 20,
    display: "flex",
    flexDirection: "row",
    gap: 10,
    borderTopColor: "lightgrey",
    borderTopWidth: 3,
  },
});
