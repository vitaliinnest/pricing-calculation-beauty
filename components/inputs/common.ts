import { Control } from "react-hook-form";

export type InputProps = {
  label: string;
  name: string;
  control: Control<any, any>;
};
