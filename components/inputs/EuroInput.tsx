import { TextInput as TextInputNative, StyleSheet } from "react-native";
import { useController } from "react-hook-form"
import { InputProps } from "./common"
import { LabellableInput } from "./LabellableInput";
import NumberInput from "./NumberInput";

export default function EuroInput(props: InputProps) {
  return (
    <NumberInput
      {...props}
      label={props.label + ", €"}
    />
  );
}

const styles = StyleSheet.create({
  input: {

  },
});
