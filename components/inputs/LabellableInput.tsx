import { PropsWithChildren } from "react";
import { ThemedView } from "../ThemedView";
import { ThemedText } from "../ThemedText";

type Props = PropsWithChildren<{
  label: string;
}>;

// todo: fix styles probably
export function LabellableInput({ label, children }: Props) {
  return (
    <ThemedView>
      <ThemedText>{label}</ThemedText>
      {children}
    </ThemedView>
  );
}
