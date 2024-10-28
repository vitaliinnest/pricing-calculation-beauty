import { Colors } from "@/constants/Colors";

export function useColor(
  props: { color?: string },
  colorName: keyof typeof Colors
) {
  const colorFromProps = props.color;

  if (colorFromProps) {
    return colorFromProps;
  }

  return Colors[colorName];
}
