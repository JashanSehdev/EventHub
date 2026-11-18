import {
  FormControl,
  FormControlLabel,
  FormHelperText,
  FormLabel,
  Radio,
  RadioGroup,
} from "@mui/material";
import {
  Control,
  Controller,
  FieldPath,
  FieldValues,
  RegisterOptions,
} from "react-hook-form";

type Option = {
  label: string;
  value: string | boolean;
};
type ControllerRadioProp<T extends FieldValues> = {
  name: FieldPath<T>;
  options: Option[];
  control: Control<T>;
  rules?: RegisterOptions<T, FieldPath<T>>;
  label?: string;
  row?: boolean;
};
export default function ControllerRadio<T extends FieldValues>({
  name,
  control,
  options,
  rules,
  label,
  row,
}: ControllerRadioProp<T>) {
  return (
    <Controller
      name={name}
      control={control}
      rules={rules}
      render={({ field, fieldState: { error } }) => (
        <FormControl error={!!error} component="fieldset">
            {
                label && <FormLabel>{label}</FormLabel>
            }
          <RadioGroup {...field} value={field.value ?? ""}
            onChange={(event) => {
              const selectedOption = options.find(
                (option) => String(option.value) === event.target.value
              );

              if (selectedOption) {
                field.onChange(selectedOption.value);
              }
            }}
          >
            {options.map((option) => (
              <FormControlLabel
                key={option.label}
                value={option.value}
                control={<Radio />}
                label={option.label}
              />
            ))}
            {error && <FormHelperText error> {error.message} </FormHelperText>}
          </RadioGroup>
        </FormControl>
      )}
    />
  );
}
