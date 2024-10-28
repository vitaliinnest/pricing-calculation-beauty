import CalculatedNumberField from "./CalculatedNumberField";

type Props = {
  label: string;
  value: number;
};

export default function CalculatedEuroField({ label, value }: Props) {
  return <CalculatedNumberField label={`${label}, €`} value={value} />;
}
