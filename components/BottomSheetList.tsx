import { PropsWithChildren } from "react";
import { View } from "react-native";

type Props = PropsWithChildren<{
  data: any[];
  renderItem: any;
}>;

export default function BottomSheetList(props: Props) {
  return (
    <View></View>
  );
}