import { TextInput as TextInputNative } from "react-native";
import { useController } from "react-hook-form";
import { InputProps, inputStyles } from "./common";
import { LabellableInput } from "./LabellableInput";
import { useState } from "react";

export default function EuroInput({ label, name, control }: InputProps) {
  const { field } = useController({
    name,
    control,
    defaultValue: 0.0,
  });
  const [value, setValue] = useState<string>(field.value.toFixed(2));

  const onChangeValue = (text: string) => {
    const formattedText = formatText(text);
    setValue(formattedText);

    const floatValue = formattedText ? parseFloat(formattedText) : 0;
    field.onChange(floatValue);
  };

  const onBlur = () => {
    setValue(field.value.toFixed(2));
  };

  return (
    <LabellableInput
      label={label + ", €"}
      style={inputStyles.inputLabelWrapper}
    >
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
  let formattedText = text.replace(/[^0-9.,]/g, "").replace(/,/g, ".");
  const parts = formattedText.split(".");
  if (parts.length > 2) {
    formattedText = parts[0] + "." + parts.slice(1).join("");
  }
  if (parts[1] && parts[1].length > 2) {
    formattedText = parts[0] + "." + parts[1].substring(0, 2);
  }
  if (parts[0].startsWith("0") && parts[0].length > 1) {
    parts[0] = parts[0].replace(/^0+/, "");
    formattedText = parts.join(".");
  }
  return formattedText;
}
