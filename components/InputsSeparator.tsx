import { StyleSheet, View, Text } from "react-native";

type Props = {
  title?: string;
};

export default function InputsSeparator({ title = "Підрахунки" }: Props) {
  return (
    <View style={styles.container}>
      <View style={styles.divider} />
      <Text style={styles.text}>{title}</Text>
      <View style={styles.divider} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 5,
    marginBottom: 15,
  },
  divider: {
    flex: 1,
    height: 1,
    backgroundColor: "black",
  },
  text: {
    marginHorizontal: 10,
    fontSize: 16,
    color: "black",
    fontWeight: "bold"
  },
});
