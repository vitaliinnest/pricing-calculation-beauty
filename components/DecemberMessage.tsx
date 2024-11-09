import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { View, Text, TouchableOpacity, StyleSheet, Modal } from "react-native";

const DecemberMessage = () => {
  const [visible, setVisible] = useState(false);
  const { t } = useTranslation("decemberMessage");

  useEffect(() => {
    const currentMonth = new Date().getMonth();
    if (currentMonth) {
      // December is month 11 (0-indexed)
      setVisible(true);
    }
  }, []);

  const handleClose = () => {
    setVisible(false);
  };

  return (
    <Modal
      animationType="fade"
      transparent
      visible={visible}
      onRequestClose={handleClose}
    >
      <View style={styles.container}>
        <View style={styles.messageBox}>
          <Text style={styles.messageText}>{t("message")}</Text>
          <TouchableOpacity style={styles.closeButton} onPress={handleClose}>
            <Text style={styles.closeButtonText}>{t("close")}</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

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
  closeButton: {
    backgroundColor: "black",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  closeButtonText: {
    color: "white",
    fontSize: 16,
  },
});

export default DecemberMessage;
