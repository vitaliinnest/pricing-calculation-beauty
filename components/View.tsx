import { View as NativeView, type ViewProps as NativeViewProps } from "react-native";

import { useColor } from "@/hooks/useColor";

export type ViewProps = NativeViewProps & {
  color?: string;
};

export function View({ style, color, ...otherProps }: ViewProps) {
  const backgroundColor = useColor({ color }, "background");

  return <NativeView style={[{ backgroundColor }, style]} {...otherProps} />;
}
