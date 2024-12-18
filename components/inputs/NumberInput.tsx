import { TextInput as TextInputNative } from "react-native";
import { useController } from "react-hook-form";
import { InputProps, inputStyles } from "./common";
import { LabellableInput } from "./LabellableInput";
import { useState } from "react";

export default function NumberInput({ label, name, control }: InputProps) {
  const { field } = useController({
    name,
    control,
    defaultValue: 0,
  });
  const [value, setValue] = useState<string>(field.value.toString());

  const onChangeValue = (text: string) => {
    const formattedText = formatText(text);
    setValue(formattedText);

    if (!formattedText) {
      field.onChange(0);
      return;
    }

    const isFloat = formattedText.includes('.') || formattedText.includes(',');
    field.onChange(isFloat ? parseFloat(formattedText.replace(',', '.')) : parseInt(formattedText, 10));
  };

  const onBlur = () => {
    setValue(field.value.toString());
  }

  return (
    <LabellableInput label={label} style={inputStyles.inputLabelWrapper}>
      <TextInputNative
        keyboardType="decimal-pad"
        value={value}
        onChangeText={onChangeValue}
        style={inputStyles.input}
        onBlur={onBlur}
        selectTextOnFocus
      />
    </LabellableInput>
  );
}
function formatText(text: string) {
  let sanitizedText = text.replace(/[^0-9.,]/g, '');

  if (sanitizedText.startsWith('0') && sanitizedText.length > 1 && !sanitizedText.startsWith('0.') && !sanitizedText.startsWith('0,')) {
    sanitizedText = sanitizedText.replace(/^0+/, '');
  }

  const parts = sanitizedText.split(/[.,]/);
  if (parts.length > 2) {
    sanitizedText = parts[0] + '.' + parts.slice(1).join('');
  }
  return sanitizedText;
}

