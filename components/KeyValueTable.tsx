import React from "react";
import { View, StyleSheet } from "react-native";
import { Text } from "@/components/Text"; // Custom Text component

type KeyValue = [string, number | string];

type Props = {
  data: KeyValue[];
};

export default function KeyValueTable({ data }: Props) {
  return (
    <View style={styles.tableContainer}>
      {data.map(([key, value], index) => (
        <View key={index} style={styles.cellContainer}>
          <Text style={styles.cellKey}>{key}</Text>
          <Text style={styles.cellValue}>{value}</Text>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  tableContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "flex-start",
    paddingHorizontal: 16,
  },
  cellContainer: {
    width: "45%", // Adjust width to control number of columns
    paddingVertical: 8,
    marginHorizontal: "2.5%", // Margin to create space between columns
    marginBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#e0e0e0",
  },
  cellKey: {
    fontSize: 14,
    color: "#333",
    fontWeight: "500",
    marginBottom: 4,
  },
  cellValue: {
    fontSize: 14,
    color: "#555",
    fontWeight: "400",
  },
});
