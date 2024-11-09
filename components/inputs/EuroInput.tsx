import { TextInput as TextInputNative } from "react-native";
import { useController } from "react-hook-form";
import { InputProps, inputStyles } from "./common";
import { LabellableInput } from "./LabellableInput";

export default function EuroInput({ label, name, control }: InputProps) {
  const { field } = useController({
    name,
    control,
    defaultValue: 0,
  });

  const handleChangeText = (text: string) => {
    const value = parseFloat(text);
    if (!isNaN(value)) {
      field.onChange(value);
    }
  };

  return (
    <LabellableInput label={label + ", €"}>
      <TextInputNative
        keyboardType="decimal-pad"
        value={field.value.toString()}
        onChangeText={handleChangeText}
        style={inputStyles.input}
      />
    </LabellableInput>
  );
}
