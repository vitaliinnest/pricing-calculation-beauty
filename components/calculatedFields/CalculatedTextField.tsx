import { TextInput as TextInputNative } from "react-native";
import { inputStyles } from "../inputs/common";
import { LabellableInput } from "../inputs/LabellableInput";

type Props = {
  label: string;
  value: string;
};

export default function CalculatedTextField({ label, value }: Props) {
  return (
    <LabellableInput label={label}>
      <TextInputNative
        readOnly
        value={value.toString()}
        style={[inputStyles.input, inputStyles.readonlyInput]}
      />
    </LabellableInput>
  );
}
