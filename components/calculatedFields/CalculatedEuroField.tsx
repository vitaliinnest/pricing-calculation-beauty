import { TextInput as TextInputNative } from "react-native";
import { inputStyles } from "../inputs/common";
import { LabellableInput } from "../inputs/LabellableInput";

type Props = {
  label: string;
  value: number;
};

export default function CalculatedEuroField({ label, value }: Props) {
  return (
    <LabellableInput
      label={`${label}, €`}
      style={inputStyles.readonlyInputLabelWrapper}
    >
      <TextInputNative
        readOnly
        value={value.toFixed(2)}
        style={[inputStyles.input, inputStyles.readonlyInput]}
      />
    </LabellableInput>
  );
}
