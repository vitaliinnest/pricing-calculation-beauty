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
    height: 30,
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 5,
    marginBottom: 15,
  },
  inputLabelWrapper: {
    backgroundColor: "#ffffcc",
  },
  readonlyInputLabelWrapper: {
    backgroundColor: "#ccff99",
  },
  readonlyInput: {
    color: "black",
  },
});
