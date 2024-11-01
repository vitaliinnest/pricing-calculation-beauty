import React, { PropsWithChildren, useRef } from "react";
import { StyleSheet } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet";
import ItemsList, { ItemsListProps } from "./ItemsList";

type Props = PropsWithChildren<ItemsListProps>;

export default function BottomSheetList(props: Props) {
  const bottomSheetRef = useRef<BottomSheet>(null);
  return (
    <GestureHandlerRootView style={styles.container}>
      <ItemsList {...props} />
      <BottomSheet style={styles.bottomSheet} ref={bottomSheetRef} snapPoints={["20%", "95%"]}>
        <BottomSheetView style={styles.contentContainer}>
          {props.children}
        </BottomSheetView>
      </BottomSheet>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  bottomSheet: {
    borderTopWidth: 3,
    borderColor: "lightgrey",
    borderRadius: 15,
  },
  contentContainer: {
    padding: 10,
  },
});
