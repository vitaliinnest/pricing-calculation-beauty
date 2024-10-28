import { Control } from "react-hook-form";
import { StyleSheet } from "react-native";

export type InputProps = {
  label: string;
  name: string;
  control: Control<any, any>;
};

export const inputStyles = StyleSheet.create({
  input: {
    fontSize: 16,
  }
});
