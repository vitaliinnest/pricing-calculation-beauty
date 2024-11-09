import {
  FlatList,
  FlatListProps,
  StatusBar,
  StyleSheet,
  View,
  Text,
} from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useTranslation } from "react-i18next";

export type ItemsListProps = Pick<FlatListProps<any>, "data" | "renderItem">;

export default function ItemsList(props: ItemsListProps) {
  const { t } = useTranslation();
  const isEmpty = !props.data || props.data.length === 0;

  return isEmpty ? (
    <View style={styles.emptyContainer}>
      <Ionicons name="search" size={80} color="#333" />
      <Text style={styles.emptyMessage}>{t("emptyList")}</Text>
    </View>
  ) : (
    <FlatList contentContainerStyle={styles.scrollContent} {...props} />
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
    borderTopWidth: 3,
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
