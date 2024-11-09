import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { View, Text, StyleSheet, Modal } from "react-native";

export default function JanuaryMessage() {
  const [visible, setVisible] = useState(false);
  const { t } = useTranslation("januaryMessage");

  useEffect(() => {
    const currentMonth = new Date().getMonth();
    if (currentMonth === 0) {
      // January is month 0 (0-indexed)
      setVisible(true);
    }
  }, []);

  return (
    <Modal
      animationType="fade"
      transparent
      visible={visible}
      onRequestClose={() => {}}
    >
      <View style={styles.container}>
        <View style={styles.messageBox}>
          <Text style={styles.messageText}>{t("message")}</Text>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  messageBox: {
    width: "80%",
    padding: 20,
    backgroundColor: "white",
    borderRadius: 10,
    alignItems: "center",
  },
  messageText: {
    fontSize: 18,
    marginBottom: 20,
  },
});