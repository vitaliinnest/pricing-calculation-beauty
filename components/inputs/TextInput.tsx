import { TextInput as TextInputNative, StyleSheet } from "react-native";
import { useController } from "react-hook-form"
import { InputProps } from "./common"
import { LabellableInput } from "./LabellableInput";

export default function TextInput({ label, name, control }: InputProps) {
  const { field } = useController({
    name,
    control,
    defaultValue: '',
  });

  return (
    <LabellableInput label={label}>
      <TextInputNative
        value={field.value}
        onChangeText={field.onChange}
        style={styles.input}
      />
    </LabellableInput>
  );
}

const styles = StyleSheet.create({
  input: {

  },
});
