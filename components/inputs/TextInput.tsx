import { TextInput as TextInputNative } from "react-native";
import { useController } from "react-hook-form"
import { InputProps, inputStyles } from "./common"
import { LabellableInput } from "./LabellableInput";

export default function TextInput({ label, name, control }: InputProps) {
  const { field } = useController({
    name,
    control,
    defaultValue: "",
  });

  return (
    <LabellableInput label={label}>
      <TextInputNative
        value={field.value}
        onChangeText={field.onChange}
        style={inputStyles.input}
      />
    </LabellableInput>
  );
}
