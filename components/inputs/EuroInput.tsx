import { InputProps } from "./common"
import NumberInput from "./NumberInput";

export default function EuroInput(props: InputProps) {
  return (
    <NumberInput
      {...props}
      label={props.label + ", €"}
    />
  );
}
