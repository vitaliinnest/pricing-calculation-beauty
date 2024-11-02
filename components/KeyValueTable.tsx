import React from "react";
import { View, StyleSheet } from "react-native";
import Text from "@/components/Text";

type KeyValue = [string, number | string];

type Props = {
  data: KeyValue[];
};

export default function KeyValueTable({ data }: Props) {
  const rows = React.useMemo(() => {
    const result = [];
    for (let i = 0; i < data.length; i += 2) {
      result.push(data.slice(i, i + 2));
    }
    return result;
  }, [data]);

  return (
    <View style={styles.tableContainer}>
      {rows.map((row, rowIndex) => (
        <View key={rowIndex} style={styles.rowContainer}>
          {row.map(([key, value], cellIndex) => (
            <View key={cellIndex} style={styles.cellContainer}>
              <Text style={styles.cellKey}>{key}</Text>
              <Text style={styles.cellValue}>{value}</Text>
            </View>
          ))}
          {row.length === 1 && <View style={styles.cellContainer} />}
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  tableContainer: {
    width: "100%",
  },
  rowContainer: {
    flexDirection: "row",
    alignItems: "stretch",
    marginBottom: 12,
  },
  cellContainer: {
    flex: 1,
    paddingVertical: 8,
    paddingHorizontal: 8,
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
