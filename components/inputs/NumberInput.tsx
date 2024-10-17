import { TextInput as TextInputNative, StyleSheet } from "react-native";
import { useController } from "react-hook-form";
import { InputProps } from "./common";
import { LabellableInput } from "./LabellableInput";

export default function NumberInput({ label, name, control }: InputProps) {
  const { field } = useController({
    name,
    control,
    defaultValue: 0,
  });

  const handleChangeText = (text: string) => {
    const value = parseInt(text);
    if (!isNaN(value) && 0 <= value && value <= 100000) {
      field.onChange(value);
    }
  };

  return (
    <LabellableInput label={label}>
      <TextInputNative
        keyboardType="numeric"
        value={field.value.toString()}
        onChangeText={handleChangeText}
        style={styles.input}
      />
    </LabellableInput>
  );
}

const styles = StyleSheet.create({
  input: {
    // Add your styles here
  },
});
